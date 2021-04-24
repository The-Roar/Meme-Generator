'use strict'

var gElCanvas;
var gCtx;
var gIsGallery = true;
var gIsDownloading = false;

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d');
    renderGallery()
    addLine()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function renderGallery() {
    const imgs = getGImgs();
    var strHtml = '';
    var count = 0;
    imgs.forEach(img => {
        strHtml += `<img src='${imgs[count].url}' id='${count + 1}' class='gallery-img' onclick='onSelectImg(this)'></img>`;
        count++;
    })
    var elGalleryGrid = document.querySelector('.gallery-grid');
    elGalleryGrid.innerHTML = strHtml;
    document.querySelector('.control-grid').classList.add('hidden');
    document.querySelector('canvas').classList.add('hidden');
    document.querySelector('.gallery-container').classList.remove('hidden');
    gIsGallery = true;
}

function drawText() {
    const memes = getGMeme()
    var counter = 0;
    memes.lines.forEach(line => {
        gCtx.lineWidth = 2;
        if (!gIsDownloading && counter === memes.selectedLineIdx) {
            gCtx.shadowColor = '#ff7f00';
            gCtx.shadowBlur = 20;
        } else gCtx.shadowBlur = 0;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.fillColor;
        gCtx.font = line.size + 'px impact';
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
        counter++;
    })
}

function onSelectImg(img) {
    changeImg(parseInt(img.id));
    resizeCanvas();
    renderCanvas();
}

function renderCanvas() {
    // console.log('Yo!')
    const img = new Image();
    img.src = getMemeImgURL();
    img.onload = (() => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText();
        if (gIsDownloading) {
            gIsDownloading = false;
            var link = document.createElement('a');
            link.download = 'meme.jpg';
            link.href = gElCanvas.toDataURL();
            link.click();
        }
    })
    if (gIsGallery) {
        document.querySelector('.gallery-container').classList.add('hidden');
        document.querySelector('canvas').classList.remove('hidden');
        document.querySelector('.control-grid').classList.remove('hidden');
        gIsGallery = false;
    }
}

function onReturn() {
    if (gIsGallery) return;
    renderGallery()
}

function onChangeMemeTxt(input) {
    const newStr = input.value;
    updateLineTxt(newStr);
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

function onChangeTxtAlign(alignment) {
    changeTxtAlign(alignment)
    renderCanvas();
}

function onChangeTxtStroke(color) {
    changeTxtStroke(color);
    renderCanvas();
}

function onChangeTxtFill(color) {
    changeTxtFill(color);
    renderCanvas();
}

function onChangeSelectedLine() {
    var lineState = changeSelectedLine()
    document.querySelector('.txt-input').value = lineState.txt;
    document.querySelector('.txt-color-stroke').value = lineState.stroke;
    document.querySelector('.txt-color-fill').value = lineState.fill;
    renderCanvas();
}

function onAddLine() {
    var input = document.querySelector('.txt-input');
    if (input.value === '') return;
    addLine();
    input.value = '';
    renderCanvas();
}

function onRemoveLine() {
    var lineTxt = removeLine();
    document.querySelector('.txt-input').value = (lineTxt) ? lineTxt : '';
    renderCanvas();
}

function onDownload() {
    gIsDownloading = true;
    renderCanvas();
    renderCanvas();
}