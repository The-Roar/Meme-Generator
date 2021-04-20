'use strict'

var gElCanvas;
var gCtx;
var gIsHighlight = true;

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d');
    addLine()
    resizeCanvas();
    // drawText(getText(), 250, 70)
    renderCanvas()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function drawText(text) {
    const memes = getGMeme()
    var counter = 0;
    memes.lines.forEach(line => {
        gCtx.lineWidth = 2;
        if (gIsHighlight && counter === memes.selectedLineIdx) {
            gCtx.shadowColor = 'white';
            gCtx.shadowBlur = 20;
        } else gCtx.shadowBlur = 0;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.fillColor;
        gCtx.font = line.size + 'px impact';
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt, 250, line.y);
        gCtx.strokeText(line.txt, 250, line.y);
        counter++;
    })
}

function renderCanvas() {
    const img = new Image();
    img.src = getMemeImgURL();
    img.onload = (() => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText();
    })
}

function onChangeMemeTxt(input) {
    const newStr = input.value;
    updateLineTxt(newStr);
    renderCanvas();
}

function onChangeImg(img) {
    updateImg(parseInt(img.id));
    renderCanvas();
}

function onChangeTxtSize(val) {
    updateTxtSize(val);
    renderCanvas();
}

function onChangeTxtPos(val) {
    updateTxtPos(val);
    renderCanvas();
}

function onChangeSelectedLine() {
    var lineTxt = changeSelectedLine();
    document.querySelector('.meme-text').value = lineTxt;
    renderCanvas();
}

function onAddLine() {
    debugger;
    var input = document.querySelector('.meme-text');
    if (input.value === '') return;
    addLine();
    input.value = '';
    renderCanvas();
}

function onRemoveLine() {
    var lineTxt = removeLine();
    document.querySelector('.meme-text').value = (lineTxt) ? lineTxt : '';
    renderCanvas();
}