# Corrección de Enlaces No Rastreables

## Problemas Identificados y Solucionados

### 1. Enlaces sin href
- **Problema**: Enlaces `<a class="logoLink">` sin atributo `href`
- **Solución**: Añadido `href` con URL del patrocinador o `#` como fallback

### 2. Enlaces sin texto descriptivo
- **Problema**: Enlaces solo con imágenes, sin texto accesible
- **Solución**: Añadido `aria-label` y `<span class="sr-only">` con texto descriptivo

## Componentes Corregidos

### BrandSlider
```jsx
// Antes
<a className='logoLink'>
  <img src={sponsor.photoName} alt={sponsor.name} />
</a>

// Después  
<SEOLink 
  className='logoLink'
  href={sponsor.website}
  external={!!sponsor.website}
  ariaLabel={`Visitar sitio web de ${sponsor.name}`}
>
  <img src={sponsor.photoName} alt={sponsor.name} />
  <span className="sr-only">{sponsor.name}</span>
</SEOLink>
```

### Header
```jsx
// Antes
<li>Entradas</li>

// Después
<li><a href="#entradas" aria-label="Información sobre entradas">Entradas</a></li>
```

## Componentes Creados

### SEOLink
Componente reutilizable para enlaces SEO-friendly:
- Manejo automático de enlaces externos (`target="_blank"`, `rel="noopener noreferrer"`)
- `aria-label` automático basado en contenido
- Fallback a `#` si no se proporciona href

### Estilos de Accesibilidad
- `.sr-only`: Texto visible solo para lectores de pantalla
- Focus visible para navegación por teclado
- Estilos para enlaces sin href

## Beneficios SEO

1. **Rastreabilidad**: Todos los enlaces tienen `href` válido
2. **Accesibilidad**: Texto descriptivo para lectores de pantalla  
3. **UX**: Enlaces externos se abren en nueva pestaña
4. **Navegación**: Focus visible para usuarios de teclado

## Uso Recomendado

```jsx
// Para enlaces internos
<SEOLink href="/contacto">Contacto</SEOLink>

// Para enlaces externos
<SEOLink href="https://example.com" external>
  Sitio Externo
</SEOLink>

// Con aria-label personalizado
<SEOLink href="/info" ariaLabel="Información detallada">
  <img src="icon.png" alt="Info" />
</SEOLink>
```