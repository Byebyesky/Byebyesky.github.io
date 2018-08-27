const buttons = [
    document.getElementById('button-index'),
    document.getElementById('button-blog'),
    document.getElementById('button-projects'),
    document.getElementById('button-about'),
    document.getElementById('button-contact')
];

const pages = [
    "pages/home.html",
    "pages/blog.html",
    "pages/projects.html",
    "pages/about.html",
    "pages/contact.html"
];

const contentArea = document.getElementById("content");

function httpGetAsync(theUrl, callback)
{
    const Http = new XMLHttpRequest();
    Http.open("GET", theUrl);
    Http.send();
    Http.onreadystatechange = function() { 
        if (Http.readyState == 4 && Http.status == 200)
        callback(contentArea, Http.responseText);
        else
        callback(contentArea, 
            "<p>Can't retrieve page: " + Http.status + 
            "<br>Please contact the admin of the page!</p>" );    
      }
}

function setContent(target, content) {
    target.innerHTML = content;
}

function resetAllButtons() {
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].className = "button";
    }
}

function loadPage(index) {
    if(buttons[index].className !== "button active"){
        resetAllButtons();
        buttons[index].className += " active";
        httpGetAsync(pages[index], setContent);
    }
}

function init() {
    loadPage(0);
    buttons[0].addEventListener('click', function() {loadPage(0);} );
    buttons[1].addEventListener('click', function() {loadPage(1);} );
    buttons[2].addEventListener('click', function() {loadPage(2);} );
    buttons[3].addEventListener('click', function() {loadPage(3);} );
    buttons[4].addEventListener('click', function() {loadPage(4);} );
}

init();