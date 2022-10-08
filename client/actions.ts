import store from "./utils/infrastructure/store";

export const pure = {};
export const bound = store.bindActions(pure);
