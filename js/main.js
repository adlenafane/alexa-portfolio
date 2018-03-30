// Slide page per page
$(document).ready(function() {
    window.isMobile = window.innerWidth < 768;

    if(window.isMobile) {
        var aboutMobileSection = $("#About--mobileInvisible").clone();

        aboutMobileSection.attr("id", "About--mobile")
        .insertBefore('#About')
        .attr('data-anchor', 'fullpage-picture')
        .addClass('section')
        .addClass('Fullscreen')
        .show();
    }

    $('#fullpage').fullpage({
        menu: '#menu',
        scrollBar: true,
        fixedElements: '.Header, .Links',
        slidesNavigation: true,
        normalScrollElements: '.QuestionContent',
        onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex) {
            $(`.CurrentPage--${anchorLink}`).text(nextSlideIndex + 1);

            if(anchorLink === 'process') {
                if(direction == 'right') {
                    if(nextSlideIndex === 0) {
                        $('.SmallPictureSlick').slick('slickPrev');
                        $('.LargePictureSlick').slick('slickPrev');
                    } else {
                        $('.SmallPictureSlick').slick('slickNext');
                        $('.LargePictureSlick').slick('slickNext');
                    }
                } else {
                    $('.SmallPictureSlick').slick('slickPrev');
                    $('.LargePictureSlick').slick('slickPrev');
                }
            }
        },
    });

    $('.TotalPages--process').text('/' + $('.Process .slide').length);
    $('.TotalPages--faq').text('/' + $('.Faq .slide').length);
});

// Slick
$(document).ready(function() {
    var slickOptions = {
        arrows: false,
        draggable: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        adaptiveHeight: true,
    };
    $('.SmallPictureSlick').slick(slickOptions);
    $('.LargePictureSlick').slick(slickOptions);
});

$(document).ready(function() {
    var isFabOpen = false;

    if(window.isMobile) {
        $('.Icon:not(.FAB)').addClass('slide-out');

        $('.FAB').click(function() {
            isFabOpen = !isFabOpen;
            $('.FAB i').toggleClass('hide');

            if(isFabOpen) {
                $('.Icon:not(.FAB)').css('display', 'flex');

                $('.Icon:not(.FAB)').addClass('slide-in');
                $('.Icon:not(.FAB)').removeClass('slide-out');
            } else {
                // $('.Icon:not(.FAB)').css('display', 'none');

                $('.Icon:not(.FAB)').addClass('slide-out');
                $('.Icon:not(.FAB)').removeClass('slide-in');
            }
        });
    }
});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerSelector = 'header nav';
var navbarHeight = $(headerSelector).outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $(headerSelector).removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $(headerSelector).removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}
