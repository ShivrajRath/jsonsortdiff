/*!
  Form / application "onsubmit" handler, and analytics.
*/
var jsonabc = require("jsonabc");
var difflib = require("jsdifflib");

window.appSort = appSort;

// displaying the difference
function diffDisplay(str1, str2) {
    var display = document.getElementById("diff"),
        noDiff = document.getElementById("no-diff");

    display.innerHTML = "";

    var build = difflib.buildView({
        baseText: str1,
        newText: str2,
        // set the display titles for each resource
        baseTextName: "Base Text",
        newTextName: "New Text",
        contextSize: 500,
        inline: true
        //set inine to true if you want inline
        //rather than side by side diff
    });

    display.appendChild(build);

    display.classList.remove("h");
    location.hash = "#diff";
}

// app sorting
function appSort(ev, tid1, tid2) {
    ev.preventDefault();

    var inputStr1, inputStr2, sortStr1, sortStr2;

    inputStr1 = document.getElementById(tid1).value;
    inputStr2 = document.getElementById(tid2).value;

    try {
        sortStr1 = jsonabc.sort(inputStr1);
        sortStr2 = jsonabc.sort(inputStr2);

        document.getElementById(tid1).value = sortStr1;
        document.getElementById(tid2).value = sortStr2;

        window.setTimeout(function () {
            diffDisplay(sortStr1, sortStr2);
        });
    } catch (ex) {
        window.alert("Incorrect JSON object");
    }
}
