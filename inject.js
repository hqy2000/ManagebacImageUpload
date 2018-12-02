function inject() {
    var editor = document.getElementsByClassName("evidence-journal")[0] || document.getElementsByClassName("evidence_body")[0]
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

        $("#upload-button").on('click', (e) => {
            e.preventDefault()
            var file_data = $('#upload-input').prop('files')[0];
            if (file_data == null) {
                alert("You must select an image.")
                return
            }
            var form_data = new FormData();
            form_data.append('smfile', file_data);
            $.ajax({
                url: 'https://sm.ms/api/upload', // point to server-side controller method
                dataType: 'json', // what to expect back from the server
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: (json) => {
                    let image = document.createElement("img")
                    image.src = json.data.url
                    let editor = document.getElementsByClassName("redactor-in-0")[0] || document.getElementsByClassName("redactor-in-1")[0]
                    if (editor == null) {
                        console.log("Insert failed.")
                    } else {
                        editor.append(image)
                        input.value = ""
                    }
                },
                error: (response) => {
                    alert("Upload failed.")
                }
            });
        })

    }
}
$(document).ready(() => {
    inject()
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let observer = new MutationObserver(function(mutations, observer) {
    inject()
});
observer.observe(document, {
    subtree: true,
    attributes: true
});
