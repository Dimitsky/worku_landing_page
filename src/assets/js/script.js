

// Заменяет заглушку на плеер youtube
function createIframe( div ) {
    let iframe = document.createElement( 'iframe' );

    iframe.classList.add( 'video-player__iframe' );
    iframe.setAttribute( 'src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1&rel=0' );
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    div.parentNode.replaceChild(iframe, div);
}

// Добавляет заглушку для плеера youtube
function initYouTubeVideo( playerEl ) {
    // Получаем id ролика, ссылку на превью и создаем контейнер
    let id = playerEl.dataset.id;
    let thumbnail = playerEl.dataset.thumbnail;
    let divNode = document.createElement( 'div' );

    divNode.classList.add( 'video-player' );
    divNode.setAttribute( 'data-id', id );
    divNode.style.backgroundImage = 'url(\'THUMBNAIL\')'.replace( 'THUMBNAIL', thumbnail );

    // Создаем иконку для кнопки play
    let svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let useNode = document.createElementNS("http://www.w3.org/2000/svg", "use");

    svgNode.classList.add( 'video-player__icon' );
    svgNode.setAttribute( 'viewBox', '0 0 22 26' );
    useNode.setAttribute( 'href', 'assets/img/defs.svg#play' );
    svgNode.appendChild( useNode );

    // Кнопка плеер
    let playBtn = document.createElement( 'button' );

    playBtn.className = 'reset-button video-player__play-button';
    // При нажатии на кнопку play - заменить заглушку на плеер youtube
    playBtn.addEventListener( 'click', function() {
        createIframe( divNode );
    } );
    playBtn.appendChild( svgNode );
    divNode.appendChild( playBtn );
    playerEl.parentNode.replaceChild( divNode, playerEl );
}

initYouTubeVideo( document.querySelector( '.video-player' ) );