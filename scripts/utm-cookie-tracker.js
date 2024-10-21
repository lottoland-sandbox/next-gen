// UTM Cookie Library
var UTMCookieTracker = (function() {
    // Function to set a cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + (value || "") + ";" + expires + ";path=/";
    }

    // Public function to set UTM cookies
    function setUTMCookies() {
        // Get the URL parameters
        const urlParams = new URLSearchParams(window.location.search);

        // Define the parameters you want to track
        const parametersToTrack = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_term', 'dest', 'dept'];

        // Set cookies for each parameter
        parametersToTrack.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                setCookie(param, value, 30); // Set cookie for 30 days
            }
        });
    }

    // Expose the public method
    return {
        setUTMCookies: setUTMCookies
    };
})();


