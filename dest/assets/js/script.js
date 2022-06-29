document.documentElement.classList.add( 'js' );

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


/*

Form validation

*/

let inputEls = document.querySelectorAll( '.form-contacts__input' );
let form = document.querySelector( '.contacts__form' );

function showError( inputEl ) {
    let errorEl = inputEl.nextElementSibling;

    if ( inputEl.validity.valueMissing ) {
        inputEl.classList.add( 'form-contacts__input--error' );
        errorEl.classList.add( 'form-contacts__error--active' );
        errorEl.textContent = "Not all required information has been entered.";
    } else if ( inputEl.validity.patternMismatch ) {
        inputEl.classList.add( 'form-contacts__input--error' );
        errorEl.classList.add( 'form-contacts__error--active' );
        errorEl.textContent = "Please enter a valid name ( [a-zA-Z]+ [a-zA-Z]+ )";
    } else if ( inputEl.validity.typeMismatch ) {
        inputEl.classList.add( 'form-contacts__input--error' );
        errorEl.classList.add( 'form-contacts__error--active' );
        errorEl.textContent = "Please enter a valid e-mail address.";
    }
}

form.addEventListener( 'submit', e => {
    let isInvalid = false;

    inputEls.forEach( el => {
        if ( !el.validity.valid ) {
            showError( el );
            isInvalid = true;
        }
    } );

    if ( isInvalid ) {
        e.preventDefault();
    }
} );

inputEls.forEach( el => {
    el.addEventListener( 'input', () => {
        let errorEl = el.nextElementSibling;

        if ( el.validity.valid ) {
            el.classList.remove( 'form-contacts__input--error' );
            errorEl.classList.remove( 'form-contacts__error--active' );
            errorEl.textContent = '';
        } else {
            showError( el );
        }
    } );
} );

/*

Accordion

*/

function openAcc( accEl ) {
    let control = accEl.querySelector( '.accordion-faq__control' );
    let content = accEl.querySelector( '.accordion-faq__content' );

    accEl.classList.add( 'open' );
    control.setAttribute( 'aria-expanded', true );
    content.setAttribute( 'aria-hidden', false );
    content.style.maxHeight = content.scrollHeight + 'px';
}

function closeAcc( accEl ) {
    let control = accEl.querySelector( '.accordion-faq__control' );
    let content = accEl.querySelector( '.accordion-faq__content' );

    accEl.classList.remove( 'open' );
    control.setAttribute( 'aria-expanded', false );
    content.setAttribute( 'aria-hidden', true );
    content.style.maxHeight = null;    
}

let accEls = document.querySelectorAll( '.accordion-faq__item' );

accEls.forEach( acc => {
    let control = acc.querySelector( '.accordion-faq__control' );

    control.addEventListener( 'click', function() {
        if ( acc.classList.contains( 'open' ) ) {
            closeAcc( acc );
        } else {
            openAcc( acc );
        }
    } );
} );

/*

hamburger

*/

function enableFocusTrap( el ) {
    let focusableEls = el.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled])' );
    let firstFocusableEl = focusableEls[0];
    let lastFocusableEl = focusableEls[focusableEls.length - 1];
  
    function handler( e ) {
      let isTabPressed = ( e.key === 'Tab' );
  
      if ( !isTabPressed ) return;
  
      if ( e.shiftKey ) {
        if ( document.activeElement === firstFocusableEl ) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if ( document.activeElement === lastFocusableEl ) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  
    el.addEventListener( 'keydown', handler );
  
    return handler;
  }
  
  function disableFocusTrap( el, handler ) {
    el.removeEventListener( 'keydown', handler )
  }
  
  /*
  
  NAVIGATION
  
  */
  
  let burgerFocusTrapFlag = null;
  
  // навигация 
  let nav = document.querySelector( '#main-nav' );
  // кнопка открытия меню
  let burger = document.querySelector( '.hamburger' );
  // меню 
  let menu = document.querySelector( '#main-menu' );
  // фокусируемые элементы в меню (ссылки)
  let focusableEls = nav.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled])' );
  // первая ссылка
  let firstFocusableEl = focusableEls[0];
  // последняя ссылка
  let lastFocusableEl = focusableEls[focusableEls.length - 1];
  
  // Открыть меню
  function openMenu( triggerEl, menuEl ) {
    // переключить ариа атрибут
    triggerEl.setAttribute( 'aria-expanded', 'true' );
    // добавить для меню класс open
    menuEl.classList.add( 'open' );
    // Включает ловушку для фокуса
    burgerFocusTrapFlag = enableFocusTrap( nav );
    //
    document.querySelector( 'body' ).style.overflow = 'hidden';
  }
  
  // Закрыть меню
  function closeMenu( triggerEl, menuEl ) {
    // переключить ариа атрибут
    triggerEl.setAttribute( 'aria-expanded', 'false' );
    // удалить для меню класс open
    menuEl.classList.remove( 'open' );
    // выключает ловушку для фокуса
    disableFocusTrap( nav, burgerFocusTrapFlag );
    burgerFocusTrapFlag = null;
    //
    document.querySelector( 'body' ).style.overflow = '';
  }
  
  // обработчик открытия меню
  function handleBurger( e ) {
    // true - меню открыто. false - меню закрыто
    let isExpanded = this.getAttribute( 'aria-expanded' ) == 'true' ? true : false;
  
    // если меню открыто - то закрыть
    if ( isExpanded ) closeMenu( burger, menu );
    // если закрыто - то открыть
    else openMenu( burger, menu );
  }
  
  // обработчик медиа запроса
  function handleChange( e ) {
    if ( e.matches ) {
      // отключаем обработчики для настольной версии сайта
      burger.removeEventListener( 'click', handleBurger );
      disableFocusTrap( nav, burgerFocusTrapFlag );
      closeMenu( burger, menu );
    } else {
      // подключаем обработчики для мобильной версии сайта
      burger.addEventListener( 'click', handleBurger );
    }
  }
  
  // медиа запрос
  const mediaQuery = window.matchMedia( '(min-width: 1024px)' );
  
  // подключает обработчик для медиа запросов
  mediaQuery.addListener( handleChange );
  
  // если вначале загружается мобильная версия, то подключить обработчики для гамбургера и меню
  if ( document.documentElement.clientWidth < 1024 ) {
    burger.addEventListener( 'click', handleBurger );
  }