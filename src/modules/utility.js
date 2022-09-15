import { format, compareAsc, toDate, parseISO } from 'date-fns';

const utilityFunctions = (function () {
    function formatDate(date, type) {
        return format(new Date(date), type);
    }

    function createElementWithClass(el, className) {
        const element = document.createElement(el);

        if (typeof className !== 'string') element.classList.add(...className);
        else element.classList.add(className);
        return element;
    }

    function convertToDate(dateStr) {
        return parseISO(dateStr);
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
        convertToDate,
        isInputValidationCorrect,
        showInputValidationError,
    };
})();

export default utilityFunctions;
