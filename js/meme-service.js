'use strict'

var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['trump']},
    {id: 2, url: 'img/2.jpg', keywords: ['dog']},
    {id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby']},
    {id: 4, url: 'img/4.jpg', keywords: ['cat']},
    {id: 5, url: 'img/5.jpg', keywords: ['baby']},
    {id: 6, url: 'img/6.jpg', keywords: ['history', 'aliens']},
    {id: 7, url: 'img/7.jpg', keywords: ['baby']},
    {id: 8, url: 'img/8.jpg', keywords: ['willy wonka']},
    {id: 9, url: 'img/9.jpg', keywords: ['baby']},
    {id: 10, url: 'img/10.jpg', keywords: ['obama']},
    {id: 11, url: 'img/11.jpg', keywords: ['kiss']},
    {id: 12, url: 'img/12.jpg', keywords: ['you']},
    {id: 13, url: 'img/13.jpg', keywords: ['toast', 'dicaprio']},
    {id: 14, url: 'img/14.jpg', keywords: ['matrix', 'morpheus']},
    {id: 15, url: 'img/15.jpg', keywords: ['simply']},
    {id: 16, url: 'img/16.jpg', keywords: ['picard']},
    {id: 17, url: 'img/17.jpg', keywords: ['putin']},
    {id: 18, url: 'img/18.jpg', keywords: ['toy']}
];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'This is text',
            size: 20,
            align: 'center',
            color: 'red'
        }
    ]
}

function getGMeme() {
    return gMeme;
}

function getImg(imgId) {
    const imgIdx = gImgs.findIndex((img) => img.id === imgId);
    return gImgs[imgIdx];
}