const buttons = [
    document.getElementById('button-index'),
    document.getElementById('button-blog'),
    document.getElementById('button-projects'),
    document.getElementById('button-about'),
    document.getElementById('button-contact')
];

const contentArea = document.getElementById("content");

const pages = [
    "pages/home.html",
    "pages/blog.html",
    "pages/projects.html",
    "pages/about.html",
    "pages/contact.html"
];

function httpGetAsync(theUrl, callback)
{
    const Http = new XMLHttpRequest();
    Http.open("GET", theUrl);
    Http.send();
    Http.onreadystatechange = function() { 
        if (Http.readyState == 4 && Http.status == 200)
        callback(contentArea, Http.responseText);
      }
}

function setContent(target, content) {
    target.innerHTML = content;
}

function resetAll() {
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].className = "button";
    }
}

function loadPage(index) {
    resetAll();
    buttons[index].className += " active";
    httpGetAsync(pages[index], setContent);
}

function gibVal(i) {
    return i;
}

loadPage(0);

buttons[0].addEventListener('click', function() {
    loadPage(0);
} );

buttons[1].addEventListener('click', function() {
    loadPage(1);
} );

buttons[2].addEventListener('click', function() {
    loadPage(2);
} );

buttons[3].addEventListener('click', function() {
    loadPage(3);
} );

buttons[4].addEventListener('click', function() {
    loadPage(4);
} );