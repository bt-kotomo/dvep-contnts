var Backbone = require('backbone');
var SlideShowModel = require('./slideshow_model.js');
require('../../../../lib/components/slickSlider/slick/slick.min.js');
module.exports = (function () {
	var SlideShowCollection = Backbone.Collection.extend({
		url: AppConf.url.appRoot + "/slideshow/get",
		model: SlideShowModel,
		initialize: function(options){
			this.index = 0;
		},
		parse: function(response) {
			return response.slideshowContentsList;
		},
		fetchWithoutAuthInfo: function( options ){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			var _this = this;
			var model = new SlideShowModel( { id: AppConf.core.localStorageKey } );
			model.safeFetch();

			var on400 = _options.on400 || function() {
			};

			return this.fetch(_options)
			.done(function(data) {
				data.slideshowContentsList = data.slideshowContentsList.map(function(item, index) {
					var imageUrl = item.imageUrl;
					if (imageUrl && imageUrl.indexOf('https') == -1 && imageUrl.indexOf('http') > -1) {
						item.imageUrl = imageUrl.replace('http', 'https');
					}
					return item;
				});
				_this.successSlideShow( data, model );
			})
			.fail(function(err) {
				on400();
			});
		},
		fetchWithAuthInfo: function( options ){
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR });
			var _this = this;
			var model = new SlideShowModel( { id: AppConf.core.localStorageKey } );
			model.safeFetch();

			var on400 = _options.on400 || function() {
			};

			return this.fetch(_options).done(function(data) {
				data.slideshowContentsList = data.slideshowContentsList.map(function(item, index) {
					var imageUrl = item.imageUrl;
					if (imageUrl && imageUrl.indexOf('https') == -1 && imageUrl.indexOf('http') > -1) {
						item.imageUrl = imageUrl.replace('http', 'https');
					}
					return item;
				});
				_this.successSlideShow(data, model);
			}).fail(function(err) {
				on400();
			});
		},
		// imgBase64: function(src){
		// 	var _this = this;
		// 	var canvas = document.createElement("canvas");
		// 	var imgUrl;
  //         	if (!canvas || !canvas.getContext || !canvas.getContext('2d')) {
  //           	return;
  //         	}
  //         	var image = new Image();
  //         	image.setAttribute('crossOrigin', 'anonymous');
						
			
  //         	image.src = src;
  //         	image.onload = function() {

  //           	// 画像をbase64にするためにCanvasを利用するので、
  //           	// クロスドメインの画像は無理かも。。
  //           	var canvas = document.createElement("canvas");
  //           	canvas.width = image.width;
  //           	canvas.height = image.height;
  //           	canvas.getContext('2d').drawImage(image, 0, 0);
  //           	var base64 = canvas.toDataURL();
  //           	for (var i = _this.index; i < _this.length; i++){
		// 			if ( _this.models[i].get("imageUrl") ){
		// 				_this.models[i].set("imageUrl", base64);
		// 				_this.index++;
		// 				if ( _this.index >= _this.length ){
		// 					var model = new SlideShowModel( { id: AppConf.core.localStorageKey } );
		// 					model.safeFetch();
		//         			model.setSlideInfo( _this.models );
		// 					_this.index = 0;
  //           			}
		// 				return;
		// 			}else{
		// 				_this.index++;
		// 			}
  //           	}
		// 	}
		// },
		onLoad:function() {
			this.showSlide();

			var h_slider, h_window , h_menuContainer;
			h_window = $(window).height();
     		h_menuContainer = $('.menuContainer').height();
     		h_slider = h_window - h_menuContainer - 30;
     		$('.slickSlider').css({'height' : h_window + 'px'});
     		$('.slickSlider .slick-dots').css({'top' : h_slider + 'px'});
     		$('.slickSlider')[0].slick.setPosition();
		},
		showSlide: function(){
    		$('.slickSlider').slick({
				autoplay: true,
				autoplaySpeed: AppConf.slideshow.autoplaySpeed,
				accessibility: false,
				speed: AppConf.slideshow.speed,
				arrows: false,
				dots: true,
				fade: true,
				useCSS: false,
				pauseOnHover: false,
				variableHeight: true,
				zIndex: 1,
      		});
		},
		successSlideShow: function(data, model) {
			this.reset();
			if ( data.slideshowContentsList.length === 0 ) {
				$('#havedata').addClass('hide');
				$('#nodata').removeClass('hide');
				// this.add( AppConf.slideshow.slideshowContentsList );
			}else {
				this.add( data.slideshowContentsList );
				model.setSlideInfo( data.slideshowContentsList );
				// for (var i = 0; i < _this.length; i++){
				// 	imgUrl = _this.models[i].get("imageUrl");
				// 	if ( imgUrl ){
				// 		_this.imgBase64( imgUrl );
				// 	}
				// }
			}
			$(window).bind('load', this.onLoad());
		}
	});

	return SlideShowCollection;
})();
