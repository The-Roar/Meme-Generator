'use strict'

var gImgs = [];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: []
}

function getGImgs() {
    if (!gImgs.length) {
        for (var i = 1; i <= 18; i++) {
            gImgs.push({
                id: i,
                url: 'img/' + i + '.jpg'
            })
        }
    }
    return gImgs;
}

function getMemeImgURL() {
    const imgIdx = gImgs.findIndex((img) => img.id === gMeme.selectedImgId);
    return gImgs[imgIdx].url;
}

function getGMeme() { return gMeme }

function updateLineTxt(newStr) {
    if (!gMeme.lines.length) addLine();
    gMeme.lines[gMeme.selectedLineIdx].txt = newStr;
}

function changeImg(newImgId) {
    gMeme.selectedImgId = newImgId;
}

function updateTxtSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val;
}

function updateTxtPos(val) {
    gMeme.lines[gMeme.selectedLineIdx].y += val;
    console.log(gMeme.lines[gMeme.selectedLineIdx].y)
}

function changeTxtAlign(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignment;
}

function changeTxtStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function changeTxtFill(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

function changeSelectedLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
    var lineState = {
        txt: gMeme.lines[gMeme.selectedLineIdx].txt,
        stroke: gMeme.lines[gMeme.selectedLineIdx].strokeColor,
        fill: gMeme.lines[gMeme.selectedLineIdx].fillColor
    }
    return lineState;
}

function addLine() {
    if (!gMeme.lines.length) var yPos = 45;
    else if (gMeme.lines.length === 1) var yPos = 615;
    else if (gMeme.lines.length > 1) var yPos = 320;
    gMeme.lines.push({
        txt: '',
        size: 30,
        align: 'center',
        fillColor: '#ffffff',
        strokeColor: '#000000',
        x: 320,
        y: yPos
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.selectedLineIdx > 0) {
        gMeme.selectedLineIdx--;
        return gMeme.lines[gMeme.selectedLineIdx].txt;
    }
}