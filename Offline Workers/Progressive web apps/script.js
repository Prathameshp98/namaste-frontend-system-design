console.log('Service Worker Demo page loaded!'); 

// check if service worker is supported by the browser
if ('serviceWorker' in navigator) {
    // register the service worker
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('Service worker registered', registration);
        }).catch(error => {
            console.log('Service worker registration failed', error);
        });
}