// Configuraciones de optimización por tipo de imagen
export const IMAGE_CONFIGS = {
  logo: {
    quality: 85,
    format: 'auto',
    sizes: '140px'
  },
  socialIcon: {
    quality: 80,
    format: 'auto',
    sizes: '32px'
  },
  teamLogo: {
    quality: 75,
    format: 'auto',
    sizes: '30px'
  },
  newsCard: {
    quality: 70,
    format: 'auto',
    crop: 'fill',
    sizes: '(max-width: 768px) 100vw, 356px'
  },
  newsModal: {
    quality: 80,
    format: 'auto',
    sizes: '(max-width: 768px) 90vw, 800px'
  },
  birthday: {
    quality: 75,
    format: 'auto',
    crop: 'fill',
    sizes: '120px'
  },
  sponsor: {
    quality: 70,
    format: 'auto',
    sizes: '(max-width: 768px) 50vw, 105px'
  }
};

// Función para transformar URLs de Cloudinary
export const transformCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'limit',
    dpr = 'auto'
  } = options;

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  let transformations = [
    `f_${format}`,
    `q_${quality}`,
    `dpr_${dpr}`,
    `c_${crop}`
  ];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
};