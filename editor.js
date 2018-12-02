// ==UserScript==
// @author Jacob Schoen
// ==/UserScript==
function myAlert() {
    //alert("Extension has Ran");
}

window.addEventListener("pageLoadTransition", myAlert);

var s = document.createElement('script');
s.src = chrome.extension.getURL('inject.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

//still have to load this one for direct page loads
myAlert();
