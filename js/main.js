// import auth from './auth';
// import index from './index';

/**
 * Register Service Worker
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch((error) => console.error('Service worker not registered', error));
}
