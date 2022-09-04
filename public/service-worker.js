/* eslint-disable no-restricted-globals */
// self = this
const staticCacheName = 's-app-v3';
const dynamicCacheName = 'd-app-v3';

const assetUrls = [
    'index.html',
    'main.js',
    'vendors-node_modules_babel_runtime_regenerator_index_js-node_modules_babel_runtime_helpers_es-58772e.js',
    'vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Button_Button_js-n-617cac.js',
    'vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Button_Button_js-n-27193f',
];

async function cacheFirst(request) {
    let cached = await caches.match(request);
    if (cached == null) {
        cached = await fetch(request);
    }
    return cached;
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (e) {
        let cached = await cache.match(request);
        if (cached == null) {
            cached = await caches.match('/offline.html');
        }
        return cached;
    }
}

self.addEventListener('install', async () => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetUrls);
});

self.addEventListener('activate', async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter(name => name !== staticCacheName)
            .filter(name => name !== dynamicCacheName)
            .map(name => caches.delete(name)),
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;

    const url = new URL(request.url);
    if (url.origin === window.location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});
