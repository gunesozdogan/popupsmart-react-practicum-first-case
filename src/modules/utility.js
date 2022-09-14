import { format, compareAsc } from "date-fns";

const utilityFunctions = (function () {
    function formatDate(date, type) {
        return format(new Date(date), type);
    }

    function createElementWithClass(el, className) {
        const element = document.createElement(el);
        element.classList.add(className);
        return element;
    }

    return { formatDate, createElementWithClass };
})();

export default utilityFunctions;
