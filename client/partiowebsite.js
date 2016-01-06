appMaster = {

    preLoader: function(){
        imageSources = []
        $('img').each(function() {
            var sources = $(this).attr('src');
            imageSources.push(sources);
        });
        if($(imageSources).load()){
            $('.pre-loader').fadeOut('slow');
        }
    },

    smoothScroll: function() {
        // Smooth Scrolling
        $('a[href*=#]:not([href=#carousel-example-generic])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    },

    reviewsCarousel: function() {
        // Reviews Carousel
        $('.review-filtering').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000
        });
    },

    screensCarousel: function() {
        // Screens Carousel
        $('.filtering').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('.js-filter-all').on('click', function() {
            $('.filtering').slickUnfilter();
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-one').on('click', function() {
            $('.filtering').slickFilter('.one');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-two').on('click', function() {
            $('.filtering').slickFilter('.two');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-three').on('click', function() {
            $('.filtering').slickFilter('.three');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });
        
        $('.js-filter-four').on('click', function() {
            $('.filtering').slickFilter('.four');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

    },

    animateScript: function() {
        $('.scrollpoint.sp-effect1').waypoint(function(){$(this).addClass('active');$(this).addClass('animated fadeInLeft');},{offset:'100%'});
        $('.scrollpoint.sp-effect2').waypoint(function(){$(this).addClass('active');$(this).addClass('animated fadeInRight');},{offset:'100%'});
        $('.scrollpoint.sp-effect3').waypoint(function(){
            //$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');
            $(this).addClass('active');$(this).addClass('animated fadeInDown');
        },{offset:'100%'});
        $('.scrollpoint.sp-effect4').waypoint(function(){$(this).addClass('active');$(this).addClass('animated fadeIn');},{offset:'100%'});
        $('.scrollpoint.sp-effect5').waypoint(function(){$(this).addClass('active');$(this).addClass('animated fadeInUp');},{offset:'100%'});
    },

    revSlider: function() {

        var docHeight = $(window).height();


        var mainSlider = $('.tp-banner').revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: docHeight,
            hideThumbs: 10,
            touchenabled: false,
            fullWidth: "on",
            hideTimerBar: "on",
            fullScreen: "on",
            onHoverStop: "off",
            fullScreenOffsetContainer: ""
        });
        
    },

    scrollMenu: function(){
        var num = 50; //number of pixels before modifying styles

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > num) {
                $('nav').addClass('scrolled');

            } else {
                $('nav').removeClass('scrolled');
            }
        });
    }

}; // AppMaster

Template.body.created = function() {
  new WOW().init();
}

Template.body.rendered = function() {   


	$('#all-main-content').imagesLoaded(function() {
		Meteor.setTimeout(function() {
            
            appMaster.smoothScroll();

            appMaster.reviewsCarousel();

            appMaster.screensCarousel();

            appMaster.animateScript();

            appMaster.revSlider();

            appMaster.scrollMenu();

            appMaster.preLoader(); 
            
            $('.getApp').click(function(){
                $("#capture-email").focus();
            });
            
		}, 500)
	});
}


// $(document).ready(function() {
  // setTimeout(function(){
  //   $('#all-main-content').addClass('show-content');
  //   $('#all-main-content').removeClass('hide-content');
  //   $('.blank-out').addClass('hide-content');
  // }, 1500);
// });

Template.body.events({
	'click #early-button': function(e, template) {
		e.preventDefault();
		template.find('#early-button').innerHTML = "&nbsp;&nbsp; working... &nbsp;&nbsp;";

        var email = template.find('#capture-email').value;
        
        $('.email-message').empty();
        
        Meteor.call('addEmail', email, function(error, result){
            
            if (!error) {         
                 $('.email-message').append(
                        '<div class="alert alert-success fade in" style="margin-top:18px;">' +
                            '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>' +
                            '<strong>Thank you!</strong> We will be in touch soon.' +
                        '</div>');
            }
            else {
                if (error.error === "Invalid-Email"){
                    $('.email-message').append(
                        '<div class="alert alert-danger fade in" style="margin-top:18px;">' +
                            '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>' +
                            '<strong>Invalid Email!</strong> Please make sure that you have entered the correct email.' +
                        '</div>');
                }
                if(error.error === "Already-Exists") {
                    $('.email-message').append(
                        '<div class="alert alert-success fade in" style="margin-top:18px;">' +
                            '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>' +
                            '<strong>Thank you!</strong> We will be in touch soon.' +
                        '</div>');
                }
            }
            
        });
       
        template.find('#early-button').innerHTML = "SUBMIT";
        
//		Meteor.call('addEmail', template.find('#capture-email').value, function(error, result){
//			if (!error) {
//				template.find('#status-text-outer').className = "visible"
//				template.find('#status-text').innerHTML = "Cool! We'll get in touch with you soon";
//				template.find('#status-text').className = "good-error";
//				template.find('#early-button').innerHTML = "EARLY ACCESS"
//				Meteor.setTimeout(function() {
//					template.find('#capture-email').value = "";
//					template.find('#status-text-outer').className = "hidden"
//				}, 4000)
//			} else {
//				console.log(error);
//				if (error.error === "Invalid-Email"){
//					template.find('#status-text-outer').className = "visible"
//					template.find('#status-text').className = "bad-error";
//					template.find('#status-text').innerHTML = "Please enter a valid Email"
//					template.find('#early-button').innerHTML = "EARLY ACCESS"
//					Meteor.setTimeout(function() {
//					template.find('#status-text-outer').className = "hidden"
//					template.find('#capture-email').value = "";
//				}, 4000)
//				}
//				if (error.error	 === "Already-Exists"){
//					template.find('#status-text-outer').className = "visible"
//					template.find('#status-text').innerHTML = "We got your Email already. We'll get in touch with you soon!"
//					template.find('#status-text').className = "good-error";
//					template.find('#early-button').innerHTML = "EARLY ACCESS"
//					Meteor.setTimeout(function() {
//					template.find('#capture-email').value = "";
//					template.find('#status-text-outer').className = "hidden"
//				}, 4000)
//				}
//			}
//		});
        
        
        
        
        
        
	} 
    
})