/*!
  Form / application "onsubmit" handler, and analytics.
*/

var jsonabc = require('jsonabc');
var JsDiff = require('diff');

window.appSort = appSort;

// displaying the difference
function diffDisplay(str1, str2) {
  var diff = JsDiff.diffChars(str1, str2),
    display = document.getElementById('diff'),
    noDiff = document.getElementById('no-diff'),
    fragment = document.createDocumentFragment();

  diff.forEach(function (part) {
    // green for additions, red for deletions
    // grey for common parts
    color = part.added ? 'green' :
      part.removed ? 'red' : 'grey';
    span = document.createElement('span');
    span.style.color = color;
    span.appendChild(document
      .createTextNode(part.value));
    fragment.appendChild(span);
  });

  display.innerHTML = '';

  if (diff.length === 1 && !diff.removed && !diff.added) {
    noDiff.classList.remove('h');
    display.classList.add('h');
  } else {
    noDiff.classList.add('h');
    display.classList.remove('h');
  }

  display.appendChild(fragment);

  display.classList.remove('h');
  location.hash = '#diff';
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

    diffDisplay(sortStr1, sortStr2);
  } catch (ex) {
    window.alert('Incorrect JSON object');
  }
}

/* eslint-disable */
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-58536835-1', 'auto');
ga('send', 'pageview');
/* eslint-enable */