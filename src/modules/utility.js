import { format, compareAsc, toDate, parseISO } from 'date-fns';

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
        if (!isInputValidationCorrect(el)) {
            el.setCustomValidity(
                `This input must be at least ${el.minLength} characters!`
            );
            el.reportValidity();
        } else {
            el.setCustomValidity('');
        }
    }

    // Checks the input's validation
    function isInputValidationCorrect(el) {
        if (el.validity.tooShort || el.value === '') {
            return false;
        } else return true;
    }
    return {
        formatDate,
        createElementWithClass,
        isInputValidationCorrect,
        showInputValidationError,
    };
})();

export default utilityFunctions;
