/*
* Template Name: BreezyCV - Resume / CV / vCard / Portfolio Template
* Author: LMPixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 1.5.0
*/

(function($) {
"use strict";
    // Hide Mobile menu
    function mobileMenuHide() {
        var windowWidth = $(window).width(),
            siteHeader = $('#site_header');

        if (windowWidth < 1025) {
            siteHeader.addClass('mobile-menu-hide');
            $('.menu-toggle').removeClass('open').attr('aria-expanded', 'false');
            setTimeout(function(){
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }
    // /Hide Mobile menu

    // Custom scroll
    function customScroll() {
        var windowWidth = $(window).width();
        if (typeof $.fn.perfectScrollbar !== 'function') {
            return;
        }
        if (windowWidth > 1024) {
            $('.animated-section, .single-page-content').each(function() {
                $(this).perfectScrollbar();
            });
        } else {
            $('.animated-section, .single-page-content').each(function() {
                $(this).perfectScrollbar('destroy');
            });
        }
    }
    // /Custom scroll

    //On Window load & Resize
    $(window)
        .on('load', function() { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut( 800, "linear" );

            // initializing page transition.
            var ptPage = $('.animated-sections');
            if (ptPage[0]) {
                PageTransitions.init({
                    menu: 'ul.main-menu',
                });
            }
        })
        .on('resize', function() { //Resize
             mobileMenuHide();
             if (typeof $.fn.perfectScrollbar === 'function') {
                 $('.animated-section').each(function() {
                    $(this).perfectScrollbar('update');
                });
            }
            customScroll();
        });


    // On Document Load
    $(document).ready(function () {
        var movementStrength = 23;
        var height = movementStrength / $(document).height();
        var width = movementStrength / $(document).width();
        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            $("body").on('mousemove', function(e){
                var pageX = e.pageX - ($(document).width() / 2),
                    pageY = e.pageY - ($(document).height() / 2),
                    newvalueX = width * pageX * -1,
                    newvalueY = height * pageY * -1,
                    elements = $('.lm-animated-bg');

                elements.addClass('transition');
                elements.css({
                    "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
                });

                setTimeout(function() {
                    elements.removeClass('transition');
                }, 300);
            });
        }

        var $menuToggle = $('.menu-toggle');
        if ($menuToggle.length) {
            var toggleMenuVisibility = function () {
                $('#site_header').addClass('animate');
                $('#site_header').toggleClass('mobile-menu-hide');
                $menuToggle.toggleClass('open');
                $menuToggle.attr('aria-expanded', $menuToggle.hasClass('open').toString());
            };

            $menuToggle.on("click", toggleMenuVisibility);
            $menuToggle.on("keydown", function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleMenuVisibility();
                }
            });
        }

        $('.main-menu').on("click", "a", function () {
            mobileMenuHide();
        });

        customScroll();

        var $textRotation = $('.text-rotation');
        if ($textRotation.length && typeof $.fn.owlCarousel === 'function') {
            $textRotation.owlCarousel({
                loop: true,
                dots: false,
                nav: false,
                margin: 0,
                items: 1,
                autoplay: true,
                autoplayHoverPause: false,
                autoplayTimeout: 3800,
                animateOut: 'animated-section-scaleDown',
                animateIn: 'animated-section-scaleUp'
            });
        }

        var $testimonialsCarousel = $(".testimonials.owl-carousel");
        if ($testimonialsCarousel.length && typeof $.fn.owlCarousel === 'function') {
            $testimonialsCarousel.owlCarousel({
                nav: true,
                items: 3,
                loop: false,
                navText: false,
                autoHeight: true,
                margin: 25,
                responsive : {
                    0 : {
                        items: 1,
                    },
                    480 : {
                        items: 1,
                    },
                    768 : {
                        items: 2,
                    },
                    1200 : {
                        items: 2,
                    }
                }
            });
        }

        // Experience details toggle
        $('[data-collapsible]').each(function () {
            var $list = $(this);
            var itemCount = $list.find('li').length;
            var selector = '#' + $list.attr('id');
            var $toggle = $('[data-toggle-details="' + selector + '"]');

            if (itemCount > 3) {
                $list.addClass('is-collapsed');
                $toggle.attr('aria-expanded', 'false').removeClass('is-hidden');
            } else {
                $toggle.addClass('is-hidden');
            }
        });

        $('[data-toggle-details]').on('click', function () {
            var $btn = $(this);
            var targetSelector = $btn.data('toggle-details');
            var $list = $(targetSelector);
            if (!$list.length) {
                return;
            }
            var expanded = $btn.attr('aria-expanded') === 'true';
            $list.toggleClass('is-collapsed', expanded);
            $btn.attr('aria-expanded', (!expanded).toString());
            $btn.text(expanded ? 'Show more' : 'Show less');
        });

        // Certificate toggle
        $('[data-toggle-target]').on('click', function () {
            var $btn = $(this);
            var targetSelector = $btn.data('toggle-target');
            var $target = $(targetSelector);
            if (!$target.length) {
                return;
            }
            var expanded = $btn.attr('aria-expanded') === 'true';
            $target.toggleClass('is-expanded', !expanded).attr('aria-hidden', expanded ? 'true' : 'false');
            $btn.attr('aria-expanded', (!expanded).toString());
            $btn.text(expanded ? 'Show all certificates' : 'Hide additional certificates');
        });
    });

})(jQuery);
