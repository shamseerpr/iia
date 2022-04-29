(function($){
	"use strict";
	

	$(window).on('elementor/frontend/init', function () {
        
		/* Menu Shrink */
        elementorFrontend.hooks.addAction('frontend/element_ready/ova_menu.default', function(){

			$( '.ova_menu_clasic .ova_openNav' ).on( 'click', function(){
				$( this ).closest('.ova_wrap_nav').find( '.ova_nav' ).removeClass( 'hide' );
				$( this ).closest('.ova_wrap_nav').find( '.ova_nav' ).addClass( 'show' );
				$( '.ova_menu_clasic  .ova_closeCanvas' ).css( 'width', '100%' );

				
				$( 'body' ).css( 'background-color', 'rgba(0,0,0,0.4)' );
				
			});

			$( '.ova_menu_clasic  .ova_closeNav' ).on( 'click', function(){
				$( this ).closest('.ova_wrap_nav').find( '.ova_nav' ).removeClass( 'show' );
				$( this ).closest('.ova_wrap_nav').find( '.ova_nav' ).addClass( 'hide' );
				$( '.ova_closeCanvas' ).css( 'width', '0' );


				
				$( 'body' ).css( 'background-color', 'transparent' );
				
			});

			// Display in mobile
			$( '.ova_menu_clasic li.menu-item button.dropdown-toggle').off('click').on( 'click', function() {
			    $(this).parent().find('.dropdown-menu').first().toggle('fast');
			});

        	if( $('.ovamenu_shrink').length > 0 && $( 'body' ).data('elementor-device-mode') == 'desktop' ){
				
				if( !$('.show_mask_header').hasClass( 'mask_header_shrink' ) ){
					$( '<div class="show_mask_header mask_header_shrink" style="position: relative; height: 0;"></div>' ).insertAfter('.ovamenu_shrink');
					

				}

				
				var header = $('.ovamenu_shrink');
				var header_shrink_height = header.height();
				

				$(window).scroll(function () {
						
						var scroll = $(this).scrollTop();

						if (scroll >= header_shrink_height+150 ) {
							header.addClass( 'active_fixed' );
							$('.mask_header_shrink').css('height',header_shrink_height);
				        } else {
				            header.removeClass('active_fixed');
				            $('.mask_header_shrink').css('height','0');
				        }
				});
			}

			if( $('.ovamenu_shrink_mobile').length > 0 && $( 'body' ).data('elementor-device-mode') != 'desktop' ){
				
				if( !$('.show_mask_header_mobile').hasClass( 'mask_header_shrink_mobile' ) ){
					$( '<div class="show_mask_header_mobile mask_header_shrink_mobile" style="position: relative; height: 0;"></div>' ).insertAfter('.ovamenu_shrink_mobile');
					
				}
				
				var header = $('.ovamenu_shrink_mobile');
				var header_shrink_height = header.height();
				

				$(window).scroll(function () {
						
						var scroll = $(this).scrollTop();

						if (scroll >= header_shrink_height+150 ) {
							header.addClass( 'active_fixed' );
							$('.mask_header_shrink_mobile').css('height',header_shrink_height);
				        } else {
				            header.removeClass('active_fixed');
				            $('.mask_header_shrink_mobile').css('height','0');
				        }
				});
			}

        });

        /* End Shrink menu */

        /* Search Popup */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_search_popup.default', function(){
			$( '.ova_wrap_search_popup i' ).on( 'click', function(){
				$( this ).closest( '.ova_wrap_search_popup' ).addClass( 'show' );
			});

			$( '.btn_close' ).on( 'click', function(){
				$( this ).closest( '.ova_wrap_search_popup' ).removeClass( 'show' );

			});
		});
		/* end Search Popup */

		/* Skill bar */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_skill_bar.default', function(){
			$('.skillbar').appear();
			$(document.body).on( 'appear', '.skillbar', function(){
				jQuery(this).find('.skillbar-bar').animate({
					width:jQuery(this).attr('data-percent'),
				},3000);

				jQuery(this).find('.percent').animate({
					left: jQuery(this).attr('data-percent') 
				},{
					duration: 3000,
					step: function( now, fx ){
						// console.log( 'now: ' + now );
						var data = Math.round(now);
						$(this).find('.relative span').html(data + '%');
					}

				});

			});

		});
		/* end skill bar */


		/* Form email */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_form_mail.default', function(){
			$('.ova-form-mail input[type="submit"]').on('click', function(e){
				var that = $(this);
				var flag = true;
				$('.ova-form-mail .con .input .error').css({'display':'none'});
				that.closest('.ova-form-mail').find('.field').each(function( index ){
					if( $(this).hasClass('required') && $(this).val() == '' ){
						flag = false;
						$(this).parent('.input').children('.error').css({'display':'block'});
					}
				});

				if( ! flag ){
					e.preventDefault();
					return false;
				}
				
			})
		});
		/* end email */


		/* testimonial */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_testimonial.default', function(){
			$(".slide-testimonials").each(function(){
		        var owlsl = $(this) ;
		        var owlsl_ops = owlsl.data('options') ? owlsl.data('options') : {};

		        var responsive_value = {
		            0:{
		              items:1,
		              nav:false
		            },
		            576:{
		              items:1

		            },
		            992:{
		              items:1
		            },
		            1170:{
		              items:owlsl_ops.items
		            }
		        };
		        
		        owlsl.owlCarousel({
		          autoWidth: owlsl_ops.autoWidth,
		          margin: owlsl_ops.margin,
		          items: owlsl_ops.items,
		          loop: owlsl_ops.loop,
		          autoplay: owlsl_ops.autoplay,
		          autoplayTimeout: owlsl_ops.autoplayTimeout,
		          center: owlsl_ops.center,
		          nav: owlsl_ops.nav,
		          dots: owlsl_ops.dots,
		          thumbs: owlsl_ops.thumbs,
		          autoplayHoverPause: owlsl_ops.autoplayHoverPause,
		          slideBy: owlsl_ops.slideBy,
		          smartSpeed: owlsl_ops.smartSpeed,
		          navText:[
		          '<i class="fa fa-angle-left" ></i>',
		          '<i class="fa fa-angle-right" ></i>'
		          ],
		          responsive: responsive_value,
		        });

		      /* Fixed WCAG */
		      owlsl.find(".owl-nav button.owl-prev").attr("title", "Previous");
            owlsl.find(".owl-nav button.owl-next").attr("title", "Next");
            owlsl.find(".owl-dots button").attr("title", "Dots");

		      });
		});
		/* end testimonial */

		/* ova_slide*/
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_slide.default', function(){
			$(".slide").each(function(){
		        var owlsl = $(this) ;
		        var owlsl_ops = owlsl.data('options') ? owlsl.data('options') : {};

		        var responsive_value = {
		            0:{
		              items:1,
		              nav:false
		            },
		            576:{
		              items:1

		            },
		            768:{
		              items:2
		            },
		            1025:{
		              items:owlsl_ops.items
		            }
		        };
		        
		        owlsl.owlCarousel({
		          autoWidth: owlsl_ops.autoWidth,
		          margin: owlsl_ops.margin,
		          items: owlsl_ops.items,
		          loop: owlsl_ops.loop,
		          autoplay: owlsl_ops.autoplay,
		          autoplayTimeout: owlsl_ops.autoplayTimeout,
		          center: owlsl_ops.center,
		          nav: owlsl_ops.nav,
		          dots: owlsl_ops.dots,
		          thumbs: owlsl_ops.thumbs,
		          autoplayHoverPause: owlsl_ops.autoplayHoverPause,
		          slideBy: owlsl_ops.slideBy,
		          smartSpeed: owlsl_ops.smartSpeed,
		          navText:[
		          '<i class="fa fa-angle-left" ></i>',
		          '<i class="fa fa-angle-right" ></i>'
		          ],
		          responsive: responsive_value,
		        });

		      });
		});
		/* end ova_slide */


		/* ova_blog_slide */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_blog_slide.default', function(){
			$(".blog-slide").each(function(){
		        var owlsl = $(this) ;
		        var owlsl_ops = owlsl.data('options') ? owlsl.data('options') : {};
		        var responsive_value = {
		            0:{
		              items:1,
		              nav:false,
		              autoplayHoverPause:false
		            },
		            576:{
		              items:1,
		              autoplayHoverPause:false


		            },
		            992:{
		              items:2,
		              nav:false
		            },
		            1170:{
		              items:owlsl_ops.items
		            }
		        };
		        
		        owlsl.owlCarousel({
		          autoWidth: owlsl_ops.autoWidth,
		          margin: owlsl_ops.margin,
		          items: owlsl_ops.items,
		          loop: owlsl_ops.loop,
		          autoplay: owlsl_ops.autoplay,
		          autoplayTimeout: owlsl_ops.autoplayTimeout,
		          center: owlsl_ops.center,
		          nav: owlsl_ops.nav,
		          dots: owlsl_ops.dots,
		          thumbs: owlsl_ops.thumbs,
		          autoplayHoverPause: owlsl_ops.autoplayHoverPause,
		          slideBy: owlsl_ops.slideBy,
		          smartSpeed: owlsl_ops.smartSpeed,
		          navText:[
		          '<i class="arrow_carrot-left" ></i>',
		          '<i class="arrow_carrot-right" ></i>'
		          ],
		          responsive: responsive_value,
		        });
		        
		        /* Fixed WCAG */
		        owlsl.find(".owl-nav button.owl-prev").attr("title", "Previous");
		        owlsl.find(".owl-nav button.owl-next").attr("title", "Next");
		        owlsl.find(".owl-dots button").attr("title", "Dots");

		      });
		});
		/* end ova_blog_slide */
		

		/* contact */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_contact_slide.default', function(){
			$(".slide-contact").each(function(){
		        var owlsl = $(this) ;
		        var owlsl_ops = owlsl.data('options') ? owlsl.data('options') : {};

		        var responsive_value = {
		            0:{
		              items:1,
		              nav:false
		            },
		            576:{
		              items:1

		            },
		            992:{
		              items:2
		            },
		            1170:{
		              items:owlsl_ops.items
		            }
		        };
		        
		        owlsl.owlCarousel({
		          autoWidth: owlsl_ops.autoWidth,
		          margin: owlsl_ops.margin,
		          items: owlsl_ops.items,
		          loop: owlsl_ops.loop,
		          autoplay: owlsl_ops.autoplay,
		          autoplayTimeout: owlsl_ops.autoplayTimeout,
		          center: owlsl_ops.center,
		          nav: true,
		          dots: owlsl_ops.dots,
		          thumbs: owlsl_ops.thumbs,
		          autoplayHoverPause: owlsl_ops.autoplayHoverPause,
		          slideBy: owlsl_ops.slideBy,
		          smartSpeed: owlsl_ops.smartSpeed,
		          navText:[
		          '<i class="arrow_carrot-left" ></i>',
		          '<i class="arrow_carrot-right" ></i>'
		          ],
		          responsive: responsive_value,
		        });

		        /* Fixed WCAG */
		        owlsl.find(".owl-nav button.owl-prev").attr("title", "Previous");
		        owlsl.find(".owl-nav button.owl-next").attr("title", "Next");
		        owlsl.find(".owl-dots button").attr("title", "Dots");

		      });
		});
		/* end contact */

		/* Time Coundown */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_time_countdown.default', function(){
			
			var date = $('.due_date').data('day').split(' ');
			var day = date[0].split('-');
			var time = date[1].split(':');
			var date_countdown = new Date( day[0], day[1]-1, day[2], time[0], time[1] );
			$('.due_date').countdown({until: date_countdown, format: 'DHMS'});
			
		});
      // end time countdown 
      

      /* ova_history */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_history.default', function(){
			

			$(window).scroll(function() {
				var wS = $(this).scrollTop();
	      		$('.ova-history .wp-item').each(function(){
	      			var hT = $(this).offset().top;
				    var hH = $(this).outerHeight();
				    var wH = $(window).height();
				    
				   if (wS + 250 > (hT+hH-wH)){
				      $(this).addClass('active');
				   }
		  		})
			});
			
		
      			// end ova_history
   
   		});
   		/* ova_title_slide */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_title.default', function(){
			$(".title-slide").each(function(){
		        var owlsl = $(this) ;
		        var owlsl_ops = owlsl.data('options') ? owlsl.data('options') : {};

		        var responsive_value = {
		            0:{
		              items:1,
		              nav:true
		            },
		            576:{
		              items:1,
		              nav:true

		            },
		            992:{
		              items:1,
		              nav:true
		            },
		            1170:{
		              items:owlsl_ops.items
		            }
		        };
		        
		        owlsl.owlCarousel({
		          autoWidth: owlsl_ops.autoWidth,
		          margin: owlsl_ops.margin,
		          items: owlsl_ops.items,
		          loop: owlsl_ops.loop,
		          autoplay: owlsl_ops.autoplay,
		          autoplayTimeout: owlsl_ops.autoplayTimeout,
		          center: owlsl_ops.center,
		          nav: owlsl_ops.nav,
		          dots: owlsl_ops.dots,
		          thumbs: owlsl_ops.thumbs,
		          autoplayHoverPause: owlsl_ops.autoplayHoverPause,
		          slideBy: owlsl_ops.slideBy,
		          smartSpeed: owlsl_ops.smartSpeed,
		          navText:[
		          '<i class="arrow_carrot-left" ></i>',
		          '<i class="arrow_carrot-right" ></i>'
		          ],
		          responsive: responsive_value,
		        });

		        /* Fixed WCAG */
		        owlsl.find(".owl-nav button.owl-prev").attr("title", "Previous");
		        owlsl.find(".owl-nav button.owl-next").attr("title", "Next");

		      });
		});
		/* end ova_title_slide */


   		  /* ova_tabs */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_tabs.default', function(){

          function activeTab(obj)
                {
                    // Xóa class active tất cả các tab
                    $('.tab-wrapper ul li').removeClass('active');

                    // Thêm class active vòa tab đang click
                    $(obj).addClass('active');

                    // Lấy href của tab để show content tương ứng
                    var id = $(obj).find('a').attr('href');

                    // Ẩn hết nội dung các tab đang hiển thị
                    $('.tab-item').hide();

                    // Hiển thị nội dung của tab hiện tại
                    $(id) .show();
                }

                // Sự kiện click đổi tab
                $('.tab li').click(function(){
                    activeTab(this);
                    return false;
                });

                // Active tab đầu tiên khi trang web được chạy
                activeTab($('.tab li:first-child'));
			
		
      		
   		});
   		// end ova_tabs

   				  /* ova_give */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_give_donations.default', function(){

           if( $(".archive_give_donation .media .video").length > 0 ){
         $(".archive_give_donation .media .video").fancybox({
            iframe : {
               css : {
                  maxWidth : '80%',
               }
            }
         });
      }
			
		
      		
   		});
   		// end ova_give




   		/* ova_iso */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_iso.default', function(){

			var $grid = $('.ova_isotope').isotope({
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
				// use element for option
				columnWidth: '.grid-sizer'
				}
			});

			$(window).resize(function(){
				$grid.isotope('layout');
			});

			$( document ).ready(function() {
			   $grid.isotope('layout');
			});
      		
   	});
   		// end ova_iso

   		/* ova_page_menu */
		elementorFrontend.hooks.addAction('frontend/element_ready/ova_menu_page.default', function(){

			$('.ova_menu_page.type3').each(function(){
				var toggle = $(this).find('.dropdown-toggle');
				toggle.off('click').on('click', function(){
					$(this).parent().find('.dropdown-menu').first().toggle('fast');
				});
			});
      		
   		});
   		// end ova_page_menu
   
   
});

})(jQuery);
