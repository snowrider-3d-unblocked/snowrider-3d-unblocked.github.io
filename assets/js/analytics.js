document.addEventListener('DOMContentLoaded', function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    var playBtn = document.getElementById('playBtn');
    var itemFrame = document.getElementById('itemFrame');
    var preloader = document.getElementById('preloader');
    var fullscreenBtn = document.getElementById('fullscreenBtn');
    var favBtn = document.getElementById('favoriteBtn');
    var mobileBackBtn = document.getElementById('mobile-back-button');
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var navLinks = document.getElementById('navLinks');
    var themeToggleBtn = document.getElementById('themeToggleBtn');
    var themeMenu = document.getElementById('themeMenu');
    var startTime = new Date();
    var eventLabel = playBtn ? playBtn.getAttribute('data-event-label') : 'Unknown';
    var encodedUrl = playBtn ? playBtn.getAttribute('data-item-url') : '';
    var itemUrl = '';
    try { if (encodedUrl) itemUrl = atob(encodedUrl); } catch(e) {}
    window.addEventListener('beforeunload', function() {
        var timeSpent = new Date() - startTime;
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'time_spent', { 'event_category': 'Engagement', 'event_label': eventLabel, 'value': Math.floor(timeSpent / 1000) });
        }
    });
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navLinks.className.indexOf('show') === -1) { navLinks.className += ' show'; } else { navLinks.className = navLinks.className.replace(' show', ''); }
        });
    }
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            themeMenu.style.display = themeMenu.style.display === 'none' ? 'block' : 'none';
        });
    }
    document.addEventListener('click', function(e) {
        if (themeMenu) themeMenu.style.display = 'none';
        if (navLinks && navLinks.className.indexOf('show') !== -1) {
            var isClickInsideNav = false;
            var element = e.target;
            while (element) {
                if (element === navLinks || element === mobileMenuBtn) { isClickInsideNav = true; break; }
                element = element.parentNode;
            }
            if (!isClickInsideNav) { navLinks.className = navLinks.className.replace(' show', ''); }
        }
    });
    if (playBtn && itemFrame && preloader) {
        playBtn.addEventListener('click', function() {
            itemFrame.src = itemUrl;
            itemFrame.style.display = 'block';
            preloader.style.display = 'none';
            if (fullscreenBtn) {
                fullscreenBtn.style.display = 'block';
                if (favBtn && favBtn.className.indexOf('split') === -1) { favBtn.className += ' split'; }
            }
            if (window.innerWidth <= 768 && mobileBackBtn) {
                mobileBackBtn.style.display = 'block';
                var navbar = document.querySelector('.navbar');
                if (navbar) navbar.style.display = 'none';
                window.scrollTo(0, 0);
            }
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'play_now_click', { 'event_category': 'Engagement', 'event_label': eventLabel });
            }
        });
        itemFrame.addEventListener('load', function() {
            if (itemFrame.src && itemFrame.src !== window.location.href) {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'item_load', { 'event_category': 'Engagement', 'event_label': eventLabel });
                }
            }
        });
    }
    if (mobileBackBtn) {
        mobileBackBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            itemFrame.src = 'about:blank';
            itemFrame.style.display = 'none';
            preloader.style.display = 'block';
            mobileBackBtn.style.display = 'none';
            if (fullscreenBtn) fullscreenBtn.style.display = 'none';
            if (favBtn) favBtn.className = favBtn.className.replace(' split', '');
            var navbar = document.querySelector('.navbar');
            if (navbar) navbar.style.display = 'block';
        });
    }
    if (fullscreenBtn && itemFrame) {
        fullscreenBtn.addEventListener('click', function() {
            var frame = itemFrame;
            if(frame.requestFullscreen){frame.requestFullscreen();}
            else if(frame.webkitRequestFullscreen){frame.webkitRequestFullscreen();}
            else if(frame.msRequestFullscreen){frame.msRequestFullscreen();}
        });
    }
    if (favBtn) {
        var gameSlug = favBtn.getAttribute('data-slug');
        var favs = [];
        try { favs = JSON.parse(localStorage.getItem('user_favorites') || '[]'); } catch(e) {}
        var isFav = false;
        for(var i=0; i<favs.length; i++) { if(favs[i].slug === gameSlug) isFav = true; }
        if (isFav) { 
            if (favBtn.className.indexOf('active') === -1) favBtn.className += ' active'; 
            favBtn.innerHTML = '❤️ FAVORITED'; 
        }
        favBtn.addEventListener('click', function() {
            try { favs = JSON.parse(localStorage.getItem('user_favorites') || '[]'); } catch(e) { favs = []; }
            var idx = -1;
            for(var j=0; j<favs.length; j++) { if(favs[j].slug === gameSlug) idx = j; }
            if (idx > -1) {
                favs.splice(idx, 1);
                favBtn.className = favBtn.className.replace(' active', '');
                favBtn.innerHTML = '🤍 FAVORITE';
            } else {
                favs.push({
                    slug: gameSlug,
                    title: favBtn.getAttribute('data-title'),
                    img: favBtn.getAttribute('data-img')
                });
                if (favBtn.className.indexOf('active') === -1) favBtn.className += ' active';
                favBtn.innerHTML = '❤️ FAVORITED';
            }
            localStorage.setItem('user_favorites', JSON.stringify(favs));
        });
    }
    var themeOptions = document.querySelectorAll('.theme-option');
    for (var k = 0; k < themeOptions.length; k++) {
        themeOptions[k].addEventListener('click', function(e) {
            e.preventDefault();
            var themeId = this.getAttribute('data-theme-id');
            document.documentElement.setAttribute('data-theme', themeId);
            if (typeof Storage !== 'undefined') { localStorage.setItem('site-theme', themeId); }
            var themeMenuObj = document.getElementById('themeMenu');
            if (themeMenuObj) themeMenuObj.style.display = 'none';
        });
    }
});