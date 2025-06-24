const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);

        if (!response.ok) {
            if (response.status >= 400 && response.status < 500) {
                throw Error(`Client error: ${response.status} ${response.statusText}`);
            } else if (response.status >= 500) {
                throw Error(`Server error: ${response.status} ${response.statusText}`);
            } else {
                throw Error(`Unexpected error: ${response.status} ${response.statusText}`);
            }
        }
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
};

export default apiRequest;
