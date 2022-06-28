

function createIframe( div ) {
    let iframe = document.createElement( 'iframe' );

    iframe.setAttribute( 'src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1&rel=0' );
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    div.parentNode.replaceChild(iframe, div);
}

function initYouTubeVideo( playerEl ) {
    // 
    let id = playerEl.dataset.id;
    let thumbnail = playerEl.dataset.thumbnail;
    let divNode = document.createElement( 'div' );

    divNode.classList.add( 'video-player__container' );
    divNode.setAttribute( 'data-id', id );
    divNode.style.backgroundImage = 'url(\'THUMBNAIL\')'.replace( 'THUMBNAIL', thumbnail );

    // 
    let svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let useNode = document.createElementNS("http://www.w3.org/2000/svg", "use");

    svgNode.classList.add( 'video-player__icon' );
    svgNode.setAttribute( 'viewBox', '0 0 22 26' );
    useNode.setAttribute( 'href', 'assets/img/defs.svg#play' );
    svgNode.appendChild( useNode );

    // 
    let playBtn = document.createElement( 'button' );

    playBtn.className = 'reset-button video-player__play-button';
    playBtn.addEventListener( 'click', function() {
        createIframe( playerEl );
    } );
    playBtn.appendChild( svgNode );
    divNode.appendChild( playBtn );

    // 
    playerEl.appendChild( divNode );
}

initYouTubeVideo( document.querySelector( '.video-player' ) );