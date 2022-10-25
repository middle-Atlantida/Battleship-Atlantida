import { config } from '../../config';

const {BASE_PATH} = config;

export const makeRoutePath = (path: string) => `${BASE_PATH}${path}`;
