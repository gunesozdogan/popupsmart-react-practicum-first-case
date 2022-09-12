import { format, compareAsc } from "date-fns";

const utilityFunctions = (function () {
    function formatDate(date) {
        return format(new Date(date), "EEE do MMM yyyy");
    }

    function createElementWithClass(el, className) {
        const element = document.createElement(el);
        element.classList.add(className);
        return element;
    }

    return { formatDate, createElementWithClass };
})();

export default utilityFunctions;
