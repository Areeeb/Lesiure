function getname() {
    alert();
    var imageFiles = document.getElementById("fld1"),
    filesLength = imageFiles.files.length;
    for (var i = 0; i < filesLength; i++) {
        alert(imageFiles.files[i].name);
    }
}