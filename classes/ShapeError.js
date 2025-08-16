
/**
 * Custom error class for shape-related errors.
 * Extends the native Error class.
 */
export class ShapeError extends Error {

    /**
     * Creates a new ShapeError.
     * 
     * @param {string} message - Description of the error.
     * @param {Error} [cause] - The original error that caused this error (optional).
     */
    constructor(message, cause) {
        if (cause === undefined) {
            super(message);
        }
        else {
            super(message, cause);
        }
        this.name = 'ShapeError';
    }
}