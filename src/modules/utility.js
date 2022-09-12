import { format, compareAsc } from "date-fns";

const utilityFunctions = (function () {
    function formatDate(date) {
        return format(new Date(date), "EEE do MMM yyyy");
    }
    return { formatDate };
})();

export default utilityFunctions;
