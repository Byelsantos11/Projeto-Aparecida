var navBarHeight = document.getElementById('header').clientHeight;
var posTop = true, posNotTop = false;

var scrollToElement = function (elementOffset) {
    window.scrollTo(0, elementOffset.offsetTop - navBarHeight);
};

var toggleOpacity = function (target) {
    document.getElementById(target).classList.toggle('opacity-up');
    document.getElementById(target).classList.toggle('opacity-down');
};

// Navegação para Serviços
document.getElementsByClassName('nav-link')[0].onclick = function (event) {
    event.preventDefault();
    scrollToElement(document.getElementById('features'));
};

// Navegação para Carrossel 3D
document.getElementsByClassName('nav-link')[1].onclick = function (event) {
    event.preventDefault();
    scrollToElement(document.getElementById('carousel'));
};

// Navegação para Preços
document.getElementsByClassName('nav-link')[2].onclick = function (event) {
    event.preventDefault();
    scrollToElement(document.getElementById('prices'));
};

// Opacidade do cabeçalho e botão "Voltar ao topo" ao rolar a página
window.addEventListener('scroll', function () {
    if (!window.scrollY) {
        if (!posTop) {
            toggleOpacity('header');
            toggleOpacity('go-up');
            posTop = true;
            posNotTop = false;
        }
    } else {
        if (!posNotTop) {
            toggleOpacity('header');
            toggleOpacity('go-up');
            posTop = false;
            posNotTop = true;
        }
    }
});

// Voltar ao topo
document.getElementById('go-up').onclick = function () {
    window.scroll(0, 0);
};

// Código do carrossel 3D
var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 120;
var imgHeight = 170;
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true;

setTimeout(init, 100);
var obox = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
}

function applyTransform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;

if (autoRotate) {
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

if (bgMusicURL) {
    document.getElementById('music-container').innerHTML += 
    `<audio src="${bgMusicURL}" ${bgMusicControls ? 'controls' : ''} autoplay loop>
        <p>Se você está lendo isso, é porque seu navegador não suporta o elemento de áudio.</p>
    </audio>`;
}

document.onpointerdown = function (e) {
    clearInterval(obox.timer);
    e = e || window.event;
    var sX = e.clientX, sY = e.clientY;

    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX, nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(obox);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        obox.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTransform(obox);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(obox.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};

document.onmousewheel = function (e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};

  