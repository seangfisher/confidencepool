const pw = "fantasy21";

function password() {
    var password = window.prompt("Enter your password","");
    if (password != pw) {
        alert("Nice try!");
        var link = document.getElementById("manpage");
        link.setAttribute('href', 'index.html');
    } else {
        alert("Welcome Nick!");
        var link = document.getElementById("manpage");
        link.setAttribute('href', 'management.html');
    }
}