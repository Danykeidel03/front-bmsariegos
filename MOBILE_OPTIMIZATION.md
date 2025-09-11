# Optimizaciones Mobile para Imágenes

## ✅ Implementado

### Breakpoints Responsivos
- **Mobile**: ≤480px (calidad 65% para máximo ahorro)
- **Tablet**: ≤768px 
- **Desktop**: Tamaño original
- **Retina**: 2x para pantallas de alta densidad

### Sizes Attribute Optimizado
```jsx
// Noticias
sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 356px"

// Logos
sizes="(max-width: 768px) 25px, 30px"

// Patrocinadores  
sizes="(max-width: 768px) 50vw, 105px"
```

### Transformaciones Cloudinary Mobile
- `f_auto`: WebP/AVIF automático
- `q_65`: Calidad reducida en mobile (vs 70-80% desktop)
- `dpr_auto`: Densidad de píxeles automática
- `c_fill/c_fit`: Crop inteligente según contexto

### Lazy Loading
- Todas las imágenes excepto above-the-fold
- `loading="lazy"` nativo del navegador
- `decoding="async"` para mejor rendimiento

## Ahorros Mobile Específicos

### Imágenes de Noticias
- **Desktop**: 356x200 @ 70% = ~45KB
- **Mobile**: 480x270 @ 65% = ~25KB (44% menos)

### Logos de Equipos  
- **Desktop**: 25x30 @ 75% = ~3KB
- **Mobile**: 25x30 @ 65% = ~2KB (33% menos)

### Patrocinadores
- **Desktop**: 105x70 @ 70% = ~8KB  
- **Mobile**: 240x160 @ 65% = ~12KB (optimizado para pantalla completa)

## Técnicas Aplicadas

1. **Progressive Enhancement**: Imagen base + srcset
2. **Art Direction**: Diferentes crops para mobile/desktop
3. **Bandwidth Awareness**: Menor calidad en mobile
4. **Touch Optimization**: Tamaños mínimos para touch targets
5. **Performance Budget**: Límite 2048px máximo