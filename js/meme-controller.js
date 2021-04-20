'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d');
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
    const lines = getLines()
    lines.forEach(line => {
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.fillColor;
        gCtx.font = line.size + 'px impact';
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt, 250, line.y);
        gCtx.strokeText(line.txt, 250, line.y);
    })
}

function renderCanvas() {
    const img = new Image();
    img.src = getMemeImgURL();
    img.onload = (() => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText()
    })
}

function onMemeTxtChange(input) {
    const newStr = input.value;
    updateLineTxt(newStr)
    renderCanvas()
}

function onImgChange(img) {
    updateImg(parseInt(img.id));
    renderCanvas();
}