/*--------------------------
    Project Name: Medcity
    Version: 1.0
    Author: 7oorof
    Relase Date: April 2021
---------------------------*/
/*---------------------------
      Table of Contents
    --------------------
    01- Pre Loading
    02- Mobile Menu
    03- Sticky Navbar
    04- Scroll Top Button
    05- Close Topbar
    06- Set Background-img to section 
    07- Add active class to accordions
    08- Contact Form validation
    09- Slick Carousel
    10- Popup Video
    11- Progress bars
    12- NiceSelect Plugin
    13- Range Slider
     
 ----------------------------*/

$(function () {

    "use strict";

    // Global variables
    var $win = $(window);

    /*==========  Pre Loading   ==========*/
    setTimeout(function () {
        $(".preloader").remove();
    }, 2000);

    /*==========   Mobile Menu   ==========*/
    $('.navbar-toggler').on('click', function () {
        $('.navbar-collapse').addClass('menu-opened');
    })

    $('.close-mobile-menu').on('click', function (e) {
        $('.navbar-collapse').removeClass('menu-opened');
    });

    /*==========   Sticky Navbar   ==========*/
    $win.on('scroll', function () {
        if ($win.width() >= 992) {
            var $stickyNavbar = $('.sticky-navbar'),
                $secondaryNavbar = $('.secondary-nav');
            if ($win.scrollTop() > 150) {
                $stickyNavbar.addClass('is-sticky');
            } else {
                $stickyNavbar.removeClass('is-sticky');
            }
            if ($secondaryNavbar.length) {
                if ($win.scrollTop() > $secondaryNavbar.offset().top - 100) {
                    $secondaryNavbar.addClass('secondary-nav-sticky');
                } else {
                    $secondaryNavbar.removeClass('secondary-nav-sticky');
                }
            }
        }
    });
    // Scroll To Section when Clicking on The Link
    $('.secondary-nav-internal-navigation .nav__link').on("click", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('scroll')).offset().top - 140
        }, 1000);
    });

    // Add  active class when The Scroll Reaching the Section
    $(window).on("scroll", function () {
        $('section').each(function () {
            if ($(window).scrollTop() > $(this).offset().top - 141) {
                var sectionID = $(this).attr('id');
                $('.secondary-nav-internal-navigation .nav__link').removeClass('active');
                $('.secondary-nav-internal-navigation .nav__link[data-scroll="' + sectionID + '"]').addClass('active');
            }
        });
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Close Topbar   ==========*/
    $('.topbar__close').on("click", function (e) {
        e.preventDefault();
        $(this).closest('.topbar').fadeOut()
    });

    /*==========   Set Background-img to section   ==========*/
    $('.bg-img').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).parent().css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-position': 'center',
        });
        $(this).parent().addClass('bg-img');
        if ($(this).hasClass('background-size-auto')) {
            $(this).parent().addClass('background-size-auto');
        }
        $(this).remove();
    });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion__header').on('click', function () {
        $(this).parent('.accordion-item').toggleClass('opened');
        $(this).parent('.accordion-item').siblings().removeClass('opened');
    })
    $('.accordion__title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========  Open and Close Popup   ==========*/
    // open Mini Popup
    function openMiniPopup(popupTriggerBtn, popup, cssClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass(cssClass);
            $(popup).toggleClass(cssClass);
        });
    }
    // open Popup
    function openPopup(popupTriggerBtn, popup, addedClass, removedClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(popup).toggleClass(addedClass, removedClass).removeClass(removedClass);
        });
    }
    // Close Popup
    function closePopup(closeBtn, popup, addedClass, removedClass) {
        $(closeBtn).on('click', function () {
            $(popup).removeClass(addedClass).addClass(removedClass);
        });
    }
    // close popup when clicking on an other place on the Document
    function closePopupFromOutside(popup, stopPropogationElement, popupTriggerBtn, removedClass, addedClass) {
        $(document).on('mouseup', function (e) {
            if (!$(stopPropogationElement).is(e.target) && !$(popupTriggerBtn).is(e.target) && $(stopPropogationElement).has(e.target).length === 0 && $(popup).has(e.target).length === 0) {
                $(popup).removeClass(removedClass).addClass(addedClass);
            }
        });
    }
    openMiniPopup('.miniPopup-emergency-trigger', '#miniPopup-emergency', 'active') // Open miniPopup-emergency
    openMiniPopup('#miniPopup-departments-trigger-icon', '#miniPopup-departments', 'active') // Open miniPopup-emergency

    openPopup('.action__btn-search', '.search-popup', 'active', 'inActive') // Open sidenav popup
    closePopup('.search-popup__close', '.search-popup', 'active', 'inActive') // Close sidenav popup
    openPopup('.action__btn-burgerMenu', '.burger-menu', 'active', 'inActive') // Open sidenav popup
    closePopup('.burger-menu__close', '.burger-menu', 'active', 'inActive') // Close sidenav popup
    openPopup('.action__btn-cart', '.cart-popup', 'active', 'inActive') // Open Search popup
    closePopupFromOutside('.burger-menu', '.burger-menu__content', '.action__btn-burgerMenu', 'active', 'inActive');  // close popup when clicking on an other place on the Document

    openPopup('.open-login-popup', '#login-popup', 'active', 'inActive') // Open sidenav popup
    closePopupFromOutside('#login-popup', '.login-popup-wrapper', '.open-login-popup', 'active', 'inActive');  // close popup when clicking on an other place on the Document

    openPopup('.open-register-popup', '#register-popup', 'active', 'inActive') // Open sidenav popup
    closePopupFromOutside('#register-popup', '.login-popup-wrapper', '.open-register-popup', 'active', 'inActive');  // close popup when clicking on an other place on the Document

    // Close topbar
    $('#close-topbar').on('click', function () {
        $('#header-topbar').fadeOut();
    });

    /*==========   Increase and Decrease Input Value   ==========*/
    // Increase Value
    $('.increase-qty').on('click', function () {
        var $qty = $(this).parent().find('.qty-input');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
    // Decrease Value
    $('.decrease-qty').on('click', function () {
        var $qty = $(this).parent().find('.qty-input');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });

    /*==========   Progress bars  ==========*/
    if ($(".animated-Progressbars").length > 0) {
        $(window).on('scroll', function () {
            var skillsOffset = $(".animated-Progressbars").offset().top - 160,
                skillsHight = $(this).outerHeight(),
                winScrollTop = $(window).scrollTop();
            if (winScrollTop > skillsOffset - 1 && winScrollTop < skillsOffset + skillsHight - 1) {
                $('.progress-bar').each(function () {
                    $(this).width($(this).attr('aria-valuenow') + '%');
                });
                $('.progress__percentage').each(function () {
                    $(this).text($(this).parent('.progress-bar').attr('aria-valuenow') + '%')
                });
            }
        });
    }

    /*==========  Contact Form validation  ==========*/
    var contactForm = $("#contactForm"),
        contactResult = $('.contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function (contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function (msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    /*==========   Slick Carousel ==========*/
    $('.slick-carousel').slick();

    $('.slider-with-navs').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-with-navs',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: false
    });

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });
    $('.popup-gallery-item').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    /*==========  NiceSelect Plugin  ==========*/
    $('select').niceSelect();

    /*==========   Range Slider  ==========*/
    var $rangeSlider = $("#rangeSlider"),
        $rangeSliderResult = $("#rangeSliderResult");
    $rangeSlider.slider({
        range: true,
        min: 0,
        max: 300,
        values: [50, 200],
        slide: function (event, ui) {
            $rangeSliderResult.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $rangeSliderResult.val("$" + $rangeSlider.slider("values", 0) + " - $" + $rangeSlider.slider("values", 1));

    /*==========  image zoomsl Plugin  ==========*/
    // [Zoom Effect on Hovering] Find it in shop-single-product.html
    $(".zoomin").imagezoomsl();
});



 //custom js
if ($(window).width() < 514) {
    $('stetho-img').removeAttr('margin-left');
} else {
    $('stetho-img').attr('margin-left','70px');
}
//this is for responsiveness
$(document).ready(function() {
    $(window).resize(function() {
      if ($(this).width() < 728) {
        $(".downsidexd").css("margin-left", "0px");
        $(".cla-check").css("margin", "0px 0px 0px 20px");
      } else {
        $(".downsidexd").css("margin-left", "56px");
        $(".cla-check").css("margin", "50px 0px 0px 170px");
      }
    });
  });

//this is for typewriter text


  const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["long queues", "waiting time for consultation"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});



// get the GPS coordinates

var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
    
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

    var latitude;
    var longitude;
function showPosition(position) {
    x.innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
 latitude = parseFloat( position.coords.latitude);
 longitude=parseFloat(position.coords.longitude);
}
 

//........................................

navigator.geolocation.getCurrentPosition(console.log,console.log)
const sucessfulLookup = (position)=> { const {latitude, longitude } =position.coords;
fetch('https://api.opencagedata.com/geocode/v1/json?q=${latitude}${longitude}+LNG&key=6fca4cc04b5d4e9fb51803a736e4c3bd').then(response=>response.json()).then(console.log);};
navigator.geolocation.getCurrentPosition(sucessfulLookup,console.log);

const api_url= 'https://api.opencagedata.com/geocode/v1/json?q=${latitude}${longitude}+LNG&key=6fca4cc04b5d4e9fb51803a736e4c3bd';
async function getloc(){
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude }=data;
    console.log(latitude);
    console.log(longitude);
}
