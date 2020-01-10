/**
 *
 *
 * @param {string} path
 * @param {string} [scope='/']
 */
const initServiceWorker = (path = window.helpersConfig.serviceWorker.path, scope = window.helpersConfig.serviceWorker.scope) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(path, { scope }).then(registration => {
            console.log('[@honzachalupa/helpers] Service worker successfully registered on scope:', registration.scope);
        }, (error) => {
            console.log('[@honzachalupa/helpers] Service worker failed to register: ', error);
        });
    }
};

const removeCachedData = () => {
    try {
        caches.keys().then(cacheKeys => {
            cacheKeys.forEach(cacheName => {
                caches.delete(cacheName);

                console.log('[@honzachalupa/helpers] Cache removed.');
            });
        }).then(() => {
            navigator.serviceWorker.getRegistrations()
                .then(registrations => {
                    registrations.forEach(registration => {
                        registration.unregister();

                        console.log('[@honzachalupa/helpers] Service worker unregistered.');
                    });
                });

            window.location.reload(true);
        });
    } catch (error) {
        console.log('[@honzachalupa/helpers] Service worker - Unable to clear the cache.', error);
    }
};

export default {
    initServiceWorker,
    removeCachedData
};
