export const debounce = (callback, delay) => {
    let timeout;
    
    return (...args) => {
        let that = this;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback.call(that, ...args);
        }, delay)
    }
}

export const throttle = (callback, timeout) => {

}