import './global.d';

declare global {
    namespace Express {
        interface Request {
            /** Logger instance associated with current request */
            logger: () => void;
            csrfToken: () => string;
        }

        interface Response {

            /**
             * Renders bundle to html, then sends it
             * or performs redirect if necessary
             */
            // tslint:disable-next-line:no-any
            renderBundle(bundleName: string, data?: AppData): void;
        }
    }
}
