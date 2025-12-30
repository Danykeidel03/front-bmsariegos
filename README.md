# 🏐 BM Sariegos - Frontend

Web oficial del Club de Balonmano Sariegos en León.

## 🚀 Tecnologías

- **React 19** - Framework principal
- **Vite 7** - Build tool y dev server
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Swiper** - Carruseles
- **SweetAlert2** - Modales y alertas
- **Cloudinary** - Optimización de imágenes

## 📦 Instalación

```bash
# Clonar repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://back-bmsariegos-production.up.railway.app
VITE_API_KEY=tu-api-key-aqui
VITE_API_TIMEOUT=5000
```

**⚠️ IMPORTANTE**: Nunca subir el archivo `.env` a git. Usa `.env.example` como plantilla.

## 🛠️ Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Preview del build
npm run lint       # Linter ESLint
npm run optimize-images  # Optimizar imágenes
```

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/          # Páginas/Rutas
├── services/       # API services
├── hooks/          # Custom hooks
├── styles/         # Estilos globales
└── utils/          # Utilidades
```

## 🔒 Seguridad

- ✅ Variables de entorno para credenciales
- ✅ API key protegida
- ✅ Console.log eliminados en producción
- ✅ Terser configurado para ofuscar código

## 🚀 Deploy

El proyecto está configurado para Vercel:

```bash
npm run build
# Deploy automático en push a main
```

## 📝 Licencia

© 2025 Club Balonmano Sariegos

---

## 🤝 Contribuir

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request
