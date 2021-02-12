"use strict";
function closure() {
    var arr = [
        { id: 1, title: "carpenter" },
        { id: 2, title: "teacher" },
        { id: 3, title: "programmer" }
    ];
    function add(title) {
        arr.push({ id: arr[arr.length - 1].id + 1, title: title });
        return arr;
    }
    function remove(id) {
        arr = arr.filter(function (el) { return el.id !== id; });
        return arr;
    }
    function getObjects() {
        return arr.sort(function (a, b) { return a.id - b.id; });
    }
    return [add, remove, getObjects];
}
var _a = closure(), add = _a[0], remove = _a[1], getObjects = _a[2];
add("actor");
add("manager");
remove(2);
add("firefighter");
remove(5);
add("mentor");
remove(4);
console.log(getObjects());
//# sourceMappingURL=closure.js.map