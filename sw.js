self.addEventListener('install', (event) => {
	console.log('SW installed');
});

self.addEventListener('activate', (event) => {
	console.log('SW Activated');
});

self.addEventListener('fetch', (event) => {
	console.log('SW fetching');
});
