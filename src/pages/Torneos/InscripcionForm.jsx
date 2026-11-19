import { useEffect, useMemo, useRef, useState } from 'react';
import './InscripcionForm.css';
import {
  ALOJAMIENTOS,
  CATS,
  EMAIL,
  ROLES,
  STORAGE_KEY,
  TORNEOS_CFG,
  MIN_PLAYERS,
  MAX_TEAMS_PER_CAT,
  activeKeys,
  blankForm,
  blankPlayer,
  blankStaff,
  buildMessage,
  gen,
  newTeam,
  teamLabel,
  validate,
  waUrl,
} from './inscripcion';

const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

const loadSaved = () => {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (s?.form && s?.teams) return { form: { ...blankForm(), ...s.form }, teams: s.teams };
  } catch {
    // sin almacenamiento disponible: se parte de cero
  }
  return { form: blankForm(), teams: {} };
};

const Field = ({ id, label, value, onChange, type = 'text', error, hint, ...rest }) => (
  <div className="insc-f">
    <label htmlFor={id}>
      {label} {hint && <span className="insc-hint">{hint}</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={error ? 'insc-bad' : undefined}
      aria-invalid={error ? true : undefined}
      {...rest}
    />
    {error && <span className="insc-err">{error}</span>}
  </div>
);

const InscripcionForm = ({ preseleccion }) => {
  const saved = useMemo(loadSaved, []);
  const [form, setForm] = useState(saved.form);
  const [teams, setTeams] = useState(saved.teams);
  const [intentado, setIntentado] = useState(false);
  const [status, setStatus] = useState('');
  const resumenRef = useRef(null);

  useEffect(() => {
    if (preseleccion?.torneo) setForm((f) => ({ ...f, torneo: preseleccion.torneo, llegada: '' }));
  }, [preseleccion]);

  const cfg = TORNEOS_CFG[form.torneo];
  const g = gen(form.torneo);
  const keys = activeKeys(form.n);
  const eff = useMemo(
    () => ({
      ...form,
      llegada: cfg ? (cfg.llegada.includes(form.llegada) ? form.llegada : cfg.llegada[0]) : '',
    }),
    [form, cfg]
  );
  const mensaje = useMemo(() => buildMessage(eff, teams), [eff, teams]);
  const errores = useMemo(() => validate(eff, teams), [eff, teams]);
  const err = (k) => (intentado ? errores[k] : undefined);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, teams }));
    } catch {
      // sin almacenamiento: no se guarda el borrador
    }
  }, [form, teams]);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const setCount = (cat, v) => {
    const n = Math.max(0, Math.min(MAX_TEAMS_PER_CAT, Number.parseInt(v, 10) || 0));
    setForm((f) => ({ ...f, n: { ...f.n, [cat]: n } }));
    setTeams((t) => {
      const next = { ...t };
      for (let i = 0; i < n; i++) if (!next[`${cat}-${i}`]) next[`${cat}-${i}`] = newTeam();
      return next;
    });
  };

  const upTeam = (key, fn) => setTeams((t) => ({ ...t, [key]: fn(t[key] || newTeam()) }));
  const upRow = (key, kind, i, k, v) =>
    upTeam(key, (t) => ({
      ...t,
      [kind]: t[kind].map((row, idx) => (idx === i ? { ...row, [k]: v } : row)),
    }));
  const addRow = (key, kind) =>
    upTeam(key, (t) => ({
      ...t,
      [kind]: [...t[kind], kind === 'staff' ? blankStaff('Ayudante') : blankPlayer()],
    }));
  const rmRow = (key, kind, i) =>
    upTeam(key, (t) => {
      if (t[kind].length <= 1)
        return { ...t, [kind]: [kind === 'staff' ? blankStaff('Entrenador') : blankPlayer()] };
      let resp = t.resp;
      if (kind === 'staff') resp = t.resp === i ? 0 : t.resp > i ? t.resp - 1 : t.resp;
      return { ...t, resp, [kind]: t[kind].filter((_, idx) => idx !== i) };
    });

  const revisar = () => {
    setIntentado(true);
    if (Object.keys(errores).length) {
      setStatus('Faltan datos. Revisa los avisos en rojo.');
      requestAnimationFrame(() =>
        document.querySelector('.insc-err')?.scrollIntoView({ block: 'center' })
      );
      return false;
    }
    setStatus('');
    return true;
  };

  const onWhatsApp = (e) => {
    if (!revisar()) {
      e.preventDefault();
      return;
    }
    setStatus(
      'Se ha abierto WhatsApp con el mensaje. Pulsa enviar allí para completar la inscripción.'
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!revisar()) return;
    void navigator.clipboard
      .writeText(mensaje)
      .then(() => setStatus(`Inscripción copiada. Pégala en un correo a ${EMAIL}.`))
      .catch(() => {
        const r = document.createRange();
        r.selectNodeContents(resumenRef.current);
        const s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        setStatus(
          'Texto seleccionado. Cópialo con Ctrl+C (o mantén pulsado en el móvil) y pégalo en un correo.'
        );
      });
  };

  return (
    <form
      className={`insc insc--${form.torneo || 'none'}`}
      id="inscripcion"
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className="insc__titulo">Inscripción</h2>
      <p className="insc__intro">
        Elige el torneo, rellena los datos del club y la plantilla de cada equipo, y envíanos la
        inscripción por WhatsApp o por correo. Hay 12 plazas por categoría y se adjudican por orden
        de inscripción. Te confirmaremos la plaza por WhatsApp o correo.
      </p>

      <fieldset>
        <legend>Torneo</legend>
        <div className="insc-opts">
          {Object.entries(TORNEOS_CFG).map(([k, c]) => (
            <label key={k} className="insc-opt" htmlFor={`t-${k}`}>
              <input
                type="radio"
                name="torneo"
                id={`t-${k}`}
                checked={form.torneo === k}
                onChange={() => setForm((f) => ({ ...f, torneo: k, llegada: '' }))}
              />
              <span>
                <b>{c.nombre}</b>
                <span className="insc-when">{c.fechas}</span>
                <span className="insc-d">{c.sub}</span>
              </span>
            </label>
          ))}
        </div>
        {err('torneo') && <span className="insc-err">{err('torneo')}</span>}
        <p className="insc-note">
          Si un club va a los dos torneos, envía una inscripción para cada uno.
        </p>
      </fieldset>

      <fieldset>
        <legend>Club</legend>
        <div className="insc-grid">
          <Field
            id="club"
            label="Nombre del club"
            value={form.club}
            onChange={set('club')}
            error={err('club')}
            autoComplete="organization"
          />
          <Field
            id="localidad"
            label="Localidad y provincia"
            value={form.localidad}
            onChange={set('localidad')}
            error={err('localidad')}
          />
          <Field
            id="contacto"
            label="Persona de contacto del club"
            value={form.contacto}
            onChange={set('contacto')}
            error={err('contacto')}
            autoComplete="name"
          />
          <Field
            id="cargo"
            label="Cargo"
            hint="(opcional)"
            value={form.cargo}
            onChange={set('cargo')}
            placeholder="Coordinador, presidente…"
          />
          <Field
            id="telefono"
            label="Teléfono"
            type="tel"
            value={form.telefono}
            onChange={set('telefono')}
            error={err('telefono')}
            autoComplete="tel"
            inputMode="tel"
          />
          <Field
            id="email"
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={set('email')}
            error={err('email')}
            autoComplete="email"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Equipos inscritos</legend>
        <div className="insc-counts">
          {CATS.map((c) => (
            <div key={c.k} className="insc-count">
              <span className="insc-cat">{c.name}</span>
              <label htmlFor={`n-${c.k}`} className="insc-hint">
                Nº de equipos
              </label>
              <input
                id={`n-${c.k}`}
                type="number"
                min="0"
                max={MAX_TEAMS_PER_CAT}
                inputMode="numeric"
                value={form.n[c.k]}
                onChange={(e) => setCount(c.k, e.target.value)}
              />
            </div>
          ))}
        </div>
        {err('equipos') && <span className="insc-err">{err('equipos')}</span>}
      </fieldset>

      <section className="insc-teams" aria-label="Plantillas de los equipos">
        {keys.length === 0 && (
          <p className="insc-empty">
            Indica arriba cuántos equipos inscribís en cada categoría y aquí aparecerá la ficha de
            cada uno para rellenar técnicos y {g.js}.
          </p>
        )}
        {keys.map((key) => {
          const t = teams[key] || newTeam();
          const cat = CATS.find((c) => c.k === key.split('-')[0]);
          return (
            <article key={key} className="insc-team" id={`team-${key}`}>
              <div className="insc-team__head">
                <h3>{teamLabel(key, form.n)}</h3>
              </div>
              <div className="insc-team__body">
                <Field
                  id={`${key}-alias`}
                  label="Nombre del equipo"
                  hint="(como aparecerá en el cuadro)"
                  value={t.alias}
                  onChange={(v) => upTeam(key, (x) => ({ ...x, alias: v }))}
                  placeholder={`BM Ejemplo ${cat.name}`}
                />

                <div className="insc-block">
                  <h4>
                    Técnicos y acompañantes
                    <span>
                      Marca quién es el responsable. El teléfono es obligatorio para entrenadores y
                      responsable.
                    </span>
                  </h4>
                  <div className="insc-rows">
                    {t.staff.map((s, i) => {
                      const p = `${key}-s${i}`;
                      return (
                        <div key={p} className="insc-row insc-row--staff">
                          <label className="insc-resp" htmlFor={`${p}-resp`}>
                            <input
                              type="radio"
                              name={`resp-${key}`}
                              id={`${p}-resp`}
                              checked={t.resp === i}
                              onChange={() => upTeam(key, (x) => ({ ...x, resp: i }))}
                            />
                            Responsable del equipo durante el torneo
                          </label>
                          <Field
                            id={`${p}-nombre`}
                            label="Nombre"
                            value={s.nombre}
                            onChange={(v) => upRow(key, 'staff', i, 'nombre', v)}
                          />
                          <Field
                            id={`${p}-apellidos`}
                            label="Apellidos"
                            value={s.apellidos}
                            onChange={(v) => upRow(key, 'staff', i, 'apellidos', v)}
                          />
                          <div className="insc-f">
                            <label htmlFor={`${p}-rol`}>Función</label>
                            <select
                              id={`${p}-rol`}
                              value={s.rol}
                              onChange={(e) => upRow(key, 'staff', i, 'rol', e.target.value)}
                            >
                              {ROLES.map((r) => (
                                <option key={r}>{r}</option>
                              ))}
                            </select>
                          </div>
                          <Field
                            id={`${p}-tel`}
                            label="Teléfono"
                            type="tel"
                            inputMode="tel"
                            value={s.tel}
                            onChange={(v) => upRow(key, 'staff', i, 'tel', v)}
                          />
                          <button
                            type="button"
                            className="insc-icon-btn"
                            aria-label="Quitar a este técnico"
                            onClick={() => rmRow(key, 'staff', i)}
                          >
                            ×
                          </button>
                          <Field
                            id={`${p}-nac`}
                            label="Fecha de nacimiento"
                            type="date"
                            value={s.nac}
                            onChange={(v) => upRow(key, 'staff', i, 'nac', v)}
                          />
                          <Field
                            id={`${p}-intol`}
                            label="Intolerancias o alergias"
                            placeholder="Ninguna"
                            value={s.intol}
                            onChange={(v) => upRow(key, 'staff', i, 'intol', v)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" className="insc-add" onClick={() => addRow(key, 'staff')}>
                    Añadir técnico o acompañante
                  </button>
                  {err(`${key}-staff`) && <span className="insc-err">{err(`${key}-staff`)}</span>}
                </div>

                <div className="insc-block">
                  <h4>
                    {cap(g.js)}
                    <span>Mínimo {MIN_PLAYERS}. Deja vacías las filas que sobren.</span>
                  </h4>
                  <div className="insc-rows">
                    {t.players.map((pl, i) => {
                      const p = `${key}-p${i}`;
                      return (
                        <div key={p} className="insc-row insc-row--player">
                          <Field
                            id={`${p}-dorsal`}
                            label="Dorsal"
                            type="number"
                            inputMode="numeric"
                            value={pl.dorsal}
                            onChange={(v) => upRow(key, 'players', i, 'dorsal', v)}
                          />
                          <Field
                            id={`${p}-nombre`}
                            label="Nombre"
                            value={pl.nombre}
                            onChange={(v) => upRow(key, 'players', i, 'nombre', v)}
                          />
                          <Field
                            id={`${p}-apellidos`}
                            label="Apellidos"
                            value={pl.apellidos}
                            onChange={(v) => upRow(key, 'players', i, 'apellidos', v)}
                          />
                          <Field
                            id={`${p}-nac`}
                            label="Fecha de nacimiento"
                            type="date"
                            value={pl.nac}
                            onChange={(v) => upRow(key, 'players', i, 'nac', v)}
                          />
                          <button
                            type="button"
                            className="insc-icon-btn"
                            aria-label={`Quitar a ${g.este}`}
                            onClick={() => rmRow(key, 'players', i)}
                          >
                            ×
                          </button>
                          <Field
                            id={`${p}-intol`}
                            label="Intolerancias o alergias"
                            placeholder="Ninguna"
                            value={pl.intol}
                            onChange={(v) => upRow(key, 'players', i, 'intol', v)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" className="insc-add" onClick={() => addRow(key, 'players')}>
                    Añadir {g.j}
                  </button>
                  {err(`${key}-players`) && (
                    <span className="insc-err">{err(`${key}-players`)}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <fieldset>
        <legend>Alojamiento</legend>
        <div className="insc-opts">
          {ALOJAMIENTOS.map((a) => (
            <label key={a.p} className="insc-opt" htmlFor={`aloj-${a.p}`}>
              <input
                type="radio"
                name="aloj"
                id={`aloj-${a.p}`}
                checked={form.aloj === a.value}
                onChange={() => set('aloj')(a.value)}
              />
              <span>
                <b>{a.name}</b>
                <span className="insc-d">
                  {a.p === 'ext' ? cfg?.ext || 'Torneo y comidas de los días de competición.' : a.d}
                </span>
              </span>
              <span className="insc-price">
                {cfg ? `${a.p === 'ext' ? '~' : ''}${cfg.precios[a.p]} €` : '—'}
              </span>
            </label>
          ))}
        </div>
        {err('aloj') && <span className="insc-err">{err('aloj')}</span>}
        <p className="insc-note">
          {!cfg && 'Elige el torneo para ver los precios. '}Precio por {g.j} para todo el torneo,
          con pensión completa. Incluye inscripción, arbitrajes, trofeos y agua.
        </p>
      </fieldset>

      <fieldset>
        <legend>Llegada y observaciones</legend>
        <div className="insc-grid">
          <div className="insc-f">
            <label htmlFor="llegada">Llegada prevista</label>
            <select
              id="llegada"
              value={eff.llegada}
              onChange={(e) => set('llegada')(e.target.value)}
            >
              {cfg ? (
                cfg.llegada.map((o) => <option key={o}>{o}</option>)
              ) : (
                <option value="">Elige primero el torneo</option>
              )}
            </select>
          </div>
          <Field
            id="hora"
            label="Hora aproximada"
            hint="(opcional)"
            value={form.hora}
            onChange={set('hora')}
            placeholder="17:30"
          />
          <div className="insc-f insc-full">
            <label htmlFor="obs">
              Otras observaciones <span className="insc-hint">(opcional)</span>
            </label>
            <textarea id="obs" value={form.obs} onChange={(e) => set('obs')(e.target.value)} />
          </div>
        </div>
        <label className="insc-check" htmlFor="acepto">
          <input
            id="acepto"
            type="checkbox"
            checked={form.acepto}
            onChange={(e) => set('acepto')(e.target.checked)}
          />
          <span>
            Entiendo que las plazas se asignan por orden de inscripción y que en los hoteles el tipo
            de habitación depende de la disponibilidad.
          </span>
        </label>
        {err('acepto') && <span className="insc-err">{err('acepto')}</span>}
        <label className="insc-check" htmlFor="datos">
          <input
            id="datos"
            type="checkbox"
            checked={form.datos}
            onChange={(e) => set('datos')(e.target.checked)}
          />
          <span>
            Cuento con la autorización de las familias para facilitar los datos de {g.los},
            incluidas las intolerancias, que el Club Balonmano Sariegos usará solo para organizar el
            torneo.
          </span>
        </label>
        {err('datos') && <span className="insc-err">{err('datos')}</span>}
      </fieldset>

      <section className="insc-send" aria-labelledby="insc-send-h">
        <h3 id="insc-send-h">Enviar la inscripción</h3>
        <p>
          Así quedará el mensaje. Revísalo y envíalo por WhatsApp, o cópialo y mándalo por correo.
          Con varias plantillas el mensaje es largo: si WhatsApp no lo abre entero, usa el correo.
        </p>
        <pre ref={resumenRef}>{mensaje}</pre>
        <div className="insc-actions">
          <a
            className="insc-btn insc-btn--wa"
            href={waUrl(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsApp}
          >
            Enviar por WhatsApp
          </a>
          <button type="submit" className="insc-btn">
            Copiar inscripción
          </button>
        </div>
        {status && (
          <div className="insc-status" role="status">
            {status}
          </div>
        )}
        <p className="insc-contact">
          Correo: <b>{EMAIL}</b>
          <br />
          Teléfono: <b>608 10 83 20</b> · <b>695 04 87 96</b>
        </p>
      </section>
    </form>
  );
};

export default InscripcionForm;
