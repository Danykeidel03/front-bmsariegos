# ROADMAP - Plan de Mejoras BM Sariegos

Este documento define el plan de mejoras del proyecto, organizado en fases incrementales. Cada fase se implementa en una rama separada siguiendo la convención `feature/fase-X-nombre`.

## Estado General

| Fase | Rama | Estado | Descripción |
|------|------|--------|-------------|
| 1 | `feature/fase-1-seguridad` | ✅ Completada | Correcciones de seguridad críticas |
| 2 | `feature/fase-2-arquitectura` | Pendiente | Refactorización y código centralizado |
| 3 | `feature/fase-3-errores` | Pendiente | Manejo de errores consistente |
| 4 | `feature/fase-4-accesibilidad` | Pendiente | Mejoras de accesibilidad (a11y) |
| 5 | `feature/fase-5-testing` | Pendiente | Configuración de tests |
| 6 | `feature/fase-6-typescript` | Pendiente | Migración a TypeScript |

---

## Fase 1: Seguridad

**Rama:** `feature/fase-1-seguridad`  
**Prioridad:** CRÍTICA

### Problemas a resolver

#### 1.1 Vulnerabilidad XSS con `dangerouslySetInnerHTML`

**Archivos afectados:**
- `src/components/SlideNoticias/SlideNoticias.jsx`
- `src/pages/News/News.jsx`

**Problema:**
```javascript
<p dangerouslySetInnerHTML={{ __html: modal.descripcion.replace(/\n/g, '<br>') }}></p>
```
El contenido de la API se inyecta sin sanitizar, permitiendo ataques XSS.

**Solución:**
- Instalar DOMPurify: `npm install dompurify`
- Sanitizar todo contenido HTML dinámico

#### 1.2 `Swal` no definido (Error de runtime)

**Archivos afectados:**
- `src/pages/Contact/Contact.jsx` (línea 23)
- `src/components/TeamModal/TeamModal.jsx` (múltiples líneas)

**Problema:**
```javascript
Swal.fire({ ... });  // ReferenceError: Swal is not defined
```

**Solución:**
- Usar la función `loadSweetAlert()` existente en `utils/lazyLoadLibraries.js`
- O importar SweetAlert2 directamente donde se necesite

#### 1.3 API Key expuesta en frontend

**Archivos afectados:**
- Todos los archivos en `src/services/`

**Problema:**
La API key es visible en las DevTools del navegador.

**Solución recomendada (requiere backend):**
- Mover operaciones sensibles a un backend proxy
- Limitar permisos de la API key solo a operaciones de lectura pública
- Implementar autenticación basada en tokens JWT

**Solución temporal (documentada):**
- Documentar el riesgo y las limitaciones
- Asegurar que la API key tenga permisos mínimos necesarios

---

## Fase 2: Arquitectura

**Rama:** `feature/fase-2-arquitectura`  
**Prioridad:** ALTA

### Problemas a resolver

#### 2.1 Cliente API duplicado

**Problema:** Los 8 archivos de servicios repiten la misma configuración de axios.

**Solución:**
- Crear `src/services/api.js` centralizado
- Implementar interceptores globales de error
- Refactorizar todos los servicios para usar el cliente común

#### 2.2 Funciones utilitarias duplicadas

**Funciones duplicadas:**
- `calculateAge()` en `Teams.jsx` y `SliderBirthday.jsx`
- `formatDate()` en 3 archivos diferentes
- Lógica de `loadUpcomingMatches` en 2 componentes

**Solución:**
- Crear `src/utils/dateUtils.js` con funciones compartidas
- Crear hook `src/hooks/useMatches.js` para lógica de partidos

#### 2.3 Constantes mágicas dispersas

**Solución:**
- Crear `src/constants/index.js` con valores centralizados

#### 2.4 forwardRef sin uso real

**Archivos afectados:**
- `src/components/Header/Header.jsx`
- `src/components/Footer/Footer.jsx`

**Solución:**
- Remover `forwardRef` donde no se usa el `ref`

---

## Fase 3: Manejo de Errores

**Rama:** `feature/fase-3-errores`  
**Prioridad:** ALTA

### Problemas a resolver

#### 3.1 Errores silenciados

**Archivos afectados:**
- `src/components/Slider/Slider.jsx`
- `src/components/NewsModal/NewsModal.jsx`
- `src/components/MatchModal/MatchModal.jsx`
- `src/components/HeaderImageModal/HeaderImageModal.jsx`
- `src/components/MatchesSection/MatchesSection.jsx`

**Solución:**
- Implementar estados de error en componentes
- Mostrar feedback visual al usuario
- Logging consistente para debugging

#### 3.2 Sin Error Boundaries

**Solución:**
- Crear `src/components/ErrorBoundary/ErrorBoundary.jsx`
- Envolver rutas principales con Error Boundaries

#### 3.3 Sin validación de respuestas API

**Solución:**
- Validar estructura de respuestas antes de usar
- Usar valores por defecto seguros

#### 3.4 Sin cancelación de peticiones

**Solución:**
- Implementar AbortController en useEffects con llamadas API
- Prevenir memory leaks en componentes desmontados

---

## Fase 4: Accesibilidad

**Rama:** `feature/fase-4-accesibilidad`  
**Prioridad:** MEDIA

### Problemas a resolver

#### 4.1 Botones sin texto accesible

**Archivos afectados:**
- `src/components/Header/Header.jsx` (botón menú)

**Solución:**
- Agregar `aria-label` descriptivos
- Agregar `aria-expanded` para estados

#### 4.2 Modales sin ARIA

**Archivos afectados:**
- Todos los modales en `src/components/*Modal/`

**Solución:**
- Agregar `role="dialog"` y `aria-modal="true"`
- Implementar trap de foco
- Devolver foco al cerrar

#### 4.3 Imágenes con alt genérico

**Solución:**
- Revisar todas las imágenes y agregar descripciones significativas

#### 4.4 Formularios sin labels

**Solución:**
- Asociar labels correctamente con inputs
- Agregar `aria-label` donde no sea posible label visible

#### 4.5 Agregar eslint-plugin-jsx-a11y

**Solución:**
- Instalar y configurar plugin de accesibilidad para ESLint

---

## Fase 5: Testing

**Rama:** `feature/fase-5-testing`  
**Prioridad:** MEDIA

### Tareas

#### 5.1 Configurar Vitest

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

#### 5.2 Tests prioritarios

1. **Servicios API:** Tests de integración con mocks
2. **Login:** Test de flujo de autenticación
3. **Componentes críticos:** Header, Footer, modales principales
4. **Utilidades:** Tests unitarios para funciones de fecha

#### 5.3 Configurar coverage

- Establecer umbral mínimo de cobertura
- Integrar con CI/CD

---

## Fase 6: TypeScript

**Rama:** `feature/fase-6-typescript`  
**Prioridad:** BAJA (mejora a largo plazo)

### Plan de migración gradual

#### 6.1 Configuración inicial

- Instalar TypeScript y tipos de React
- Configurar `tsconfig.json` con modo permisivo inicial
- Renombrar archivos gradualmente de `.jsx` a `.tsx`

#### 6.2 Orden de migración

1. **Utilidades y constantes** (`src/utils/`, `src/constants/`)
2. **Servicios API** (`src/services/`)
3. **Hooks** (`src/hooks/`)
4. **Componentes simples** (Footer, Header)
5. **Componentes complejos** (Modales, páginas)

#### 6.3 Definir interfaces

- Crear `src/types/` con interfaces para:
  - Modelos de datos (Team, Match, Notice, etc.)
  - Props de componentes
  - Respuestas de API

---

## Notas adicionales

### Problemas menores documentados

- [ ] 16 instancias de `console.log` que deberían eliminarse (Terser las elimina en build)
- [ ] Variable `_rivals` declarada pero no usada en `Teams.jsx`
- [ ] Función `_compressImage` no usada en `BirthdayModal.jsx`
- [ ] Timeout de Swiper de 500000ms (probablemente debería ser 5000ms) en `SliderBirthday.jsx`
- [ ] Imports de `React` innecesarios en React 17+ (no afecta funcionamiento)

### Lo que está bien implementado

- Lazy loading de páginas
- Code splitting configurado en Vite
- Estructura de carpetas clara
- Optimización de CSS con carga asíncrona
- Hooks personalizados para imágenes
- Componentes SEO
- Terser configurado para minificación

---

## Historial de cambios

| Fecha | Fase | Descripción |
|-------|------|-------------|
| Mar 2026 | 1 | ✅ Sanitización XSS con DOMPurify, fix Swal imports |
| - | - | Documento inicial creado |
