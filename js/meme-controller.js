'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    renderImg()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderImg() {
    const img = new Image();
    const imgId = getGMeme().selectedImgId;
    img.src = getImg(imgId).url;
    img.onload = (()=>{
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    })
}