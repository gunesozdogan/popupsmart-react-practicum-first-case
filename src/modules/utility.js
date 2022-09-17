import { format, compareAsc, toDate, parseISO, formatDistance } from 'date-fns';

const utilityFunctions = (function () {
    function formatDate(date, type) {
        return format(new Date(date), type);
    }

    function createElementWithClass(el, properties) {
        const element = document.createElement(el);
        // Sets the properties of element in properties object
        for (let [key, val] of Object.entries(properties)) {
            if (key === 'event')
                element.addEventListener(
                    properties.event.type,
                    properties.event.functionName
                );
            else element[key] = val;
        }

        return element;
    }

    // Displays input validation error
    function showInputValidationError(el) {
        if (!isValid(el)) {
            el.setCustomValidity(
                `This input must be at least ${el.minLength} characters and cannot include spaces!`
            );
            el.reportValidity();
        } else {
            el.setCustomValidity('');
        }
    }

    // Checks the input's validation
    function isValid(el) {
        if (el.validity.tooShort || el.value === '' || el.value.includes(' ')) {
            return false;
        } else return true;
    }

    return {
        formatDate,
        createElementWithClass,
        isValid,
        showInputValidationError,
    };
})();

export default utilityFunctions;
