// Lógica pura del formulario de inscripción (sin React): config, plantillas, mensaje y validación.

export const WHATSAPP_NUMBER = '34608108320';
export const EMAIL = 'balonmanosariegos@gmail.com';
export const STORAGE_KEY = 'insc-sariegos-2027-v3';
export const MIN_PLAYERS = 7;
export const MAX_TEAMS_PER_CAT = 4;

export const CATS = [
  { k: 'inf', name: 'Infantil' },
  { k: 'cad', name: 'Cadete' },
  { k: 'juv', name: 'Juvenil' },
];
export const ROLES = ['Entrenador', 'Ayudante', 'Delegado', 'Acompañante'];
const LETTERS = 'ABCD';

export const TORNEOS_CFG = {
  masc: {
    titulo: 'III TORNEO MASCULINO BM SARIEGOS',
    nombre: 'III Torneo Masculino',
    fechas: '21 al 24 de marzo de 2027',
    sub: 'Semana Santa. Infantil, cadete y juvenil masculino.',
    ext: 'Torneo y comidas del lunes al miércoles.',
    llegada: ['Domingo 21 por la tarde', 'Domingo 21 por la mañana', 'Lunes 22'],
    precios: { esp: 130, mor: 225, alf: 250, fc: 240, ext: 40 },
    g: {
      j: 'jugador',
      js: 'jugadores',
      los: 'los jugadores',
      este: 'este jugador',
      cada: 'Cada jugador',
    },
  },
  fem: {
    titulo: 'V TORNEO FEMENINO BM SARIEGOS',
    nombre: 'V Torneo Femenino',
    fechas: '5 al 8 de febrero de 2027',
    sub: 'Carnaval. Infantil, cadete y juvenil femenino.',
    ext: 'Torneo y comidas del sábado al lunes.',
    llegada: ['Viernes 5 por la tarde', 'Viernes 5 por la mañana', 'Sábado 6'],
    precios: { esp: 130, mor: 225, alf: 242, fc: 220, ext: 40 },
    g: {
      j: 'jugadora',
      js: 'jugadoras',
      los: 'las jugadoras',
      este: 'esta jugadora',
      cada: 'Cada jugadora',
    },
  },
};

export const ALOJAMIENTOS = [
  {
    p: 'esp',
    value: 'Espacios Sariegos',
    name: 'Espacios Sariegos',
    d: 'Instalaciones del municipio con colchonetas y colchones (traer saco de dormir). Todo a pie.',
  },
  {
    p: 'mor',
    value: 'Hotel Las Moreras',
    name: 'Hotel Las Moreras',
    d: 'Habitaciones dobles o triples, según disponibilidad.',
  },
  {
    p: 'alf',
    value: 'Hotel Alfageme',
    name: 'Hotel Alfageme',
    d: 'Necesita autobús propio o medio de transporte a Sariegos.',
  },
  {
    p: 'fc',
    value: 'Hoteles FC (Los Cubos e Infantas León)',
    name: 'Hoteles FC',
    d: 'Los Cubos e Infantas León. Necesita autobús propio o medio de transporte a Sariegos.',
  },
  { p: 'ext', value: 'Sin alojamiento', name: 'Sin alojamiento', d: '' },
];

export const blankStaff = (role = 'Entrenador') => ({
  nombre: '',
  apellidos: '',
  rol: role,
  tel: '',
  nac: '',
  intol: '',
});
export const blankPlayer = () => ({ dorsal: '', nombre: '', apellidos: '', nac: '', intol: '' });
export const newTeam = () => ({
  alias: '',
  resp: 0,
  staff: [blankStaff('Entrenador'), blankStaff('Delegado')],
  players: Array.from({ length: 12 }, blankPlayer),
});

export const blankForm = () => ({
  torneo: '',
  club: '',
  localidad: '',
  contacto: '',
  cargo: '',
  telefono: '',
  email: '',
  n: { inf: 0, cad: 0, juv: 0 },
  aloj: '',
  llegada: '',
  hora: '',
  obs: '',
  acepto: false,
  datos: false,
});

const clampN = (v) => Math.max(0, Math.min(MAX_TEAMS_PER_CAT, Number.parseInt(v, 10) || 0));

export const activeKeys = (n) =>
  CATS.flatMap((c) => Array.from({ length: clampN(n[c.k]) }, (_, i) => `${c.k}-${i}`));

export const teamLabel = (key, n) => {
  const [k, i] = key.split('-');
  const cat = CATS.find((c) => c.k === k);
  return cat.name + (clampN(n[k]) > 1 ? ` ${LETTERS[Number(i)]}` : '');
};

const filled = (o, ks) => ks.some((k) => String(o[k] || '').trim());
const fecha = (iso) => {
  if (!iso) return 's/f';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
const intol = (s) => (String(s || '').trim() ? String(s).trim() : 'ninguna');
const telOk = (t) => /^[+\d][\d\s]{8,}$/.test(String(t || '').trim());
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

export const gen = (torneo) => (TORNEOS_CFG[torneo] || TORNEOS_CFG.masc).g;

export function buildMessage(form, teams) {
  const cfg = TORNEOS_CFG[form.torneo];
  const g = gen(form.torneo);
  const precio = cfg && ALOJAMIENTOS.find((a) => a.value === form.aloj);
  const alojPrecio = precio ? cfg.precios[precio.p] : '';
  const keys = activeKeys(form.n);
  const L = [
    cfg
      ? `INSCRIPCIÓN ${cfg.titulo} 2027`
      : 'INSCRIPCIÓN TORNEO BM SARIEGOS 2027 (falta elegir el torneo)',
    cfg ? `Fechas: ${cfg.fechas}` : '',
    '',
    `Club: ${form.club.trim() || '—'}`,
    `Localidad: ${form.localidad.trim() || '—'}`,
    `Contacto: ${form.contacto.trim() || '—'}${form.cargo.trim() ? ` (${form.cargo.trim()})` : ''}, ${form.telefono.trim() || '—'}, ${form.email.trim() || '—'}`,
    `Alojamiento: ${form.aloj || '—'}${alojPrecio ? ` (${alojPrecio} € por ${g.j})` : ''}`,
    `Llegada: ${form.llegada}${form.hora.trim() ? `, hacia las ${form.hora.trim()}` : ''}`,
  ];
  if (form.obs.trim()) L.push(`Observaciones: ${form.obs.trim()}`);
  let totJ = 0;
  let totT = 0;
  keys.forEach((key) => {
    const t = teams[key];
    if (!t) return;
    const staff = t.staff.filter((s) => filled(s, ['nombre', 'apellidos', 'tel']));
    const players = t.players.filter((p) => filled(p, ['dorsal', 'nombre', 'apellidos']));
    totJ += players.length;
    totT += staff.length;
    const resp = t.staff[t.resp];
    L.push('', `— ${teamLabel(key, form.n).toUpperCase()}${t.alias ? `: ${t.alias}` : ''} —`);
    L.push(
      `Responsable: ${resp && filled(resp, ['nombre']) ? `${`${resp.nombre} ${resp.apellidos}`.trim()}, ${resp.tel || 'sin teléfono'}` : '—'}`
    );
    L.push(`Técnicos (${staff.length}):`);
    staff.forEach((s) =>
      L.push(
        `· ${`${s.nombre} ${s.apellidos}`.trim()}, ${s.rol}${s.tel ? `, ${s.tel}` : ''}, nac. ${fecha(s.nac)}, intolerancias: ${intol(s.intol)}`
      )
    );
    L.push(`${cap(g.js)} (${players.length}):`);
    [...players]
      .sort(
        (a, b) => (Number.parseInt(a.dorsal, 10) || 999) - (Number.parseInt(b.dorsal, 10) || 999)
      )
      .forEach((p) =>
        L.push(
          `· ${p.dorsal ? `#${p.dorsal} ` : ''}${`${p.nombre} ${p.apellidos}`.trim()}, nac. ${fecha(p.nac)}, intolerancias: ${intol(p.intol)}`
        )
      );
  });
  L.push(
    '',
    `Total: ${keys.length} equipo${keys.length === 1 ? '' : 's'}, ${totJ} ${g.js} y ${totT} técnicos.`
  );
  return L.join('\n');
}

export function validate(form, teams) {
  const e = {};
  const g = gen(form.torneo);
  if (!form.torneo) e.torneo = 'Elige el torneo al que os inscribís.';
  if (!form.club.trim()) e.club = 'Escribe el nombre del club.';
  if (!form.localidad.trim()) e.localidad = 'Indica la localidad y la provincia.';
  if (!form.contacto.trim()) e.contacto = 'Indica una persona de contacto.';
  if (!telOk(form.telefono)) e.telefono = 'Escribe un teléfono de 9 cifras.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    e.email = 'Escribe un correo válido, como club@ejemplo.com.';
  const keys = activeKeys(form.n);
  if (!keys.length) e.equipos = 'Inscribe al menos un equipo.';
  if (!form.aloj) e.aloj = 'Elige una opción de alojamiento.';
  if (!form.acepto) e.acepto = 'Marca la casilla para continuar.';
  if (!form.datos) e.datos = `Necesitamos esta confirmación para recibir los datos de ${g.los}.`;
  keys.forEach((key) => {
    const t = teams[key];
    if (!t) return;
    const sm = [];
    const staff = t.staff.filter((s) => filled(s, ['nombre', 'apellidos', 'tel']));
    const resp = t.staff[t.resp];
    if (!staff.length) sm.push('Añade al menos un técnico.');
    if (!resp || !filled(resp, ['nombre'])) sm.push('Marca un responsable con nombre.');
    else if (!telOk(resp.tel)) sm.push('El responsable necesita un teléfono.');
    if (staff.some((s) => s.rol === 'Entrenador' && !telOk(s.tel)))
      sm.push('Falta el teléfono de algún entrenador.');
    if (staff.some((s) => !s.nombre.trim() || !s.apellidos.trim()))
      sm.push('Completa nombre y apellidos de cada técnico.');
    if (sm.length) e[`${key}-staff`] = sm.join(' ');
    const players = t.players.filter((p) =>
      filled(p, ['dorsal', 'nombre', 'apellidos', 'nac', 'intol'])
    );
    const pm = [];
    if (players.length < MIN_PLAYERS)
      pm.push(`Hacen falta al menos ${MIN_PLAYERS} ${g.js} (hay ${players.length}).`);
    if (
      players.some(
        (p) => !p.nombre.trim() || !p.apellidos.trim() || !p.nac || !String(p.dorsal).trim()
      )
    )
      pm.push(`${g.cada} necesita dorsal, nombre, apellidos y fecha de nacimiento.`);
    const dors = players.map((p) => String(p.dorsal).trim()).filter(Boolean);
    if (new Set(dors).size !== dors.length) pm.push('Hay dorsales repetidos.');
    if (pm.length) e[`${key}-players`] = pm.join(' ');
  });
  return e;
}

export const waUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
