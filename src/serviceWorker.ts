import { consoleLog } from 'utils/consoleLog';

export function startServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(registration => {
                consoleLog('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch((error: string) => {
                consoleLog('ServiceWorker registration failed: ', error);
            });
        });
    }
}
