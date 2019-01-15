/**
 *
 *
 * @param {string} path
 * @param {string} [scope='/']
 */
function initServiceWorker(path, scope = '/') {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(path, { scope }).then(registration => {
            console.log('Service worker successfully registered on scope:', registration.scope);
        }, (error) => {
            console.log('Service worker failed to register: ', error);
        });
    }
}

function removeCachedData() {
    if (navigator.onLine) {
        try {
            caches.keys().then(cacheKeys => {
                cacheKeys.forEach(cacheName => {
                    caches.delete(cacheName);

                    console.log('Cache removed.');
                });
            }).then(() => {
                navigator.serviceWorker.getRegistrations()
                    .then(registrations => {
                        registrations.forEach(registration => {
                            registration.unregister();

                            console.log('Service worker unregistered.');
                        });
                    });

                window.location.reload(true);
            });
        } catch (error) {
            console.log('Service worker - Unable to clear the cache.', error);
        }
    } else {
        alert('Pro update aplikace se prosím přípojte k internetu a poté akci zopakujte.');
    }
}


export default {
    initServiceWorker,
    removeCachedData
};
