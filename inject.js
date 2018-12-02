MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    var editor = document.getElementsByClassName("evidence-journal")[0]
    if (editor != null && document.getElementById("upload-button") == null) {
        var input = document.createElement('input');
        input.type = "file"
        input.id = "upload-input"
        input.accept = "image/png,image/gif,image/jpeg"
        editor.appendChild(input);

        var button = document.createElement("button")
        button.id = "upload-button"
        var t = document.createTextNode("Upload and Insert");
        button.appendChild(t)
        editor.appendChild(button)

    }
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
    subtree: true,
    attributes: true
    //...
});
