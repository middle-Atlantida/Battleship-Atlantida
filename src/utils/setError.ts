export const setError = (error: unknown, callback: (arg: string) => void) => {
    if (error instanceof Error) {
        callback(error.message);
    } else {
        callback(`Unknown error: ${error}`);
    }
};
