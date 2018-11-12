let editor = document.getElementById("editor");
let slider = document.getElementById("myRange")
let slidervalue = document.getElementById("slidervalue");
let lineNumber = document.getElementById("linenumber");
let numberOfLines = occurrences(editor.innerHTML, "<br>", false);
let keywordList = ["do", "while", "return", "for", "if"];

editor.innerHTML =
  localStorage["text"] || "Your text"; // default text


function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateLines() {
    let lineNumberHTML = "1";
    newNumberOfLines = occurrences(editor.innerText, "\n", false);
    if(numberOfLines == 0) {
        lineNumber.innerHTML = lineNumberHTML;
    } 
    if(newNumberOfLines >= 1 && newNumberOfLines !== numberOfLines) {
        for(let i = 2; i <= newNumberOfLines; i++){
            lineNumberHTML += `<br>${i}`;
        }
        numberOfLines = newNumberOfLines;
        lineNumber.innerHTML = lineNumberHTML;
    }
}

function saveText() {
    localStorage["text"] = editor.innerHTML; // content div
}

function colorWord() {
    let content = editor.innerHTML;
    for(let i = 0; i < keywordList.length; i++) {
        content = content.replace(`${keywordList[i]} `, `<span class="keyword">${keywordList[i]} </span>`);
    }
    console.log(content);
    document.execCommand("selectAll", false);
    document.execCommand("insertHTML", false, content);
}

function changeTextSize() {
    slidervalue.value = slider.value
    editor.style.fontSize = `${slider.value}px`;
    editor.style.minHeight = `${slider.value}px`;
    editor.style.minWidth = `${slider.value}px`;
    lineNumber.style.fontSize = `${slider.value}px`;
    lineNumber.style.minHeight = `${slider.value}px`;
    lineNumber.style.minWidth = `${slider.value}px`;
}

function setup() {
    document.getElementById('save-btn').onclick = saveText;
    document.getElementById('test').onclick = colorWord;

    editor.onkeydown = async function(e) {
        if(e.key == "Enter" ) { e.preventDefault(); document.execCommand("insertText", false, "\n"); await sleep(1); updateLines();}
        else if(e.key == "Backspace" || e.key == "Delete") {  await sleep(1);  updateLines(); }
    }
    editor.onkeyup = function() {if(editor.innerHTML == "" || editor.innerHTML == "<br>") {editor.innerHTML = "<br>";}}
    editor.oncut = async function(e) { await sleep(1); updateLines(); }
    
    //Handle pasting properly
    editor.onpaste = async function(e) { 
        e.preventDefault();
        let text = (e.originalEvent || e).clipboardData.getData('text/plain');
        text.replace(/\n/g, "<br>");
        document.execCommand("insertText", false, text);
        await sleep(1); updateLines();
    }

    //Handle font resize
    slidervalue.onkeydown = function(e) {
        if(e.keyCode == 13) { e.preventDefault(); if(slidervalue.value !== "") {slider.value = slidervalue.value;} changeTextSize(); };
    }
    slidervalue.onchange = function() { if(slidervalue.value !== "") {slider.value = slidervalue.value;} changeTextSize(); };
    slider.oninput = changeTextSize;

    //init
    changeTextSize();
    updateLines();
    
}

setup();
