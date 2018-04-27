/**
 * inViewport jQuery plugin by Roko C.B.
 * http://stackoverflow.com/a/26831113/383904
 * Returns a callback function with an argument holding
 * the current amount of px an element is visible in viewport
 * (The min returned value is 0 (element outside of viewport)
 */
(function($, win) {
  $.fn.inViewport = function(cb) {
     return this.each(function(i,el) {
       function visPx(){
         var elH = $(el).outerHeight(),
             H = $(win).height(),
             r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
         return cb.call(el, Math.max(0, t>0? Math.min(elH, H-t) : (b<H?b:H)));
       }
       visPx();
       $(win).on("resize scroll", visPx);
     });
  };
}(jQuery, window));

// Slick
$(document).ready(function() {
    $('.Steps__Content').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      dots: false,
      asNavFor: '.Steps',
      responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                arrows: false,
                fade: true,
                dots: true,
                fade: true,
                asNavFor: '.Steps',
            }
        }
      ],
    });
    $('.Steps').slick({
      slidesToShow: 5,
      asNavFor: '.Steps__Content',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
      responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.Steps__Content',
                dots: false,
                arrows: false,
            }
        }
      ]
    });
});
$(document).ready(function() {
    $('.TestimonialsSlider__Content').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.TestimonialsSlider'
    });
    $('.TestimonialsSlider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.TestimonialsSlider__Content',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
    });
});

// Copy page URL
$(document).ready(function() {
    var clipboard = new ClipboardJS('.Icon__copyUrl');
    window.copyIcon = document.querySelector('.Icon__copyUrl');
    tippy(copyIcon, {
        placement: 'left',
        trigger: 'manual',
        hideOnClick: false
    });

    clipboard.on('success', function(e) {
        window.gtag('event', 'copy_website_address');
        window.copyIcon._tippy.show();

        window.setTimeout(function() {
            window.copyIcon._tippy.hide();
        }, 2000);

        e.clearSelection();
    });

});

// Display index for project on Home
$(document).ready(function() {
    $('.Home .fp-slidesNav ul li a span').text((index) => {
        return (index + 1);
    });
});

// Handle mobile/tablet menus
$(document).ready(function() {
    var isFabOpen = false;
    var isMenuOpen = false;

    if(window.isMobileOrTablet) {
        $('.Icon:not(.FAB)').addClass('slide-out');

        $('.FAB').click(function() {
            isFabOpen = !isFabOpen;

            window.gtag('event', 'toggle_link_menu', {
              'event_category': 'mobile',
              'event_label': 'toggle_link_menu',
              'value': isFabOpen
            });

            $('.FAB i').toggleClass('hide');

            if(isFabOpen) {
                $('.Icon:not(.FAB)').css('display', 'flex');

                $('.Icon:not(.FAB)').addClass('slide-in');
                $('.Icon:not(.FAB)').removeClass('slide-out');
            } else {
                $('.Icon:not(.FAB)').addClass('slide-out');
                $('.Icon:not(.FAB)').removeClass('slide-in');
            }
        });

        // $('.Link__internal').addClass('hide');
        $('.MenuButton').click(function() {
            window.gtag('event', 'toggle_menu', {
              'event_category': 'mobile',
              'event_label': 'toggle_menu',
              'value': isMenuOpen
            });

            var checkBoxe = $("#menuIconCheckbox");
            checkBoxe.prop("checked", !checkBoxe.prop("checked"));

            return false; // Prevent propagation to fullpage
        });
    }
});

// Slide page per page
$(document).ready(function() {
    window.isMobile = window.innerWidth < 768;
    window.isMobileOrTablet = window.innerWidth < 992;

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
        responsiveWidth: 768,
        afterLoad: function(anchorLink, index) {
            window.gtag('config', window.googleAnalyticsUA, {'page_path': '/' + anchorLink});
        },
        afterRender: function() {
            $('.Loader').addClass('slideAndHide');

            var fadeInUpSelectors = '.Title, .Subtitle, .Description, .ResumeWrapper, .ArticlesTitle, .Article, .QuestionTitle, .QuestionContent, .WhyShouldYouContactMe, .WhyShouldYouContactMe__content, .ContactDetails__TitleWrapper, .ContactDetails, .StepTitle__wrapper';
            var fadeInRightSelectors = '.About__background, .About .EmptySpace, .StepPicture, .ArticlesWrapper';
            var fadeInSelectors = '.Pagination, .Page, .Arrow, .ArrowRepeat__wrapper';

            $(fadeInUpSelectors).addClass('opacity-0');
            $(fadeInRightSelectors).addClass('opacity-0');
            $(fadeInSelectors).addClass('opacity-0');

            window.setTimeout(function() {
                $('.Credentials__Portfolio, .Credentials__Name').inViewport(function (px) {
                    if(px) $(this).addClass('animated fadeInDown') ;
                });
                $(fadeInUpSelectors).inViewport(function (px) {
                    if(px) $(this).addClass('animated fadeInUp') ;
                });
                $(fadeInRightSelectors).inViewport(function (px) {
                    if(px) $(this).addClass('animated fadeInRight') ;
                });
                $(fadeInSelectors).inViewport(function (px) {
                    if(px) {
                        $(this).addClass('animated fadeIn');
                    } ;
                });
            }, 1700);

            $('.Home').inViewport(function (px) {
                if(px === window.innerHeight) {
                    $('.Project__loaderBarBg').addClass('animate');
                    window.homeInterval = window.setInterval(function() {
                        $.fn.fullpage.moveSlideRight();
                    }, 8000);
                } else {
                    $('.Project__loaderBarBg').removeClass('animate');
                    clearInterval(window.homeInterval);
                }
            });
        },
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
        // onLeave: function(index, nextIndex, direction) {
        //     console.log(index, nextIndex, direction);
        //     console.log(nextIndex === 7 && index !== 6);
        //     if(nextIndex === 7 && index !== 6) return false;
        // },
    });

    $('.TotalPages--process').text('/' + $('.Process .slide').length);
    $('.TotalPages--faq').text('/' + $('.Faq .slide').length);
});

// Hide Header on on scroll down
// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var headerSelector = 'header nav';
// var navbarHeight = $(headerSelector).outerHeight();

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// function hasScrolled() {
//     var st = $(this).scrollTop();

//     // Make sure they scroll more than delta
//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;

//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop && st > navbarHeight){
//         // Scroll Down
//         $(headerSelector).removeClass('nav-down').addClass('nav-up');
//     } else {
//         // Scroll Up
//         if(st + $(window).height() < $(document).height()) {
//             $(headerSelector).removeClass('nav-up').addClass('nav-down');
//         }
//     }

//     lastScrollTop = st;
// }
