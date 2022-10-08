import config from "../../config/config";

const {BASE_PATH} = config;

export default (path: string) => `${BASE_PATH}${path}`;
