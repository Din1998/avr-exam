/* Main Js Start */

(function ($) {
  "use strict";




  $(document).ready(function () {

    // odometer init
    if ($(".odometer").length) {
      var odo = $(".odometer");
      odo.each(function () {
        $(this).appear(function () {
          var countNumber = $(this).attr("data-count");
          $(this).html(countNumber);
        });
      });
    }




    // sidebar dropdown
    $(".has-dropdown > a").click(function (e) {
      e.preventDefault();
      var $submenu = $(this).next(".sidebar-submenu");
      var $parent = $(this).parent();
      if ($submenu.css("display") === "block") {
        $submenu.slideUp(200);
        $parent.removeClass("active");
      } else {
        $(".sidebar-submenu").not($submenu).slideUp(200);
        $(".has-dropdown.active").removeClass("active");
        $parent.addClass("active");
        $submenu.slideDown(200);
      }
    });


    $(".dashboard-body__bar-icon").on("click", function () {
      $(".sidebar-menu").addClass('show-sidebar');
      $(".sidebar-overlay").addClass('show');
    });
    $(".sidebar-menu__close, .sidebar-overlay").on("click", function () {
      $(".sidebar-menu").removeClass('show-sidebar');
      $(".sidebar-overlay").removeClass('show');
    });






    $(".counterup-item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
            var el = document.querySelectorAll('.odometer')[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });


    $(".add").on("click", function () {
      if ($(this).prev().val() < 999) {
        $(this)
          .prev()
          .val(+$(this).prev().val() + 1);
      }
    });
    $(".sub").on("click", function () {
      if ($(this).next().val() > 1) {
        if ($(this).next().val() > 1)
          $(this)
            .next()
            .val(+$(this).next().val() - 1);
      }
    });


    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("#imageUpload").change(function () {
      readURL(this);
    });

  });

  // preloader
  $(window).on("load", function () {
    $("#loading").fadeOut();
  })


  // sticky header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 60) {
      $('.header').addClass('fixed-header');
    }
    else {
      $('.header').removeClass('fixed-header');
    }
  });


  var btn = $('.scroll-top');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });


  $('.header-search-icon').on('click', function () {
    $('.header-search-hide-show').addClass('show');
    $('.header-search-icon').hide();
    $('.close-hide-show').addClass('show');
  });

  $('.close-hide-show').on('click', function () {
    $('.close-hide-show').removeClass('show');
    $('.header-search-hide-show').removeClass('show');
    $('.header-search-icon').show();
  });






  $('.sidebar-overlay, .close-hide-show').on('click', function () {
    $('.sidebar-menu-wrapper').removeClass('show');
    $(".sidebar-overlay").removeClass('show');
  });


  // tap to top
  if ($('.scroll-top').length > 0) {
    var scrollTopbtn = document.querySelector('.scroll-top');
    var progressPath = document.querySelector('.scroll-top path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    }
    
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 800;
    jQuery(window).on('scroll', function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(scrollTopbtn).addClass('show');
      } else {
        jQuery(scrollTopbtn).removeClass('show');
      }
    });
    jQuery(scrollTopbtn).on('click', function (event) {
      event.preventDefault();
      jQuery('html, body').animate({ scrollTop: 0 }, duration);
      return false;
    })





    // slick
    $('.testimonial-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },

        {
          breakpoint: 780,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });






  }


  // toggle show hide password
  $(".toggle-password-change").click(function () {
    var targetId = $(this).data("target");
    var target = $("#" + targetId);
    var icon = $(this);
    if (target.attr("type") === "password") {
      target.attr("type", "text");
      icon.removeClass("fa-eye-slash");
      icon.addClass("fa-eye");
    } else {
      target.attr("type", "password");
      icon.removeClass("fa-eye");
      icon.addClass("fa-eye-slash");
    }
  });

  // wow init
  new WOW().init();




  // slick update function
  function handleSlideArrows(slick) {
    var slidesToShow = slick.options.slidesToShow;
    var slideCount = slick.slideCount;
    var currentSlide = slick.currentSlide || 0;

    console.log(currentSlide);

    if (currentSlide === 0) {
      $(slick.$slider).find('.slick-prev').hide();
    } else {
      $(slick.$slider).find('.slick-prev').show();
    }

    if (currentSlide + slidesToShow === slideCount) {
      $(slick.$slider).find('.slick-next').hide();
    } else {
      $(slick.$slider).find('.slick-next').show();
    }
  }

  // Initialize sliders
  $('.item-slider1, .item-slider2, .item-slider3').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }
    ]

  }).on('init reInit afterChange', function (event, slick, currentSlide) {
    handleSlideArrows(slick);
  });


  $('.item-slider1, .item-slider2, .item-slider3').each(function () {
    var slickInstance = $(this).slick('getSlick');
    handleSlideArrows(slickInstance);
  });


  // tap to show balance
  $(document).on('click', '.textt, .balance', function () {
    $(this).toggleClass('d-none');
    $(this).siblings('.textt, .balance').toggleClass('d-none');
    var $tapBalance = $('.tap--balance');
    $tapBalance.toggleClass('flex-row-reverse');
    $tapBalance.addClass('transition-animation');
    setTimeout(function () {
      $tapBalance.removeClass('transition-animation');
    }, 300);
  });




  // for accordion
  $(document).ready(function () {

    function applyExpandedClassOnLoad() {
      $('#accordionFlushExample .accordion-item').each(function () {
        var $accordionItem = $(this);
        var $button = $accordionItem.find('.accordion-button');
        if ($button.attr('aria-expanded') === 'true') {
          $accordionItem.addClass('active');
        }
      });
    }

    applyExpandedClassOnLoad();

    $('#accordionFlushExample').on('shown.bs.collapse', function (e) {
      var $accordionItem = $(e.target).closest('.accordion-item');
      $accordionItem.addClass('active');
    });

    $('#accordionFlushExample').on('hidden.bs.collapse', function (e) {
      var $accordionItem = $(e.target).closest('.accordion-item');
      $accordionItem.removeClass('active');
    });
  });

  $(".caret").click(function() {
    $(this).toggleClass("caret-down");
    $(this).next(".nested").toggleClass("active");
});

  Splitting();



  // parallax animation
document.addEventListener("mousemove",parallax);
function parallax(e){
  document.querySelectorAll(".animation-img").forEach(function(move){
    var movingValue = move.getAttribute("data-value");
    var x = (e.clientX * movingValue) / 800;
    var y = (e.clientY * movingValue) / 800;
    move.style.transform = "translateX("+ x +"px) translateY("+ y +"px)";
  })
}

})(jQuery);



