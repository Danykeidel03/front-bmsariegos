/**
 * Utility for lazy loading heavy JavaScript libraries
 * Reduces initial bundle size by loading libraries only when needed
 */

let swalInstance = null;
let reactImageCropInstance = null;

/**
 * Lazy loads SweetAlert2 library
 * @returns {Promise} - Resolves with Swal instance
 */
export const loadSweetAlert = async () => {
  if (swalInstance) {
    return swalInstance;
  }
  
  const { default: Swal } = await import('sweetalert2');
  swalInstance = Swal;
  return swalInstance;
};

/**
 * Lazy loads react-image-crop library
 * @returns {Promise} - Resolves with ReactCrop component and CSS
 */
export const loadReactImageCrop = async () => {
  if (reactImageCropInstance) {
    return reactImageCropInstance;
  }
  
  const [ReactCropModule] = await Promise.all([
    import('react-image-crop'),
    import('react-image-crop/dist/ReactCrop.css')
  ]);
  
  reactImageCropInstance = ReactCropModule;
  return reactImageCropInstance;
};

/**
 * Preloads a library for faster subsequent use
 * @param {string} libraryName - Name of the library to preload
 */
export const preloadLibrary = (libraryName) => {
  switch (libraryName) {
    case 'sweetalert2':
      import('sweetalert2');
      break;
    case 'react-image-crop':
      import('react-image-crop');
      break;
    default:
      console.warn(`Unknown library: ${libraryName}`);
  }
};

/**
 * Shows a simple loading alert using native browser features
 * Can be used as fallback while SweetAlert2 loads
 * @param {string} message - Message to display
 */
export const showNativeLoading = (message = 'Cargando...') => {
  const loading = document.createElement('div');
  loading.id = 'native-loading';
  loading.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 20px 40px;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
  `;
  content.textContent = message;
  
  loading.appendChild(content);
  document.body.appendChild(loading);
  
  return () => {
    const el = document.getElementById('native-loading');
    if (el) el.remove();
  };
};

/**
 * Shows a confirmation dialog with lazy-loaded SweetAlert2
 * Falls back to native confirm if needed
 * @param {Object} options - SweetAlert2 options
 */
export const showConfirm = async (options) => {
  try {
    const Swal = await loadSweetAlert();
    return await Swal.fire({
      title: options.title || '¿Estás seguro?',
      text: options.text || '',
      icon: options.icon || 'warning',
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || 'Sí',
      cancelButtonText: options.cancelButtonText || 'Cancelar',
      ...options
    });
  } catch (error) {
    // Fallback to native confirm
    const result = window.confirm(`${options.title}\n${options.text}`);
    return { isConfirmed: result };
  }
};

/**
 * Shows an alert with lazy-loaded SweetAlert2
 * Falls back to native alert if needed
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {string} icon - Alert icon type
 */
export const showAlert = async (title, message, icon = 'info') => {
  try {
    const Swal = await loadSweetAlert();
    return await Swal.fire(title, message, icon);
  } catch (error) {
    // Fallback to native alert
    window.alert(`${title}\n${message}`);
    return { isConfirmed: true };
  }
};
