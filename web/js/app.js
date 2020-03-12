(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function( $ ){

  var PageSlider = function(options){

    this.container = options.container;
    this.beforeSlide = options.beforeSlide;
    this.afterSlide = options.afterSlide;
    this.currentPage = undefined;
    this.currentView = undefined;
    this.stateHistory = options.initialHistory || [];

  };

  PageSlider.prototype = {
    back : function(){
      if (this.stateHistory[this.stateHistory.length - 2] != null) {
        location.hash = this.stateHistory[this.stateHistory.length - 2];
      } else {
        location.hash = '#';
      } },
    home: function(){
      this.stateHistory = ["", ""];
      location.hash = '#';
    }, 
    backAndRestartHistory: function(){
      this.stateHistory =["", window.location.hash];
      this.back();
    },
    overWriteLastHistoryKeyDate: function(yyyymmdd) {
      var lastIndex, lastState;
      lastIndex = this.stateHistory.length - 1;
      lastState = this.stateHistory[lastIndex];
      return this.stateHistory[lastIndex] = lastState.replace(/\d{8}/, yyyymmdd);
    },
    overWriteLastHistory : function(locationHash) {
      var lastIndex;
      lastIndex = this.stateHistory.length - 1;
      this.stateHistory[lastIndex] = locationHash;
    },
    slidePage : function(renderedView, options) {

      var l, state;
      var _options = options || {};

      l = this.stateHistory.length;
      state = window.location.hash;
      if (l === 0) {
        this.stateHistory.push(state);
        this.slidePageFrom(renderedView);
        return;
      }
      if (state === this.stateHistory[l - 2]) {
        this.stateHistory.pop();
        return this.slidePageFrom(renderedView, "page-left");
      } else {
        this.stateHistory.push(state);
        return this.slidePageFrom(renderedView, "page-right");
      }
    },

    slidePageFrom : function(renderedView, from) {
      var page;
      if (this.beforeSlide) {
        this.beforeSlide();
      }
      page = renderedView.$el;
      this.container.append(page);
      if (!this.currentPage || !from) {
        page.attr("class", "page page-center");
        this.currentPage = page;
        this.currentView = renderedView;
        if (this.afterSlide) {
          this.afterSlide();
        }
        return;
      }
      page.attr("class", "page " + from);
      this.currentPage.one("webkitTransitionEnd", (function(_this) {
        return function(e) {
          $(e.target).remove();
          _this.currentView.destroy();
          _this.currentView = renderedView;
          _this.toTop();
          if (_this.afterSlide) {
            return _this.afterSlide();
          }
        };
      })(this));
      this.container[0].offsetWidth;
      page.attr("class", "page transition page-center");
      this.currentPage.attr("class", "page transition " + (from === "page-left" ? "page-right" : "page-left"));
      return this.currentPage = page;
    },

    toTop : function() {
      return setTimeout(function() {
        return window.scrollTo(0, 0);
      }, 100);
    },


  };

  return PageSlider;

});




},{}],2:[function(require,module,exports){
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.7
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
window.$ = require('jquery');
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;if(b.$slider.children().children().length >0){b.$slides=b.$slider.children().children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide");}else{b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide");};b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.options.arrows===!0&&(c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove())),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var c=this,d=c.currentSlide;c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),c.asNavFor(e),void 0):(c.slideHandler(e),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)
})):i.postSlide(e),i.animateHeight(),void 0):(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.swipeLeft=b.options.vertical===!1?d+f*g:d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this,b=a.$slider.find("*").is(":focus");a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false",tabindex:"0"}).find("a, input, button, select").attr({tabindex:"0"}),b&&a.$slideTrack.find(".slick-active").focus()},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length,f=0;for(f;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
},{"jquery":"QRCzyp"}],3:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length, unitSize) {
  if (unitSize) length -= length % unitSize;
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":4,"ieee754":5,"is-array":6}],4:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],5:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],6:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],7:[function(require,module,exports){
// application
require('./hinagata/main');

},{"./hinagata/main":138}],8:[function(require,module,exports){
// Libraries
// 
window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

// App Core
var Router = require('./router');
var AppModel = require('./models/app_model');
var MainLayout = require('./main_layout.js');
var HeaderModel = require('./header/header_model.js');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

// Features
var ConfigRouter = require( './features/config/config_router' );
var CouponRouter = require( './features/coupon/coupon_router' );
var StampRouter = require('./features/stamp/stamp_router');
var ShopRouter = require('./features/shop/shop_router');
var PointRouter = require('./features/point/point_router');
var HistoryRouter = require('./features/history/history_router');
var InformationRouter = require('./features/information/information_router');
var AutoLoginRouter = require('./features/autologin/autologin_router');
var SmartRouter = require('./features/smart/smart_router');
var MemberRouter = require('./features/member/member_router');
var MenuRouter = require('./features/menu/menu_router');
var SnsRouter = require('./features/sns/sns_router');

//////////
// DEMO Features
var ScratchRouter = require( './features/scratch/scratch_router' );
var ChirashiRouter = require( './features/chirashi/chirashi_router' );

// UTILS
var TextUtil = require('./utils/text');
var StyleUtil = require('./utils/style.js');
var DebugUtil = require('./utils/debug.js');
var DateUtil = require('./utils/date.js');
var BadgeUtil = require('./utils/badge');
var BtApi = require('./utils/bt_api');
var ApplicanEx = require('./utils/applican_ex');
var StorageUtil = require('./utils/storage.js');
var CacheUtil = require('./utils/cache.js');

/**
 * 雛形アプリのメインオブジェクト
 * グローバルにインスタンスを配置する想定
 * Backbone.Marionette.Application
 */
module.exports = (function () {
	var mainApp = new Backbone.Marionette.Application();

	// util メソッド定義
	mainApp.util = {};
	// Text 
	mainApp.util.text = TextUtil;
	// Style
	mainApp.util.style = StyleUtil;
	// Debug
	mainApp.util.debug = DebugUtil;
  	// Date
	mainApp.util.date = DateUtil;
	// Badge
	mainApp.util.badge = BadgeUtil;
	// Applican
	mainApp.applican = new ApplicanEx();
	// BT API
	mainApp.btApi = new BtApi( {
		ApplicationId : AppConf.core.applicationId,
		rootUrl: AppConf.url.appRoot,
		ContentsVersion : AppConf.core.contentsVersion,
	});
    // Storage
    mainApp.util.storage = StorageUtil;
    // Cache
    mainApp.util.cache = CacheUtil;

	// ヘッダの内容はAppで管理
	mainApp.headerModel = new HeaderModel();

	// Appスタート
	// onDeviceReadyにてapp.startされる
	mainApp.onStart = function(){

		this.appModel = new AppModel(); 
		mainApp.listenTo( this.appModel, 'ready', function(model){

			// registration id 関連の処理
			mainApp.applican.getBtPushTokenPromise().done(function(result){

				var old = model.getPushToken(); 
				var registrationId = result.registrationId;

				// BtApi に registrationId を保存
				mainApp.btApi.RegistrationId = registrationId;

				// LivepassのRegistrationIDをCRMに登録
                if(App.util.storage.getStorage("notification_insert_" + registrationId) === undefined) {
                    mainApp.btApi.insert({
                        registrationId: registrationId,
                        old: old
                    })
                        .done(function(data){
                            if(AppConf.features.autoregist && App.getAuthInfo().token !== data.accessToken){
                                mainApp.appModel.setAuthAndSave( { userid: "", token: data.accessToken } );
                            }
                            App.util.storage.setStorage("notification_insert_" + registrationId, data, AppConf.expire.notification.insert);
                        })
                        .fail(function(){
                            applican.notification.alert(
                                AppConf.message.registrationIdUpdateFailure,
                                function(){},
                                AppConf.message.information,
                                AppConf.message.yes);
                        });
                }

				model.set("pushToken", result.registrationId );
				model.save();

				// Livepassのセッティングを適用
				mainApp.applican.livepassSetSettingsPromise()
				.fail(function(d){ console.log("Livepass 設定情報反映エラー"); console.log(d);})
				.done(function(d){ console.log("Livepass 設定情報反映成功"); console.log(d);}) 
			});

			var neverShownTutorial = !model.get("tutorialShown");
			model.set({ tutorialShown: true });
			model.save().done(function(){
				if( neverShownTutorial ){
					setTimeout( function(){
						location.href = "./features/tutorial/tutorial.html";
					}, 2000);
				}
			});

		});

		this.appModel.safeFetch();

		this.mainLayout = new MainLayout( {el: $('#main-layout')} );
		this.mainLayout.render();
		this.pageSlider = new PageSlider({
			container: $('#master-container'),
			initialHistory: [""]
		});

		// features
		var router = new Router();
		var configRouter = (AppConf.features.config)? new ConfigRouter() : void(0);
		var couponRouter = (AppConf.features.coupon)? new CouponRouter() : void(0);
		var stampRouter = (AppConf.features.stamp)? new StampRouter() : void(0);
		var shopRouter = (AppConf.features.shop)? new ShopRouter() : void(0);
		var pointRouter = (AppConf.features.point)? new PointRouter() : void(0);
		var historyRouter = (AppConf.features.history)? new HistoryRouter() : void(0);
		var informationRouter = (AppConf.features.information)? new InformationRouter() : void(0);
		var autologinRouter = (AppConf.features.autologin)? new AutoLoginRouter() : void(0);
		var chirashiRouter = (AppConf.features.chirashi)? new ChirashiRouter() : void(0);
		var scratchRouter = (AppConf.features.scratch)? new ScratchRouter() : void(0);
		var smartRouter = (AppConf.features.smart)? new SmartRouter() : void(0);
		var memberRouter = (AppConf.features.member)? new MemberRouter() : void(0);
		var menuRouter = (AppConf.features.menuRegis)? new MenuRouter() : void(0);
		var snsRouter = (AppConf.features.sns)? new SnsRouter() : void(0);

		Backbone.history.start();



		$(window).on("scroll" , function(e)
								 {
									 var bottomPos = 100;

									 var scrollHeight = $(document).height();
									 var scrollPosition = $(window).height() + $(window).scrollTop();

									 //スクロールが下に行った時の処理
									 if (scrollPosition > scrollHeight - bottomPos)
										 {
											 App.vent.trigger("reach:bottom");
                       //TODO: debug
										 }
								 });



	};



	mainApp.addAuthenticationHeaderToXHR = function(xhr){
		var auth = mainApp.getAuthInfo();
		xhr.setRequestHeader('Authorization', auth.token || "dummy" );
		mainApp.addApplicationHeaderToXHR(xhr);
	};
	mainApp.addApplicationHeaderToXHR = function(xhr){
		xhr.setRequestHeader('ApplicationId', AppConf.core.applicationId );
		mainApp.initializeXHR(xhr);
	};

	mainApp.initializeXHR = function(xhr){
		// default http header setting
		_.each(mainApp.btApi.getDefaultAjaxHeaders(), function(value, key, list){
			xhr.setRequestHeader(key, value);
		});

		// setup Ajax
		App.btApi.setupAjax(xhr);
	};

	mainApp.vent.on('app-login', function( data ){
		// do nothing for now
	});

	mainApp.getAuthInfo = function(){
		return mainApp.appModel.get("auth");
	};



	// ローディング表示用のDOMをSTRINGで返す
	mainApp.util.injectProgressScreenDom = function(){
		return require('./progress_screen.html')();
	};

	// ローディングを表示する
	mainApp.util.showProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').addClass('show').addClass('visible');
		mainApp.mainLayout.$('.progress-image').css({"margin-top" : (100 + window.scrollY) + "px"});
	};
	// ローディングを非表示にする
	mainApp.util.hideProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').removeClass('visible');
		setTimeout(function(){
			mainApp.mainLayout.$('.progress-screen').removeClass('show');
		}, 220);
	};
	// リクエストの前にLoadingスクリーンを表示し、エラーまたは正常終了で消してくれる
	// 引数 : jqXHRオブジェクトを返す関数オブジェクト
	mainApp.util.execWithProgressScreen = function( reqFunction ){
		// Execution
		mainApp.util.showProgressScreen();
		return reqFunction()
		.done(function(){
			mainApp.util.hideProgressScreen();
		}).fail(function(){
			mainApp.util.hideProgressScreen();
		});
	};
	// model/collectionのリクエスト発行時にローディングスクリーンを表示し、
	// 正常、異常終了時に非表示にする
	mainApp.util.bindProgressScreen = function( view, modelOrCollection ){
		view.listenTo( modelOrCollection, 'request' , mainApp.util.showProgressScreen );
		view.listenTo( modelOrCollection, 'sync' , mainApp.util.hideProgressScreen );
		view.listenTo( modelOrCollection, 'error' , mainApp.util.hideProgressScreen );
	};

	// ajaxリクエストを返す処理に、デフォルトのエラーハンドリングを付与する
	// 引数 
	// jqXHR : jqXHRオブジェクト
	// options: ignoreStatuses - ex. [ 401, 402, 403 ]
	//          afterHandling - function which you wish to execute after common err handling
	mainApp.util.bindCommonErrorHandling =  function(jqXHR, options){
		var options = options || {};
		var ignoreStatuses = _.union(options.ignoreStatuses, [503]) || [503];
		var afterAlertCallback = options.afterAlertCallback || App.doNothing;

		return jqXHR.fail( function(err){
			// err.status が ignoreStatusesに含まれている場合は何もしない
			if( ignoreStatuses.indexOf(err.status) === -1){
				applican.notification.alert("エラーが発生しました。", afterAlertCallback, "", "OK");
			}
			if( options.afterHandling ){ options.afterHandling(); }
		});
	};

	mainApp.util.number = {
		roundEx: function( number, digitsAfterDecimalPoint ){
			var offset = Math.pow(10, digitsAfterDecimalPoint);
			return Math.round( number * offset  ) / offset
		},
	};

  mainApp.doNothing = function(){};

	return mainApp;

})();

},{"../../../lib/components/pageslider/pageslider":1,"./features/autologin/autologin_router":11,"./features/chirashi/chirashi_router":18,"./features/config/config_router":19,"./features/coupon/coupon_router":33,"./features/history/history_router":44,"./features/information/information_router":54,"./features/member/member_router":57,"./features/menu/menu_router":58,"./features/point/point_router":81,"./features/scratch/scratch_router":84,"./features/shop/shop_router":103,"./features/smart/smart_router":106,"./features/sns/sns_router":107,"./features/stamp/stamp_router":118,"./header/header_model.js":121,"./main_layout.js":140,"./models/app_model":161,"./progress_screen.html":180,"./router":181,"./utils/applican_ex":187,"./utils/badge":188,"./utils/bt_api":189,"./utils/cache.js":190,"./utils/date.js":191,"./utils/debug.js":192,"./utils/storage.js":193,"./utils/style.js":194,"./utils/text":195,"backbone":"DIOwA5","jquery":"QRCzyp","underscore":"s12qeW"}],9:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var AutoLoginLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./autologin_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			this.token = options.id;
			var userid = '';
			var password = '';
			var smstel = '';
			
			if( AppConf.features.sms ){
				var auth = App.getAuthInfo();
				smstel = auth.smstel;
				password = auth.password;
			} else {
				userid = '';
				password = '';
			}

			this.userModel = new UserModel();
			App.util.bindProgressScreen(this, this.userModel );

			_this = this;
			var loginRequest = function(){
//				console.log('loginRequest');
//				console.log(_this.token);
				return App.util.bindCommonErrorHandling(
					App.btApi.seamlessLogin( _this.token ),
					{ ignoreStatuses: [404] }
				);
			};

			// ログインリクエストを実行
			App.util.execWithProgressScreen( loginRequest )
			.done( function(data){
				// ログインが成功したら、ID/PASSを永続化して以前の画面に戻る
				if( AppConf.features.sms ){
					App.appModel.setAuthAndSave( { smstel: smstel, password: "", token: data.accessToken } );
					App.vent.trigger( 'app-login' , { smstel: smstel, password: password, token: data.accessToken });
				} else {
					App.appModel.setAuthAndSave( { userid: userid, password: password, token: data.accessToken } );
					App.vent.trigger( 'app-login' , { userid: userid, password: password, token: data.accessToken });
				}
				applican.notification.alert("登録完了しました", function(){}, "", "OK");
				App.pageSlider.backAndRestartHistory();
				applican.webView.reload();
			}).fail(function(err){
				if(err.status === 404){
					applican.notification.alert("ログインできません", App.doNothing, "", "OK");
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		},
		headerConf: {
			title: "アプリログイン",
			showBackButton: true,

		},
		onRender: function(){
//			this.ui.seamlessValue.html(this.token);
			App.util.hideProgressScreen();
		},
	});

	return AutoLoginLayoutView;
})();

},{"../../models/user_model.js":178,"./autologin_layout_template.html":10,"backbone":"DIOwA5"}],10:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="REGISTER-TOP" class="BACKBONE-PAGE">\r\n\r\n<div id="REGISTER-GUIDE">\r\n<div id="confirm_message"></div>\r\n\r\n<center><div id="seamless_value"></div><center>\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],11:[function(require,module,exports){
var Backbone = require('backbone');
var AutoLoginLayoutView = require('./autologin_layout.js');
var RegisterLayoutView = require('./register_layout.js');
var AutoLoginSmsLayoutView = require('./autologinsms_layout.js');

var querystring = require('querystring');
module.exports = (function () {

	var AutoLoginController = Backbone.Marionette.Controller.extend({
		showAutoLogin: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var autologinLayoutView = new AutoLoginLayoutView({
				id: id
			});
			autologinLayoutView.render();
			App.pageSlider.slidePage( autologinLayoutView );
			App.headerModel.applyViewHeaderConf( autologinLayoutView.headerConf );
		},
		showRegister: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var registerLayoutView = new RegisterLayoutView({
				id: id,
				ftype: queryObj.ftype
			});
			registerLayoutView.render();
			App.pageSlider.slidePage( registerLayoutView );
			App.headerModel.applyViewHeaderConf( registerLayoutView.headerConf );
		},
		showAutoLoginSms: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var autologinsmsLayoutView = new AutoLoginSmsLayoutView({
				id: id
	});
			autologinsmsLayoutView.render();
			App.pageSlider.slidePage( autologinsmsLayoutView );
			App.headerModel.applyViewHeaderConf( autologinsmsLayoutView.headerConf );
		},
	});

	var autologinController = new AutoLoginController();

	var AutoLoginRouter = Backbone.Marionette.AppRouter.extend({
		controller: autologinController,
		appRoutes: {
			"autologin/:id(?:query)" : "showAutoLogin",
			"register/:id(?:query)" : "showRegister",
			"autologinsms/:id(?:query)" : "showAutoLoginSms",
		}
	});

	return AutoLoginRouter;

})();

},{"./autologin_layout.js":9,"./autologinsms_layout.js":12,"./register_layout.js":14,"backbone":"DIOwA5","querystring":"k+Qmpp"}],12:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var AutoLoginLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./autologinsms_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			var userId = options.id;
			var auth = App.getAuthInfo();
			var smstel = auth.smstel;
			var password = auth.password;
			var tokentemp = auth.tokentemp;

			this.userModel = new UserModel();
			App.util.bindProgressScreen(this, this.userModel );

			if (tokentemp) {
				App.appModel.setAuthAndSave( { smstel: smstel, password: "", token: tokentemp } );
				App.pageSlider.backAndRestartHistory();
				App.vent.trigger( 'app-login' , { smstel: smstel, password: password, token: tokentemp });
				applican.notification.alert("登録完了しました", function(){}, "", "OK");
				applican.webView.reload();
			} else {
				applican.notification.alert("ログインできません", App.doNothing, "", "OK");
			}
		},
		headerConf: {
			title: "アプリログイン",
			showBackButton: true,

		},
		onRender: function(){
//			this.ui.seamlessValue.html(this.token);
			App.util.hideProgressScreen();
		},
	});

	return AutoLoginLayoutView;
})();

},{"../../models/user_model.js":178,"./autologinsms_layout_template.html":13,"backbone":"DIOwA5"}],13:[function(require,module,exports){
module.exports=require(10)
},{}],14:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var RegisterLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./register_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			var sid = options.id;
			var ftype = options.ftype;

			var url = "";
			if (ftype != null && ftype != "") {
				url = AppConf.url.registerForms[ftype];
			} else {
				url = AppConf.url.registerForm;
			}
			console.log( "ftype:" + ftype );

			if (url != null && url != "") {
				url += '&SID=' + sid;
			location.href = url + '&_native_open_embedded';
			}
		},
		headerConf: {
			title: "会員登録",
			showBackButton: true,

		},
		onRender: function(){
			App.util.hideProgressScreen();
//			App.pageSlider.backAndRestartHistory();
		},
	});

	return RegisterLayoutView;
})();

},{"../../models/user_model.js":178,"./register_layout_template.html":15,"backbone":"DIOwA5"}],15:[function(require,module,exports){
module.exports=require(10)
},{}],16:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var ChirashiListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./chirashi_list_layout_template.html'),
		regions: {
		},
		initialize: function(options){
		},
		headerConf: {
			title: "チラシ一覧",
			showBackButton: true,
		},
	});

	return ChirashiListLayout;
})();

},{"./chirashi_list_layout_template.html":17,"backbone":"DIOwA5"}],17:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CHIRASHI-LIST" class="BACKBONE-PAGE">\r\n<div id="chirashi-list-region">\r\n\t<ul>\r\n\t\t<li class="bdcolor1 bgcolor1">\r\n\t\t\t<a href="'+
((__t=( AppConf.demo.chirashi.viewer ))==null?'':__t)+
'?img='+
((__t=( AppConf.demo.chirashi.chirashi1.imageUrl ))==null?'':__t)+
'&_native_open_embedded">\r\n\t\t\t\t<div class="row">\r\n\t\t\t\t\t<div class="chirashiImg" >\r\n\t\t\t\t\t\t<img src="'+
((__t=( AppConf.demo.chirashi.chirashi1.thumbnailUrl ))==null?'':__t)+
'">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="chirashiText">'+
((__t=( AppConf.demo.chirashi.chirashi1.title ))==null?'':__t)+
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</a>\r\n\t\t</li>\r\n\t\t<li class="bdcolor1 bgcolor1">\r\n\t\t\t<a href="'+
((__t=( AppConf.demo.chirashi.viewer ))==null?'':__t)+
'?img='+
((__t=( AppConf.demo.chirashi.chirashi2.imageUrl ))==null?'':__t)+
'&_native_open_embedded">\r\n\t\t\t\t<div class="row">\r\n\t\t\t\t\t<div class="chirashiImg" >\r\n\t\t\t\t\t\t<img src="'+
((__t=( AppConf.demo.chirashi.chirashi2.thumbnailUrl ))==null?'':__t)+
'">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="chirashiText">'+
((__t=( AppConf.demo.chirashi.chirashi2.title ))==null?'':__t)+
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</a>\r\n\t\t</li>\r\n\t</ul>\r\n</div>\r\n</div>\r\n<!-- 実装時にはコメントアウトを解除 : ローディング画像表示のため '+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
' -->\r\n';
}
return __p;
};

},{}],18:[function(require,module,exports){
var Backbone = require('backbone');
var ChirashiListLayout = require("./chirashi_list_layout.js");
module.exports = (function () {

	var ChirashiController = Backbone.Marionette.Controller.extend({
		showChirashiList: function(){
			var chirashiLayout = new ChirashiListLayout();
			chirashiLayout.render();
			App.pageSlider.slidePage( chirashiLayout );
			App.headerModel.applyViewHeaderConf( chirashiLayout.headerConf );
		},
	});

	var chirashiController = new ChirashiController();

	var ChirashiRouter = Backbone.Marionette.AppRouter.extend({
		controller: chirashiController,
		appRoutes: {
			"chirashi" : "showChirashiList",
		}
	});

	return ChirashiRouter;

})();

},{"./chirashi_list_layout.js":16,"backbone":"DIOwA5"}],19:[function(require,module,exports){
var Backbone = require('backbone');
var ConfigTopLayoutView = require('./config_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var ConfigController = Backbone.Marionette.Controller.extend({
		showConfigTop: function(){
			var configTopLayoutView = new ConfigTopLayoutView();
			configTopLayoutView.render();
			App.pageSlider.slidePage( configTopLayoutView );
			App.headerModel.applyViewHeaderConf( configTopLayoutView.headerConf );
		}
	});

	var configController = new ConfigController();

	var ConfigRouter = Backbone.Marionette.AppRouter.extend({
		controller: configController,
		appRoutes: {
			"config" : "showConfigTop",
		}
	});

	return ConfigRouter;

})();

},{"./config_top_layout.js":20,"backbone":"DIOwA5","querystring":"k+Qmpp"}],20:[function(require,module,exports){
var Backbone = require('backbone');
var CardModel = require('../../models/card_model.js');
module.exports = (function () {
	window.hoge = new CardModel();

	var ConfigTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./config_top_layout_template.html'),
		regions: {
		},
		ui: {
			"logoutBtn" : "#logout-btn",
			"updateUserBtn": "#update-user-btn",
			"wdcBtn" : "#wdc-btn",
			"WDCserial" : ".WDCserial"
		},
		events: {
			"click @ui.logoutBtn" : "execLogout",
			"click @ui.updateUserBtn": "openUpadateUserWindow",
			"click @ui.wdcBtn": "openWDCWindow",
		},
		initialize: function(){
			this.cardModel = new CardModel();
			App.util.bindProgressScreen(this, this.cardModel);
			this.listenTo(this.cardModel, 'sync', this._renderCard);
		},
		headerConf: {
			title: "設定",
            showBackButton: true,
            customeBackAction: function(){
				App.pageSlider.home();
			}
		},
		onRender: function () {
			if (App.getAuthInfo().token) {
				this.cardModel.fetchWithAuthInfo();
			}
			App.util.hideProgressScreen();
		},
		_renderCard: function(){
			var WDCserial = this.cardModel.get("WDCserial");
			if ( WDCserial == null ) {
				this.ui.WDCserial.removeClass('hide');
			}
		},
		openUpadateUserWindow: function(){
			this.getSeamlessparam(function(seamlessparam, member) {
				location.href = App.util.text.addUrlParameters( AppConf.url.modifyUserInfo,['smid=' + seamlessparam, '_native_open_embedded'] );
			});
		},
		openWDCWindow: function() {
			this.getSeamlessparam(function(seamlessparam) {
				location.href = App.util.text.addUrlParameters( AppConf.url.wdcURL,['smid=' + seamlessparam, '_native_open_embedded'] );
			});
		},
		getSeamlessparam: function(callback) {
			var _this = this;
			this.cardModel.fetchWithAuthInfo().done(function(){

				var member = _this.cardModel.get("member")[0]
				if( !member ){
					return applican.notification.alert("ユーザ情報の取得に失敗しました。一度ログアウトして、ログインし直してください。", function(){}, "", "OK");
				}
				var seamlessparam = member.seamlessparam;
				seamlessparam = encodeURIComponent(seamlessparam);
				callback && callback(seamlessparam, member);
			})
		},
		execLogout: function(){
			var logoutRequest = function(){
				return App.util.bindCommonErrorHandling( App.btApi.logout(),{ ignoreStatuses: [401] } );
			};
			App.util.execWithProgressScreen( logoutRequest )
			.done( function(data){
				//cache
				App.util.storage.removeMember();

				// #7050 対応
				applican.notification.alert("ログアウトしました", App.doNothing, "", "OK");
				App.appModel.saveAsLogout();
				App.pageSlider.backAndRestartHistory();
				applican.webView.reload();
			}).fail(function(err){
				if(err.status === 401){
					applican.notification.alert("ログアウトしました", App.doNothing, "", "OK");
	                App.appModel.saveAsLogout();
	                App.pageSlider.backAndRestartHistory();
	                applican.webView.reload();
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		}
	});

	return ConfigTopLayoutView;
})();

},{"../../models/card_model.js":164,"./config_top_layout_template.html":21,"backbone":"DIOwA5"}],21:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE">\r\n\r\n<div class="bgcolor3 ftcolor1">\r\n\t<ul>\r\n\r\n\t\t';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\r\n\t\t\t<li class="bdcolor1" id=""><a href="#poex01">ポイント交換</a></li>\r\n\t\t\t<li class="bdcolor1" id="update-user-btn"><a>会員情報変更</a></li>\r\n\t\t';
 } 
__p+='\r\n\r\n\t\t<!-- <li class="bdcolor1"><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.term, ['_native_open_embedded']) ))==null?'':__t)+
'">利用規約</a></li> -->\r\n\t\t<li class="bdcolor1"><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.privacyPolicy, ['_native_open_embedded']) ))==null?'':__t)+
'">プライバシーポリシー</a></li>\r\n\t\t<li class="bdcolor1"><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.membershipTerms, ['_native_open_external']) ))==null?'':__t)+
'">会員規約</a></li>\r\n\t\t<li class="bdcolor1"><a href="./features/tutorial/tutorial.html">使い方を見る</a></li>\r\n\t\t<li class="WDCserial hide bdcolor1" id="wdc-btn"><a >WDCシリアル登録</a></li>\r\n\r\n\t\t';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\r\n\t\t\t';
 if( AppConf.features.autoregist ){ 
__p+='\r\n\t\t\t\t';
 if( AppConf.features.sms ){ 
__p+='\r\n\t\t\t\t<li class="bdcolor1"><a href="#loginSms">別なアカウントでログイン</a></li>\r\n\t\t\t\t';
 } else { 
__p+='\r\n\t\t\t\t<li class="bdcolor1"><a href="#login">別なアカウントでログイン</a></li>\r\n\t\t\t\t';
 } 
__p+='\r\n\t\t\t';
 }else{ 
__p+='\r\n\t\t\t\t<li class="bdcolor1"><span id="logout-btn">ログアウト</span></li>\r\n\t\t\t';
 } 
__p+='\r\n\t\t';
 }else{ 
__p+='\r\n\t\t\t';
 if( AppConf.features.sms ){ 
__p+='\r\n\t\t\t<li class="bdcolor1"><a href="#loginSms">ログイン</a></li>\r\n\t\t\t';
 } else { 
__p+='\r\n\t\t\t<li class="bdcolor1"><a href="#login">ログイン</a></li>\r\n\t\t\t';
 } 
__p+='\r\n\t\t';
 } 
__p+='\r\n\t\t<li class="bdcolor1"><a href="#history">利用履歴</a></li>\r\n\r\n\t</ul>\r\n</div>\r\n\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],22:[function(require,module,exports){
var Backbone = require('backbone');
var CouponItemView = require('./coupon_item_view.js');
var BaseCollectionView = require('../../views/base_collection_view.js');
module.exports = (function () {
	var CouponCollectionView = BaseCollectionView.extend({
		childView: CouponItemView,
		tagName: 'ol',
		className: 'COUPONS'
	});
	return CouponCollectionView;
})();

},{"../../views/base_collection_view.js":196,"./coupon_item_view.js":30,"backbone":"DIOwA5"}],23:[function(require,module,exports){
var Backbone = require('backbone');
var CouponModel = require('../../models/coupon_model.js');
var CouponCollection = require('../../models/coupon_collection.js');
var CouponDetailMainView = require('./coupon_detail_main_view.js');
var CouponDialogueItemView = require('./dialogue/coupon_dialogue_item_view.js');
module.exports = (function () {

	var CouponDetailLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./coupon_detail_layout_template.html'),
		regions: {
			"couponDetailRegion" : "#coupon-detail-region",
			"couponDialogueRegion": "#coupon-dialogue-region"
		},
		events:{
			"click #use_coupon": "use"
		},
		initialize: function(options){
			this.couponId = options.id;
			this.uCoupId  = options.uCoupId;

			this.couponModel = {};
			if ( this.uCoupId ) {
				this.couponCollection = new CouponCollection( { pagination: true } );
			} else {
				this.couponCollection = new CouponCollection({ couponId: this.couponId, pagination: true });
			}
			this.couponDetailMainView;

			this.couponDialogueItemView = new CouponDialogueItemView();

			App.util.bindProgressScreen(this, this.couponCollection );
			this.listenTo( this.couponCollection, 'page-info-has-been-set', this.fetchCouponAll );
			this.listenTo( this, "load:sync", this.onLoad );
			// this.listenTo( this.couponCollection , 'sync', this.renderMainFromCollection);

			var _this = this;
			this._fetchCoupons(true);
		},
		headerConf: {
			title: "クーポン詳細",
			showBackButton: true,
		},
		renderMainFromCollection: function(){
			var a;
			$('.page').removeClass('page-center');
			this.couponDialogueRegion.show( this.couponDialogueItemView );
			if ( this.couponCollection.length > 0 ) {
				if ( this.uCoupId ) {
					a = this.couponCollection.where({ uCoupId :this.uCoupId });
				} else {
					this.couponCollection.orderByExpires();
					a = this.couponCollection.where({ id :parseInt(this.couponId) });
				}
				// var a = this.couponCollection.where({ uCoupId :this.uCoupId });
				this.couponModel = a[0];
				if ( this.uCoupId ) {
					this.couponDetailMainView = new CouponDetailMainView( {model: this.couponModel , uCoupId: this.uCoupId} );
				} else {
					this.couponDetailMainView = new CouponDetailMainView( {model: this.couponModel , uCoupId: this.couponModel.uCoupId} );
				}
				// this.couponDetailRegion.show( new CouponDetailMainView( {model: this.couponModel , uCoupId: this.uCoupId} ) );
				this.couponDetailRegion.show( this.couponDetailMainView );
				this.setHeightDialogue();
			} else {
				this.setHeightDialogue();
				this.couponDialogueItemView.showDialogue("#couponErr3_dialogue", "エラー", "クーポンが存在しないか、配布されていません。");
				this.fixPosition();
			}
		},
		_fetchCoupons: function(remove){
			// ログインエラーが出る場合は公開クーポンを採りにいく
			// this.couponCollection.fetchWithAuthInfo({
			// 	on401: (function(_this){
			// 		return function(){
			// 			_this.couponCollection.fetchOpenCoupons();
			// 		};
			// 	})(this)
			// });
			this.couponCollection.fetchCouponAll({ remove: remove });
		},
		fetchCouponAll: function() {
			if( this.couponCollection.isAtLastPage() ) {
				this.renderMainFromCollection();
			} else {
				this._fetchCoupons(false);
			}
		},
		use: function(){
			this.couponDetailMainView.use();
		},
		onLoad:function(){
			$('.page').removeClass('page-center');
		},
		setHeightDialogue: function() {
			var h_window = $(window).height();
			if ( this.couponCollection.length > 0 ) {
				$('#showdialogue-coupon').css({'height' : $('#coupon-detail-region').height() + 40 + 'px'});
			} else {
				$('#showdialogue-coupon').css({'height' : h_window + 'px'});
			}
		},
		fixPosition: function() {
			var windowH = $(window).height();
			var dialogueH = ( windowH - $('#couponErr3_dialogue').height() ) / 2 ;
			$('#couponErr3_dialogue').css({'position':'fixed','top':dialogueH});
		}
	});

	return CouponDetailLayoutView;
})();

},{"../../models/coupon_collection.js":166,"../../models/coupon_model.js":169,"./coupon_detail_layout_template.html":24,"./coupon_detail_main_view.js":26,"./dialogue/coupon_dialogue_item_view.js":35,"backbone":"DIOwA5"}],24:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="COUPON-DETAIL" class="BACKBONE-PAGE">\r\n<div id="coupon-dialogue-region"></div>\r\n<div id="coupon-detail-region" class="bgcolor1">\r\n</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],25:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- '+
((__t=( useCondInterval ))==null?'':__t)+
'  -->\r\n\r\n<div id="use-status-view" class="hlftcolor2 hlbgcolor2"></div>\r\n<div class="box_img_detail"><img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'"></div>\r\n<div class="coupon_title ftcolor1">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n<div class="coupon_detail ftcolor3">'+
((__t=( App.util.text.nl2br( detailText ) ))==null?'':__t)+
'\t</div>\r\n<dl>\r\n\r\n';
 if( usePeriodType + "" === "0" ){ 
__p+='\r\n\t<dt class="use_time_title ftcolor1">利用期間</dt>\r\n\t<dd class="ftcolor3">'+
((__t=( formatDate( usePeriodStartDate ) ))==null?'':__t)+
' ～ '+
((__t=( formatDate( usePeriodEndDate ) ))==null?'':__t)+
'</dd>\r\n';
 }else{ 
__p+='\r\n\t<dt class="use_time_title ftcolor1">有効期限</dt>\r\n\t<dd class="ftcolor3">'+
((__t=( formatDate( expires ) ))==null?'':__t)+
'</dd>\r\n';
 } 
__p+='\r\n\r\n';
 if( useCondLimit > 0 ){ 
__p+='\r\n\t<dt class="use_check_title ftcolor1">利用条件</dt>\r\n\t<dd class="ftcolor3">先着'+
((__t=( useCondLimit ))==null?'':__t)+
'名様までご利用可能</dd>\r\n';
 } 
__p+='\r\n\r\n';
 if( useCondNumber > 0 ){ 
__p+='\r\n\t<dt class="use_check_title ftcolor1">回数制限</dt>\r\n\t<dd class="ftcolor3">合計'+
((__t=( useCondNumber ))==null?'':__t)+
'回まで利用可能</dd>\r\n';
 } 
__p+='\r\n\r\n\t<dt class="use_attention_title ftcolor1">備考・注意事項</dt>\r\n\t<dd class="ftcolor3">'+
((__t=( note ))==null?'':__t)+
'</dd>\r\n</dl>\r\n<div class="btn_area">\r\n';
 if( isBeforeTerm ){ 
__p+='\r\n\t<button type="button" disabled id="use-btn" class="btbgcolor1 btftcolor1">利用期間開始前</button>\r\n';
 } else if( canBeUsed ){ 
__p+='\r\n\t<button type="button" id="use-btn" class="btbgcolor1 btftcolor1">このクーポンを使う</button>\r\n';
 }else{ 
__p+='\r\n\t<button type="button" disabled class="btbgcolor1 btftcolor1">'+
((__t=( limitConditionText() ))==null?'':__t)+
'</button>\r\n';
 } 
__p+='\r\n\t<button style="display:none;" type="button" id="share-btn" class="btbgcolor2 btbdcolor1 btftcolor2">このクーポン情報をシェア</button>\r\n</div>\r\n';
}
return __p;
};

},{}],26:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {

	var CouponDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_detail_main_template.html'),
		useStatusTemplate: require('./coupon_detail_use_template.html'),
		QRTemplate: require('./coupon_detail_qr_template.html'),
		events:{
			// "click #use-btn" : "use",
			"click #use-btn": "show_dialogue_confirm"
		},
		initialize: function(options){
			this.dialogueFlg;
			this.listenTo(this.model, 'change', this.render );
		},
		templateHelpers:{
			formatDate: function( dateTime ){
				if( !dateTime ) return "";
				return moment( dateTime ).format("YYYY/MM/DD HH:mm:ss");
			},
			limitConditionText: function(){
				var condition = this.limitCode;
				return {
					"1":"既に" + this.useCondLimit + "名様にご利用頂きました", /* 先着制限 */
					"2":"ご利用有り難うございました", /* 回数制限 */
					"3":"本日分は既にご利用済みです", /* 同日利用制限 */
				}[condition] || "利用済み";
			}
		},
		show_dialogue_confirm: function(){
			var confirmDsp = this.model.get("confirmationDisp");
			if ( confirmDsp === "1" ){
				this.dialogueFlg = "1";
				$("#showdialogue-coupon, #confirm_dialogue").addClass("show");
				this.fixPosition( this.dialogueFlg );
			}else{
				this.use();
			}
		},
		remove_dialogue_confirm: function(){
			$("#showdialogue-coupon, #confirm_dialogue").removeClass("show");
		},
		use: function(){
			if( this.model.needGEOLocationToUse() ){
				// 位置情報を取得した後にリクエストを投げる
				var options = {};
				var _this = this;

				App.util.showProgressScreen();
				App.applican.getCurrentPositionPromiss(options)
				.done(function(rtn){ 
					var longitude = rtn.coords.longitude;
					var latitude = rtn.coords.latitude;
					_this._postUseRequest({longitude: longitude, latitude: latitude } );
				})
				.fail(function(err){ 
					// Geolocationがマストで無い場合はそのまま投げる
					if( _this.model.canBeUsedWithoutGEOLocation() ){
						_this._postUseRequest();
					}else{
						// applican.notification.alert("位置情報取得に失敗しました", App.util.hideProgressScreen,"","OK");
						_this.remove_dialogue_confirm();
						_this.dialogueFlg = "2";
						App.util.hideProgressScreen();
						$("#showdialogue-coupon, #couponErr1_dialogue").addClass("show");
						_this.fixPosition( _this.dialogueFlg );
					}
				});
			}else{
				this._postUseRequest();
			}
		},
		_postUseRequest: function( options ){
			var _this = this;
			var _options = options || {};
			var requestAction = function(){ 
				return App.btApi.useCoupon({ 
					id: _this.model.get("id"),
					uCoupId: _this.model.get("uCoupId"),
					longitude: _options.longitude,
					latitude: _options.latitude
				}).done(function(res){
					_this.model.use(); // レンダリングは change イベントに頼る
					_this.remove_dialogue_confirm();
					_this._showUseStatus( _this._buildStatusOptionsFromUseResponse( res ) );
					window.scrollTo(0, 0);
				}).fail(function(err){
					if(err.status === 403){
						// applican.notification.alert("最寄りの店舗が見つからないため、クーポンを利用できません。", App.doNothing, "", "OK");
						_this.remove_dialogue_confirm();
						_this.dialogueFlg = "3";
						$("#showdialogue-coupon, #couponErr2_dialogue").addClass("show");
						_this.fixPosition( _this.dialogueFlg );
					}
				});
			};
			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ),
				{ignoreStatuses: [404,403]}
			);
		},
		onRender: function(){
			this.stickit();
		},
		_buildStatusOptionsFromUseResponse: function( res ){

			var useDateTime = Number( new Date() );
			var shopName = (res.shop)? res.shop.name : "";
			var qr = res.qrData;
			var rtn =  {
				useDateTime: useDateTime,
				shopName: shopName,
				qr: qr
			};

			// TODO: この情報 + uCouopIDをローカルストレージに入れる事で、リロード対策を行いたい 
			// 30秒以内に同じ画面を開いた場合は消しコミ画面を表示する仕様を提案する
			// 問題はQRで、これはワンタイムとかそういうものではないか注意

			return rtn;

		},

		_showUseStatus: function( params ){

			var params = params || {};
			// QR
			if( params.qr ){
				var obj = {};
				obj.color = "000000";
				obj.qr = encodeURIComponent(params.qr);
				var $parent = this.$el.parents("#COUPON-DETAIL");
				$parent.append( this.QRTemplate( obj ) );
				var h_window = $(window).height() - 44;
				var h_coupon_detail = $("#COUPON-DETAIL").height();
				if ( h_window > h_coupon_detail ) {
					$(".qrOverlay").css({"height": h_window});
				} else {
					$(".qrOverlay").css({"height": h_coupon_detail});
				}
				$parent.addClass("disable-scroll");
			}else{
				// それ以外
				var obj = {};
				obj.useDateTime = moment( params.useDateTime ).format("YYYY/MM/DD HH:mm:ss");
				obj.shopName = params.shopName || "-";
				this.$('#use-status-view').append( this.useStatusTemplate( obj ));
			}
		},

		fixPosition:function(dialogueFlg){
			var dialogueH;
			var windowH = $(window).height();
			switch ( dialogueFlg ){
				case "1" :
					dialogueH = ( windowH - $('#confirm_dialogue').height() ) / 2 ;
					$('#confirm_dialogue').css({'position':'fixed','top': dialogueH});
					break;
				case "2" :
					dialogueH = ( windowH - $('#couponErr1_dialogue').height() ) / 2 ;
					$('#couponErr1_dialogue').css({'position':'fixed','top':dialogueH});
					break;
				case "3" :
					dialogueH = ( windowH - $('#couponErr2_dialogue').height() ) / 2 ;
					$('#couponErr2_dialogue').css({'position':'fixed','top':dialogueH});
					break;
			}
		}

	});

	return CouponDetailMainView;

})();

},{"./coupon_detail_main_template.html":25,"./coupon_detail_qr_template.html":27,"./coupon_detail_use_template.html":28,"backbone":"DIOwA5","moment":"Vip+k1"}],27:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="qrOverlay">\r\n\t<div class="qrText">こちらの画像を提示してください</div>\r\n\t<img class="qrImage" src="https://chart.googleapis.com/chart?cht=qr&chs=157x157&chco='+
((__t=( color ))==null?'':__t)+
'&chl='+
((__t=( qr ))==null?'':__t)+
'">\r\n</div>\r\n';
}
return __p;
};

},{}],28:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="use_title hl2_bdcolor1">こちらの画面を提示してください</div>\r\n<div class="use_time">利用日時： '+
((__t=( useDateTime ))==null?'':__t)+
'</div>\r\n<div class="use_valid_time">有効期限： 上記日時から30分間有効</div>\r\n<div class="use_shop">利用店舗： '+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n';
}
return __p;
};

},{}],29:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="COUPON-ITEM-BOX ';
 if( isMemberOnly){ 
__p+='MEMBER-ONLY';
 } 
__p+='">\r\n\t<a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'" class="cf">\r\n      <div class="box_images">\r\n    \t\t<img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'">\r\n      </div> <!-- box_images -->\r\n\t\t\t<div class="coupon_info">\r\n    \t\t<div class="MEMBER-ONLY-MARK hlftcolor1 hlbgcolor1">会員限定クーポン</div>\r\n    \t\t';
 if(isBeforeTerm){ 
__p+='<div class="BEFORE-TERM-MARK hlftcolor2 hlbgcolor2">利用期間開始前</div>';
 } 
__p+='\r\n    \t\t<div class="coupon_name">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n    \t\t<div class="valid_time">有効期限:'+
((__t=( expiresFormat( expires ) ))==null?'':__t)+
'まで</div>\r\n\t\t\t</div> <!-- coupon_info -->\r\n\t</a>\r\n</div>\r\n';
}
return __p;
};

},{}],30:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');
var moment = require('moment');
module.exports = (function () {
	var CouponItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./coupon_item_template.html'),
		templateHelpers: {
			expiresFormat: function( date ){
				return moment(date).format("YYYY年MM月DD日");
			},
		},
		onRender: function() {
			if (!AppConf.couponList.showAll && !this.model.canBeUsed())	this.$el.hide();
		}
	});

	return CouponItemView;

})();

},{"./coupon_item_template.html":29,"backbone":"DIOwA5","jquery":"QRCzyp","moment":"Vip+k1"}],31:[function(require,module,exports){
var Backbone = require('backbone');
var Collection = require('../../models/coupon_collection.js');
var CouponCollectionView = require('./coupon_collection_view.js');
module.exports = (function () {

	var CouponLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./coupon_layout_template.html'),
		regions: {
			'couponRegion' : '#couponsRegion'
		},
		ui:{
			"moreButton": ".more-button",
		},
		events: {
			"click @ui.moreButton": function(){ this._fetchCoupons({ remove: false }); },
		},
		initialize: function(){
			this.collection = new Collection({pagination: true});
			this.collectionView = new CouponCollectionView({collection: this.collection});

			App.util.bindProgressScreen(this, this.collection );
			this.listenTo( this.collection , 'sync', this.renderCollection);
			this.listenTo( this.collection, 'page-info-has-been-set', this._renderPageNation );

			var _this = this;
			this._fetchCoupons({remove: true});
		},
		headerConf: {
			title: "クーポン",
			showBackButton: true,
		},
		_renderPageNation: function(){
			if( this.collection.isAtLastPage() ){
				this.ui.moreButton.addClass("hide");
			}else{
				this.ui.moreButton.removeClass("hide");
			}
		},
		_fetchCoupons: function( options ){
			// ログインエラーが出る場合は公開クーポンを採りにいく
			this.collection.fetchWithAuthInfo({
				remove: options.remove,
				on401: (function(_this){
					return function(){
						_this.collection.fetchOpenCoupons({ remove: options.remove});
					};
				})(this)
			});
		},
		renderCollection: function(){
			this.couponRegion.show( this.collectionView );
		},
	});

	return CouponLayoutView;
})();

},{"../../models/coupon_collection.js":166,"./coupon_collection_view.js":22,"./coupon_layout_template.html":32,"backbone":"DIOwA5"}],32:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\t<div id="COUPON-LIST" class="BACKBONE-PAGE">\r\n\t\t<div style="display: none;" id="search" class="search serchbgcolor1">\r\n\t\t\t<div id="search_btn" class="search_btn">\r\n\t\t\t\t<button class="btbgcolor1 btftcolor1">検索</button>\r\n\t\t\t\t<button class="btbgcolor1 btftcolor1">近くのお店</button>\r\n\t\t\t\t<button class="btbgcolor1 btftcolor1">カテゴリ</button>\r\n\t\t\t</div>\r\n\t\t\t<input type="text" id="search_input" name="account_id" placeholder="フリーワード検索" value="">\r\n\t\t</div>\r\n\r\n\t\t<div id="couponsRegion" class="bgcolor1 ftcolor1">\r\n\t\t\t<ol class="COUPONS">\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<div class="COUPON-ITEM-BOX MEMBER-ONLY">\r\n\t\t\t\t\t\t<a href="" class="cf">\r\n\t\t\t\t\t\t\t<div class="box_images">\r\n\t\t\t\t\t\t\t  <img src="">\r\n              </div> <!-- box_images -->\r\n\t\t\t\t\t\t  <div class="coupon_info">\r\n\t\t\t\t\t\t\t  <div class="MEMBER-ONLY-MARK hlbgcolor1 hide_this">会員限定クーポン</div>\r\n\t\t\t\t\t\t\t  <div class="coupon_name"></div>\r\n\t\t\t\t\t\t\t  <div class="valid_time">有効期限:</div>\r\n\t\t\t\t\t\t  </div> <!-- coupon_info -->\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t</ol>\r\n\t\t</div>\r\n\t\t<button class="more-button hide readMoreButton">更に読み込む</button>\r\n\t</div>\r\n\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],33:[function(require,module,exports){
var Backbone = require('backbone');
var QouponLayoutView = require('./coupon_layout.js');
var QouponDetailLayoutView = require('./coupon_detail_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var CouponController = Backbone.Marionette.Controller.extend({
		showCouponIndex: function(){
			var couponLayoutView = new QouponLayoutView();
			couponLayoutView.render();
			App.pageSlider.slidePage( couponLayoutView );
			App.headerModel.applyViewHeaderConf( couponLayoutView.headerConf );
		},
		showCouponDetail: function( id, query ){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var couponDetailLayoutView = new QouponDetailLayoutView({
				id: id,
				uCoupId: queryObj.uCoupId
			});
			couponDetailLayoutView.render();
			App.pageSlider.slidePage( couponDetailLayoutView );
			App.headerModel.applyViewHeaderConf( couponDetailLayoutView.headerConf );
			couponDetailLayoutView.trigger("load:sync");
		}
	});

	var couponController = new CouponController();

	var CouponRouter = Backbone.Marionette.AppRouter.extend({
		controller: couponController,
		appRoutes: {
			"coupon" : "showCouponIndex",
			"coupon/:id(?:query)" : "showCouponDetail",
		}
	});

	return CouponRouter;

})();

},{"./coupon_detail_layout.js":23,"./coupon_layout.js":31,"backbone":"DIOwA5","querystring":"k+Qmpp"}],34:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="bg_opacity" id="showdialogue-coupon">\r\n\t<div class="dialogue" id="confirm_dialogue">\r\n\t\t<div class="content">\r\n\t\t<h1>利用確認</h1>\r\n\t\t<p style="text-align:center">クーポンを利用します。確定するには、確認ボタンを押してください。</p>\r\n\t\t<a id="use_coupon" class="btn">確認</a>\r\n\t\t<a class="btn close_dialogue" data-id="confirm_dialogue">キャンセル</a>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="dialogue" id="couponErr1_dialogue">\r\n\t\t<div class="content">\r\n\t\t\t<h1>店舗位置情報</h1>\r\n\t\t\t<p class="text">位置情報の取得に失敗しました。</p>\r\n\t\t\t<a class="btn close_dialogue" data-id="couponErr1_dialogue">OK</a>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="dialogue" id="couponErr2_dialogue">\r\n\t\t<div class="content">\r\n\t\t\t<h1>最寄の店舗</h1>\r\n\t\t\t<p class="text">最寄りの店舗が見つからないため、クーポンを取得できません。</p>\r\n\t\t\t<a class="btn close_dialogue" data-id="couponErr2_dialogue">OK</a>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="dialogue" id="couponErr3_dialogue">\r\n\t\t<div class="content">\r\n\t\t\t<h1 class="title">エラー</h1>\r\n\t\t\t<p class="text">クーポンが存在しないか、配布されていません。</p>\r\n\t\t\t<a class="btn close_dialogue" data-id="couponErr3_dialogue">OK</a>\r\n\t\t</div>\r\n\t</div>\r\n</div>';
}
return __p;
};

},{}],35:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var CouponDialogueItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_dialogue_item_template.html'),
		events: {
			"click .close_dialogue": "close_dialogue"
		},
		close_dialogue: function(e){
			var _this = $(e.currentTarget);
			var data_id = _this.attr("data-id");
			$('#showdialogue-coupon').removeClass('show');
			$('#' + data_id).removeClass('show');
			switch ( data_id ){
				case "couponErr1_dialogue","couponErr2_dialogue" :
					App.doNothing();
					break;
				case "couponErr3_dialogue":
					location.hash = "coupon";
					App.pageSlider.overWriteLastHistory("");
					break;
			}
		},
		showDialogue: function(element,title, msg) {
			$("#showdialogue-coupon, " + element).addClass("show");
			$("#couponErr3_dialogue .title").html(title);
			$("#couponErr3_dialogue .text").html(msg);
		}
	});

	return CouponDialogueItemView;

})();

},{"./coupon_dialogue_item_template.html":34,"backbone":"DIOwA5"}],36:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCompositeView = require('../../views/base_composite_view.js');
var HistoryItemView = require('./history_item_view.js');
module.exports = (function () {
	var HistoryCollectionView = BaseCompositeView.extend({
		childView: HistoryItemView,
		initialize: function(options){
			// this.shopCollection = options.shopCollection;
			this.mode = options.mode;
		},
		childViewContainer: "ol.history-list",
		template: require("./history_collection_view_template.html"),
		onRender: function(){
			this.$( "." + this.mode + "-head" ).removeClass("HIDE");
		},
		buildChildView: function(child, ChildViewClass, childViewOptions){

			// child.set("shopName", this._getShopName( child ) );

			// build the final list of options for the childView class
			var options = _.extend({model: child}, childViewOptions);
			// create the child view instance
			var view = new ChildViewClass(options);
			// return it
			return view;
		},
		_getShopName: function( model ){
			/*if( !model.get("shopId") ){ return ""; }

			var shop = this.shopCollection.findWhere({ id: "" + model.get("shopId") } );
			return (shop)?  shop.get("name") : "";*/
			return model.get("shopName");
		},
	});
	return HistoryCollectionView;
})();

},{"../../views/base_composite_view.js":197,"./history_collection_view_template.html":37,"./history_item_view.js":41,"backbone":"DIOwA5"}],37:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\r\n<ol>\r\n\t<li class="bgcolor4 ftcolor5 coupon-head HIDE">\r\n\t\t<div class="row">\r\n\t\t\t<div class="left_header col1">利用日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col2">利用クーポン名</div>\r\n\t\t\t<div class="right_header col3">利用店名</div>\r\n\t\t</div>\r\n\t</li>\r\n\t<li class="bgcolor4 ftcolor5 stamp-head HIDE">\r\n\t\t<div class="row">\r\n\t\t\t<div class="left_header col1">取得日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col4">取得店名</div>\r\n\t\t</div>\r\n\t</li>\r\n\t<li class="bgcolor4 ftcolor5 point-head HIDE">\r\n\t\t<div class="row">\r\n\t\t\t<div class="left_header col1">利用日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col2">収支</div>\r\n\t\t';
 if( AppConf.features.smart ){ 
__p+='\r\n\t\t\t<div class="right_header col3">取引種別</div>\r\n\t\t';
 } else { 
__p+='\r\n\t\t\t<div class="right_header col3">利用店名</div>\r\n\t\t';
 } 
__p+='\r\n\t\t</div>\r\n\t</li>\r\n</ol>\r\n<ol class="history-list"></ol>\r\n';
}
return __p;
};

},{}],38:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\r\n<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate ) ))==null?'':__t)+
'<br><span class=time>'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n<div class="use_coupon col2 bdcolor1">'+
((__t=( couponName ))==null?'':__t)+
'</div>\r\n<div class="use_shop col3 bdcolor1">'+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],39:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\r\n';
 if( AppConf.features.smart ){ 
__p+='\r\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate ) ))==null?'':__t)+
'<br><span class="time">'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n\t<div class="sall col2 bdcolor1">'+
((__t=( priceOrPointSign( price, pointType ) ))==null?'':__t)+
''+
((__t=( priceOrPoint( price, point ) ))==null?'':__t)+
''+
((__t=( priceOrPointDelimiter( price ) ))==null?'':__t)+
'</div>\r\n\t<div class="use_shop col3 bdcolor1">'+
((__t=( getReqClassValue( reqClass )))==null?'':__t)+
'</div>\r\n';
 } else { 
__p+='\r\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate ) ))==null?'':__t)+
'<br><span class="time">'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n\t<div class="sall col2 bdcolor1">'+
((__t=( pointTypeSign( pointType ) ))==null?'':__t)+
''+
((__t=( point ))==null?'':__t)+
'</div>\r\n\t<div class="use_shop col3 bdcolor1">'+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n\r\n</div>\r\n';
}
return __p;
};

},{}],40:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\r\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate )))==null?'':__t)+
'<br><span class="time">'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n\t<div class="use_shop col4 bdcolor1">'+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],41:[function(require,module,exports){
var Backbone = require('backbone');
var HistoryItemView = require('./history_item_view.js');
var moment = require('moment');
module.exports = (function () {
	var HistoryItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: function(modelSerializedData){
			if( modelSerializedData.isCouponHistory ){ return require('./history_item_coupon_template.html')(modelSerializedData); }
			if( modelSerializedData.isStampHistory ){ return require('./history_item_stamp_template.html')(modelSerializedData); }
			if( modelSerializedData.isPointHistory ){ return require('./history_item_point_template.html')(modelSerializedData); }
		},
		templateHelpers: {
			formatDate: function(dateTime){
				return moment(dateTime).format('YYYY/MM/DD');
			},
			formatTime: function(dateTime){
				return moment(dateTime).format('H:mm');
			},
			pointTypeSign: function( pointType ){
				return {
					0: "+",
					1: "-",
				}[pointType];
			},
			priceOrPoint: function(price, point){
				if (price == 0) {
					if (point < 0) {
						point = point * -1;
					}
					return point;
				} else {
					// price
					if (price < 0) {
						price = price * -1;
					}
					return price;
				}
			},
			getReqClassValue: function(reqClass){
				reqClassValue = AppConf.valuecard.reqClassValues[reqClass];
				if (reqClassValue == null) {
					reqClassValue = reqClass;
				}
				return reqClassValue;
			},
			priceOrPointSign: function(price, pointType){
				return "";
			},
			priceOrPointDelimiter: function(price){
				if (price == 0) {
					return "Ｐ";
				} else {
					return "円";
				}
			},
		},
	});
	return HistoryItemView;
})();

},{"./history_item_coupon_template.html":38,"./history_item_point_template.html":39,"./history_item_stamp_template.html":40,"./history_item_view.js":41,"backbone":"DIOwA5","moment":"Vip+k1"}],42:[function(require,module,exports){
var Backbone = require('backbone');
var HistoryCollection = require('../../models/history_collection.js');
var HistoryCollectionView = require('./history_collection_view.js');
// var ShopCollection = require('../../models/shop_collection.js');
module.exports = (function () {

	var HistoryMode = {
		coupon: "coupon",
		stamp: "stamp",
		point: "point",
	};

	var HistoryListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./history_list_layout_template.html'),
		regions: {
			"historyListRegion" : "#history-list-region",
		},
		ui: {
			"modeSwitchBtn" : ".mode-switch-btn",
		},
		events: {
			"click @ui.modeSwitchBtn" : "_onModeSwitchBtnClick",
		},
		initialize: function(options){
			this.mode = HistoryMode.point;
			this.historyCollection = new HistoryCollection();
			// this.shopCollection = new ShopCollection();
			this.listenTo( this, 'collections:sync', this._renderHistoryList);
		},
		onRender: function(){
			this._fetchAll();
		},
		_onModeSwitchBtnClick: function(e){
			e.preventDefault();
			var $target = this.$(e.currentTarget);
			var mode = $target.data('mode');
			this.mode = mode;
			this._fetchAll();
			this.ui.modeSwitchBtn.removeClass('active');
			$target.addClass('active');
			App.util.style.toInactive( this.ui.modeSwitchBtn );
			App.util.style.toActive( $target );
		},
		_fetchAll: function( mode ){
			var fetchHistory;
			switch( this.mode ){
				case HistoryMode.coupon :
					fetchHistory = _.bind( this.historyCollection.fetchCouponHistory, this.historyCollection);
				break;
				case HistoryMode.stamp:
					fetchHistory = _.bind( this.historyCollection.fetchStampHistory, this.historyCollection);
				break;
				case HistoryMode.point :
					fetchHistory = _.bind( this.historyCollection.fetchPointHistory, this.historyCollection);
				break;
			}

			var _this = this;
			var requestAction = function(){
				/*return $.when( fetchHistory(),
											_this.shopCollection.fetchWithAuthInfo()
										 ).done(function(){
											 _this.trigger('collections:sync');
										 });*/
				return $.when( fetchHistory()).done(function(){
											 _this.trigger('collections:sync');
										 });
			};
			App.util.execWithProgressScreen( requestAction );
		},
		headerConf: {
			title: "利用履歴",
			showBackButton: true,
		},
		_renderHistoryList: function(){
			this.historyListRegion.show( new HistoryCollectionView({
				collection: this.historyCollection,
				// shopCollection: this.shopCollection,
				mode: this.mode
			}));
		},
	});

	return HistoryListLayout;
})();

},{"../../models/history_collection.js":171,"./history_collection_view.js":36,"./history_list_layout_template.html":43,"backbone":"DIOwA5"}],43:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="HISTORY-LIST" class="BACKBONE-PAGE">\r\n<div class="btn_area serchbgcolor1">\r\n\t';
 if( AppConf.features.point || AppConf.features.smart ){ 
__p+='\r\n\t\t<button type="button" data-mode="point" class="mode-switch-btn active btftcolor1 btbgcolor1">ポイント</button>\r\n\t';
 } 
__p+='\r\n\t<button type="button" data-mode="coupon" class="mode-switch-btn btftcolor2 btbgcolor2">クーポン</button>\r\n\t';
 if( AppConf.features.stamp ){ 
__p+='\r\n\t\t<button type="button" data-mode="stamp" class="mode-switch-btn btftcolor2 btbgcolor2">スタンプ</button>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div id="history-list-region">\r\n</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],44:[function(require,module,exports){
var Backbone = require('backbone');
var HistoryListLayout = require("./history_list_layout.js");
module.exports = (function () {

	var HistoryController = Backbone.Marionette.Controller.extend({
		showHistoryList: function(){
			var historyLayout = new HistoryListLayout();
			historyLayout.render();
			App.pageSlider.slidePage( historyLayout );
			App.headerModel.applyViewHeaderConf( historyLayout.headerConf );
		},
	});

	var historyController = new HistoryController();

	var HistoryRouter = Backbone.Marionette.AppRouter.extend({
		controller: historyController,
		appRoutes: {
			"history" : "showHistoryList",
		}
	});

	return HistoryRouter;

})();

},{"./history_list_layout.js":42,"backbone":"DIOwA5"}],45:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollectionView = require('../../views/base_collection_view.js');
var InformationItemView = require('./information_item_view.js');
module.exports = (function () {
	var InformationCollectionView = BaseCollectionView.extend({
		childView: InformationItemView,
		tagName: 'ol',
		className: 'INFORMATION-LIST',
	});

	return InformationCollectionView;
})();

},{"../../views/base_collection_view.js":196,"./information_item_view.js":51,"backbone":"DIOwA5"}],46:[function(require,module,exports){
var Backbone = require('backbone');
var InformationModel = require('../../models/information_model.js');
var InformationDetailMainView = require('./information_detail_main_view.js');
module.exports = (function () {
	var InformationDetailLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./information_detail_layout_template.html'),
		regions: {
			"informationMainRegion" : "#information-main-region"
		},
		initialize: function(options){
			if(App.util.storage.getStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken()) === undefined) {
				App.btApi.popInformation({
					informationId: options.informationId,
					registrationId: App.appModel.getPushToken(),
				})
				.done(function(res){
					App.util.storage.setStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken(), res, AppConf.expire.information.pop);
				})
				.fail(function(err){
					if(err.status === 403){
						App.util.storage.setStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken(), err, AppConf.expire.information.pop);
					}
				});
			}
			this.informationModel = new InformationModel( { informationId: options.informationId });
			this.listenTo( this.informationModel, 'sync', this._renderInformation );
		},
		headerConf: {
			title: "お知らせ詳細",
			showBackButton: true,
		},
		onRender: function(){
			this._fetchInformation();
			this._readInformation();
		},
		_renderInformation: function(){
			this.informationMainRegion.show( new InformationDetailMainView({
				model: this.informationModel
			}));
		},
		_readInformation: function(){
			var informationId = this.informationModel.get("informationId");
			if(App.util.storage.getStorage("information_read_" + informationId + "_" + App.appModel.getPushToken()) === undefined) {
				App.btApi.readInformation({
					informationId: informationId,
					registrationId: App.appModel.getPushToken(),
				})
				.done(function(res){
					App.util.badge.setBadgeAppIcon( res.unReadCounts );
					App.util.storage.setStorage("information_read_" + informationId + "_" + App.appModel.getPushToken(), res, AppConf.expire.information.read);
				})
				.fail(function(err){
					if(err.status === 403){
						App.util.storage.setStorage("information_read_" + informationId + "_" + App.appModel.getPushToken(), err, AppConf.expire.information.read);
					}
				});
			}
		},
		_fetchInformation: function(){
			var _this = this;
			var requestAction = function(){
				if( App.getAuthInfo().token ){
					return _this.informationModel.fetchSingleInformation();
				}else{
					return _this.informationModel.fetchSingleInformationWithoutToken( App.appModel.get("pushToken") );
				}
			};
			App.util.execWithProgressScreen( requestAction );
		},
		setBadgeAppIcon: function( unReadCounts ) {
			if ( unReadCounts >= 1 ) {
				applican.localNotification.setBadgeNum(1);
			}else {
				applican.localNotification.setBadgeNum(0);
			}
		}
	});

	return InformationDetailLayout;

})();

},{"../../models/information_model.js":173,"./information_detail_layout_template.html":47,"./information_detail_main_view.js":49,"backbone":"DIOwA5"}],47:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="INFORMATION-DETAIL" class="BACKBONE-PAGE">\r\n<div id="information-main-region" class="bgcolor1">\r\n</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],48:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="info_date ftcolor1">'+
((__t=( formatDate( openDate ) ))==null?'':__t)+
'</div>\r\n<div class="info_title ftcolor1 bdcolor1">'+
((__t=( title ))==null?'':__t)+
'</div>\r\n\r\n';
 if(extras.contentHeader){ 
__p+='\r\n<div class="info_words">'+
((__t=( App.util.text.nl2br( extras.contentHeader ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
 if(imageUrl){ 
__p+='\r\n<img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" alt="店舗">\r\n';
 } 
__p+='\r\n';
 if(extras.contentFooter){ 
__p+='\r\n<div class="info_words">'+
((__t=( App.util.text.nl2br( extras.contentFooter ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
}
return __p;
};

},{}],49:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var InformationDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./information_detail_main_template.html'),
		templateHelpers: {
			formatDate: function(date){
				return date.split("-").join("/");
			}
		},
	});
	return InformationDetailMainView;
})();

},{"./information_detail_main_template.html":48,"backbone":"DIOwA5"}],50:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="INFORMATION-ITEM-BOX">\r\n\t<a href="#information/'+
((__t=( id ))==null?'':__t)+
'" class="cf">\r\n\t\t<div class="row cf">\r\n\t\t\t<div class="box_images">\r\n        ';
 if(imageUrl){ 
__p+='\r\n  \t\t\t <img src="'+
((__t=( imageUrl ))==null?'':__t)+
'">\r\n        ';
 }else{ 
__p+='\r\n  \t\t\t <img src="./image/common/noImage.png">\r\n        ';
 } 
__p+='\r\n      </div> <!-- box_images -->\r\n\t\t\t<div class="coupon_info">\r\n\t\t\t\t<div class="info_date ftcolor1">\r\n\t\t\t\t\t'+
((__t=( formatDate( openDate ) ))==null?'':__t)+
'\r\n\t\t\t\t\t';
 if( readFlg + "" !== "1" ){ 
__p+='<span class="NEWEST-MARK hlftcolor1 hlbgcolor1">NEW</span>';
 } 
__p+='\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="coupon_name">'+
((__t=( title ))==null?'':__t)+
'</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</a>\r\n</div>\r\n';
}
return __p;
};

},{}],51:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var InformationItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: 'bdcolor1',
		template: require('./information_item_template.html'),
		templateHelpers: {
			formatDate: function(date){
				return date.split("-").join("/");
			}
		}
	});
	return InformationItemView;
})();

},{"./information_item_template.html":50,"backbone":"DIOwA5"}],52:[function(require,module,exports){
var Backbone = require('backbone');
var InformationCollection = require('../../models/information_collection.js');
var InformationCollectionView = require('./information_collection_view.js');
module.exports = (function () {
	var InformationListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./information_list_layout_template.html'),
		regions: {
			"informationListRegion" : "#information-list-region"
		},

		// TODO : behaviorに移せるのならば移す
		ui:{
			"moreButton": ".more-button",
		},
		events: {
			"click @ui.moreButton": function(){ this._fetchInformation({ remove: false }); },
		},
		initialize: function(options){
			this.informationCollection = new InformationCollection({ pagination: true });
			this.listenTo( this.informationCollection, 'sync', this._onFetch );
			this.listenTo( this.informationCollection, 'page-info-has-been-set', this._renderPageNation );
		},
		headerConf: {
			title: "お知らせ一覧",
			showBackButton: true,
		},
		onRender: function(){
			this._fetchInformation({remove: true});
		},
		_onFetch: function(){
			this._renderInformationList();
			var unReadCounts = this.informationCollection.getUnReadCounts();
			App.util.badge.setBadgeAppIcon( unReadCounts );
		},

		_renderPageNation: function(){
			if( this.informationCollection.isAtLastPage() ){
				this.ui.moreButton.addClass("hide");
			}else{
				this.ui.moreButton.removeClass("hide");
			}
		},

		_renderInformationList: function(){
			this.informationListRegion.show( new InformationCollectionView({
				collection: this.informationCollection
			}));
		},
		// options :
		//   remove : true/false #trueは初期ロード、falseで追加ロード
		_fetchInformation: function( options ){
			var _this = this;
			var requestAction = function(){
				if( App.getAuthInfo().token ){
					return _this.informationCollection.fetchWithAuthInfo({remove: options.remove });
				}else{
					return _this.informationCollection.fetchWithoutLogin( App.appModel.getPushToken(), {remove: options.remove} );
				}
			};
			App.util.execWithProgressScreen( requestAction )
		},
	});

	return InformationListLayout;

})();

},{"../../models/information_collection.js":172,"./information_collection_view.js":45,"./information_list_layout_template.html":53,"backbone":"DIOwA5"}],53:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="INFORMATION-LIST" class="BACKBONE-PAGE">\r\n\t<div id="information-list-region" class="bgcolor1 ftcolor1">\r\n\t\t<ol class="INFORMATION-LIST">\r\n\t\t\t<li class="bdcolor1">\r\n\t\t\t\t<div class="INFORMATION-ITEM-BOX">\r\n\t\t\t\t\t<a href="" class="cf">\r\n<div class="box_images">\t\t\t\t\t\t\t<img src=""></div> <!-- box_images -->\r\n\t\t\t\t\t\t\t<div class="coupon_info">\r\n\t\t\t\t\t\t\t\t<div class="info_date ftcolor1">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;<span class="NEWEST-MARK hlftcolor1 hlbgcolor1 hide_this">NEW</span></div>\r\n\t\t\t\t\t\t\t\t<div class=""></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t<li class="bdcolor1">\r\n\t\t\t\t<div class="INFORMATION-ITEM-BOX">\r\n\t\t\t\t\t<a href="" class="cf">\r\n\t\t\t\t\t\t\t<div class="box_images"><img src=""></div> <!-- box_images -->\r\n\t\t\t\t\t\t\t<div class="coupon_info">\r\n\t\t\t\t\t\t\t\t<div class="info_date ftcolor1">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;<span class="NEWEST-MARK hlftcolor1 hlbgcolor1 hide_this">NEW</span></div>\r\n\t\t\t\t\t\t\t\t<div class=""></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t<li class="bdcolor1">\r\n\t\t\t\t<div class="INFORMATION-ITEM-BOX">\r\n\t\t\t\t\t<a href="" class="cf">\r\n\t\t\t\t\t\t\t<div class="box_images"><img src=""></div> <!-- box_images -->\r\n\t\t\t\t\t\t\t<div class="coupon_info">\r\n\t\t\t\t\t\t\t\t<div class="info_date ftcolor1">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;<span class="NEWEST-MARK hlftcolor1 hlbgcolor1 hide_this">NEW</span></div>\r\n\t\t\t\t\t\t\t\t<div class=""></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t</ol>\r\n\t</div>\r\n\t<button class="more-button hide readMoreButton">更に読み込む</button>\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],54:[function(require,module,exports){
var Backbone = require('backbone');
var InformationListLayout = require("./information_list_layout.js");
var InformationDetailLayout = require("./information_detail_layout.js");
module.exports = (function () {

	var InformationController = Backbone.Marionette.Controller.extend({
		showInformationList: function(){
			var informationLayout = new InformationListLayout();
			informationLayout.render();
			App.pageSlider.slidePage( informationLayout );
			App.headerModel.applyViewHeaderConf( informationLayout.headerConf );
		},
		showInformationDetail: function( id ){
			var informationDetailLayout = new InformationDetailLayout({ informationId: id });
			informationDetailLayout.render();
			App.pageSlider.slidePage( informationDetailLayout );
			App.headerModel.applyViewHeaderConf( informationDetailLayout.headerConf );
		},
	});

	var informationController = new InformationController();

	var InformationRouter = Backbone.Marionette.AppRouter.extend({
		controller: informationController,
		appRoutes: {
			"information" : "showInformationList",
			"information/:id" : "showInformationDetail",
		}
	});

	return InformationRouter;

})();

},{"./information_detail_layout.js":46,"./information_list_layout.js":52,"backbone":"DIOwA5"}],55:[function(require,module,exports){
var DataModel = require('../../models/data_model.js');
var CardModel = require('../../models/card_model.js');
var ValueModel = require('../../models/value_model.js');
var PointModel = require('../../models/point_model.js');
var Backbone = require('backbone');
module.exports = (function () {
	var CouponBuyView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./member_item_view_template.html'),
		headerConf: {
			title: "アプリ会員証",
			showBackButton: true,
			showHomeButton: true,
		},
		ui: {
			"cardImage" : "#MEMBER-DETAIL .card-image",
			"couponValue" : "#coupon-value",
			"couponLimit" : "#coupon-limit",
			"totalValue" : "#total-value",
			"pointValue" : "#point-value",
            "memberIdBarcode": "#member-id-barcode",
			"memberIdString": "#member-id-string",
			"txtrank" : ".txtrank"
		},
		initialize: function() {
			this.cardModel = new CardModel();
			this.pointModel = new PointModel();

			App.util.bindProgressScreen(this, this.cardModel );
			this.listenTo(this.cardModel, 'sync', this._renderCard);

			App.util.bindProgressScreen(this, this.pointModel);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);

			// this.valueModel = new ValueModel();
			// this.listenTo(this.valueModel, 'sync', this._renderValue);

			this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
			this.dataModel.safeFetch();
		},
		onRender: function() {
			var _this = this;
			this.cardModel.fetchWithAuthInfo({
				timeout: AppConf.timeout.member,
			})
			.fail(function(err){
				if ( err.status != 401 ) {
					if ( _this.dataModel ) {
						if ( _this.dataModel.getImageUrl() ) {
							_this.setUser(_this.dataModel.getImageUrl(), _this.dataModel.getUserId());
						} else {
							$(".box-bar-code").hide();
						}
					} else {
						$(".box-bar-code").hide();
					}
				}

				var img = './image/member/members.png';
				_this.ui.cardImage.attr('src', img);
			});

			this.pointModel.fetchWithAuthInfo({
				timeout: AppConf.timeout.member,
				on401: function(){}
			});
		},
		_renderCard: function() {
			var total = this.cardModel.get("total");
			if ( total && total !== null ) {
				this.ui.totalValue.html(total + ' <span class="text">円</span>');
			}

			var cardnum = this.cardModel.get('cardnum');
			var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
			//var img = AppConf.url.appRoot.substr(0, lengthUrl) + '/cp/barcode/code128.cgi?nt=1&height=80&c=' + cardnum + '&.png';
			var img = AppConf.url.appRoot.substr(0, lengthUrl) + '/cp/barcode/qr.cgi?nt=1&height=80&text=' + cardnum + '&.png';

			if ( cardnum !== null ) {
				// this.setUser(img, cardnum);
				this.dataModel.setUserId(cardnum);
				this.imgBase64(img, cardnum);
			} else {
				$(".box-bar-code").hide();
			}

			var img = './image/member/' + this.cardModel.get("cardtype") + '.png';
			this.ui.cardImage.attr('src', img);

			// display 「WDC-」 カード番号 
			var rank = this.cardModel.get('rank');
			if(rank == '21' || rank == '22' || rank == '23'){
				this.ui.txtrank.removeClass('hide');
			}

			// expire day
			var expiredPoint = this.cardModel.get('expiredpoint');
			if (expiredPoint == 0 || !expiredPoint ){
				this.ui.couponValue.html(App.util.text.numberWithDelimiter(0) + ' <span class="text">pt</span>');
				this.ui.couponLimit.html('失効の予定ポイントはありません。');
			} else {
				var nowMonth = new Date().getMonth() + 1;
				var yearDisplay = null;
				if(nowMonth > 3 && nowMonth <= 12){
					yearDisplay = new Date().getFullYear() + 1;
				}else{
					yearDisplay = new Date().getFullYear();
				}
				this.ui.couponValue.html(App.util.text.numberWithDelimiter(expiredPoint) + ' <span class="text">pt</span>');
				this.ui.couponLimit.html(yearDisplay+'年3月31日まで');
			}
		},
		_renderPoint: function(){
			var point = this.pointModel.get("point");
			if ( point && point !== null ) {
				this.ui.pointValue.html(App.util.text.numberWithDelimiter(point) + ' <span class="text">pt</span>');
			}
		},
		imgBase64: function(src, cardnum){
			var _this = this;
			var canvas = document.createElement("canvas");
          	if (!canvas || !canvas.getContext || !canvas.getContext('2d')) {
            	return;
          	}
          	var image = new Image();
          	image.setAttribute('crossOrigin', 'anonymous');

          	image.src = src;
          	image.onload = function() {
            	// 画像をbase64にするためにCanvasを利用するので、
            	// クロスドメインの画像は無理かも。。
            	var canvas = document.createElement("canvas");
            	canvas.width = image.width;
            	canvas.height = image.height;
            	canvas.getContext('2d').drawImage(image, 0, 0);
            	var base64 = canvas.toDataURL();
            	var model = new DataModel( { id: AppConf.core.localStorageKey } );
            	model.safeFetch();
            	model.setImageUrl(base64);
            	_this.setUser(base64, cardnum);
			}
			image.onerror = function(){
                _this.setUser(_this.dataModel.getImageUrl(), _this.dataModel.getUserId());
            }
			image.src = src;
		},
		setUser: function(imgUrl, memberId) {
            this.ui.memberIdBarcode.attr('src', imgUrl);
			if ( memberId ) {
                this.ui.memberIdString.text(memberId);
			}
			$(".box-bar-code").show();
		},
	});

	return CouponBuyView;

})();

},{"../../models/card_model.js":164,"../../models/data_model.js":170,"../../models/point_model.js":174,"../../models/value_model.js":179,"./member_item_view_template.html":56,"backbone":"DIOwA5"}],56:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="MEMBER-DETAIL" class="BACKBONE-PAGE bgcolor1">\r\n\t<div class="bg_cardmem">\r\n\t\t<div class="inner_card">\r\n\t\t\t<img src="./image/member/image_empty.png" alt="" class="card-image" />\r\n\t\t\t<div class="code_cardmem">\r\n\t\t\t\t<span class="txtrank hide">WDC-</span>\r\n\t\t\t\t<span id="member-id-string" class="bg_code"></span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="member_change">この画面をスタッフに提示して下さい。</div>\r\n\t<div id="smart-status-region" class="smart_status">\r\n\t\t<div class="box_code"><img id="member-id-barcode" class="qr_member"></div>\r\n\t\t<div class="current_smart">\r\n\t\t\t<div class="value-div1 ftcolor1">ポイント</div>\r\n\t\t\t<div class="value-div2">\r\n\t\t\t\t<span id="point-value" class="charge-text">0 <span class="text">pt</span></span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="total_smart">\t\r\n\t\t\t<div class="total-text ftcolor1">今年度累計購買金額</div>\r\n\t\t\t<div class="total-value">\r\n\t\t\t\t<span id="total-value" class="charge-text">0 <span class="text">円</span></span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="total_smart">\t\r\n\t\t\t<div class="total-text ftcolor1">失効予定ポイント</div>\r\n\t\t\t<div class="value-div2">\r\n\t\t\t\t<!-- <span class="charge-text">3,000<span class="text">円</span></span><br> -->\r\n\t\t\t\t<span id="coupon-value" class="charge-text">0</span><br>\r\n\t\t\t\t<!-- <span class="charge-limit">(有効期限：2018/04/04)</span> -->\r\n\t\t\t\t<!-- <span id="coupon-limit" class="charge-limit"></span> -->\r\n\t\t\t</div>\r\n\t\t\t<div id="coupon-limit" class="charge-limit"></div>\r\n\t\t</div>\t\r\n\t</div>\t\r\n\r\n\t<div id="available-coupon-region" class="bgcolor1 ftcolor1"></div>\r\n\t<br>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],57:[function(require,module,exports){
var Backbone = require('backbone');
var MemberItemView = require('./member_item_view.js');
module.exports = (function () {

	var MemberController = Backbone.Marionette.Controller.extend({

		showMember: function(){
			var memberView = new MemberItemView();
			memberView.render();
			App.pageSlider.slidePage( memberView );
			App.headerModel.applyViewHeaderConf( memberView.headerConf );
		}
	});

	var memberController = new MemberController();

	var MemberRouter = Backbone.Marionette.AppRouter.extend({
		controller: memberController,
		appRoutes: {
			"member" : "showMember"
		}
	});

	return MemberRouter;

})();

},{"./member_item_view.js":55,"backbone":"DIOwA5"}],58:[function(require,module,exports){
var Backbone = require('backbone');
var MenuTopLayoutView = require('./menu_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var MenuController = Backbone.Marionette.Controller.extend({
		showMenuRegis: function(){
			var menuTopLayoutView = new MenuTopLayoutView();
			menuTopLayoutView.render();
			App.pageSlider.slidePage( menuTopLayoutView );
			App.headerModel.applyViewHeaderConf( menuTopLayoutView.headerConf );
		}
	});

	var menuController = new MenuController();

	var ConfigRouter = Backbone.Marionette.AppRouter.extend({
		controller: menuController,
		appRoutes: {
			"menuRegis" : "showMenuRegis",
		}
	});

	return ConfigRouter;

})();

},{"./menu_top_layout.js":59,"backbone":"DIOwA5","querystring":"k+Qmpp"}],59:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {
	var MenuTopLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./menu_top_layout_template.html'),
		initialize: function() {
		},
		headerConf: {
			title: "メニュー",
			showBackButton: true,
			showHomeButton: true,
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
	});

	return MenuTopLayoutView;
})();

},{"./menu_top_layout_template.html":60,"backbone":"DIOwA5"}],60:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE">\r\n\r\n<div class="bgcolor3 ftcolor1">\r\n\t<ul class="menuRegis">\r\n\t\t<li class="bdcolor1"><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.cardMember, ['_native_open_embedded']) ))==null?'':__t)+
'">すでに入会登録済でカードをお持ちの方はこちら</a></li>\r\n\t\t<li class="bdcolor1"><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.appMember, ['_native_open_embedded']) ))==null?'':__t)+
'">新規登録の方はこちら</a></li>\r\n\t</ul>\r\n</div>\r\n\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],61:[function(require,module,exports){
var Backbone = require('backbone');
var AvailableCouponItemView = require('./available_coupon_item_view.js');
module.exports = (function () {
	var AvailableCouponCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: AvailableCouponItemView,
		tagName: 'ol',
		className: 'COUPONS'
	});
	return AvailableCouponCollectionView;
})();

},{"./available_coupon_item_view.js":63,"backbone":"DIOwA5"}],62:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="#point/exchange_coupon/'+
((__t=( id ))==null?'':__t)+
'">\r\n\t<div class="box_images">\r\n\t\t<img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'">\r\n  </div> <!-- box_images -->\r\n\t<div class="coupon_info">\r\n\t\t<div class="coupon_name">'+
((__t=( pageTitle ))==null?'':__t)+
'</div>\r\n\t\t<div class="coupon_price hlftcolor3">'+
((__t=( exchangePoint ))==null?'':__t)+
'<span class="coupon_price_words ftcolor3">ポイントと交換</span></div>\r\n\t</div>\r\n</a>\r\n\r\n';
}
return __p;
};

},{}],63:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var AvailableCouponItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./available_coupon_item_template.html'),
		templateHelpers: {
		},
	});

	return AvailableCouponItemView;

})();

},{"./available_coupon_item_template.html":62,"backbone":"DIOwA5"}],64:[function(require,module,exports){
var Backbone = require('backbone');
var CouponMasterModel = require('../../models/coupon_master_model.js');
var ExchangeCouponMainView = require('./exchange_coupon_main_view.js');
var PointModel = require('../../models/point_model.js');
var $ = require('jquery');
module.exports = (function () {

	var ExchangeCouponLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./exchange_coupon_layout_template.html'),
		regions: {
			'exchangeCouponRegion' : "#exchange-coupon-region",
			'exchangeStatusRegion' : "#exchange-status-region"
		},
		initialize: function( options ){
			var options = options || {};
			this.couponMasterModel = new CouponMasterModel({ id: options.id });
			this.pointModel = new PointModel();
			this.listenToOnce(this.couponMasterModel ,'sync-with-point',this._renderCoupon );
			this._fetchCoupon();
		},
		onRender: function(){
		},
		headerConf: {
			title: "ポイントクーポン詳細",
			showBackButton: true,
		},
		_fetchCoupon: function(){
			var _this = this;
			var requestAction = function(){
				return $.when( _this.couponMasterModel.fetchCoupon(), _this.pointModel.fetchWithAuthInfo())
				.done(function(data,data2){
					_this.couponMasterModel.setUserPoint( _this.pointModel.get("point") );
					_this.couponMasterModel.trigger('sync-with-point');
				});
			};
			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ));
		},
		_renderCoupon: function(){
			this.exchangeCouponRegion.show( new ExchangeCouponMainView({ model: this.couponMasterModel }) );
		},
	});

	return ExchangeCouponLayout;
})();

},{"../../models/coupon_master_model.js":168,"../../models/point_model.js":174,"./exchange_coupon_layout_template.html":65,"./exchange_coupon_main_view.js":67,"backbone":"DIOwA5","jquery":"QRCzyp"}],65:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="EXCHANGE-COUPON-MAIN" class="BACKBONE-PAGE">\r\n\r\n\t\t<div id="exchange-coupon-region" class="bgcolor1">\r\n\t</div>\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n\r\n';
}
return __p;
};

},{}],66:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- CouponMasterModel : with attribute "userPoint" -->\r\n<div id="exchange-status" class="hlbgcolor2">\r\n</div>\r\n\r\n<div><!-- CouponMasterModel : with attribute "userPoint" -->\r\n\t<div class="box_img_detail"><img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'"></div>\r\n\t<div class="point_title ftcolor1">'+
((__t=( pageTitle ))==null?'':__t)+
'</div>\r\n\t<div class="point_detail ftcolor3">'+
((__t=( App.util.text.nl2br( detailText ) ))==null?'':__t)+
'</div>\r\n\t<dl>\r\n\t\t<dt class="point_cost_title ftcolor1">交換に必要なポイント</dt>\r\n\t\t<dd class="point_price hlftcolor3">'+
((__t=( exchangePoint ))==null?'':__t)+
'<span class="point_price_words ftcolor3">ポイント（使用後：'+
((__t=( userPoint - exchangePoint ))==null?'':__t)+
'ポイント）</span></dd>\r\n';
 if( usePeriodType + "" === "0" ){ 
__p+='\r\n\t\t<dt class="point_time_title ftcolor1">利用期間</dt>\r\n\t\t<dd class="ftcolor3">'+
((__t=( formatDate( usePeriodStartDate ) ))==null?'':__t)+
' ～ '+
((__t=( formatDate( usePeriodEndDate ) ))==null?'':__t)+
'</dd>\r\n';
 }else{ 
__p+='\r\n\t\t<dt class="point_time_title ftcolor1">有効期限</dt>\r\n\t\t<dd class="ftcolor3">発行日より'+
((__t=(  usePeriodValue  ))==null?'':__t)+
'日</dd>\r\n';
 } 
__p+='\r\n\r\n\t\t<dt class="point_check_title ftcolor1">利用条件</dt>\r\n';
 if( useCondNumber  ){ 
__p+='\r\n\t\t<dd class="ftcolor3">回数制限:合計'+
((__t=( useCondNumber ))==null?'':__t)+
'回まで利用可能</dd>\r\n';
 } 
__p+='\r\n';
 if( useCondLimit  ){ 
__p+='\r\n\t<dd class="ftcolor3">先着'+
((__t=( useCondLimit ))==null?'':__t)+
'名まで利用可能</dd>\r\n';
 } 
__p+='\r\n\r\n\t\t<dt class="point_attention_title ftcolor1">備考・注意事項</dt>\r\n\t\t<dd class="ftcolor3">'+
((__t=( App.util.text.nl2br( note ) ))==null?'':__t)+
'</dd>\r\n\t</dl>\r\n\t<div class="btn_area">\r\n\t\t<button type="button" id="exchange-coupon-btn" class="btbgcolor1 btftcolor1">ポイントをこのクーポンと交換する</button>\r\n\t</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n';
}
return __p;
};

},{}],67:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {

	var ExchangeCouponMainView = Backbone.Marionette.ItemView.extend({
		template: require('./exchange_coupon_main_template.html'),
		exchangeStatusTemplate: require('./exchange_coupon_status_template.html'),
		ui:{
			"exchangeCouponBtn" : "#exchange-coupon-btn",
			"useCouponBtn" : ".use-coupon-button",
		},
		events:{
			"click @ui.exchangeCouponBtn" : "_exchangeCoupon",
		},
		initialize: function(){
			this.listenTo( this, 'exchange', this.onExchange);
			this.exchanged = false;
		},
		templateHelpers:{
			formatDate: function( dateTime ){
				if( !dateTime ) return "";
				return moment( dateTime ).format("YYYY/MM/DD HH:mm:ss");
			},
		},
		onRender: function(){
		},
		onExchange: function( data ){
			this.exchanged = true;
			this.ui.exchangeCouponBtn.addClass('DISABLE');
			this.ui.exchangeCouponBtn.html('交換済み');
			this._showExchangeStatus( data.coupon );
		},
		_exchangeCoupon: function( e ){
			e.preventDefault();
			if( this.exchanged ) return false;
			var _this = this;
			var requestAction = function(){
				return App.btApi.exchangeCoupon( _this.model.get("id") )
			};

			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ),{ ignoreStatuses: [403] })
				.done(function(data){
					console.log(data);
					_this.trigger('exchange', { coupon: data.coupon} );
				}).fail(function(err){
					if(err.status === 403){
						applican.notification.alert("ポイントを確認してください。", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
		},
		_showExchangeStatus: function(coupon){
			this.$('#exchange-status').html( this.exchangeStatusTemplate({
				exchangeDate: moment().format("YYYY/MM/DD HH:mm"),
				couponId: coupon.id,
				uCoupId: coupon.uCoupId,
			}));
			window.scrollTo(0,0);
		}

	});

	return ExchangeCouponMainView;

})();

},{"./exchange_coupon_main_template.html":66,"./exchange_coupon_status_template.html":68,"backbone":"DIOwA5","moment":"Vip+k1"}],68:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="use-status-view" class="hlftcolor2">\r\n\t<div class="point_status">クーポンを取得しました！</div>\r\n\t<div class="point_time">取得日時: '+
((__t=(  exchangeDate  ))==null?'':__t)+
'</div>\r\n</div>\r\n<div class="btn_area_exchange">\r\n\t<div>\r\n\t\t<a href="#coupon/'+
((__t=( couponId ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'">\r\n\t\t\t<button type="button" class="hl2_btbgcolor1 hl2_btftcolor1 use-coupon-btn">このクーポンを使う</button>\r\n\t\t</a>\r\n\t</div>\r\n\t<div><a href="#coupon"><button type="button" id="coupon-list-btn" class="hl2_btbgcolor2 hl2_btftcolor2">クーポン一覧を見る</button></a></div>\r\n</div>\r\n';
}
return __p;
};

},{}],69:[function(require,module,exports){
var Backbone = require('backbone');
var PointModel = require('../../models/point_model.js');
var ModalPoex = require('../../modals/point_exchance/modal_poex.js');
var ModalPoex02 = require('../../modals/point_exchance/modal_poex02.js');
var ModalPoex03 = require('../../modals/point_exchance/modal_poex03.js');
var ModalPoex04 = require('../../modals/point_exchance/modal_poex04.js');
module.exports = (function() {
    return PointExchance01 = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
            customeBackAction: function() {
                location.href = '#config';
            }
        },
        template: require('./poex01_template.html'),
        ui: {
            "poexLogin": ".poex-login",
            "poexConfirm": ".poex-confirm",
            "poexConnectPoint": ".poex-connect-point",
        },
        events: {
            "click @ui.poexLogin": "openModalLogin",
            "click @ui.poexConfirm": "openModalConfirm",
        },
        initialize: function() {
            this.pointModel = new PointModel();
            this.modalPoex = new ModalPoex();
            this.modalPoex02 = new ModalPoex02();
            this.modalPoex03 = new ModalPoex03();
            this.modalPoex04 = new ModalPoex04();

            App.util.bindProgressScreen(this, this.pointModel);
            this.listenTo(this.pointModel, 'sync', this.renderPoint);
            document.addEventListener(native.EventTypes.WEBVIEW_CLOSED, evt => {
                // 閉じるときの URL (_native_open_internal で開いた WebView を _native_close で閉じたときのみ格納)
                console.log('WebView closed. url = ' + evt.url);
                // ログイン完了処理
                native.bclib.didOpenUrlPromise().then(() => {
                    console.log('didOpenUrl()');
                }).catch(error => {
                    console.log(error);
                });
            });
            if (!AppConf.bclib.isFirstInit) {
                this.bclibInit();
                AppConf.bclib.isFirstInit = true;
            } else {
                this.getDvepPoint();
            }
        },
        onRender: function() {
            this.pointModel.fetchWithAuthInfo({
                on401: function() { }
            });
        },
        renderPoint: function() {
            var point = this.pointModel.get('point');
            this.ui.poexConnectPoint.find('.poex-point .js-point').text(App.util.text.numberWithDelimiter(point));
            var options = _.findWhere(AppConf.pointExchange.list, { id: AppConf.bclib.user });
            options.point = point;
        },
        openModalLogin: function(e) {
            var _this = this;
            $this = $(e.currentTarget);
            // $this.parents('.poex-list').addClass('disabled-click');
            var $id = _this.currentId = $this.data('id');
            var options = _.findWhere(AppConf.pointExchange.list, { id: $id });

            if (!$this.hasClass('active')) {
                /* _this.modalPoex.show(options).then(function(res) {
                    if (res == 1) {
                        $this.addClass('active');
                    }
                    $this.parents('.poex-list').removeClass('disabled-click');
                }); */
                _this.bclibLogin();
            } else {
                _this.modalPoex02.show(options).then(function(res) {
                    if (res == 1) {
                        $this.removeClass('active');
                    }
                    $this.parents('.poex-list').removeClass('disabled-click');
                });
            }
        },
        openModalConfirm: function(e) {
            var _this = this;
            $this = $(e.currentTarget);
            $this.parents('.poex-list').addClass('disabled-click');
            native.bclib.getUnusedAddressPromise().then(address => {
                // address = 'address';
                console.log(`getUnusedAddress() successful. address = ${address}`);
                _this.modalPoex03.show({ address: address }).then(function(res) {
                    if (res == 1) {
                        var status = App.util.text.copyTextToClipboard(address);
                        if (status) {
                            _this.modalPoex04.show({ address: address }).then(function(res) {
                                $this.parents('.poex-list').removeClass('disabled-click');
                                _this.getDvepPoint();
                            });
                        } else {
                            var iosText = applican.config.device_os === "IOS" ? '※iOS更新に伴い、' : '';
                            applican.notification.alert(iosText + "PIN番号のコピーに失敗しました。\nPIN番号は、手入力でお願いいたします。", App.doNothing, "", "OK");
                        }
                    } else {
                        $this.parents('.poex-list').removeClass('disabled-click');
                    }
                });
            }).catch(error => {
                console.log(`getUnusedAddress() failure. error = ${JSON.stringify(error)}`);
            });

        },
        onDestroy: function() {
            this.modalPoex.onDestroy();
            this.modalPoex02.onDestroy();
            this.modalPoex03.onDestroy();
            this.modalPoex04.onDestroy();
        },
        bclibInit: function() {
            var _this = this;
            const options = {
                hostname: AppConf.bclib.hostname,
                pubkey: AppConf.bclib.pubkey,
                onOpenUrl: (url) => {
                    console.log('login url: ' + url);
                    // ログイン URL 処理
                    window.location.href = url + "&_native_open_embedded"; // Chrome Custom Tab
                    // window.location.href = url + "&_native_open_internal"; // アプリ内 WebView (ただし、自力で閉じる必要あり)
                },
                onBalanceChanged: () => {
                    console.log('balance changed.');
                    _this.getDvepPoint();
                },
            };
            native.bclib.init(options);
        },
        bclibLogin: function() {
            var _this = this;
            const options = {
                pointName: _this.currentId
            };
            native.bclib.loginPromise(options).then(function(res) {
                console.log(_this.currentId + ' login successful.');
                var options = _.findWhere(AppConf.pointExchange.list, { id: _this.currentId });
                options.active = 1;
                $('#poex-item-' + _this.currentId).addClass('active');
            }).catch(function(err) {
                console.log(_this.currentId + ' login failure.');
            });
        },
        getDvepPoint: function() {
            var _this = this;
            const options = {
                includeUnconfirmed: true,
            };
            native.bclib.getBalancePromise(options).then(function(balance) {
                console.log('getBalance() successful. ' + JSON.stringify(balance));
                balance.forEach((item, index) => {
                    var options = _.findWhere(AppConf.pointExchange.list, { id: item.assetName });
                    options.point = parseInt(item.amountString);
                    options.assetId = item.assetId;
                    $('#poex-item-' + item.assetName + ' .js-point').text(App.util.text.numberWithDelimiter(options.point));
                });
            }).catch(function(error) {
                console.log('getBalance() failure. error = ' + JSON.stringify(error));
            });
        }
    });
})();
},{"../../modals/point_exchance/modal_poex.js":154,"../../modals/point_exchance/modal_poex02.js":156,"../../modals/point_exchance/modal_poex03.js":158,"../../modals/point_exchance/modal_poex04.js":160,"../../models/point_model.js":174,"./poex01_template.html":70,"backbone":"DIOwA5"}],70:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="poex01" class="point-exchange point-exchange-link">\r\n    <div class="poex-container">\r\n        <h2 class="poex-title">ポイント管理</h2>\r\n        <div class="poex-content">\r\n            <ul class="poex-list">\r\n\r\n                ';
 _.each(AppConf.pointExchange.list, function(item) { 
__p+='\r\n\r\n                <li id="poex-item-'+
((__t=( item.id ))==null?'':_.escape(__t))+
'" data-id="'+
((__t=( item.id ))==null?'':_.escape(__t))+
'" class="poex-item '+
((__t=( item.addition ))==null?'':_.escape(__t))+
' '+
((__t=( item.active ? 'active' : '' ))==null?'':_.escape(__t))+
'">\r\n                    <table>\r\n                        <tr>\r\n                            <td class="image"><img src="'+
((__t=( item.logo ))==null?'':_.escape(__t))+
'" /></td>\r\n                            <td class="title">'+
((__t=( item.title ))==null?'':_.escape(__t))+
'</td>\r\n                            <td class="button">\r\n                                <span class="poex-point">\r\n                                    <span class="number"><span class="js-point">'+
((__t=( App.util.text.numberWithDelimiter(item.point) ))==null?'':_.escape(__t))+
'</span> pt</span>\r\n                                    <span class="notnumber">連携する</span>\r\n                                </span>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </li>\r\n\r\n                ';
 }) 
__p+='\r\n\r\n            </ul>\r\n            <div class="spacing-30"></div>\r\n            <div class="poex-bottom">\r\n                <a class="btn-recent button" href="#history">利用履歴</a>\r\n                <a class="btn-poex button" href="#poex02">ポイント交換</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n';
}
return __p;
};

},{}],71:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function() {

    var Poex02Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
            customeBackAction: function() {
                location.href = '#poex01';
            }
        },
        template: require('./poex02_template.html'),
        ui: {
            poexItem: '.js-poexItem'
        },
        events: {
            'click @ui.poexItem': 'poexItemlink'
        },
        poexItemlink: function(e) {
            $this = $(e.currentTarget);
            $id = $this.data('id');
            location.href = '#poex03/' + $id;
        },
    });

    return Poex02Layout;
})();

},{"./poex02_template.html":72,"backbone":"DIOwA5"}],72:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="point-exchange point-exchange-type">\r\n    <div class="poex-container">\r\n        <h2 class="poex-title">交換元のポイントを選択</h2>\r\n        <div class="poex-content">\r\n            <ul class="poex-list">\r\n\r\n                ';
 _.each(AppConf.pointExchange.list, function(item) { 
__p+='\r\n\r\n                ';
 if(item.group !== 1) return false; 
__p+='\r\n\r\n                <li class="poex-item js-poexItem" data-id="'+
((__t=( item.id ))==null?'':_.escape(__t))+
'">\r\n                    <table>\r\n                        <tr>\r\n                            <td class="image"><img src="'+
((__t=( item.logo ))==null?'':_.escape(__t))+
'" /></td>\r\n                            <td class="title">'+
((__t=( item.title ))==null?'':_.escape(__t))+
'</td>\r\n                            <td class="button"><span class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(item.point) ))==null?'':_.escape(__t))+
'</span> pt</span></td>\r\n                        </tr>\r\n                    </table>\r\n                </li>\r\n\r\n                ';
 }) 
__p+='\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n';
}
return __p;
};

},{}],73:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function() {

    var Poex02Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
        },
        template: require('./poex03_template.html'),
        templateHelpers: {
            itemSelected: {}
        },
        ui: {
            poexItem: '.js-poexItem'
        },
        events: {
            'click @ui.poexItem': 'poexItemlink'
        },
        initialize: function(params) {
            this.params = params;
            var item = _.findWhere(AppConf.pointExchange.list, { id: this.params.id });
            this.templateHelpers.itemSelected = item;
        },
        poexItemlink: function(e) {
            $this = $(e.currentTarget);
            $id = $this.data('id');
            location.href = '#poex04/' + this.params.id + ',' + $id;
        },
    });

    return Poex02Layout;
})();

},{"./poex03_template.html":74,"backbone":"DIOwA5"}],74:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="point-exchange point-exchange-type">\r\n    <div class="poex-container">\r\n        <h2 class="poex-title">交換元のポイントを選択</h2>\r\n        <div class="poex-content">\r\n            <div class="poex-item-selected">\r\n                <table>\r\n                    <tr>\r\n                        <td class="image"><img src="'+
((__t=( itemSelected.logo ))==null?'':_.escape(__t))+
'" /></td>\r\n                        <td class="button"><span class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(itemSelected.point) ))==null?'':_.escape(__t))+
'</span> pt</span></td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <!-- end .poex-item-selected -->\r\n            <div class="arrow-down"></div>\r\n            <!-- end .arrow-bottom -->\r\n            <ul class="poex-list">\r\n\r\n                ';
 _.each(AppConf.pointExchange.list, function(item) { 
__p+='\r\n\r\n                ';
 if(item.group !== 2) return false; 
__p+='\r\n\r\n                <li class="poex-item js-poexItem" data-id="'+
((__t=( item.id ))==null?'':_.escape(__t))+
'">\r\n                    <table>\r\n                        <tr>\r\n                            <td class="image"><img src="'+
((__t=( item.logo ))==null?'':_.escape(__t))+
'" /></td>\r\n                            <td class="title">'+
((__t=( item.title ))==null?'':_.escape(__t))+
'</td>\r\n                            <td class="button"><span class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(item.point) ))==null?'':_.escape(__t))+
'</span> pt</span></td>\r\n                        </tr>\r\n                    </table>\r\n                </li>\r\n\r\n                ';
 }) 
__p+='\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n';
}
return __p;
};

},{}],75:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function() {

    var Poex04Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
        },
        template: require('./poex04_template.html'),
        templateHelpers: {
            items: [],
        },
        ui: {
            btnOk: '.btn-ok',
            amountEchange: '#amount-exchange'
        },
        events: {
            'click @ui.btnOk': 'processOK'
        },
        initialize: function(params) {
            this.params = params;
            var ids = this.params.id.split(',');
            var items = [];
            var ratio = _.findWhere(AppConf.pointExchange.ratio, { id: this.params.id.replace(' ', '') });

            _.each(ids, function(value, index) {
                var item = _.findWhere(AppConf.pointExchange.list, { id: value });
                item.value = ratio.value[index];
                items.push(item);
            });
            this.templateHelpers.items = items;
        },
        processOK: function(e) {
            if(this.ui.amountEchange.val()){
                AppConf.bclib.amountExchange = this.ui.amountEchange.val();
                location.href = '#poex05/' + this.params.id;
            }
        }

    });

    return Poex04Layout;
})();

},{"./poex04_template.html":76,"backbone":"DIOwA5"}],76:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="point-exchange point-exchange-process">\r\n    <div class="poex-container">\r\n        <div class="poex-item-info">\r\n            <div class="poex-wrap">\r\n                <p class="text">現在のポイント数</p>\r\n                <table class="style-1">\r\n                    <tr>\r\n                        <td>\r\n                            <img src="'+
((__t=( items[0].logo ))==null?'':_.escape(__t))+
'" />\r\n                            <p class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[0].point) ))==null?'':_.escape(__t))+
'</span> pt</p>\r\n                        </td>\r\n                        <td>\r\n                            <img src="'+
((__t=( items[1].logo ))==null?'':_.escape(__t))+
'" />\r\n                            <p class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[1].point) ))==null?'':_.escape(__t))+
'</span> pt</p>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n        <div class="poex-content">\r\n            <div class="poex-item-compare">\r\n                <p class="text">交換レート</p>\r\n                <table>\r\n                    <tr>\r\n                        <td class="item item-left">\r\n                            <img src="'+
((__t=( items[0].logo ))==null?'':_.escape(__t))+
'" />\r\n                            <span class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[0].value) ))==null?'':_.escape(__t))+
'</span> pt</span>\r\n                        </td>\r\n                        <td class="equal">=</td>\r\n                        <td class="item item-right">\r\n                            <img src="'+
((__t=( items[1].logo ))==null?'':_.escape(__t))+
'" />\r\n                            <span class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[1].value) ))==null?'':_.escape(__t))+
'</span> pt</span>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <div class="poex-form">\r\n                <p class="text">交換するポイント数</p>\r\n                <div class="control">\r\n                    <input id="amount-exchange" type="number" value=""/>\r\n                    <span class="unit">pt</span>\r\n                </div>\r\n            </div>\r\n            <div class="poex-btns">\r\n                <div class="column"><a class="button btn-cancel" href="#poex02">キャンセル</a></div>\r\n                <div class="column"><a class="button btn-ok">確認</a></div>\r\n            </div>\r\n            <!-- end .poex-item-info -->\r\n        </div>\r\n    </div>\r\n</div>\r\n';
}
return __p;
};

},{}],77:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {

    var Poex05Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
        },
        template: require('./poex05_template.html'),
        ui: {
            btnOk: '.js-confirm-exchange',
        },
        events: {
            'click @ui.btnOk': 'processOK'
        },
        templateHelpers: {
            items: [],
        },
        initialize: function(params) {
            this.params = params;
            var ids = this.ids = this.params.id.split(',');
            var items = [];
            var ratio = _.findWhere(AppConf.pointExchange.ratio, { id: this.params.id.replace(' ', '') });

            _.each(ids, function(value, index) {
                var item = _.findWhere(AppConf.pointExchange.list, { id: value });
                item.value = ratio.value[index];
                items.push(item);
            });
            this.templateHelpers.items = items;
        },
        processOK: function(e) {
            e.preventDefault();
            var _this = this;
            const options = {
                sourcePoint: _this.ids[0],
                sourceAmount: AppConf.bclib.amountExchange,
                destPoint: _this.ids[1],
            };
            console.log('exchange ' + JSON.stringify(options));
            native.bclib.executeTransactionPromise(options).then(() => {
                console.log(`executeTransaction() successful.`);
                window.location.hash = 'poex01';
            }).catch(error => {
                console.log(`executeTransaction() failure. error = ${JSON.stringify(error)}`);
            });
        }
    });

    return Poex05Layout;
})();

},{"./poex05_template.html":78,"backbone":"DIOwA5"}],78:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="point-exchange point-exchange-process">\r\n    <div class="poex-container">\r\n        <div class="poex-item-info">\r\n            <div class="poex-wrap">\r\n                <table class="style-2">\r\n                    <tr>\r\n                        <td class="item item-left">\r\n                            <img src="'+
((__t=( items[0].logo ))==null?'':_.escape(__t))+
'" />\r\n                            <p class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(AppConf.bclib.amountExchange) ))==null?'':_.escape(__t))+
'</span> pt</p>\r\n                        </td>\r\n                        <td class="equal">=</td>\r\n                        <td class="item item-right">\r\n                            <img src="'+
((__t=( items[1].logo ))==null?'':_.escape(__t))+
'" />\r\n                            <p class="poex-point"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(AppConf.bclib.amountExchange * items[1].value) ))==null?'':_.escape(__t))+
'</span> pt</p>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n        <div class="poex-content">\r\n            <h3 class="heading">- 交換結果 -</h3>\r\n            <div class="spacing-10"></div>\r\n            <div class="poex-item-selected">\r\n                <table>\r\n                    <tr>\r\n                        <td class="image"><img src="'+
((__t=( items[0].logo ))==null?'':_.escape(__t))+
'" /></td>\r\n                        <td class="button">\r\n                            <p class="poex-subpoint"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[0].point - AppConf.bclib.amountExchange) ))==null?'':_.escape(__t))+
'</span> pt</p>\r\n                            <p class="poex-point">(<span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[0].point) ))==null?'':_.escape(__t))+
'</span> pt)</p>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <!-- end .poex-item-selected -->\r\n            <div class="arrow-down"></div>\r\n            <!-- end .arrow-bottom -->\r\n            <div class="poex-item">\r\n                <table>\r\n                    <tr>\r\n                        <td class="image"><img src="'+
((__t=( items[1].logo ))==null?'':_.escape(__t))+
'" /></td>\r\n                        <td class="title">'+
((__t=( items[1].title ))==null?'':_.escape(__t))+
'</td>\r\n                        <td class="button">\r\n                            <p class="poex-subpoint"><span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[1].point + AppConf.bclib.amountExchange * items[1].value) ))==null?'':_.escape(__t))+
'</span> pt</p>\r\n                            <p class="poex-point">(<span class="number">'+
((__t=( App.util.text.numberWithDelimiter(items[1].point) ))==null?'':_.escape(__t))+
'</span> pt)</p>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <div class="spacing-40"></div>\r\n            <div class="poex-btns">\r\n                <div class="column"><a class="button btn-cancel" href="#poex02">キャンセル</a></div>\r\n                <div class="column"><a class="button btn-ok js-confirm-exchange">確認</a></div>\r\n            </div>\r\n            <!-- end .poex-item-info -->\r\n        </div>\r\n    </div>\r\n</div>\r\n';
}
return __p;
};

},{}],79:[function(require,module,exports){
var PointModel = require('../../models/point_model.js');
var CouponCollection = require('../../models/coupon_master_collection.js');
var AvailableCouponCollectionView = require('./available_coupon_collection_view.js');
var Backbone = require('backbone');
module.exports = (function () {

	var PointMainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./point_main_template.html'),
		regions: {
			"availableCouponRegion": "#available-coupon-region"
		},
		initialize: function(){
			this.couponCollection = new CouponCollection();
			this.pointModel = new PointModel();

			App.util.bindProgressScreen(this, this.couponCollection );
			this.listenTo(this.couponCollection, 'sync', this._renderCoupons);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);
		},
		onRender: function(){
			this.couponCollection.fetchPointExchangeable();
			this.pointModel.fetchWithAuthInfo();
		},
		headerConf: {
			title: "ポイント",
			showBackButton: true,
		},
		_renderCoupons: function(){
			console.log( this.couponCollection);
			this.availableCouponRegion.show( new AvailableCouponCollectionView({
				collection: this.couponCollection
			}));
		},
		_renderPoint: function(){
			var point = App.util.text.numberWithDelimiter( this.pointModel.get("point") );
			this.$('.point-text').html( point );
		}
	});

	return PointMainLayout;
})();

},{"../../models/coupon_master_collection.js":167,"../../models/point_model.js":174,"./available_coupon_collection_view.js":61,"./point_main_template.html":80,"backbone":"DIOwA5"}],80:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="POINT-MAIN" class="BACKBONE-PAGE">\r\n\r\n<div id="point-status-region" class="point_status">\r\n\t<div class="current_point ftcolor1">現在のポイント数<span class="point-text hlftcolor3">0</span></div>\r\n\t<div class="condition">\r\n\t\t<div class="condition_title ftcolor1">利用条件</div>\r\n\t\t<div class="condition_words ftcolor3">\r\n\t\t\t購入金額１円当たり1ポイント<br>\r\n\t\t\tポイント有効期限:最終利用日から12ヶ月<br>\r\n\t\t\t特典内容は、予告なく変更される場合があります。<br>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class="pointBarcode">\r\n  <img src="./image/top/img_barcode.gif" height="58" width="269" alt=""> <br>\r\n  10211004110009\r\n</div>\r\n\r\n<div id="available-coupon-region" class="bgcolor1 ftcolor1">\r\n</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],81:[function(require,module,exports){
var Backbone = require('backbone');
var PointMainLayout = require("./point_main_layout.js");
var ExchangeCouponLayout = require("./exchange_coupon_layout.js");
var Poex01Layout = require("./poex01_layout.js");
var Poex02Layout = require("./poex02_layout.js");
var Poex03Layout = require("./poex03_layout.js");
var Poex04Layout = require("./poex04_layout.js");
var Poex05Layout = require("./poex05_layout.js");

module.exports = (function () {

	var PointController = Backbone.Marionette.Controller.extend({
        showPointMainView: function(){
            var pointMainLayout = new PointMainLayout();
            pointMainLayout.render();
            App.pageSlider.slidePage( pointMainLayout );
            App.headerModel.applyViewHeaderConf( pointMainLayout.headerConf );
        },
        showExchangeCoupon: function(id){
            var options = { id: id };
            var exchangeCouponLayout = new ExchangeCouponLayout( options );
            exchangeCouponLayout.render();
            App.pageSlider.slidePage( exchangeCouponLayout );
            App.headerModel.applyViewHeaderConf( exchangeCouponLayout.headerConf );
        },
        showPoex01View: function(){
            var poexLayout = new Poex01Layout();
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex02View: function(){
            var poexLayout = new Poex02Layout();
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex03View: function(id){
            var poexLayout = new Poex03Layout({ id: id });
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex04View: function(id){
            var poexLayout = new Poex04Layout({ id: id });
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex05View: function(id){
            var poexLayout = new Poex05Layout({ id: id });
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
    });

	var pointController = new PointController();
	var PointRouter = Backbone.Marionette.AppRouter.extend({
		controller: pointController,
		appRoutes: {
			"point" : "showPointMainView",
            "point/exchange_coupon/:id" : "showExchangeCoupon",
            "poex01" : "showPoex01View",
            "poex02" : "showPoex02View",
            "poex03/:id" : "showPoex03View",
            "poex04/:id" : "showPoex04View",
            "poex05/:id" : "showPoex05View",
		}
	});

	return PointRouter;

})();

},{"./exchange_coupon_layout.js":64,"./poex01_layout.js":69,"./poex02_layout.js":71,"./poex03_layout.js":73,"./poex04_layout.js":75,"./poex05_layout.js":77,"./point_main_layout.js":79,"backbone":"DIOwA5"}],82:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var ScratchMainLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./scratch_main_layout_template.html'),
		regions: {
		},
		initialize: function(options){
		},
		headerConf: {
			title: "スクラッチ",
			showBackButton: true,
		},
	});

	return ScratchMainLayout;
})();

},{"./scratch_main_layout_template.html":83,"backbone":"DIOwA5"}],83:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="SCRATCH-MAIN" class="BACKBONE-PAGE">\r\n<div id="scratch-list-region">\r\n\tスクラッチ\r\n</div>\r\n</div>\r\n<div class="titleContainer">\r\n\t<h1><img src="../image/top/img_logo.png" height="56" width="199"></h1>\r\n</div>\r\n\r\n<div class="menuContainer">\r\n\t<div class="menuColumn1 bdcolor1">\r\n\t\t<a href="#point">\r\n\t\t\t<div class="pointInformation">\r\n\t\t\t\t<p>現在のポイント数</p>\r\n\t\t\t\t<p class="pointValue">1,400</p>\r\n\t\t\t</div>\r\n\t\t\t<div class="pointUse ftcolor1 bdcolor1">ポイントを使う</div>\r\n\t\t\t<div class="pointBarcode">\r\n\t\t\t\t<img src="../image/top/img_barcode.gif" height="28" width="269" alt="">\r\n\t\t\t</div>\r\n\t\t</a>\r\n\t</div>\r\n\t<div class="menuColumn3 bdcolor1">\r\n\t\t<a href="#stamp">\r\n\t\t\t<div class="svgContainer">\r\n\t\t\t\t<img src="../image/top/icon_stamp.png" width="50px" height="50px" alt=""/>\r\n\t\t\t</div>\r\n\t\t\t<p class="btnM ftcolor1 bdcolor1">来店スタンプ</p>\r\n\t\t\t<a href="#coupon">\r\n\t\t\t\t<div class="svgContainer">\r\n\t\t\t\t\t<img src="../image/top/icon_coupon.png" width="50px" height="50px" alt=""/>\r\n\t\t\t\t</div>\r\n\t\t\t\t<p class="btnM ftcolor1 bdcolor1">クーポン一覧</p>\r\n\t\t\t</a>\r\n\t\t\t<a href="#information">\r\n\t\t\t\t<div class="svgContainer">\r\n\t\t\t\t\t<img src="../image/top/icon_information.png" width="50px" height="50px" alt=""/>\r\n\t\t\t\t</div>\r\n\t\t\t\t<p class="btnM ftcolor1 bdcolor1">お知らせ</p>\r\n\t\t\t</a>\r\n\t</div>\r\n\t<div class="menuColumn3 bdcolor1">\r\n\t\t<a href="#chirashi">\r\n\t\t\t<div class="svgContainer">\r\n\t\t\t\t<img src="../image/top/icon_chirashi.png" width="50px" height="50px" alt=""/>\r\n\t\t\t</div>\r\n\t\t\t<p class="btnM ftcolor1 bdcolor1">チラシ一覧</p>\r\n\t\t</a>\r\n\t\t<a href="#shop">\r\n\t\t\t<div class="svgContainer">\r\n\t\t\t\t<img src="../image/top/icon_shop.png" width="50px" height="50px" alt=""/>\r\n\t\t\t</div>\r\n\t\t\t<p class="btnM ftcolor1 bdcolor1">店舗検索</p>\r\n\t\t</a>\r\n\t\t<a href="./scratch/index.html?_native_open_embedded">\r\n\t\t\t<div class="svgContainer">\r\n\t\t\t\t<img src="../image/top/icon_scratch.png" width="50px" height="50px" alt=""/>\r\n\t\t\t</div>\r\n\t\t\t<p class="btnM ftcolor1 bdcolor1">スクラッチ</p>\r\n\t\t</a>\r\n\t</div>\r\n\t<div class="menuColumn2 menuFooter bdcolor1">\r\n\t\t<a href="#history">\r\n\t\t\t<div class="svgContainer">\r\n\t\t\t\t<img src="../image/top/icon_history.png" width="50px" height="50px" alt=""/>\r\n\t\t\t</div>\r\n\t\t\t<p class="btnS ftcolor1 bdcolor1">利用履歴</p>\r\n\t\t</a>\r\n\t\t<a href="#config">\r\n\t\t\t<div class="svgContainer">\r\n\t\t\t\t<img src="../image/top/icon_config.png" width="50px" height="50px" alt=""/>\r\n\t\t\t</div>\r\n\t\t\t<p class="btnS ftcolor1 bdcolor1">設定</p>\r\n\t\t</a>\r\n\t</div>\r\n</div>\r\n\r\n<!-- 実装時にはコメントアウトを解除 : ローディング画像表示のため '+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
' -->\r\n';
}
return __p;
};

},{}],84:[function(require,module,exports){
var Backbone = require('backbone');
var ScratchMainLayout = require("./scratch_main_layout.js");
module.exports = (function () {

	var ScratchController = Backbone.Marionette.Controller.extend({
		showScratchMain: function(){
			var scratchMainLayout = new ScratchMainLayout();
			scratchMainLayout.render();
			App.pageSlider.slidePage( scratchMainLayout );
			App.headerModel.applyViewHeaderConf( scratchMainLayout.headerConf );
		},
	});

	var scratchController = new ScratchController();

	var ScratchRouter = Backbone.Marionette.AppRouter.extend({
		controller: scratchController,
		appRoutes: {
			"scratch" : "showScratchMain",
		}
	});

	return ScratchRouter;

})();

},{"./scratch_main_layout.js":82,"backbone":"DIOwA5"}],85:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollectionView = require('../../../views/base_collection_view.js');
var CategoryItemView = require('./category_item_view.js');
module.exports = (function () {
	var CategoryCollectionView = BaseCollectionView.extend({
		childView: CategoryItemView,
		tagName: 'ol',
		className: 'CATEGORIES',
		initialize: function( options ){
			this.conditionModel = options.conditionModel; // SearchConditionModel
		},
		childEvents: {
			"select:category" : function( childView, model ){
				this.conditionModel.pushParentObject({ id: model.get("id"), name: model.get("name") });
			},
		},

	});
	return CategoryCollectionView;
})();

},{"../../../views/base_collection_view.js":196,"./category_item_view.js":87,"backbone":"DIOwA5"}],86:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row ftcolor1">\r\n\t<div class="shopName">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n</div>\r\n';
}
return __p;
};

},{}],87:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var CategoryItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor1",
		template: require('./category_item_template.html'),
		events: {
			"click" : "onSelect"
		},
		templateHelpers: {
		},
		onSelect: function(e){
			e.preventDefault();
			if( this.model.isShop() ){
				location.hash = "shop/" + this.model.get("id");
			}else{
				this.trigger('select:category', this.model);
			}
		},
	});

	return CategoryItemView;

})();

},{"./category_item_template.html":86,"backbone":"DIOwA5"}],88:[function(require,module,exports){
var Backbone = require('backbone');
var CategoryCollectionView = require('./category_collection_view.js');
var CategoryCollection = require('../../../models/category_collection.js');

module.exports = (function () {

	var CategoryListMain = Backbone.Marionette.LayoutView.extend({

		template: require('./category_list_main_template.html'),
		regions: {
			"listRegion" : ".list",
			"selectedCategoriesRegion" : "#selected-categories",
		},
		initialize: function(options){
			this.conditionModel = options.conditionModel;
			this.listenTo( this.conditionModel, 'change:categories', this._renderCategories );
		},
		onRender: function(){
			this._renderSelectedCategories();
			this._renderCategories();
		},
		_renderCategories: function(){
			var parent = this.conditionModel.getParentObject();
			this.listRegion.show( new CategoryCollectionView({
				collection: new CategoryCollection( this.collection.where({ "parentId": parent.id }) ),
				conditionModel: this.conditionModel
			}));
		},
		_renderSelectedCategories: function(){
			this.selectedCategoriesRegion.show( new SelectedCategoryCollectionView( { conditionModel: this.conditionModel} ) );
		},
	});

	var SelectedCategoryItemView = Backbone.Marionette.ItemView.extend({
		initialize: function(options){
			this.level = options.level; 
		},
		tagName: "li",
		ui: {
			"offset" : ".offset"
		},
		events: {
			"click": "onSelect"
		}, 
		onRender: function(){
			this.ui.offset.css("width", (this.level - 1) * 20 + "px");

		},
		template: require('./selected_categories_template.html'),
		onSelect: function(e){
			e.preventDefault();
			this.trigger("select:breadcrumbs", this.level);
		}
	});

	var SelectedCategoryCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: SelectedCategoryItemView,
		tagName: "ol",
		className: "SELECTED-CATEGORIES bdcolor1",
		initialize: function( options ){
			this.conditionModel = options.conditionModel;
			console.log(this.conditionModel.attributes);
			this.collection = this._buildCategoryCollection();
			this.listenTo( this.conditionModel, 'change:categories', this._onCategoryChange);
		},
		childViewOptions: function(model, index){
			return {
				level: index + 1 
			};
		},
		childEvents: {
			"select:breadcrumbs" : function( itemView, level ){
				this.conditionModel.spliceCategory( level );
			}
		},
		_buildCategoryCollection: function(){
			return new Backbone.Collection( this.conditionModel.get("categories") );
		},
		_onCategoryChange: function(){
			this.collection = this._buildCategoryCollection();
			this.render();
		}
	});

	return CategoryListMain;
})();

},{"../../../models/category_collection.js":165,"./category_collection_view.js":85,"./category_list_main_template.html":89,"./selected_categories_template.html":90,"backbone":"DIOwA5"}],89:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="selected-categories" class="selectedCategories serchbgcolor1"></div>\r\n<div class="list"></div>\r\n';
}
return __p;
};

},{}],90:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="selectedCategory"><span class="offset"></span>'+
((__t=( name ))==null?'':__t)+
'</div>\r\n';
}
return __p;
};

},{}],91:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var rootCategory = {
		id: "root",
		name: "トップ",
	};

	var SearchConditionModel = Backbone.Model.extend({
		defaults: {
			mode: "geolocation",
			text: "",
			categories: [ rootCategory ],
		},
		initialize: function(){
			this.listenTo(this,'change:mode', this._onChangeMode);
		},
		changeMode: function(mode){
			this.set({
				mode: mode,
			});
		},
		setText: function( text ){
			this.set("text", text);
		},
		getParentObject: function(){
			var categories = this.get("categories");
			return categories[categories.length - 1];
		},
		pushParentObject: function( parentObj ){
			if( !parentObj || !parentObj.id || !parentObj.name ) { throw "不正なカテゴリオブジェクトを登録しようとしました" }
			var newCategories = this.get("categories");
			newCategories.push(parentObj);
			this.set({"categories": newCategories}); //change eventを出したい
			this.trigger("change:categories"); //arrayなので変わったと認識されない
			this.trigger("change"); //arrayなので変わったと認識されない
		},
		setCategoriesByCategoryCollection: function( categoryCollection ,query ){
			var categoryIds = query["category[]"] || [];
			var categories = categoryCollection.filter(function(v){
				return categoryIds.indexOf( v.id ) != -1;
			}).map( function(v){ return { id: v.get("id"), name: v.get("name")  }; } );

			if( !categories ){ return }
			console.log( categories );
			var newCategories = [ rootCategory ];
			this.set("categories", newCategories.concat(categories));
		},
		spliceCategory: function( level ){
			var newCategories = this.get("categories");
			newCategories.splice( level ); //
			this.trigger("change:categories"); //arrayなので変わったと認識されない
		},
		_onChangeMode: function(){
			this.set({
				categories: [ rootCategory ]
			});
			this.trigger("change:categories");
		}
	},{
	});
	return SearchConditionModel;
})();

},{"backbone":"DIOwA5"}],92:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="search" class="search serchbgcolor1">\r\n\t<div id="search_btn" class="search_btn">\r\n\t\t<button data-mode="freeword" class="free-word-tab btbgcolor1 btftcolor1 tab-btn">検索</button>\r\n\t\t<button data-mode="geolocation" class="geo-tab btbgcolor1 btftcolor1 tab-btn">近くのお店</button>\r\n\t\t<button data-mode="category" class="category-tab btbgcolor1 btftcolor1 tab-btn">カテゴリ</button>\r\n\t</div>\r\n\t<div class="freewordTextBlock freeword-text-block">\r\n\t\t<div class="textBoxWrap">\r\n\t\t\t<input type="text" id="search_input" name="free-word" placeholder="フリーワード検索" value="'+
((__t=( text ))==null?'':__t)+
'">\r\n\t\t</div>\r\n\t\t<button id="free-word-search-btn" type="button" class="searchBtn btbgcolor2 btbdcolor1 btftcolor2" >検索</button>\r\n\t</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],93:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var ShopSearchConditionView = Backbone.Marionette.ItemView.extend({
		template: require('./search_condition_template.html'),
		ui: {
			"freeWordTab" : ".free-word-tab",
			"geoTab" : ".geo-tab",
			"categoryTab" : ".category-tab",
			"tabBtn" : ".tab-btn",
			"freewordSearchBtn" : "#free-word-search-btn",
			"freewordTextInput" : "[name=free-word]",
			"freewordTextBlock" : ".freeword-text-block",
		},
		events: {
			"click @ui.freeWordTab" : "onTabClick",
			"click @ui.geoTab" : "onTabClick",
			"click @ui.categoryTab" : "onTabClick",
			"click @ui.freewordSearchBtn" : "onFreeWordBtnClick",
		},
		initialize: function(){
			this.listenTo( this.model ,'change', this.render );
		},
		onRender: function(){
			var $target;
			App.util.style.toInactive( this.ui.tabBtn );
			this.ui.freewordTextBlock.addClass("HIDE");
			switch (this.model.get("mode")){
				case "category":
					$target = this.ui.categoryTab;
				break;
				case "geolocation":
					$target = this.ui.geoTab;
				break;
				case "freeword":
					$target = this.ui.freeWordTab;
				this.ui.freewordTextBlock.removeClass("HIDE");
				break;
			}
			App.util.style.toActive( $target );
		},
		onTabClick: function(e){
			e.preventDefault();
			var mode = this.$(e.target).attr("data-mode");
			this.model.changeMode(mode);
		},
		onFreeWordBtnClick: function(e){
			e.preventDefault();
			this.model.setText( this.ui.freewordTextInput.val() );
			this.model.trigger('change:mode');
		}
	});
	return ShopSearchConditionView;

})();

},{"./search_condition_template.html":92,"backbone":"DIOwA5"}],94:[function(require,module,exports){
var Backbone = require('backbone');
var ShopModel = require('../../models/shop_model.js');
var ShopDetailMainView = require('./shop_detail_main_view.js');
module.exports = (function () {

	var ShopDetailLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./shop_detail_layout_template.html'),
		regions: {
			"shopDetailRegion" : "#shop-detail-region"
		},
		ui: {
		},
		events: {
		},
		initialize: function( options ){
			this.shopModel = new ShopModel( {id: options.shopId } );
			App.util.bindProgressScreen(this, this.shopModel);
			this.listenTo(this.shopModel, 'sync', this._renderShop);
		},
		onRender: function(){
			this.shopModel.fetchShop();
		},
		_renderShop: function(){
			this.shopDetailRegion.show( new ShopDetailMainView({ model: this.shopModel}) );
		},
		headerConf: {
			title: "お店詳細",
			showBackButton: true,
		},
	});

	return ShopDetailLayout;
})();

},{"../../models/shop_model.js":176,"./shop_detail_layout_template.html":95,"./shop_detail_main_view.js":97,"backbone":"DIOwA5"}],95:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="SHOP-DETAIL" class="BACKBONE-PAGE bgcolor1">\r\n\t<div id="shop-detail-region">\r\n\t</div>\r\n</div>\r\n\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],96:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\t\t<div class="title ftcolor1">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n\t\t<div class="aim ftcolor3">'+
((__t=( App.util.text.nl2br( informationText ) ))==null?'':__t)+
'</div>\r\n<!--\r\n\t\t<a href="#coupon?shop_id='+
((__t=( id ))==null?'':__t)+
'"><button type="button" class="coupon_btn btbgcolor1 btftcolor1">このお店で使えるクーポンはこちら！</button></a>\r\n-->\r\n\t\t<img class="map" src="http://map.olp.yahooapis.jp/OpenLocalPlatform/V1/static?appid=t0nKLeGxg6471KWgS6f4cfCSKfhaRXrBPTKTfW1Ktk.ISmDMy_LxmgiY2SE.3kdt&amp;lat='+
((__t=( latitude ))==null?'':__t)+
'&amp;lon='+
((__t=( longitude ))==null?'':__t)+
'&amp;pin='+
((__t=( latitude ))==null?'':__t)+
','+
((__t=( longitude ))==null?'':__t)+
'&amp;width=500&amp;height=500&amp;z=16">\r\n\t\t<div class="address ftcolor3">'+
((__t=( address1 ))==null?'':__t)+
''+
((__t=( address2 ))==null?'':__t)+
'</div>\r\n\t\t<button type="button" class="map-btn btbdcolor1 btftcolor2">地図アプリを起動</button>\r\n\t\t<div class="route ftcolor3">'+
((__t=( App.util.text.nl2br( routeInfoText ) ))==null?'':__t)+
'</div>\r\n\t\t<button type="button" class="route-btn btbdcolor1 btftcolor2">ルート案内を開始</button>\r\n\r\n\r\n';
 if(tel) {
__p+='\r\n\t<div class="telephone ftcolor3">'+
((__t=( tel ))==null?'':__t)+
'</div>\r\n\t<a href="tel:'+
((__t=( tel ))==null?'':__t)+
'"><button type="button" class="call-btn btbdcolor1 btftcolor2">'+
((__t=( tel ))==null?'':__t)+
'に電話</button></a>\r\n';
 } 
__p+='\r\n\r\n';
 if(holiday) {
__p+='\r\n\t<div class="holiday">定休日:'+
((__t=( App.util.text.nl2br( holiday ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
 if(openCloseTimeText) {
__p+='\r\n\t<div class="worktime">'+
((__t=( App.util.text.nl2br( openCloseTimeText ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n\r\n';
 if(mobileText) {
__p+='\r\n\t\t<div class="reception">'+
((__t=( App.util.text.nl2br( mobileText ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
 if(parkText) {
__p+='\r\n<div class="parking">'+
((__t=( App.util.text.nl2br( parkText ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
}
return __p;
};

},{}],97:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
var ApplicanEx = require('../../utils/applican_ex');
module.exports = (function () {

	var ShopDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./shop_detail_main_template.html'),
		ui: {
			"routeBtn" : ".route-btn",
			"mapBtn" : ".map-btn",
		},
		events:{
			"click @ui.routeBtn" : "_showGoogleRouteWindow",
			"click @ui.mapBtn" : "_openMapApplication"
		},
		initialize: function(){
		},
		onRender: function(){
		},
		_showGoogleRouteWindow: function(){

			var _this = this;
			App.applican.getCurrentPositionPromiss()
			.done( function( geoRes ){
				var href = "https://www.google.com/maps/dir/";
				href += geoRes.coords.latitude + ",";
				href += geoRes.coords.longitude + "/";
				href += _this.model.get( "latitude" ) + ",";
				href += _this.model.get( "longitude" ) + "/";
				location.href =  href + "?_native_open_embedded";
			}).fail( function(err){
				applican.notification.alert("位置情報取得に失敗しました", App.util.hideProgressScreen,"","OK");
			});
		},
		_openMapApplication: function(){
			var mapUrl = {};
		  mapUrl[ ApplicanEx.consts.device.iOS ] = "maps:q=" + this.model.get("latitude") + "," + this.model.get("longitude"),
			mapUrl[ ApplicanEx.consts.device.android ] = "http://maps.google.com/maps?q=" + this.model.get("latitude") + "," + this.model.get("longitude") + "&_native_open_external",
			location.href = mapUrl[ applican.device.platform ]; 
		},
	});

	return ShopDetailMainView;

})();

},{"../../utils/applican_ex":187,"./shop_detail_main_template.html":96,"backbone":"DIOwA5","moment":"Vip+k1"}],98:[function(require,module,exports){
var Backbone = require('backbone');
var ShopListItemView = require('./shop_list_item_view.js');
var BaseCollectionView = require('../../views/base_collection_view.js');
module.exports = (function () {
	var ShopListCollectionView = BaseCollectionView.extend({
		childView: ShopListItemView,
		tagName: 'ol',
		className: 'SHOPS'
	});
	return ShopListCollectionView;
})();

},{"../../views/base_collection_view.js":196,"./shop_list_item_view.js":100,"backbone":"DIOwA5"}],99:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="#shop/'+
((__t=( id ))==null?'':__t)+
'">\r\n<div class="row ftcolor1">\r\n\t<div class="shopName">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n';
 if( _.isNumber( distance ) ){ 
__p+='\r\n\t<div class="shopDistance">現在位置から'+
((__t=( App.util.number.roundEx( distance, 2 ) ))==null?'':__t)+
'km</div>\r\n';
 } 
__p+='\r\n</div>\r\n</a>\r\n';
}
return __p;
};

},{}],100:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var ShopListItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor1",
		template: require('./shop_list_item_template.html'),
		templateHelpers: {
		},
	});

	return ShopListItemView;

})();

},{"./shop_list_item_template.html":99,"backbone":"DIOwA5"}],101:[function(require,module,exports){
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var ShopCollection = require('../../models/shop_collection.js');
var SearchConditionModel = require('./search_box/search_condition_model.js');
var ShopSearchConditionView = require('./search_box/search_condition_view.js');
var ShopListCollectionView = require('./shop_list_collection_view.js');
var CategoryCollection = require('../../models/category_collection.js');
var CategoryListMain = require('./category_view/category_list_main.js');

module.exports = (function () {

	var ShopListLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./shop_list_layout_template.html'),
		regions: {
			"searchControllerRegion" : "#shop-search-controller-region",
			"shopListRegion" : "#shop-list-region"
		},
		ui: {
		},
		events: {
		},
		initialize: function(options){
			var options = options || {};
			this.initialQuery = options.initialQuery;
			this.listenTo( this, 'condition:ready', this._onConditionReady );
		},
		onRender: function(){
			this.shopCollection = new ShopCollection();
			this.categoryCollection = new CategoryCollection();
			App.util.bindProgressScreen( this, this.categoryCollection );
			App.util.bindProgressScreen( this, this.shopCollection );

			this.searchConditionModel = new SearchConditionModel();
			this._buildConditionModelFromQuery( this.initialQuery );
		},
		_bindEvents: function(){
			this.listenTo(this.categoryCollection, 'sync', this._renderCategories );
			this.listenTo(this.shopCollection, 'sync', this._renderShops );
			this.listenTo(this.searchConditionModel, 'change:mode', this._onModeChange );
			this.listenTo(this.searchConditionModel, 'change', this._onConditionChange );
		},
		_onConditionChange: function(){
			// 検索条件をpageSliderのhistoryに格納する事で、遷移先から「戻る」
			// で戻ってきた場合に検索条件を復元できるようにしておく
			var o = {};
			o.mode = this.searchConditionModel.get("mode");
			o.text = encodeURI( this.searchConditionModel.get("text"));
			o.category = this.searchConditionModel.get("categories").map(function(v){ return v.id });
			App.pageSlider.overWriteLastHistory( "#shop?" + $.param(o) );
		},
		_onConditionReady: function(){
			this._bindEvents();
			this._renderSearchBox();
			this._onModeChange(); //別のメソッドを用意すること
		},
		_buildConditionModelFromQuery: function( query ){
			if( !query.mode ){
				this.trigger('condition:ready');
				return;
			}
			this.searchConditionModel.changeMode( query.mode );

			var _this = this;
			if( this.searchConditionModel.get("mode") === "category" ){
				this.categoryCollection.fetchWithAuthInfo().done(function(){
					_this.searchConditionModel.setCategoriesByCategoryCollection( _this.categoryCollection, query );
					_this.trigger('condition:ready');
				});
			}else{
				console.log(query.text);
				this.searchConditionModel.set("text", decodeURI( query.text ) );
				this.trigger('condition:ready');
			}
		}, 
		headerConf: {
			title: "お店一覧",
			showBackButton: true,
		},
		_renderSearchBox: function(){
			this.searchControllerRegion.show( new ShopSearchConditionView({
				model: this.searchConditionModel
			}));
		},
		_renderShops: function(){
			this.shopListRegion.show( new ShopListCollectionView({
				collection: this.shopCollection
			}));
		},
		_renderCategories: function(){
			this.shopListRegion.show( new CategoryListMain({
				collection: this.categoryCollection,
				conditionModel: this.searchConditionModel
			}));
		},
		_fetchShops: function(){
			App.util.showProgressScreen();
			switch( this.searchConditionModel.get("mode") ){
				case "category":
					this.categoryCollection.fetchWithAuthInfo();
				break;
				case "geolocation":
					this._searchWithGeoLocation();
				break;
				case "freeword":
					this._searchWithFreeword();
				break;
			}
		},
		_onModeChange: function(){
			this._fetchShops();
		},
		_searchWithFreeword: function(){
			this.shopCollection.fetchWithFreeword( this.searchConditionModel.get("text") );
		},
		_searchWithGeoLocation: function(){
			var _this = this;
			var geolocationSuccess = function( res ){
				var coords = res.coords;
				_this.shopCollection.fetchWithGeoLocationInfo( coords.longitude , coords.latitude );
			};
			applican.geolocation.getCurrentPosition( geolocationSuccess , function( err ){
				applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.util.hideProgressScreen,"","OK");
			},{ timeout: AppConf.core.geolocationTimeout} );

		},
	});

	return ShopListLayoutView;
})();

},{"../../models/category_collection.js":165,"../../models/shop_collection.js":175,"./category_view/category_list_main.js":88,"./search_box/search_condition_model.js":91,"./search_box/search_condition_view.js":93,"./shop_list_collection_view.js":98,"./shop_list_layout_template.html":102,"backbone":"DIOwA5","jquery":"QRCzyp","underscore":"s12qeW"}],102:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="SHOP-LIST" class="BACKBONE-PAGE">\r\n\r\n<div id="shop-search-controller-region">\r\n</div>\r\n\r\n<div id="shop-list-region">\r\n</div>\r\n\r\n\r\n\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],103:[function(require,module,exports){
var Backbone = require('backbone');
//var querystring = require('querystring');
var ShopListLayoutView = require('./shop_list_layout.js');
var ShopDetailLayout = require('./shop_detail_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var ShopController = Backbone.Marionette.Controller.extend({

		showShopList: function( query ){
			var queryObj = querystring.parse(query || {});
			var shopListLayoutView = new ShopListLayoutView({ initialQuery: queryObj });
			shopListLayoutView.render();
			App.pageSlider.slidePage( shopListLayoutView );
			App.headerModel.applyViewHeaderConf( shopListLayoutView.headerConf );
		},
		showShopDetail: function( id ){
			var shopDetailLayout = new ShopDetailLayout( {shopId: id} );
			shopDetailLayout.render();
			App.pageSlider.slidePage( shopDetailLayout );
			App.headerModel.applyViewHeaderConf( shopDetailLayout.headerConf );
		},

	});

	var shopController = new ShopController();

	var ShopRouter = Backbone.Marionette.AppRouter.extend({
		controller: shopController,
		appRoutes: {
			"shop(?:query)" : "showShopList",
			"shop/:id" : "showShopDetail",
		}
	});

	return ShopRouter;

})();

},{"./shop_detail_layout.js":94,"./shop_list_layout.js":101,"backbone":"DIOwA5","querystring":"k+Qmpp"}],104:[function(require,module,exports){
var CardModel = require('../../models/card_model.js');
var ValueModel = require('../../models/value_model.js');
var Backbone = require('backbone');
module.exports = (function () {

	var SmartMainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./smart_main_template.html'),
		regions: {
			"smartMainRegion": "#smart-main-region"
		},
		initialize: function(){
			this.cardModel = new CardModel();

			App.util.bindProgressScreen(this, this.cardModel );
			this.listenTo(this.cardModel, 'sync', this._renderSmart);

			this.valueModel = new ValueModel();
			this.listenTo(this.valueModel, 'sync', this._renderValue);
		},
		onRender: function(){
			this.cardModel.fetchWithAuthInfo();
			this.valueModel.fetchWithAuthInfo({
				on401: function(){
					;
				}
			});
		},
		headerConf: {
			title: "スマラボマネー 確認",
			showBackButton: true,
		},
		ui: {
			"cardnumText" : ".cardnum-text",
			"pinnumText" : ".pinnum-text",
			"cardnumImage" : "#cardnum-image",
			"smartText" : ".smart-text",
			"smartMoneyText" : ".smartmoney-text",
			"chargeValue" : "#charge-value",
			"chargeLimit" : "#charge-limit",
			"bonusValue" : "#bonus-value",
			"bonusLimit" : "#bonus-limit",
			"couponValue" : "#coupon-value",
			"couponLimit" : "#coupon-limit",
			"pinnum" : "#pinnum",
			"smartPointText" : ".smartpoint-text",
			"pointValue" : "#point-value",
			"pointLimit" : "#point-limit",
		},
		_renderSmart: function(){
			var cardnum = this.cardModel.get('cardnum');
			if (cardnum != null) {
				var barcodeUrl = 'http://advs.jp/cp/barcode/code128.cgi?nt=1&height=80&c=' + cardnum;

				this.ui.cardnumImage.attr('src', barcodeUrl);
			} else {
				this.ui.cardnumImage.addClass('HIDE');
			}
			this.ui.cardnumText.html(App.util.text.cardnumWithDelimiter(cardnum));
			var pinnum = this.cardModel.get('pinnum');
			if (pinnum != null && pinnum != "") {
				this.ui.pinnumText.html(pinnum);
			} else {
				this.ui.pinnum.addClass('HIDE');
			}
		},
		_renderValue: function(){
			var total = this.valueModel.get('total');
			var basic = this.valueModel.get('basic');
			var bonus = this.valueModel.get('bonus');
			var coupon = this.valueModel.get('coupon');
			var expireDateBasic = this.valueModel.get('expireDateBasic');
			var expireDateBonus = this.valueModel.get('expireDateBonus');
			var expireDateCoupon = this.valueModel.get('expireDateCoupon');
			var point = this.valueModel.get('point');
			var expireDatePoint = this.valueModel.get('expireDatePoint');

			this.ui.smartMoneyText.html(App.util.text.numberWithDelimiter(total) + '円');

			this.ui.chargeValue.html(App.util.text.numberWithDelimiter(basic) + '円');
			this.ui.chargeLimit.html(App.util.text.formatExpireDate(basic, expireDateBasic));

			this.ui.bonusValue.html(App.util.text.numberWithDelimiter(bonus) + '円');
			this.ui.bonusLimit.html(App.util.text.formatExpireDate(bonus, expireDateBonus));
			
			this.ui.couponValue.html(App.util.text.numberWithDelimiter(coupon) + '円');
			this.ui.couponLimit.html(App.util.text.formatExpireDate(coupon, expireDateCoupon));

			this.ui.smartPointText.html(App.util.text.numberWithDelimiter(point) + 'Ｐ');

			this.ui.pointValue.html(App.util.text.numberWithDelimiter(point) + 'Ｐ');
			this.ui.pointLimit.html(App.util.text.formatExpireDate(point, expireDatePoint));
		}
	});

	return SmartMainLayout;
})();

},{"../../models/card_model.js":164,"../../models/value_model.js":179,"./smart_main_template.html":105,"backbone":"DIOwA5"}],105:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="SMART-MAIN" class="BACKBONE-PAGE bgcolor1">\r\n\r\n<div id="card_info">\r\n\t<div class="card-text">カード番号</div>\r\n\t<div class="cardnum-text"></div>\r\n<!-- \t<div class="card-text">カード番号&nbsp;:&nbsp;<span class="cardnum-text"></span></div> -->\r\n\t<div id="pinnum">\r\n\t<div class="card-text">PIN番号</div>\r\n\t<div class="pinnum-text"></div>\r\n<!-- \t<div class="card-text">PIN番号&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<span class="pinnum-text"></span></div> -->\r\n\t</div>\r\n</div>\r\n\r\n<div id="smart-status-region" class="smart_status">\r\n\t<div class="pointBarcode">\r\n    \t<img id="cardnum-image" src="./image/top/img_barcode.gif" height="80" width="269" alt=""> <br>\r\n  \t</div>\r\n\t<div class="current_smart">合計<span class="smartmoney-text hlftcolor3">0 円</span></div>\r\n\t<div class="current_smart">ポイント<span class="smartpoint-text hlftcolor3">0 Ｐ</span></div>\r\n\r\n\t<hr style="border-bottom: 1px dotted;">\r\n\r\n\t<div class="current_smart ftcolor1">ご利用可能額内訳：</div>\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">チャージ分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="charge-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="charge-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">ボーナス分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="bonus-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="bonus-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">クーポン分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="coupon-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="coupon-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">ポイント分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="point-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="point-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n</div>\r\n\r\n\r\n<div id="button-region">\r\n\t<a href="#history"><button type="button" class="history_btn btbgcolor1 btftcolor1">利用履歴を確認</button></a>\r\n</div>\r\n\r\n<div id="available-coupon-region" class="bgcolor1 ftcolor1">\r\n</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],106:[function(require,module,exports){
var Backbone = require('backbone');
var SmartMainLayout = require("./smart_main_layout.js");
module.exports = (function () {

	var SmartController = Backbone.Marionette.Controller.extend({
		showSmartMainView: function(){
			var smartMainLayout = new SmartMainLayout();
			smartMainLayout.render();
			App.pageSlider.slidePage( smartMainLayout );
			App.headerModel.applyViewHeaderConf( smartMainLayout.headerConf );
		},
	});

	var smartController = new SmartController();
	var SmartRouter = Backbone.Marionette.AppRouter.extend({
		controller: smartController,
		appRoutes: {
			"smart" : "showSmartMainView",
		}
	});

	return SmartRouter;

})();

},{"./smart_main_layout.js":104,"backbone":"DIOwA5"}],107:[function(require,module,exports){
var Backbone = require('backbone');
var SnsTopLayoutView = require('./sns_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var SnsController = Backbone.Marionette.Controller.extend({
		showSns: function(){
			var snsTopLayoutView = new SnsTopLayoutView();
			snsTopLayoutView.render();
			App.pageSlider.slidePage( snsTopLayoutView );
			App.headerModel.applyViewHeaderConf( snsTopLayoutView.headerConf );
		}
	});

	var snsController = new SnsController();

	var ConfigRouter = Backbone.Marionette.AppRouter.extend({
		controller: snsController,
		appRoutes: {
			"sns" : "showSns",
		}
	});

	return ConfigRouter;

})();

},{"./sns_top_layout.js":108,"backbone":"DIOwA5","querystring":"k+Qmpp"}],108:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {
	var SnsTopLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./sns_top_layout_template.html'),
		headerConf: {
			title: "SNSアカウント",
			showBackButton: true,
			showHomeButton: true,
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
	});

	return SnsTopLayoutView;
})();

},{"./sns_top_layout_template.html":109,"backbone":"DIOwA5"}],109:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE">\r\n        <div class="bgcolor3 ftcolor1">\r\n            <ul class="menuRegis">\r\n                <li class="bdcolor1" ><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.twitter, ['_native_open_embedded']) ))==null?'':__t)+
'"><span class="icon"><img src="./image/top/icon_twitter.png" width="100px" height="100px" alt=""/></span>Twitter</a></li>\r\n                <li class="bdcolor1" ><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.facebook, ['_native_open_embedded']) ))==null?'':__t)+
'"><span class="icon"><img src="./image/top/icon_facebook.png" width="100px" height="100px" alt=""/></span>facebook</a></li>\r\n                <li class="bdcolor1"><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.instagram, ['_native_open_external']) ))==null?'':__t)+
'"><span class="icon"><img src="./image/top/icon_instagram.png" width="100px" height="100px" alt=""/></span>Instagram</a></li>\r\n                <!-- <li class="bdcolor1"><a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.line, ['_native_open_external']) ))==null?'':__t)+
'"><span class="icon"><img src="./image/top/icon_line.png" width="100px" height="100px" alt=""/></span>LINE@</a></li> -->\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    '+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n    ';
}
return __p;
};

},{}],110:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="overlay OPACITY-TRANSITION bgcolor4">\r\n\t\t<div class="contents bgcolor3">\r\n\r\n\r\n';
 if( type === "stamp" ){ 
__p+='\r\n\t\t<div class="msg ftcolor1 bdcolor1">スタンプをGET！</div>\r\n';
 } 
__p+='\r\n';
 if( type === "point" ){ 
__p+='\r\n<div class="msg ftcolor1 bdcolor1">'+
((__t=( point ))==null?'':__t)+
'ポイント<br>獲得しました!!</div>\r\n';
 } 
__p+='\r\n';
 if( type === "coupon" ){ 
__p+='\r\n\t\t<div class="msg ftcolor1 bdcolor1">スペシャルクーポンを<br>獲得しました!!</div>\r\n';
 } 
__p+='\r\n\r\n\t\t<div class="get_date ftcolor1">取得日時：'+
((__t=( timestamp ))==null?'':__t)+
'</div>\r\n';
 if( type === "coupon" ){ 
__p+='\r\n\t\t<div><a href="#coupon/'+
((__t=( couponId ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'"><button class="use-coupon-btn btbgcolor1 btftcolor1" type="button">このクーポンを使う</button></a></div>\r\n';
 } 
__p+='\r\n';
 if( type === "point" ){ 
__p+='\r\n\t\t<div><a href="#point"><button class="btbgcolor1 btbdcolor1 btftcolor1" type="button">ポイントを使う</button></a></div>\r\n';
 } 
__p+='\r\n\t\t<div><button class="show-coupon-btn btbgcolor2 btbdcolor1 btftcolor2" type="button">クーポン一覧を見る</button></div>\r\n\t\t<div><button class="close-btn btbgcolor2 btbdcolor1 btftcolor2" type="button">閉じる</button></div>\r\n\t\t</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],111:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var GetStampIncentiveView = Backbone.Marionette.ItemView.extend({
		template: require('./get_stamp_incentive_template.html'),
		ui: {
			"overlay" : ".overlay", 
			"closeBtn" : ".close-btn", 
			"showCouponButton" : ".show-coupon-btn"
		},
		events: {
			"click @ui.closeBtn" : "onCloseClick",
			"click @ui.showCouponButton" : "onShowCouponClick"
		},
		initialize: function(incentiveInfo){

			this.incentiveInfo = incentiveInfo;
			this.model = new Backbone.Model();
			this._setModelFromIncentiveInfo();
			// ポイントゲットの場合
			// クーポンゲットの場合
			// スタンプゲットの場合

			this.model.set("timestamp", moment().format('YYYY/MM/DD HH:mm:ss') );

		},
		onRender: function(){
			this.ui.overlay.removeClass('HIDE');
			var _this = this;
			setTimeout( function(){
				_this.ui.overlay.removeClass('INVISIBLE');
			}, 100);
		},
		_setModelFromIncentiveInfo: function(){
			switch (this.incentiveInfo.incentiveType + "" ){
				case "0" :
					this.model.set("type", "stamp");
				break;
				case "1" :
					this.model.set("type", "coupon");
				this.model.set("couponId", this.incentiveInfo.coupon.id );
				this.model.set("uCoupId", this.incentiveInfo.coupon.uCoupId );
				break;
				case "2" :
					this.model.set("type", "point");
				this.model.set("point", this.incentiveInfo.point );
				break;
			}
		},
		onCloseClick: function(e){
			e.preventDefault();
			this.ui.overlay.addClass('INVISIBLE');
			var _this = this;
			setTimeout( function(){
				_this.destroy();
			}, 400);
		},
		onShowCouponClick: function(){
			location.hash = "#coupon";
		},
	});
	return GetStampIncentiveView;
})();

},{"./get_stamp_incentive_template.html":110,"backbone":"DIOwA5","moment":"Vip+k1"}],112:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var StampCardModel = Backbone.Model.extend({
	});

	var StampCardCollection = Backbone.Collection.extend({
		model: StampCardModel,
	});

	StampCardCollection.generate = function( count, imageUrl, maxCount ){
		console.log(maxCount);
		console.log(count);
		var arr = [];
		for( var i = 0; i < maxCount ; i++ ){
			if( i < count ){
				arr.push({ id: i, image: imageUrl });
			}else{
				arr.push({ id: i, image: "" });
			}
		}
		return new StampCardCollection( arr );
	};

	return StampCardCollection;

})();

},{"backbone":"DIOwA5"}],113:[function(require,module,exports){
var Backbone = require('backbone');
var StampCardItemView = require('./stamp_card_item_view');
module.exports = (function () {
	var StampCardCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: StampCardItemView,
		tagName: 'ol',
		className: 'STAMPCARD'
	});
	return StampCardCollectionView;
})();

},{"./stamp_card_item_view":115,"backbone":"DIOwA5"}],114:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if( image ){ 
__p+='\r\n\t<img src="'+
((__t=( image ))==null?'':__t)+
'">\r\n';
 } 
__p+='\r\n\r\n';
}
return __p;
};

},{}],115:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var StampCardItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor3 ftcolor2", 
		attributes: function(){
			return { "data-index": this.model.get("id") + 1};
		},
		template: require('./stamp_card_item_template.html'),
	});

	return StampCardItemView;

})();

},{"./stamp_card_item_template.html":114,"backbone":"DIOwA5","moment":"Vip+k1"}],116:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
var StampViewModel = require('../../models/stamp_view_model');
var StampCardCollectionView = require('./stamp_card/stamp_card_collection_view.js');
var StampCardCollection = require('./stamp_card/stamp_card_collection.js');
var GetStampIncentiveView = require('./interactions/get_stamp_incentive_view.js');
module.exports = (function () {

    var StampDownLayoutView = Backbone.Marionette.LayoutView.extend({

        template: require('./stamp_down_layout_template.html'),        
        initialize: function(){
         /*   var _this = this;
            this.stampCardCollection = {};
            this.stampViewModel = new StampViewModel();
            App.util.bindProgressScreen( this, this.stampViewModel);
            this.listenTo( this.stampViewModel, 'sync', this._setUpStampCard );
            this.listenTo( this.stampViewModel, 'sync', this._renderStampInfo );
*/

        },
        onRender: function(){
            // this.stampViewModel.fetchWithAuthInfo();
            App.util.hideProgressScreen();
        },
        headerConf: {
            title: "スタンプ",
            showBackButton: true,
        },
        _setUpStampCard: function(){


            // 画面上部のテキスト処理
            var benefitText = ( this.stampViewModel.isExchangeableForCoupon() )? "スペシャルクーポン" : "ポイント";
            this.$('.stampRank1TypeText').text( benefitText );
            this.$('.stampRank1MaxText').text( this.stampViewModel.get("stampRank1Max") );
            this.$('#stamp-note').html( this.stampViewModel.get("note") );

            // スタンプを押すボタンの表示/非表示
            if( this.stampViewModel.isCouponOnly() ){
                this.ui.getStampButton.addClass("hide");
            }

            // スタンプカードの描写
            this.stampCardCollection = StampCardCollection.generate(
                this.stampViewModel.get("useCounts"),
                this.stampViewModel.get("stampRank1ImageUrl"),
                this.stampViewModel.get("stampRank1Max")
            );
            this._renderStampCard();
            this.listenTo( this.stampCardCollection, 'add', this._renderStampCard );
        },
        _renderStampInfo: function(){
            var limited = this.stampViewModel.get("useCondInterval");
            this.$(".use-cond-interval").html( ( limited )? "あり" : "なし");
            // 当日制限あり/かつ最終利用日が当日の場合は事前にスタンプボタンを非表示とする
            if( limited && App.util.date.isToday( new Date( this.stampViewModel.get("finalUseDate")))){
                this.ui.getStampButton.text("取得済み");
                this.ui.getStampButton.addClass("disabledButton");
                this.ui.getStampButton.prop("disabled", "true");
            }
        },
        _renderStampCard: function(){
            this.stampCardRegion.show( new StampCardCollectionView({collection: this.stampCardCollection}));
        },
        _getStamp: function(e){
            var _this = this;
            // 位置情報を取得
            App.util.execWithProgressScreen(function(){
                return App.applican.getCurrentPositionPromiss();
            }).done( function( result ){
                // 成功したらスタンプ取得リクエストを投げる
                var location = {
                    longitude: result.coords.longitude,
                    latitude: result.coords.latitude
                };
                App.util.execWithProgressScreen( function (){
                    return App.btApi.getStamp(location);
                }).done(function(data){
                    _this._showStampInteraction( data );
                    var newCount = data.stamp.useCounts;
                    if( newCount === 0 ){
                        _this.stampViewModel.fetchWithAuthInfo();
                    }else{
                        _this.stampCardCollection.findWhere({ id: newCount - 1 } ).set("image", _this.stampViewModel.get("stampRank1ImageUrl"))
                        _this._renderStampCard();
                        _this.ui.getStampButton.addClass('HIDE');
                    }
                }).fail(function(){
                    applican.notification.alert("最寄りの店舗が見つからないため、スタンプを取得できません。", App.doNothing, "", "OK");
                });
            }).fail(function(err){
                applican.notification.alert("位置情報の取得に失敗しました。", App.doNothing, "", "OK");
            });
        },
        _showStampInteraction: function( incentiveInfo ){
            this.stampInteractionRegion.show( new GetStampIncentiveView( incentiveInfo ) );
        },
    });

    return StampDownLayoutView;
})();

},{"../../models/stamp_view_model":177,"./interactions/get_stamp_incentive_view.js":111,"./stamp_card/stamp_card_collection.js":112,"./stamp_card/stamp_card_collection_view.js":113,"./stamp_down_layout_template.html":117,"backbone":"DIOwA5","moment":"Vip+k1"}],117:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="STAMP-DOWN" class="BACKBONE-PAGE">\r\n\t<div id="stamp-go-down">\r\n\t\t<img src="./image/stamp/stamp-down.png" />\r\n\t</div>\t\r\n</div>\r\n\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],118:[function(require,module,exports){
var Backbone = require('backbone');
var StampTopLayoutView = require('./stamp_top_layout.js');
var StampDownLayoutView = require('./stamp_down_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var StampController = Backbone.Marionette.Controller.extend({
		showStampTop: function(){
			// location.href="#stamp-down";
			var stampTopLayoutView = new StampTopLayoutView();
			stampTopLayoutView.render();
			App.pageSlider.slidePage( stampTopLayoutView );
			App.headerModel.applyViewHeaderConf( stampTopLayoutView.headerConf );
		},
		showStampDown: function(){
			var stampDownLayoutView = new StampDownLayoutView();
			stampDownLayoutView.render();
			App.pageSlider.slidePage( stampDownLayoutView );
			App.headerModel.applyViewHeaderConf( stampDownLayoutView.headerConf );
		}
	});

	var stampController = new StampController();

	var StampRouter = Backbone.Marionette.AppRouter.extend({
		controller: stampController,
		appRoutes: {
			"stamp" : "showStampTop",
			"stamp-down" : "showStampDown",
		}
	});

	return StampRouter;

})();

},{"./stamp_down_layout.js":116,"./stamp_top_layout.js":119,"backbone":"DIOwA5","querystring":"k+Qmpp"}],119:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
var StampViewModel = require('../../models/stamp_view_model');
var StampCardCollectionView = require('./stamp_card/stamp_card_collection_view.js');
var StampCardCollection = require('./stamp_card/stamp_card_collection.js');
var GetStampIncentiveView = require('./interactions/get_stamp_incentive_view.js');
module.exports = (function () {

    var StampTopLayoutView = Backbone.Marionette.LayoutView.extend({

        template: require('./stamp_top_layout_template.html'),
        regions: {
            'stampCardRegion' : '#stampCardRegion',
            'stampInteractionRegion' : '#stamp-interaction'
        },
        ui: {
            "getStampButton" : "#get-stamp-btn"
        },
        events: {
            "click @ui.getStampButton" : "_getStamp"
        },
        initialize: function(){
            var _this = this;
            this.stampCardCollection = {};
            this.stampViewModel = new StampViewModel();
            App.util.bindProgressScreen( this, this.stampViewModel);
            this.listenTo( this.stampViewModel, 'sync', this._setUpStampCard );
            this.listenTo( this.stampViewModel, 'sync', this._renderStampInfo );
        },
        onRender: function(){
            this.stampViewModel.fetchWithAuthInfo();
        },
        headerConf: {
            title: "スタンプ",
            showBackButton: true,
        },
        _setUpStampCard: function(){
            // 画面上部のテキスト処理
            var benefitText = ( this.stampViewModel.isExchangeableForCoupon() )? "スペシャルクーポン" : "ポイント";
            this.$('.stampRank1TypeText').text( benefitText );
            this.$('.stampRank1MaxText').text( this.stampViewModel.get("stampRank1Max") );
            this.$('#stamp-note').html( this.stampViewModel.get("note") );

            // スタンプを押すボタンの表示/非表示
            if( this.stampViewModel.isCouponOnly() ){
                this.ui.getStampButton.addClass("hide");
            }

            // スタンプカードの描写
            this.stampCardCollection = StampCardCollection.generate(
                this.stampViewModel.get("useCounts"),
                this.stampViewModel.get("stampRank1ImageUrl"),
                this.stampViewModel.get("stampRank1Max")
            );
            this._renderStampCard();
            this.listenTo( this.stampCardCollection, 'add', this._renderStampCard );
        },
        _renderStampInfo: function(){
            var limited = this.stampViewModel.get("useCondInterval");
            this.$(".use-cond-interval").html( ( limited )? "あり" : "なし");
            // 当日制限あり/かつ最終利用日が当日の場合は事前にスタンプボタンを非表示とする
            if( limited && App.util.date.isToday( new Date( this.stampViewModel.get("finalUseDate")))){
                this.ui.getStampButton.text("取得済み");
                this.ui.getStampButton.addClass("disabledButton");
                this.ui.getStampButton.prop("disabled", "true");
            }
        },
        _renderStampCard: function(){
            this.stampCardRegion.show( new StampCardCollectionView({collection: this.stampCardCollection}));
        },
        _getStamp: function(e){
            var _this = this;
            // 位置情報を取得
            App.util.execWithProgressScreen(function(){
                return App.applican.getCurrentPositionPromiss();
            }).done( function( result ){
                // 成功したらスタンプ取得リクエストを投げる
                var location = {
                    longitude: result.coords.longitude,
                    latitude: result.coords.latitude
                };
                App.util.execWithProgressScreen( function (){
                    return App.btApi.getStamp(location);
                }).done(function(data){
                    _this._showStampInteraction( data );
                    var newCount = data.stamp.useCounts;
                    if( newCount === 0 ){
                        _this.stampViewModel.fetchWithAuthInfo();
                    }else{
                        _this.stampCardCollection.findWhere({ id: newCount - 1 } ).set("image", _this.stampViewModel.get("stampRank1ImageUrl"))
                        _this._renderStampCard();
                        _this.ui.getStampButton.addClass('HIDE');
                    }
                }).fail(function(){
                    applican.notification.alert("最寄りの店舗が見つからないため、スタンプを取得できません。", App.doNothing, "", "OK");
                });
            }).fail(function(err){
                applican.notification.alert("位置情報の取得に失敗しました。", App.doNothing, "", "OK");
            });
        },
        _showStampInteraction: function( incentiveInfo ){
            this.stampInteractionRegion.show( new GetStampIncentiveView( incentiveInfo ) );
        },
    });

    return StampTopLayoutView;
})();

},{"../../models/stamp_view_model":177,"./interactions/get_stamp_incentive_view.js":111,"./stamp_card/stamp_card_collection.js":112,"./stamp_card/stamp_card_collection_view.js":113,"./stamp_top_layout_template.html":120,"backbone":"DIOwA5","moment":"Vip+k1"}],120:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="STAMP-TOP" class="BACKBONE-PAGE">\r\n\t<div class="stamp_area bgcolor2">\r\n\t\t<div class="memo ftcolor2">スタンプを<span class="stampRank1MaxText"></span>個集めると<br><span class="stampRank1TypeText"></span>をプレゼント</div>\r\n\t\t<div id="stampCardRegion"><ol class="STAMPCARD">\r\n\t\t\t';
 for( var index = 0 ; index < AppConf.layout.stamp.initialStampCount; index++){ 
__p+='<li data-index="'+
((__t=( index ))==null?'':__t)+
'" class="bgcolor3 ftcolor2"></li>';
 } 
__p+='\r\n\t\t</ol>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="btn_area bgcolor1">\r\n\t\t<button id="get-stamp-btn" type="button" class="btbgcolor1 btftcolor1">スタンプを押す</button>\r\n\t\t<div class="use_cond ftcolor1">利用条件</div>\r\n\t\t<div class="ftcolor3">同日利用制限：<span class="use-cond-interval"></span></div>\r\n\t\t<br>\r\n\t\t<div class="ftcolor3" id="stamp-note"></div>\r\n\t</div>\r\n\t<div id="stamp-interaction"></div>\r\n</div>\r\n\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],121:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function(){
	var HeaderModel = Backbone.Model.extend({
		defaults: {
			title: "Applican Sample",
            showBackButton: true,
		},
		applyViewHeaderConf: function( headerConf ){
			if( !headerConf ) return;

			headerConf.customeBackAction = headerConf.customeBackAction || void(0);
			headerConf.hideHeader = headerConf.hideHeader || false;
			headerConf.headerPoex = headerConf.headerPoex || false;
			this.set( headerConf );
		},
	});

	return HeaderModel;


})();

},{"backbone":"DIOwA5"}],122:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="RELATIVE-WRAPPER HEADER-INNER-WRAPPER">\r\n\t<div class="HEADER-LEFT">\r\n\t\t<span class="back-button BACK-BUTTON-WRAPPER">\r\n\t\t\t<button class="BACK-BUTTON bgcolor1">戻る</button>\r\n\t\t</span>\r\n\t</div>\r\n\t<div class="HEADER-RIGHT">\r\n\t</div>\r\n\t<span class="title TITLE"></span>\r\n</div>\r\n';
}
return __p;
};

},{}],123:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var HeaderView = Backbone.Marionette.ItemView.extend({
		template: require('./header_view.html'),
		ui: {
			"title" : ".title",
			"back" : ".back-button",
		},
		events: {
			"touchend @ui.back" : "_doBack"
		},
		initialize: function( options ){
			this.headerModel = options.headerModel;
			this.listenTo( this.headerModel, 'change', this.refresh );
		},
		onRender: function(){
			this.refresh();
		},
		refresh: function(){
			this.ui.title.html( this.headerModel.get("title") );

			// ヘッダの表示/非表示
			if( this.headerModel.get( 'hideHeader' ) ){
				this.$el.parent().addClass( 'HIDE' );
			}else{
				this.$el.parent().removeClass( 'HIDE' );
			}

			// 戻るボタン
			if( this.headerModel.get( 'showBackButton' ) ){
				this.ui.back.removeClass( 'hide' );
			}else{
				this.ui.back.addClass( 'hide' );
			}

            // header point exchance
			if( this.headerModel.get( 'headerPoex' ) ){
				this.$el.parent().addClass( 'header-poex' );
			}else{
				this.$el.parent().removeClass( 'header-poex' );
			}

		},
		_doBack: function(e){
			e.preventDefault();

			if( this.headerModel.get("customeBackAction") ){
				this.headerModel.get("customeBackAction")();
			}else{
				App.pageSlider.back();
			}
		}

	});
	return HeaderView;
})();

},{"./header_view.html":122,"backbone":"DIOwA5"}],124:[function(require,module,exports){
var Backbone = require('backbone');
var LoginView = require('./login_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(){
		},
		onRender: function(){
			this._renderLoginMain();
			App.util.hideProgressScreen();
		},
		headerConf: {
			title: "ログイン",
			showBackButton: true,
			customeBackAction: function(){
				App.pageSlider.backAndRestartHistory();
			}
		},
		_renderLoginMain: function(){
			this.loginMainRegion.show( new LoginView() );
		}
	});

	return LoginLayout;
})();

},{"./login_layout_template.html":125,"./login_view.js":137,"backbone":"DIOwA5"}],125:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\r\n<div id="LOGIN-MAIN" class="BACKBONE-PAGE">\r\n\r\n<div id="login-main-region">\r\n</div>\r\n\r\n</div>\r\n';
}
return __p;
};

},{}],126:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var ConfigTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_menu_layout_template.html'),
		regions: {
		},
		ui: {
			"registCardUserBtn" : "#regist-carduser-btn",
			"registUserBtn" : "#regist-user-btn"
		},
		events: {
			"click @ui.registCardUserBtn" : "openRegistCardUserWindow",
			"click @ui.registUserBtn" : "openRegistUserWindow"
		},
		initialize: function(options){
			this.userId = options.userId;

			var auth = App.getAuthInfo();
			this.smstel = auth.smstel;
			console.log("userId:" + this.userId );
			console.log("smstel:" + this.smstel );
		},
		headerConf: {
			title: "メニュー",
			showBackButton: true,

		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
		openRegistCardUserWindow: function(){
			var sid = this.userId + this.smstel.substr(-4);
			var url = AppConf.url.registerFormCard + '&SID=' + sid;
			console.log("sid:" + sid );

			location.href = url + '&_native_open_embedded';
//			location.href = url;
		},
		openRegistUserWindow: function(){
			var sid = this.userId + this.smstel.substr(-4);
			var url = AppConf.url.registerForm + '&SID=' + sid;
			console.log("sid:" + sid );

			location.href = url + '&_native_open_embedded';
//			location.href = url;
		}
	});

	return ConfigTopLayoutView;
})();

},{"./login_sms_menu_layout_template.html":127,"backbone":"DIOwA5"}],127:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE">\r\n\r\n<div class="bgcolor3 ftcolor1">\r\n\t<ul>\r\n\t\t<li class="bdcolor1" id="regist-carduser-btn"><a >カードをお持ちの方はこちら</a></li>\r\n\t\t<li class="bdcolor1" id="regist-user-btn"><a >モバイル会員証のみでご利用の方はこちら</a></li>\r\n\t</ul>\r\n</div>\r\n\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],128:[function(require,module,exports){
var Backbone = require('backbone');
var LoginView = require('./login_sms_pass_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_pass_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(options){
			this.smstel  = options.smstel;
			this.userId  = options.userId;
			console.log('initialize done userId:' + this.userId);
		},
		onRender: function(){
			this._renderLoginMain();
			App.util.hideProgressScreen();
		},
		headerConf: {
			title: "ログイン",
			showBackButton: true,
			customeBackAction: function(){
				App.pageSlider.backAndRestartHistory();
			}
		},
		_renderLoginMain: function(){
//			console.log('_renderLoginMain smstel:' + this.smstel);
			console.log('_renderLoginMain done userId:' + this.userId);
			this.loginMainRegion.show( new LoginView({smstel: this.smstel, userId: this.userId}) );
		}
	});

	return LoginLayout;
})();

},{"./login_sms_pass_layout_template.html":129,"./login_sms_pass_view.js":131,"backbone":"DIOwA5"}],129:[function(require,module,exports){
module.exports=require(125)
},{}],130:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="LOGIN">\r\n\t<label for="password">パスワード</label>\r\n\t<input type="tel" name="password" id="password">\r\n\t<button type="button" class="login-btn btbgcolor1 btftcolor1">次へ</button>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],131:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_sms_pass_template.html'),
		events: {
			"click .login-btn" : "execLogin",
			"click @ui.cancelBtn" : "execCancel"
		},
		initialize: function(options){
			this.smstel = options.smstel;
			this.userId = options.userId;
		},
		ui: {
//			"inputId" : "[name=user-id]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
//			this.ui.inputId.val( auth.userid );
//			this.ui.inputPassword.val( auth.password );
		},
		execLogin: function(){
			console.log('execLogin smstel:' + this.smstel);
			var smstel = this.smstel;
			var userId = this.userId;
			console.log('execLogin done userId:' + userId);
			var password = this.ui.inputPassword.val();
			if (password == "") {
				applican.notification.alert("パスワードを入力してください。", App.doNothing, "", "OK");
			} else {
				var loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.loginSms( smstel, password),
						{ ignoreStatuses: [401,404] }
					);
				};

				// ログインリクエストを実行
				App.util.execWithProgressScreen( loginRequest )
				.done( function(data){
					// ログインが成功したら、smstelのみ保存
					App.appModel.setAuthAndSave( { smstel: smstel, password: password, tokentemp: data.accessToken, token: "" } );
//					var sid = userId + smstel.substr(-4);
//					var url = AppConf.url.registerForm + '&SID=' + sid;
//					location.href = url;

					var url = '#loginSmsMenu?userId=' + userId;
//					location.hash = url + '&_native_open_embedded';
					location.hash = url;
				}).fail(function(err){
					if(err.status === 401){
						applican.notification.alert("認証に失敗しました。番号認証に戻ってやり直してください", App.doNothing, "", "OK");
					} else if (err.status === 404){
						applican.notification.alert("ユーザ名とパスワードの組み合わせが間違っています", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
			}
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();

},{"./login_sms_pass_template.html":130,"backbone":"DIOwA5"}],132:[function(require,module,exports){
var Backbone = require('backbone');
var LoginView = require('./login_sms_tel_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_tel_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(){
		},
		onRender: function(){
			this._renderLoginMain();
			App.util.hideProgressScreen();
		},
		headerConf: {
			title: "ログイン",
			showBackButton: true,
			customeBackAction: function(){
				App.pageSlider.backAndRestartHistory();
			}
		},
		_renderLoginMain: function(){
			this.loginMainRegion.show( new LoginView() );
		}
	});

	return LoginLayout;
})();

},{"./login_sms_tel_layout_template.html":133,"./login_sms_tel_view.js":135,"backbone":"DIOwA5"}],133:[function(require,module,exports){
module.exports=require(125)
},{}],134:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="LOGIN">\r\n\t<label for="user-id">携帯電話番号</label>\r\n\t<input type="tel" name="smstel" id="user-id">\r\n\t<button type="button" class="login-btn btbgcolor1 btftcolor1">規約に同意して番号認証</button>\r\n\t<span class="cancel-btn">認証をスキップ</span>\r\n\t<p class="instruction ftcolor2">※認証をスキップすると、クーポン・スタンプ・<br>\r\n\tポイント・スクラッチの機能が制限されます。</p>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],135:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_sms_tel_template.html'),
		events: {
			"click .login-btn" : "sendSms",
			"click @ui.cancelBtn" : "execCancel"
		},
		ui: {
			"inputSmstel" : "[name=smstel]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
			this.ui.inputSmstel.val( auth.smstel );
//			this.ui.inputPassword.val( auth.password );
		},
		sendSms: function(){
			var smstel = this.ui.inputSmstel.val();
			if (smstel == "") {
				applican.notification.alert("電話番号を入力してください。", App.doNothing, "", "OK");
			} else {
				var loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.sendsms(smstel),
						{ ignoreStatuses: [400] }
					);
				};

				// ログインリクエストを実行
				App.util.execWithProgressScreen( loginRequest )
				.done( function(data){
					var userId = data.userId;
//					var passwordOne = data.passwordOne;
					console.log('sendsms done userId:' + userId);
//					console.log('sendsms done passwordOne:' + passwordOne);
					if (userId) {
//						console.log('sendsms done smstel:' + smstel);
						location.hash = '#loginSmsPass?userId=' + userId + '&smstel=' + smstel;
					}
				}).fail(function(err){
					if(err.status === 400){
						applican.notification.alert("電話番号を確認してください", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
			}
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();

},{"./login_sms_tel_template.html":134,"backbone":"DIOwA5"}],136:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="LOGIN">\r\n\t<label for="user-id">メールアドレス</label>\r\n\t\t<input type="text" name="user-id" id="user-id">\r\n\t\t<label for="password">パスワード</label>\r\n\t\t<input type="password" name="password" id="password">\r\n\t\t<button type="button" class="login-btn btbgcolor1 btftcolor1">ログイン</button>\r\n\t\t<a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.forgetPassword, ['_native_open_embedded']) ))==null?'':__t)+
'" class="forget ftcolor2">パスワードを忘れた方はコチラ</a>\r\n\t\t<a href="#menuRegis" class="singup btbdcolor1 btftcolor2">新規会員登録へ</a>\t\t\r\n\t<span class="cancel-btn">会員登録をスキップ</span>\r\n\t<p class="instruction ftcolor2">※会員登録をスキップすると、<br>\r\n\tクーポン・ポイントの機能が制限されます。</p>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],137:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_template.html'),
		events: {
			"click .login-btn" : "execLogin",
			"click @ui.cancelBtn" : "execCancel"
		},
		ui: {
			"inputId" : "[name=user-id]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
			this.ui.inputId.val( auth.userid );
			this.ui.inputPassword.val( auth.password );
		},
		execLogin: function(){
			var userid = this.ui.inputId.val();
			var password = this.ui.inputPassword.val();
			var loginRequest = function(){
				return App.util.bindCommonErrorHandling(
					App.btApi.login( userid, password),
					{ ignoreStatuses: [404] }
				);
			};

			// ログインリクエストを実行
			App.util.execWithProgressScreen( loginRequest )
			.done( function(data){
				// ログインが成功したら、ID/PASSを永続化して以前の画面に戻る
				App.appModel.setAuthAndSave( { userid: userid, password: password, token: data.accessToken } );
				App.pageSlider.back();
				App.vent.trigger( 'app-login' , { userid: userid, password: password, token: data.accessToken });
			}).fail(function(err){
				if(err.status === 404){
					applican.notification.alert("ユーザ名とパスワードの組み合わせが間違っています", App.doNothing, "", "OK");
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();

},{"./login_template.html":136,"backbone":"DIOwA5"}],138:[function(require,module,exports){

var ModalAlertView = require('./modals/alert/modal_alert_view');
var ModalConfirmView = require('./modals/confirm/modal_confirm_view');

window.App = {};

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackButton, false);

function onDeviceReady() {

	// ############## Native API start #################
	native.config = {
		device_os: "ANDROID",
	};
	native.device.package_name = "com.betrend.dev.dvep";
	// パッケージ名が変更
	native.localNotification = native.localnotification;
	window.applican = native;
	// ############## Native API end #################

	if (!window.AppConf) {

		// ############## Native API start #################
		native.config = {
			device_os: "ANDROID",
		};
		native.device = {};
		native.device.package_name = "com.betrend.dev.dvep";
		// modify package names
		native.localNotification = native.localnotification;
		window.applican = native;
		// ############## Native API end #################

		applican.notification.alert("アプリ設定が読み込まれていません", function() { return false; }, "title", "OK");
		return;
	}
	
	App = require('./app.js');
	var modalConfirmView = new ModalConfirmView();
	var modalAlertView = new ModalAlertView();
	window.native.notification.alert = function(message, alertCallback, title, buttonName) {
		modalAlertView.show({ title: title, text: message, okButton: buttonName });
	}
	window.native.notification.confirm = function(message, confirmCallback, title, buttonName) {
		var buttons = [];
		if (buttonName) {
			buttons = buttonName.split(',');
		}
		modalConfirmView.show({ title: title, text: message, okButton: buttons[0], cancelButton: buttons[0] ? buttons[0] : null }).then(function(res) {
			if (res === 1) {
				confirmCallback && confirmCallback(1);
			}
		});
	}
	App.start();
};
// Android戻るボタンサポート(TOPで終了)
function onBackButton() {
	var url = document.location.href;
	if (url.match("(.+/index.html$|.+/index.html#$)")) {
		applican.notification.confirm(
			"アプリを終了しますか？", onFinish, "終了", "終了する,キャンセル");
	} else {
		history.back();
	}
}

function onFinish(num) {
	if (num == 1) {
		applican.finish();
	}
}

},{"./app.js":8,"./modals/alert/modal_alert_view":150,"./modals/confirm/modal_confirm_view":152}],139:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<header class="APP-HEADER app-header">\r\n</header>\r\n<div id="master-container-wrapper" class="bgcolor1">\r\n  <div id="master-container">\r\n  </div>\r\n</div>\r\n<footer></footer>\r\n';
}
return __p;
};

},{}],140:[function(require,module,exports){
var Backbone = require('backbone');
var HeaderView = require('./header/header_view');
module.exports = (function () {

	var MainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./main_layout.html'),
		regions: {
			"headerRegion" : ".app-header",
		},
		ui: {
			"masterContainer" : "#master-container"
		},
		initialize: function(){
			this.headerView = new HeaderView({
				headerModel: App.headerModel
			});
		},
		onRender: function(){
			var appHeaderHeight = 44;
			this.ui.masterContainer.css({"min-height": window.innerHeight - appHeaderHeight + "px"});
			this.headerRegion.show( this.headerView );
		}

	});

	return MainLayout;
})();

},{"./header/header_view":123,"./main_layout.html":139,"backbone":"DIOwA5"}],141:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="APP-TOP" class="BACKBONE-PAGE" style="margin-top: -44px;">\r\n  <div class="cf">\r\n    \r\n    ';
 if( AppConf.features.slideshow ){ 
__p+='\r\n      <div id="havedata" class="sliderImages">\r\n        <div class="slickSlider"></div>\r\n      </div>\r\n      <div id="nodata" class="inner-top hide">\r\n        <img class="logo-center" src="./image/top/logo.png">\r\n      </div>\r\n    ';
 }else{ 
__p+='\r\n      <div class="inner-top">\r\n        <img class="logo-center" src="./image/top/logo.png">\r\n        <div class="topBg">\r\n          <img src="'+
((__t=( AppConf.slideshow.slideshowContentsList[0].imageUrl ))==null?'':__t)+
'">\r\n        </div>\r\n      </div>\r\n      <!-- /.topBg -->\r\n    ';
 } 
__p+='\r\n\r\n    <div class="menuContainer">\r\n\r\n      ';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\r\n        <a href="#member">\r\n          <div class="pointArea ';
 if (applican.config.device_os === "IOS"){ 
__p+='ios_Area';
}
__p+=' cf">\r\n            <div class="pointRight">\r\n              <img id="memberCard" src="./image/member/empty_sm.png" alt="">\r\n            </div>\r\n            <div class="pointLeft">\r\n              <h2><span class="point-value">0</span></h2> \r\n              <span class="unit">pt</span> \r\n              <div class="point_icon"><img src="./image/top/icon_row.png" /></div>\r\n              <p>会員カード<br />を表示する</p>        \r\n            </div>    \r\n          </div>\r\n        </a>\r\n      ';
 }else{ 
__p+='\r\n        <div class="button-group ';
 if (applican.config.device_os === "IOS"){ 
__p+='ios_Area';
}
__p+='">\r\n          <a href="#login" class="btn-common login">ログインする</a>\r\n          <a href="#menuRegis" class="btn-common regis-user">会員登録をする</a>\r\n        </div>\r\n      ';
 } 
__p+='\r\n\r\n      <div class="menuBody">\r\n\r\n        <div class="menuColumn3 bdcolor2 cf">\r\n          <a href="#coupon">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_coupon.png" width="50px" height="50px" alt=""/>\r\n              </div>\r\n              <p class="btnM ftcolor5 bdcolor1">クーポン</p>\r\n            </div>\r\n          </a>\r\n          <a href="#information">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_information.png" width="50px" height="50px" alt=""/>\r\n              </div>\r\n              <p class="btnM ftcolor5 bdcolor1">お知らせ</p>\r\n              <span class="badge-number"></span>\r\n            </div>\r\n          </a>\r\n          <a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.website, ['_native_open_embedded']) ))==null?'':__t)+
'">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_website.png" width="50px" height="50px" alt=""/>\r\n              </div>\r\n              <p class="btnM ftcolor5 bdcolor1">公式サイト</p>\r\n            </div>\r\n          </a>      \r\n        </div>\r\n\r\n        <div class="menuColumn3 bdcolor2 cf">\r\n          <a id=\'orderIcon\' href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.onlineshop, ['_native_open_embedded']) ))==null?'':__t)+
'">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_ec.png" width="50px" height="50px" alt=""/>\r\n              </div>\r\n              <p class="btnM ftcolor5 ftcolor1">オンラインショップ</p>\r\n            </div>\r\n          </a> \r\n          <a  href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.order, ['_native_open_embedded']) ))==null?'':__t)+
'">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_order.png" width="50px" height="50px" alt=""/>\r\n              </div>\r\n              <p class="btnM ftcolor5 bdcolor1">レストラン予約</p>\r\n            </div>\r\n          </a>\r\n          <a href="#history">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_history.png" width="50px" height="50px" alt=""/>\r\n              </div>\r\n              <p class="btnS ftcolor1 bdcolor1">利用履歴</p>\r\n            </div>\r\n          </a>\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class="menuFooter">\r\n        <div class="menuColumn2 bdcolor1">\r\n          <a href="#sns">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_sns.png" width="45px" height="45px" alt=""/>\r\n              </div>\r\n              <p class="btnS ftcolor1 bdcolor1">SNS</p>\r\n            </div>\r\n          </a>\r\n          <a href="#config">\r\n            <div class="menuBlock">\r\n              <div class="svgContainer">\r\n                <img src="./image/top/icon_config.png" width="45px" height="45px" alt=""/>\r\n              </div>\r\n              <p class="btnS ftcolor1 bdcolor1">設定</p>\r\n            </div>\r\n          </a>\r\n        </div>\r\n      </div>\r\n\r\n    </div> <!-- /.menuContainer -->\r\n  </div>\r\n</div> <!-- /#APP-TOP -->\r\n';
}
return __p;
};

},{}],142:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="APP-TOP" class="BACKBONE-PAGE" style="margin-top: -44px;">\r\n<div class="cf">\r\n    ';
 if( AppConf.features.slideshow ){ 
__p+='\r\n      <div class="sliderImages">\r\n        <div class="slickSlider"></div>\r\n      </div>\r\n    ';
 }else{ 
__p+='\r\n      <div class="topBg">\r\n        <img src="'+
((__t=( AppConf.slideshow.slideshowContentsList[0].imageUrl ))==null?'':__t)+
'">\r\n      </div>\r\n    <!-- /.topBg -->\r\n    ';
 } 
__p+='\r\n<!-- <div style="margin-top: -80px;">\r\n\r\n<div class="titleContainer">\r\n  <h1><img src="./image/top/img_logo.png" height="56" width="199"></h1>\r\n</div>\r\n\r\n<div class="topBg">\r\n  <img src="./image/top/img_logo_bg.jpg">\r\n</div> -->\r\n\r\n  <div class="menuContainer">\r\n\r\n    <div class="menuBody bdRight">\r\n\r\n      <div class="menuColumn2 cf">\r\n        <a href="#coupon">\r\n          <div class="menuBlock bdRight">\r\n            <div class="svgContainer">\r\n              <img src="./image/top/icon_coupon.png" width="50px" height="50px" alt=""/>\r\n            </div>\r\n            <p class="btnM ftcolor1 bdcolor1">クーポン一覧</p>\r\n          </div>\r\n        </a>\r\n        <a href="#information">\r\n          <div class="menuBlock">\r\n            <div class="svgContainer">\r\n              <img src="./image/top/icon_information.png" width="50px" height="50px" alt=""/>\r\n            </div>\r\n            <p class="btnM ftcolor1 bdcolor1">お知らせ</p>\r\n          </div>\r\n        </a>\r\n      </div>\r\n\r\n      <div class="menuColumn2 bdcolor1 cf">\r\n        <a href="#stamp">\r\n          <div class="menuBlock bdRight">\r\n            <div class="svgContainer">\r\n              <img src="./image/top/icon_stamp.png" width="50px" height="50px" alt=""/>\r\n            </div>\r\n            <p class="btnM ftcolor1 bdcolor1">来店スタンプ</p>\r\n          </div>\r\n        </a>\r\n        <a href="#shop">\r\n          <div class="menuBlock">\r\n            <div class="svgContainer">\r\n              <img src="./image/top/icon_shop.png" width="50px" height="50px" alt=""/>\r\n            </div>\r\n            <p class="btnM ftcolor1 bdcolor1">店舗検索</p>\r\n          </div>\r\n        </a>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class="menuFooter bdRight">\r\n\r\n      <div class="menuColumn2 bdcolor1 cf">\r\n        <a href="#history">\r\n          <div class="menuBlock bdRight">\r\n            <div class="svgContainer">\r\n              <img src="./image/top/icon_history.png" width="50px" height="50px" alt=""/>\r\n            </div>\r\n            <p class="btnS ftcolor1 bdcolor1">利用履歴</p>\r\n          </div>\r\n        </a>\r\n        <a href="#config">\r\n          <div class="menuBlock">\r\n            <div class="svgContainer">\r\n              <img src="./image/top/icon_config.png" width="50px" height="50px" alt=""/>\r\n            </div>\r\n            <p class="btnS ftcolor1 bdcolor1">設定</p>\r\n          </div>\r\n        </a>\r\n      </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n</div>\r\n</div>\r\n';
}
return __p;
};

},{}],143:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavModel = require('./main_nav_model.js');
module.exports = (function () {
	var MainNavCollection = Backbone.Collection.extend({
		model: MainNavModel
	});

	return MainNavCollection;

})();

},{"./main_nav_model.js":147,"backbone":"DIOwA5"}],144:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavItemView = require('./main_nav_item_view.js');
module.exports = (function () {
	var MainNavCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: MainNavItemView
	});

	return MainNavCollectionView;

})();

},{"./main_nav_item_view.js":146,"backbone":"DIOwA5"}],145:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="'+
((__t=( href ))==null?'':__t)+
'">\r\n<div class="LINKBOX">'+
((__t=( text ))==null?'':__t)+
'</div>\r\n</a>\r\n';
}
return __p;
};

},{}],146:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');
module.exports = (function () {
	var MainNavItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./main_nav_item_view.html'),
	});

	return MainNavItemView;

})();

},{"./main_nav_item_view.html":145,"backbone":"DIOwA5","jquery":"QRCzyp"}],147:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('../models/base_model.js');
module.exports = (function () {
	var MainNavModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/information/list",
		parse: function(response) {
			return response;
		},
		fetchWithoutLogin: function( registrationId , options){
			var _options = _.extend( options || {}, { url: this.url + "?registrationId=" + registrationId } );
			return this.fetchWithoutAuthInfo( _options );
		}
	});

	return MainNavModel;
})();

},{"../models/base_model.js":163,"backbone":"DIOwA5"}],148:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavCollectionView = require('./main_nav_collection_view.js');
var CardModel = require('../models/card_model.js');
var ValueModel = require('../models/value_model.js');
var MainNavModel = require('./main_nav_model.js');
var PointModel = require('../models/point_model.js');
var SlideShowModel = require('../slideshow/slideshow_model.js');
var SlideShowCollection = require('../slideshow/slideshow_collection.js');
var SlideShowCollectionView = require('../slideshow/slideshow_collection_view.js');

module.exports = (function () {
	var MainNavView = Backbone.Marionette.LayoutView.extend({
		template: function(){
			return (AppConf.layout.navColumns === 2)?  require('./main_nav_2col.html') : require('./main_nav.html');
		},
		headerConf: {
			title: "Applican Sample",
			showBackButton: false,
			hideHeader: true,
		},
		ui: {
			"pointValue" : ".point-value",
			"totalBalance" : ".total-point",
			"memberCard" : "#memberCard",
			// "scratchBtn" : "#scratch-btn",
		},
		events: {
			// "click @ui.scratchBtn" : "openScratchWindow",
		},
		regions: {
			"navRegion": "#main-nav-region",
			"slideRegion": ".slickSlider",
		},
		initialize: function(options){
			var _this = this;
			this.navCollection = options.navCollection;

			this.cardModel = new CardModel();
			App.util.bindProgressScreen(this, this.cardModel);
			this.listenTo(this.cardModel, 'sync', this._renderCard);

			this.slideCollection = new SlideShowCollection();
			this.initCollectionSlide( this );
			this.mainNavModel = new MainNavModel();
			this.slideModel = new SlideShowModel( { id: AppConf.core.localStorageKey } );
			this.pointModel = new PointModel();
			App.util.bindProgressScreen(this, this.mainNavModel);
			this.listenTo(this.mainNavModel, 'sync', this.localNotification);
			App.util.bindProgressScreen(this, this.pointModel);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);
			App.util.bindProgressScreen(this, this.slideCollection);
			this.listenTo(this.slideCollection, 'sync', this._renderSlide);
			// valuecard
			if( AppConf.features.smart ){
				this.valueModel = new ValueModel();
				this.listenTo(this.valueModel, 'sync', this._renderValue);
			}

			$(window).on('resize', _.bind(this.onResize, this));
			this.listenTo(this, 'load:sync', this.onLoad);
		},
		onRender: function(){
			var that = this;
			var collectionView = new MainNavCollectionView({ collection: this.navCollection });

			// this.cardModel.fetchWithAuthInfo({
			// 	on401: function(){
			// 		var img = './image/member/memberss.png';
			// 		that.ui.memberCard.attr('src', img);
			// 	}
			// });
			if (App.getAuthInfo().token) {
				this.cardModel.fetchWithAuthInfo();
			}
			if( App.getAuthInfo().token ){
				this.mainNavModel.fetchWithAuthInfo();
			}else{
				this.mainNavModel.fetchWithoutLogin( App.appModel.getPushToken() );
			};

			if( AppConf.features.smart ){
				// valuecard
				this.valueModel.fetchWithAuthInfo({
					on401: function(){}
				});
			}

			if(AppConf.core.debug){
				this.navRegion.show( collectionView );
			}
			
			this.pointModel.fetchWithAuthInfo({
				on401: function(){}
			});

		},
		_renderPoint: function(){
			this.ui.pointValue.html( App.util.text.numberWithDelimiter( this.pointModel.get("point")) );
		},
		_renderSlide: function(){
			this.slideRegion.show( new SlideShowCollectionView({ collection: this.slideCollection }) );
		},
		_renderCard: function(){
			var img = './image/member/' + this.cardModel.get("cardtype") + '_sm.png';
			this.ui.memberCard.attr('src', img);

			// var point = this.cardModel.get("point");
			// if ( point && point !== null ) {
			// 	this.ui.pointValue.html( App.util.text.numberWithDelimiter( point ) );
			// }
		},
		_renderValue: function() {
			var point  = this.valueModel.get('point');
			this.ui.pointValue.html( App.util.text.numberWithDelimiter( point ) );

			// var total = this.valueModel.get('total');
			// this.ui.totalBalance.html(App.util.text.numberWithDelimiter(total));
		},
		initCollectionSlide: function( options ){
			if ( AppConf.features.slideshow ){
				if( App.getAuthInfo().token ){
					this.slideCollection.fetchWithAuthInfo({
						on400: function(){
							options.setErrorSlideShow();
						}
					});
				} else {
					this.slideCollection.fetchWithoutAuthInfo({
						on400: function(){
							options.setErrorSlideShow();
						}
					});	
				}
			}
			// }else {
			// 	this.slideCollection.add( AppConf.slideshow.slideshowContentsList );
			// }
		},
		setErrorSlideShow: function() {
			$('#havedata').addClass('hide');
			$('#nodata').removeClass('hide');
			this.slideModel.safeFetch();
			if ( this.slideModel.getSlideInfo() ) {
				this.slideCollection.add( this.slideModel.getSlideInfo() );
			} else {
				this.slideCollection.add( AppConf.slideshow.slideshowContentsList );
			}
			this._renderSlide();
			$(window).bind('load', this.slideCollection.onLoad());
		},
		onResize: function(){
			var h_slider, h_window, h_menuContainer;
			h_window = $(window).height();
     		h_menuContainer = $('.menuContainer').height();
     		h_slider = h_window - h_menuContainer - 30;
     		
			$('.menuContainer').css({'top':'','position':''});
        	$('#master-container').css({'min-height' : window.innerHeight - 44 + 'px'});
        	$('.slickSlider').css({'height' : h_window - 44 + 'px'});
     		$('.slickSlider .slick-dots').css({'top' : h_slider + 'px'});
		},
		onLoad: function() {
        	var h_window = $(window).height();
			// display logo
			$('.logo-center').removeClass('hide');
			var h_slide = $(window).height() - $('.menuContainer').height();
			$(".inner-top").css({"height" :  h_slide + "px"})
	    },
		localNotification: function(){			
			var unReadCounts = this.mainNavModel.get("unReadCounts");

			App.util.badge.setBadgeAppIcon( unReadCounts );

			if ( unReadCounts >= 1 ) {
				//top-menu
				$('.badge-number').html( unReadCounts );
				$('.badge-number').addClass('show');
			}else {
				$('.badge-number').removeClass('show');
			}

			if ( applican.config.device_os === "ANDROID" ) {
				$(".badge-number").css("line-height","22px");
			}
		},
		// openScratchWindow: function(){
		// 	if( App.getAuthInfo().token ){
		// 		location.href = "./scratch/index.html";
		// 	}else{
		// 		this.pointModel.fetchWithAuthInfo();
		// 	}
		// },
	});

	return MainNavView;

})();

},{"../models/card_model.js":164,"../models/point_model.js":174,"../models/value_model.js":179,"../slideshow/slideshow_collection.js":182,"../slideshow/slideshow_collection_view.js":183,"../slideshow/slideshow_model.js":184,"./main_nav.html":141,"./main_nav_2col.html":142,"./main_nav_collection_view.js":144,"./main_nav_model.js":147,"backbone":"DIOwA5"}],149:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\r\n\t<div class="modal-wrapper">\r\n\t\t<div class="modal-content">\r\n\t\t\t<div id="dialogue" class="modal-dialogue dialogue-alert">\r\n\t\t\t\t<h4 class="title"></h4>\r\n\t\t\t\t<p class="text"></p>\r\n\t\t\t\t<div class="btn-group ">\r\n\t\t\t\t\t<button class="btn ok-btn btbgcolor2 btftcolor3 bdcolor3">閉じる</button>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="close-circle-btn hide">x</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>';
}
return __p;
};

},{}],150:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var ModalAlertView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_alert.html');
		},
		className: 'modal-alert',
		ui: {
			'modalContainer': '.modal-container',
			"OKBtn": ".ok-btn",
			"title": '.title',
			"text": '.text',
			"closeBtn": ".close-circle-btn",
			"dialogue": "#dialogue"
		},
		events: {
			"click @ui.OKBtn": "handleOKClick",
			"click @ui.closeBtn": "handleOKClick",
		},
		initialize: function() {
			$('body').append(this.render().el);
		},
		renderContent: function(options) {
			this.ui.dialogue.addClass(options.class || '');
			if(options.title){
				this.ui.title.html(options.title || '');
				this.ui.title.removeClass('hide');
			} else {
				this.ui.title.addClass('hide');
			}
			this.ui.text.html(options.text || '');
			options.okButton && this.ui.OKBtn.text(options.okButton);
		},
		show: function(options) {
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.renderContent(options);
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		handleOKClick: function() {
			this.successCallback && this.successCallback(1);
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			this.$el.remove();
		}
	});

	return ModalAlertView;

})();

},{"./modal_alert.html":149,"backbone":"DIOwA5"}],151:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\r\n\t<div class="modal-wrapper">\r\n\t\t<div class="modal-content">\r\n\t\t\t<div id="dialogue" class="modal-dialogue dialogue-confirm">\r\n\t\t\t\t<h4 class="title"> </h4>\r\n\t\t\t\t<p class="text"> </p>\r\n\t\t\t\t<div class="btn-group">\r\n\t\t\t\t\t<button class="btn ok-btn btbgcolor2 btftcolor3 bdcolor3">閉じる</button>\r\n\t\t\t\t\t<button class="btn cancel-btn btbgcolor2 btftcolor3 bdcolor3">キャンセル</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>';
}
return __p;
};

},{}],152:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var ModalConfirmView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_confirm.html');
		},
		className: 'modal-confirm',
		ui: {
			'modalContainer': '.modal-container',
			"OKBtn": ".ok-btn",
			"cancelBtn": '.cancel-btn',
			"title": '.title',
			"text": '.text',
		},
		events: function() {
			return (applican.config.device_os === "IOS") ?
				{
					"touchend @ui.cancelBtn": "cancel",
					"touchend @ui.OKBtn": "confirmSuccess",
				} :
				{
					"click @ui.cancelBtn": "cancel",
					"click @ui.OKBtn": "confirmSuccess",
				}
		},
		initialize: function() {
			$('body').append(this.render().el);
		},
		renderContent: function(options) {
			this.ui.title.text(options.title);
			this.ui.text.html(options.text);
			options.okButton && this.ui.OKBtn.text(options.okButton);
			options.cancelButton && this.ui.cancelBtn.text(options.cancelButton);
		},
		show: function(options) {
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.renderContent(options);
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		cancel: function() {
			this.successCallback(0);
			this.hide();
		},
		confirmSuccess: function() {
			this.successCallback(1);
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			this.$el.remove();
		}
	});

	return ModalConfirmView;

})();

},{"./modal_confirm.html":151,"backbone":"DIOwA5"}],153:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- <div class="modal-v1"> -->\r\n    <div class="modal-wrap">\r\n        <div class="modal-container-v1">\r\n            <div class="modal-head">\r\n                <h2 class="modal-title">連携認証</h2>\r\n                <div class="modal-head-img">\r\n                    <img src="" class="js-logo" />\r\n                    <span class="text js-title"></span>\r\n                </div>\r\n            </div>\r\n            <div class="modal-content">\r\n                <p class="label">ID</p>\r\n                <div class="control">\r\n                    <input type="text" name="id"/>\r\n                    <!-- <p class="text">XXXXXXXXXXXXX</p> -->\r\n                </div>\r\n                <p class="label">パスワード</p>\r\n                <div class="control">\r\n                    <input type="password" name="password" />\r\n                </div>\r\n                <!-- <p class="text">上記IDの連携を解除しますか？</p> -->\r\n            </div>\r\n            <div class="modal-foot">\r\n                <div class="modal-btns modal-2btns">\r\n                    <div class="column">\r\n                        <a class="button btn-cancel js-btnCancel">キャンセル</a>\r\n                    </div>\r\n                    <div class="column">\r\n                        <a class="button btn-ok js-btnOK">連携</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n<!-- </div> -->\r\n';
}
return __p;
};

},{}],154:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = (function () {

    return ModalPoex = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return require('./modal_poex.html');
        },
        id: 'modal01',
        className: 'modal-v1 hide fadeIn',
        ui: {
            'title': '.js-title',
            'logo': '.js-logo',
            'btnOK': '.js-btnOK',
            'btnCancel': '.js-btnCancel',
        },
        events: function () {
            return (applican.config.device_os === "IOS") ?
                {
                    "touchend @ui.btnCancel": "cancel",
                    "touchend @ui.btnOK": "confirmSuccess",
                } :
                {
                    "click @ui.btnCancel": "cancel",
                    "click @ui.btnOK": "confirmSuccess",
                }
        },
        initialize: function () {
            $('body').append(this.render().el);
        },
        updateOptions: function(options){
            var _default = {
                title: '',
                logo: '',
            };
            var _options = _.extend(_default, options);

            this.ui.title.text(_options.title);
            this.ui.logo.attr('src', _options.logo);

        },
        show: function (options) {

            this.updateOptions(options);

            $('#' + this.id).removeClass('hide');
            // hide all other modals
            var _this = this;
            var then = function (successCallback) {
                _this.successCallback = successCallback;
            }
            return {
                then: then
            };
        },
        hide: function () {
            $('#' + this.id).addClass('hide');
            // reset all setting
            this.reset();
        },
        cancel: function () {
            this.successCallback(0);
            this.hide();
        },
        confirmSuccess: function () {
            this.successCallback(1);
            this.hide();
        },
        reset: function () {
            this.successCallback = null;
        },
        onDestroy: function () {
            // remove hitap DOM
            this.$el.remove();
        }
    });

})();

},{"./modal_poex.html":153,"backbone":"DIOwA5","jquery":"QRCzyp"}],155:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- <div class="modal-v1"> -->\r\n    <div class="modal-wrap">\r\n        <div class="modal-container-v1">\r\n            <div class="modal-head">\r\n                <h2 class="modal-title">連携解除</h2>\r\n                <div class="modal-head-img">\r\n                    <img src="" class="js-logo"/>\r\n                    <span class="text js-title"></span>\r\n                </div>\r\n            </div>\r\n            <div class="modal-content">\r\n                <p class="label">ID</p>\r\n                <div class="control">\r\n                    <p class="text js-asset-id"></p>\r\n                </div>\r\n                <p class="text">上記IDの連携を解除しますか？</p>\r\n            </div>\r\n            <div class="modal-foot">\r\n                <div class="modal-btns modal-2btns">\r\n                    <div class="column">\r\n                        <a class="button btn-cancel js-btnCancel">キャンセル</a>\r\n                    </div>\r\n                    <div class="column">\r\n                        <a class="button btn-ok js-btnOK">解除</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n<!-- </div> -->\r\n';
}
return __p;
};

},{}],156:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = (function () {

    return ModalPoex02 = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return require('./modal_poex02.html');
        },
        id: 'modal02',
        className: 'modal-v1 hide fadeIn',
        ui: {
            'title': '.js-title',
            'logo': '.js-logo',
            'btnOK': '.js-btnOK',
            'btnCancel': '.js-btnCancel',
            'assetId': '.js-asset-id'
        },
        events: function () {
            return (applican.config.device_os === "IOS") ?
                {
                    "touchend @ui.btnCancel": "cancel",
                    "touchend @ui.btnOK": "confirmSuccess",
                } :
                {
                    "click @ui.btnCancel": "cancel",
                    "click @ui.btnOK": "confirmSuccess",
                }
        },
        initialize: function () {
            $('body').append(this.render().el);
        },
        updateOptions: function(options){
            var _default = {
                title: '',
                logo: '',
                assetId: 'XXXXXXXXXXXXX'
            };
            var _options = _.extend(_default, options);

            this.ui.title.text(_options.title);
            this.ui.logo.attr('src', _options.logo);
            this.ui.assetId.text(_options.assetId);
        },
        show: function (options) {

            this.updateOptions(options);

            $('#' + this.id).removeClass('hide');
            // hide all other modals
            var _this = this;
            var then = function (successCallback) {
                _this.successCallback = successCallback;
            }
            return {
                then: then
            };
        },
        hide: function () {
            $('#' + this.id).addClass('hide');
            // reset all setting
            this.reset();
        },
        cancel: function () {
            this.successCallback(0);
            this.hide();
        },
        confirmSuccess: function () {
            this.successCallback(1);
            this.hide();
        },
        reset: function () {
            this.successCallback = null;
        },
        onDestroy: function () {
            // remove hitap DOM
            this.$el.remove();
        }
    });

})();

},{"./modal_poex02.html":155,"backbone":"DIOwA5","jquery":"QRCzyp"}],157:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- <div class="modal-v1"> -->\r\n    <div class="modal-wrap">\r\n        <div class="modal-container-v1">\r\n            <div class="modal-head">\r\n                <h2 class="modal-title">アドレス確認</h2>\r\n                <div class="modal-head-img">\r\n                    <img src="./image/poex/03.png" />\r\n                    <span class="text">りそなクラブポイント</span>\r\n                </div>\r\n            </div>\r\n            <div class="modal-content">\r\n                <p class="label">アドレス</p>\r\n                <div class="control">\r\n                    <p class="text js-resona-address"></p>\r\n                </div>\r\n                <p class="text">上記アドレスをコピーしますか？</p>\r\n            </div>\r\n            <div class="modal-foot">\r\n                <div class="modal-btns modal-2btns">\r\n                    <div class="column">\r\n                        <a class="button btn-cancel">キャンセル</a>\r\n                    </div>\r\n                    <div class="column">\r\n                        <a class="button btn-ok">コピー</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n<!-- </div> -->\r\n';
}
return __p;
};

},{}],158:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = (function () {

    return ModalPoex03 = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return require('./modal_poex03.html');
        },
        id: 'modal03',
        className: 'modal-v1 hide fadeIn',
        ui: {
            "btnOK": ".btn-ok",
            "btnCancel": '.btn-cancel',
            'resonaAddress': '.js-resona-address'
        },
        templateHelpers: {

        },
        events: function () {
            return (applican.config.device_os === "IOS") ?
                {
                    "touchend @ui.btnCancel": "cancel",
                    "touchend @ui.btnOK": "confirmSuccess",
                } :
                {
                    "click @ui.btnCancel": "cancel",
                    "click @ui.btnOK": "confirmSuccess",
                }
        },
        initialize: function () {
            $('body').append(this.render().el);
        },
        show: function (options) {
            $('#' + this.id).removeClass('hide');
            var _this = this;
            this.ui.resonaAddress.text(options.address);
            var then = function (successCallback) {
                _this.successCallback = successCallback;
            }
            return {
                then: then
            };
        },
        hide: function () {
            $('#' + this.id).addClass('hide');
            // reset all setting
            this.reset();
        },
        cancel: function () {
            this.successCallback(0);
            this.hide();
        },
        confirmSuccess: function () {
            this.successCallback(1);
            this.hide();
        },
        reset: function () {
            this.successCallback = null;
        },
        onDestroy: function () {
            // remove hitap DOM
            this.$el.remove();
        }
    });

})();

},{"./modal_poex03.html":157,"backbone":"DIOwA5","jquery":"QRCzyp"}],159:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- <div class="modal-v1"> -->\r\n    <div class="modal-wrap">\r\n        <div class="modal-container-v1">\r\n            <div class="modal-head">\r\n                <h2 class="modal-title">アドレスコピー完了</h2>\r\n                <div class="modal-head-img">\r\n                    <img src="./image/poex/03.png" />\r\n                    <span class="text">りそなクラブポイント</span>\r\n                </div>\r\n            </div>\r\n            <div class="modal-content">\r\n                <p class="label">アドレス</p>\r\n                <div class="control">\r\n                    <p class="text js-resona-address"></p>\r\n                </div>\r\n                <p class="text">上記IDアドレスをコピーしました。</p>\r\n            </div>\r\n            <div class="modal-foot">\r\n                <div class="modal-btns modal-1btn">\r\n                    <div class="column">\r\n                        <a class="button btn-ok">確認</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n<!-- </div> -->\r\n';
}
return __p;
};

},{}],160:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = (function () {

    return ModalPoex04 = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return require('./modal_poex04.html');
        },
        id: 'modal04',
        className: 'modal-v1 hide fadeIn',
        ui: {
            "btnOK": ".btn-ok",
            "btnCancel": '.btn-cancel',
            'resonaAddress': '.js-resona-address'
        },
        templateHelpers: {

        },
        events: function () {
            return (applican.config.device_os === "IOS") ?
                {
                    "touchend @ui.btnCancel": "cancel",
                    "touchend @ui.btnOK": "confirmSuccess",
                } :
                {
                    "click @ui.btnCancel": "cancel",
                    "click @ui.btnOK": "confirmSuccess",
                }
        },
        initialize: function () {
            $('body').append(this.render().el);
        },
        show: function (options) {
            $('#' + this.id).removeClass('hide');
            var _this = this;
            this.ui.resonaAddress.text(options.address);
            var then = function (successCallback) {
                _this.successCallback = successCallback;
            }
            return {
                then: then
            };
        },
        hide: function () {
            $('#' + this.id).addClass('hide');
            // reset all setting
            this.reset();
        },
        cancel: function () {
            this.successCallback(0);
            this.hide();
        },
        confirmSuccess: function () {
            this.successCallback(1);
            this.hide();
        },
        reset: function () {
            this.successCallback = null;
        },
        onDestroy: function () {
            // remove hitap DOM
            this.$el.remove();
        }
    });

})();

},{"./modal_poex04.html":159,"backbone":"DIOwA5","jquery":"QRCzyp"}],161:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
/**
 * アプリケーションのグローバル情報を保持、管理する
 * 情報はLocalStoregaに保管
 */
module.exports = (function () {

	var initialAuth = {
		userid : "",
		smstel : "",
		password : "",
		token : "",
		tokentemp : "",
	};

	var AppModel = BaseModel.extend({
		localStorage: new Backbone.LocalStorage("AppBase"),
		idAttribute: "id",
		defaults: {
			id: AppConf.core.localStorageKey,
			auth: initialAuth,
			tutorialShown: false,
			pushToken: "", // PUSH SDK の registrationIdを保管
		},
		getAuthInfo: function(){
			return this.get("auth");
		},
		getPushToken: function(){
			return this.get("pushToken");
		},
		/**
		 * ログアウト状態としてデータを上書き保存する
		 * auth情報を初期化
		 */
		saveAsLogout: function(){
			this.get("auth").token = initialAuth.token;
			this.save();
		},
		/**
		 * authオブジェクトをmodel.attributes.auth に適用してsaveを実行する
		 * args: auth ::{ userid: xxx, password: token, new: xxx}
		 */
		setAuthAndSave: function( auth ){

			var authInfo = this.get("auth");
			authInfo.token = auth.token;
			authInfo.userid = auth.userid;
			authInfo.smstel = auth.smstel;
			authInfo.password = auth.password;
			authInfo.tokentemp = auth.tokentemp;

			this.set("auth", authInfo);
			this.save();
		},
		/**
		 * Backbone.Model#fetchのwrapper
		 * 処理完了(done/fail)時に「ready」イベントを発火させる
		 * NotFoundErrorもエラーと見なさない（初回起動時は見つからない想定)
		 */
		safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				_this.trigger('ready', _this);
			})
			.fail(function(err){
				if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
					console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
				}
				_this.trigger('ready', _this);
			});
		}
	});

	return AppModel;
})();

},{"./base_model":163,"backbone":"DIOwA5"}],162:[function(require,module,exports){
var Backbone = require('backbone');
var querystring = require('querystring');
module.exports = (function () {

	/**
	 * APPの基底Backbone.Collectionクラス
	 * options
	 *  pagination: ページングするか否か
	 */
	var BaseCollection = Backbone.Collection.extend({
		initialize: function(options){
			var options = options || {};
			this.pagination = options.pagination || false;
			this.maxPage = 1;
			this.currentPage = 0;
		},
		/**
		 * Backbone.Collection#fetchのWrapper
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetch のオプション
		 *           getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		_fetch: function( options ){
			var options = options || {};
			if( options.remove !== false ){
				this._resetPaging();
			}
			var getParams  = _.extend( options.getParams || {} , this._getOptionsForPagination() );

			if( options.url ){
				options.url = options.url +  "&" + querystring.encode( getParams );
			}else{
				options.url = this.url + "?" + querystring.encode( getParams );
			}

			var _this = this;
			return this.fetch(options)
			.done(function(data){
				_this.currentPage = data.page;
				_this.maxPage = data.maxPage;
				_this.trigger("page-info-has-been-set");
			});
		},
		/**
		 * ヘッダに認証情報を付与した後にajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *        : on401 - トークンが無効の場合の動作(デフォルト: alert->ログイン画面へ遷移)
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		fetchWithAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR }); 

			var on401 = _options.on401 || function(){
				/*
				var showLogin = function(){
					location.hash = "login";
				};
				applican.notification.alert('ログインしていません', showLogin, "","OK");
				*/
				// #7146 対応
				applican.notification.alert('ログインしていません', App.doNothing, "","OK");
				if( AppConf.features.sms ){
					location.hash = "loginSms";
				} else {
					location.hash = "login";
				}
			};

			return this._fetch(_options)
			.fail(function(res){
				if( res.status === 401 ){
					on401();
				}
			});
		},
		/**
		 * ヘッダにApplicationIdを付与してajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			return this._fetch(_options);
		},
		/**
		 * returns boolean:ページングの最終ページまで読み込んだか否かを戻す
		 *                 ページングしていない場合は最後まで読み込んだと判定
		 */
		isAtLastPage: function(){
			return !this.pagination || this.maxPage <= this.currentPage;
		},
		/**
		 * ページ情報をリセットする
		 */
		_resetPaging: function(){
			this.maxPage = 0;
			this.currentPage = 0;
		},
		// 現在のページングに応じた、ページネーション用のURLパラメータ
		_getOptionsForPagination: function(){
			if( this.pagination ){
				return { page: (this.currentPage || 0) + 1, perPage: AppConf.core.defaultPerPage };
			}else{
				return {};
			}
		},
	});
	return BaseCollection;
})();

},{"backbone":"DIOwA5","querystring":"k+Qmpp"}],163:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var BaseModel = Backbone.Model.extend({
		fetchWithAuthInfo: function(options){
			var _options = _.extend({timeout: AppConf.timeout.page}, options, { beforeSend: App.addAuthenticationHeaderToXHR }); 

			var on401 = _options.on401 || function(){
				/*
				var showLogin = function(){
					location.hash = "login";
				};
				applican.notification.alert('ログインしていません', showLogin, "","OK");
				*/
				// #7146 対応
				applican.notification.alert('ログインしていません', App.doNothing, "","OK");
				if( AppConf.features.sms ){
					location.hash = "loginSms";
				} else {
					location.hash = "login";
				}
			};

			var onTimeout = _options.onTimeout || function(){
                console.log(AppConf.message.timeoutFailure);
			};

			return this.fetch(_options)
			.fail(function(res){
				if( res.status === 401 ){
					on401();
				}
				if( res.statusText === 'timeout' ){
					onTimeout();
				}
			});
		},
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend({timeout: AppConf.timeout.page}, options, { beforeSend: App.addApplicationHeaderToXHR }); 
			
			var onTimeout = _options.onTimeout || function(){
                console.log(AppConf.message.timeoutFailure);
			};

			return this.fetch(_options)
			.fail(function(res){
				if( res.statusText === 'timeout' ){
					onTimeout();
				}
			});
		},
	});
	return BaseModel;
})();

},{"backbone":"DIOwA5"}],164:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var CardModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/detail",
		parse: function(response) {
			this.extras = response.member[0].extras;
			this.issue = response.issue;

			var cardnum = _.findWhere(this.extras, {name : '会員番号'});
			this.set('cardnum',
				(!_.isUndefined(cardnum) && !_.isNumber(cardnum.value)) ? cardnum.value : null,
				{silent: true});

			var point = _.findWhere(this.extras, {name : '総ポイント_現在ポイント'});
			this.set('point',
				(!_.isUndefined(point) && !_.isNumber(point.value)) ? point.value : null,
				{silent: true});

			var rank = _.findWhere(this.extras, { name: '現在ランクID' });
			this.set('rank', (rank && rank.value) ? rank.value : null, { silent: true });
			
			// カード種別判定
			/* rank
			   1: premium
			   2: prestige
			   21: wdc
			   22: wdc_premium
			   23: wdc_prestige
			   other: members
			*/
			var cardtype = 'members';
			if ( !_.isNull(rank) && rank ) {
				switch ( parseInt(rank.value) ) {
					case 2:
						cardtype = 'premium';
						break;
					case 3:
						cardtype = 'prestige';
						break;
					case 21:
						cardtype = 'wdc_members';
						break;
					case 22:
						cardtype = 'wdc_premium';
						break;
					case 23:
						cardtype = 'wdc_prestige';
							break;
				};
			}
			this.set('cardtype', cardtype, {silent: true});

			var total = _.findWhere(this.extras, {name : '今年度累計購買金額'});			
			this.set('total',
				(!_.isUndefined(total) && !_.isNumber(total.value) && total.value != null) ? App.util.text.numberWithDelimiter(total.value) : 0,
				{ silent: true });
			
			var WDCserial = _.findWhere(this.extras, {name : 'WDCシリアル'});
			this.set('WDCserial',
				(!_.isUndefined(WDCserial) && !_.isNumber(WDCserial.value)) ? WDCserial.value : null,
				{ silent: true });
			
			var expiredpoint = _.findWhere(this.extras, {name : '失効予定ポイント'});
			this.set('expiredpoint',
				(!_.isUndefined(expiredpoint) && !_.isNumber(expiredpoint.value)) ? expiredpoint.value : null,
				{silent: true});
					
			
				// console.log("issue:" + this.issue);
			if (this.issue) {
				this.set('pinnum', this.issue.valuePinNo, {silent: true});
				// this.set('valueCardNo', this.issue.valueCardNo, {silent: true});
			}
			
			return response;
		},
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_detail_" + App.getAuthInfo().token, AppConf.expire.user.detail);
            return CardModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return CardModel;
})();

},{"./base_model":163,"backbone":"DIOwA5"}],165:[function(require,module,exports){
var Backbone = require('backbone');
var CouponMasterModel = require('./coupon_master_model.js');
var BaseCollection = require('./base_collection.js');
var BaseModel = require('./base_model.js');
module.exports = (function () {

	var CategoryModel = BaseModel.extend({
		idAttribute: "id",
		isShop: function(){
			return this.get("type") === "shop";
		},
	});

	var CategoryCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/shop/category",
		model: CategoryModel,
		parse: function(response) {
			return response.category;
		},
	});
	return CategoryCollection;

})();

},{"./base_collection.js":162,"./base_model.js":163,"./coupon_master_model.js":168,"backbone":"DIOwA5"}],166:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var CouponModel = require('./coupon_model.js');
module.exports = (function () {
	var CouponCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/list",
		model: CouponModel,
		initialize: function(options){
			if ( options ) {
				this.couponId = options.couponId;
				this.pagination = options.pagination;
			}
		},
		comparator: function(model) {
			if ( this._order_by === "giveDate" ) {
				return -1 * model.get("giveDate"); // NOTE: the minus!
			} else {
				return model.get("expires");
			}
		},
		parse: function(response) {
			return response.couponList.map(function(item) {
				var imageUrl = item.couponImageUrl;
				if (imageUrl && imageUrl.indexOf('https') == -1 && imageUrl.indexOf('http') > -1) {
					item.couponImageUrl = imageUrl.replace('http', 'https');
				}
				return item;
			});;
		},
		fetchCouponAll: function(options) {			
			var _this = this;
			if ( this.couponId ) {
				return this.fetchWithAuthInfo({
					url: _this.url + "?coupId=" + _this.couponId,
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			} else {
				return this.fetchWithAuthInfo({
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			}			
		},
		fetchOpenCoupons: function(options){
			var _options = {};
			if ( this.couponId ) {
				_options = _.extend( options || {}, { url: this.url + "?type=0&coupId=" + this.couponId} );
			} else {
				_options = _.extend( options || {}, { url: this.url + "?type=0"} );
			}
			return this.fetchWithAuthInfo( _options );
		},
		orderByExpires: function() {
			this._order_by = "expires";
			this.sort();
		},
		_order_by: "giveDate"
	});
	return CouponCollection;
})();

},{"./base_collection.js":162,"./coupon_model.js":169,"backbone":"DIOwA5"}],167:[function(require,module,exports){
var Backbone = require('backbone');
var CouponMasterModel = require('./coupon_master_model.js');
var BaseCollection = require('./base_collection.js');
module.exports = (function () {
	var CouponMasterCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/search",
		model: CouponMasterModel,
		parse: function(response) {
			return response.couponList;
		},
		fetchPointExchangeable: function(options){
			var _options = _.extend( options || {}, { url: this.url + "?type=2"} );
			return this.fetchWithAuthInfo( _options );
		}
	});
	return CouponMasterCollection;

})();

},{"./base_collection.js":162,"./coupon_master_model.js":168,"backbone":"DIOwA5"}],168:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var CouponMasterModel = BaseModel.extend({
		idAttribute: "id",
		url: AppConf.url.appRoot + "/coupon/detail",
		mutators: {
			isExchangeable: function(){
				if( !this.get("userPoint" )) return false; // 外部からセットされて居ない場合はfalse
				return this.get("userPoint") >= this.get("exchangePoint");
			},
		},
		fetchCoupon: function(options){
			var options = _.extend( options || {}, { url: this.url + "?id=" + this.get("id") } );
			return this.fetchWithAuthInfo( options );
		},
		parse: function(res){
			return res.coupon || res;
		},
		setUserPoint: function( point ){
			this.set("userPoint", point );
		}
	});

	return CouponMasterModel;
})();

},{"./base_model.js":163,"backbone":"DIOwA5"}],169:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var CouponModel = Backbone.Model.extend({
		idAttribute: "uCoupId",
		mutators: { // https://github.com/asciidisco/Backbone.Mutators
			canBeUsed: {
				get: function(){ // http://stackoverflow.com/questions/21093280/how-to-access-backbone-model-methods-from-marionette-js-itemview-template
					return this.canBeUsed();
				}
			},
			isBeforeTerm: {
				get: function(){
					return this.isBeforeTerm();
				}
			},
			isMemberOnly: {
				get: function(){ // http://stackoverflow.com/questions/21093280/how-to-access-backbone-model-methods-from-marionette-js-itemview-template
					return this.isMemberOnly();
				}
			},
		},
		use: function(){
			this.set({"finalUseDate": Number( new Date() ),"limitCode": "9"});
		},
		withinAvailableSpan: function( currentDate ){
			console.log( this.get("finalUseDate") );
			return currentDate - this.get("finalUseDate") <= 30000;
		},
		canBeUsed: function() {
			return this.get( "limitCode" ) + "" === "0";
		},
		isBeforeTerm: function(){
			if (this.get("usePeriodStartDate") === null) return false; // 日付による期間指定ではない場合
			return Number( new Date() ) < this.get("usePeriodStartDate");
		},
		isMemberOnly: function(){
			return this.get("memberOnly") + "" === "1";
		},
		needGEOLocationToUse: function(){
			var useType = this.get("useType");
			return useType + "" === "1" ||  useType + "" === "2";
		},
		canBeUsedWithoutGEOLocation: function(){
			var useType = this.get("useType");
			return useType + "" !== "2";
		},

	});

	return CouponModel;
})();

},{"backbone":"DIOwA5"}],170:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var DataModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("data-temp"),
		idAttribute: "id",
		setUserId: function(memberId) {
			this.set("memberId", memberId);
			this.save();
		},
		setImageUrl: function(imageUrl) {
			this.set("imageUrl", imageUrl);
			this.save();
		},
		getUserId: function() {
			return this.get("memberId");
		},
		getImageUrl: function() {
			return this.get("imageUrl");
		},
	    safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
			_this.trigger('ready', _this);
			})
			.fail(function(err){
			if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
			console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
			}
			_this.trigger('ready', _this);
			});
	    }
	});

	return DataModel;

})();
},{"backbone":"DIOwA5"}],171:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
var BaseCollection = require('./base_collection.js');
module.exports = (function () {

	var HistoryModel = BaseModel.extend({
		mutators: {
			isCouponHistory : {
				get: function(){
					return this.get("type") + "" === HistoryModel.type.coupon;
				}
			},
			isStampHistory : {
				get: function(){
					return this.get("type") + "" === HistoryModel.type.stamp;
				}
			},
			isPointHistory : {
				get: function(){
					return this.get("type") + "" === HistoryModel.type.point;
				}
			}

		}
	});
	HistoryModel.type = {
		coupon: "0",
		stamp: "1",
		point: "2",
	};


	var HistoryCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/user/history",
		model: HistoryModel,
		parse: function(response) {
			return response.history;
		},
		fetchCouponHistory: function( options ){
			var _options = _.extend( options || {}, { url: this.url + "?perPage=100&type=" + HistoryModel.type.coupon } );
			return this.fetchWithAuthInfo( _options );
		},
		fetchStampHistory: function( options ){
			var _options = _.extend( options || {}, { url: this.url + "?type=" + HistoryModel.type.stamp} );
			return this.fetchWithAuthInfo( _options );
		},
		fetchPointHistory: function( options ){
			var _options = _.extend( options || {}, { url: this.url + "?perPage=100&type=" + HistoryModel.type.point} );
			return this.fetchWithAuthInfo( _options );
		},
	});
	return HistoryCollection;

})();

},{"./base_collection.js":162,"./base_model.js":163,"backbone":"DIOwA5"}],172:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var InformationModel = require('./information_model.js');
module.exports = (function () {
	var unReadCounts = {};
	
	window.InformationCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/information/list",
		model: InformationModel,
		parse: function(response) {
			unReadCounts = response.unReadCounts;
			return response.information.map(function(item) {
				var imageUrl = item.imageUrl;
				if (imageUrl && imageUrl.indexOf('https') == -1 && imageUrl.indexOf('http') > -1) {
					item.imageUrl = imageUrl.replace('http', 'https');
				}
				return item;
			});
		},
		fetchWithoutLogin: function( registrationId , options){
			var options = _.extend( options || {}, { url: this.url + "?registrationId=" + registrationId } );
			return this.fetchWithoutAuthInfo( options );
		},
		getUnReadCounts: function() {
			return unReadCounts;
		}
	});
	return InformationCollection;
})();

},{"./base_collection.js":162,"./information_model.js":173,"backbone":"DIOwA5"}],173:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var InformationModel = BaseModel.extend({
		idAttribute: "informationId",
		url: AppConf.url.appRoot + "/information/detail",
		mutators: {
		},
		parse: function(res){
			return res.information || res;
		},
		fetchSingleInformation: function( options ){
            App.util.cache.responseCache(this, "information_detail_" + this.get("informationId"), AppConf.expire.information.detail);
			var _options = _.extend( options || {}, { url: this.url + "?informationId=" + this.get("informationId") } );
			return this.fetchWithAuthInfo( _options );
		},
		fetchSingleInformationWithoutToken: function( registrationId, options ){
            App.util.cache.responseCache(this, "information_detail_" + this.get("informationId"), AppConf.expire.information.detail);
			var _options = _.extend( options || {}, {
				url: this.url + "?informationId=" + this.get("informationId") + "&registrationId=" + registrationId });
				return this.fetchWithoutAuthInfo( _options );
		},
	});

	return InformationModel;
})();

},{"./base_model.js":163,"backbone":"DIOwA5"}],174:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var PointModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/point",
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_point_" + App.getAuthInfo().token, AppConf.expire.user.point);
            return PointModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return PointModel;
})();

},{"./base_model":163,"backbone":"DIOwA5"}],175:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var ShopModel = require('./shop_model.js');
module.exports = (function () {
	var ShopCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/shop/search",
		model: ShopModel,
		parse: function(response) {
			return response.shopList;
		},
		/**
		 * 位置情報を元に店舗を検索
		 */
		fetchWithGeoLocationInfo: function( longitude, latitude, options ){
			var options = options || {}; 
			options.getParams = {
				longitude: longitude,
				latitude: latitude,
				searchType: 0
			};

			return this.fetchWithAuthInfo( options );
		},
		/**
		 * フリーワードを指定しての検索
		 * 何も無い場合は全件取得します
		 */
		fetchWithFreeword: function( text, options ){
			var options = options || {}; 
			if( text ){options.getParams = { searchType: 2, keyword: text }; }
			return this.fetchWithAuthInfo( options );
		},
	});
	return ShopCollection;
})();

},{"./base_collection.js":162,"./shop_model.js":176,"backbone":"DIOwA5"}],176:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var ShopModel = BaseModel.extend({
		url: AppConf.url.appRoot + '/shop/detail',
		fetchShop: function(options){
			var options = _.extend( options || {}, { url: this.url + "?id=" + this.get("id") } );
			return this.fetchWithAuthInfo( options );
		},
		parse: function(res){
			return res.shop || res;
		},
	});
	return ShopModel;
})();

},{"./base_model.js":163,"backbone":"DIOwA5"}],177:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var StampViewModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/stamp/detail",
		parse: function(res){
			return res.stamp;
		},
		isExchangeableForCoupon: function(){
			return this.get("stampRank1Type") + "" === "0";
		},
		isCouponOnly: function(){
			return this.get("checkType") + "" === "0";
		},
	});
	return StampViewModel;
})();

},{"./base_model.js":163,"backbone":"DIOwA5"}],178:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var UserModel = BaseModel.extend({
        urlRoot: AppConf.url.appRoot + "/user/detail",
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_detail_" + App.getAuthInfo().token, AppConf.expire.user.detail);
            return UserModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return UserModel;
})();

},{"./base_model":163,"backbone":"DIOwA5"}],179:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var ValueModel = BaseModel.extend({
		//urlRoot: "http://dev.bemss.jp/value-api" + "/user/value/detail.php",
		 urlRoot: "http://bt11.betrend.com/value-api" + "/user/value/detail.php",
		// urlRoot: AppConf.url.appRoot + "/user/value/detail",
		parse: function(response) {
			this.set('point', response.balancePoint, {silent: true});
			this.set('basic', response.balanceBasic, {silent: true});
			this.set('bonus', response.balanceBonus, {silent: true});
			this.set('coupon', response.balanceCoupon, {silent: true});
			this.set('total', response.balanceTotal, {silent: true});
			this.set('expireDateBasic', response.expireDateBasic, {silent: true});
			this.set('expireDateBonus', response.expireDateBonus, {silent: true});
			this.set('expireDateCoupon', response.expireDateCoupon, {silent: true});
			this.set('expireDatePoint', response.expireDatePoint, {silent: true});
			console.log('balancePoint:' + response.balancePoint + 'balanceBasic:' + response.balanceBasic + 'balanceBounus:' + response.balanceBounus + 'balanceCoupon:' + response.balanceCoupon);
			return response;
		},
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_value_detail_" + App.getAuthInfo().token, AppConf.expire.user.value.detail);
            return ValueModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return ValueModel;
})();

},{"./base_model":163,"backbone":"DIOwA5"}],180:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="progress-screen show visible">\r\n  <img class="progress-image" src="./image/progress.gif">\r\n</div>\r\n';
}
return __p;
};

},{}],181:[function(require,module,exports){
var MainNavView = require('./main_nav/main_nav_view');
var LoginLayout = require('./login/login_layout');
var LoginSmsTelLayout = require('./login/login_sms_tel_layout');
var LoginSmsPassLayout = require('./login/login_sms_pass_layout');
var LoginSmsMenuLayout = require('./login/login_sms_menu_layout');
var MainNavCollection = require('./main_nav/main_nav_collection.js');
var Backbone = require('backbone');
var querystring = require('querystring');

module.exports = (function(){

	var Router = Backbone.Router.extend({

		routes:{
			"" : "showMenue",
			"login" : "showLogin",
			"loginSms" : "showLoginSms",
			"loginSmsPass(?:query)" : "showLoginSmsPass",
			"loginSmsMenu(?:query)" : "showLoginSmsMenu",
			"clear" : "clearLoacalStorage",
		},

		showLogin: function(){
			var loginLayout = new LoginLayout();
			loginLayout.render();
			App.pageSlider.slidePage( loginLayout);
			App.headerModel.applyViewHeaderConf( loginLayout.headerConf );
		},
		showLoginSms: function(){
			var loginLayout = new LoginSmsTelLayout();
			loginLayout.render();
			App.pageSlider.slidePage( loginLayout);
			App.headerModel.applyViewHeaderConf( loginLayout.headerConf );
		},
		showLoginSmsPass: function(query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			console.log('showLoginSmsPass smstel:' + queryObj.smstel);
			var loginPassLayout = new LoginSmsPassLayout(
				{smstel: queryObj.smstel, userId: queryObj.userId}
			);
			loginPassLayout.render();
			App.pageSlider.slidePage( loginPassLayout);
			App.headerModel.applyViewHeaderConf( loginPassLayout.headerConf );
		},
		showLoginSmsMenu: function(query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			console.log('showLoginSmsPass smstel:' + queryObj.smstel);
			var loginMenuLayout = new LoginSmsMenuLayout(
				{smstel: queryObj.smstel, userId: queryObj.userId}
			);
			loginMenuLayout.render();
			App.pageSlider.slidePage( loginMenuLayout);
			App.headerModel.applyViewHeaderConf( loginMenuLayout.headerConf );
		},

		showMenue: function(){
			var collection = new MainNavCollection([
				{ href: "#login", text: "ログイン"},
				{ href: "#clear", text: "クリアStorage"},
			]);
			var mainNavView = new MainNavView({ navCollection: collection });

			mainNavView.render();
			App.pageSlider.slidePage( mainNavView );
			App.headerModel.applyViewHeaderConf( mainNavView.headerConf );
			mainNavView.trigger("load:sync");
		},
		clearLoacalStorage: function(){
			localStorage.clear();
		}

	});

	return Router;


})();

},{"./login/login_layout":124,"./login/login_sms_menu_layout":126,"./login/login_sms_pass_layout":128,"./login/login_sms_tel_layout":132,"./main_nav/main_nav_collection.js":143,"./main_nav/main_nav_view":148,"backbone":"DIOwA5","querystring":"k+Qmpp"}],182:[function(require,module,exports){
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

},{"../../../../lib/components/slickSlider/slick/slick.min.js":2,"./slideshow_model.js":184,"backbone":"DIOwA5"}],183:[function(require,module,exports){
var Backbone = require('backbone');
var SlideShowItemView = require('./slideshow_view.js');
module.exports = (function () {
	var SlideShowCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: SlideShowItemView
	});

	return SlideShowCollectionView;

})();

},{"./slideshow_view.js":186,"backbone":"DIOwA5"}],184:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function(){

	var SlideShowModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("slide-show"),
		idAttribute: "id",
		defaults: {
			id: AppConf.core.localStorageKey
		},
		getSlideInfo: function(){
			return this.get("slideInfo");
		},
		setSlideInfo: function( slideInfo ){
			var slideInfor = this.get("slideInfo");
			slideInfor = slideInfo;
			this.set("slideInfo", slideInfor);
			this.save();
		},
		safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				_this.trigger('ready', _this);
			})
			.fail(function(err){
				if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
					console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
				}
				_this.trigger('ready', _this);
			});
		}
	});

	return SlideShowModel;


})();
},{"backbone":"DIOwA5"}],185:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if( imageUrl ){ 
__p+='\r\n\t\r\n\t';
 if( linkUrl ){ 
__p+='\r\n\t\t\r\n\t\t';
 if( webviewFlag  + "" === "1" ){ 
__p+='\r\n\t\t\t';
 if( linkUrl.indexOf("?")  > 0 ){ 
__p+='\r\n\t\t\t\t<a href="'+
((__t=( linkUrl ))==null?'':__t)+
'&_native_open_embedded"><img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" /></a>\r\n\t\t\t';
 }else{ 
__p+='\r\n\t\t\t\t<a href="'+
((__t=( linkUrl ))==null?'':__t)+
'?_native_open_embedded"><img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" /></a>\r\n\t\t\t';
 } 
__p+='\r\n\t\t';
 }else{ 
__p+='\r\n\t\t\t<a href="'+
((__t=( linkUrl ))==null?'':__t)+
'"><img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" /></a>\r\n\t\t';
 } 
__p+='\r\n\r\n\t';
 }else{ 
__p+='\r\n\t\t<img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" />\r\n\t';
 } 
__p+='\r\n\r\n';
 }else{ 
__p+='\r\n\t<img src="./image/top/logo.png">\r\n';
 } 
__p+='';
}
return __p;
};

},{}],186:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');
module.exports = (function () {
	var SlideshowItemView = Backbone.Marionette.ItemView.extend({
		template: require('./slideshow_template_view.html'),
		tagName: 'span',
		onLoadImage: function(e) {
			e.target.classList.add('fadeIn');
		},
		onRender: function() { 
			this.$('img').on('load', this.onLoadImage);
		}

	});

	return SlideshowItemView;

})();
},{"./slideshow_template_view.html":185,"backbone":"DIOwA5","jquery":"QRCzyp"}],187:[function(require,module,exports){
var _ = require("underscore");
var dummyLivepassSetting = {
	apiKey: "xxxx",
	apiSecret: "xxxx",
	notificationEnabled: false,
	locationEnabled: false,
};
// アプリカンAPIのWRAPPERメソッドの集合体
module.exports = (function () {

	var ApplicanEx = function(options){
	};

	ApplicanEx.prototype = {
		alert: function(){
		},
		getCurrentPositionPromiss: function(options){
			var options = options || {};
			options.timeout = AppConf.core.geolocationTimeout;
			var dfd = $.Deferred();
			var success = function( result ){
				dfd.resolve( result );
			};
			var error = function( err ){
				dfd.reject( err );
			};
			applican.geolocation.getCurrentPosition( success, error, options );
			return dfd.promise();
		},
		// Livepass 管理画面に端末を登録し、RegistrationIDを取得する
		getBtPushTokenPromise: function(){
			var dfd = $.Deferred();
			var success = function(result){
				console.log("push registration success:" + result.registrationId );
				dfd.resolve( result );
			};
			var error = function(error){
				dfd.reject( error );
			};

			var livepassConfig = AppConf.livePass[applican.device.platform] || dummyLivepassSetting;
			var apiKey = livepassConfig.apiKey;
			var apiSecret = livepassConfig.apiSecret;
			var apiSenderId = livepassConfig.senderId;

//			applican.livepass.start( apiKey, apiSecret, success, error, apiSenderId);
			

			return dfd.promise();
		},
		// Livepass に PushのOn/off、ロケーション利用のOn/Offの設定を反映させる
		livepassSetSettingsPromise: function(){
			var dfd = $.Deferred();
			var success = function(result){
				dfd.resolve( result );
			};
			var error = function(error){
				dfd.reject( error );
			};
			var livepassConfig = AppConf.livePass[applican.device.platform] || dummyLivepassSetting;
			var options = {
				locationEnabled: livepassConfig.locationEnabled,
				notificationEnabled: livepassConfig.notificationEnabled,
			};
			applican.livepass.setSettings(options, success, error);
			return dfd.promise();
		},
	};

	ApplicanEx.consts = {
		device: {
			iOS: "iOS",
			android: "Android",
		},
	};
	return ApplicanEx;

})();

},{"underscore":"s12qeW"}],188:[function(require,module,exports){
/**
 * 雛形アプリにおけるでバッジ設定用メソッド郡を提供
 */
module.exports = (function () {

	var BadgeUtil = {
		setBadgeAppIcon: function( unReadCounts ){
			if ( unReadCounts >= 1 ) {
				applican.localNotification.setBadgeNum(1);
			}else {
				applican.localNotification.setBadgeNum(0);
			}
		},
	}; 

	return BadgeUtil;

})();

},{}],189:[function(require,module,exports){
(function (Buffer){
// ビートレンドCRMのAPIを叩くメソッド群です

var ApplicanEx = require('./applican_ex');
module.exports = (function () {
	var BtApi = function(options){
		this.ApplicationId = options.ApplicationId;
		this.rootUrl = options.rootUrl;
		this.ContentsVersion = options.ContentsVersion;

		this.BundleId = applican.device.package_name;
		this.BundleVersion = "";
		this.Platform = applican.device.platform;
		this.PlatformVersion = applican.device.version;
		this.DeviceName = applican.device.name;
		this.ApplicanVersion = applican.device.applican;
		this.Uuid = applican.device.uuid;
		this.UuidRfc4122 = applican.device.uuid_rfc4122;
		this.RegistrationId = "";

		$.ajaxSetup({
			beforeSend: this.setupAjax
		});
	};
	BtApi.prototype = {
		setupAjax: function (xhr, settings) {
			xhr.done(function (data, status, xhr) {
				if (typeof xhr.getResponseHeader != 'function') {
					return;
				}
				var serverContentsVersion = xhr.getResponseHeader("X-Server-Contents-Version");
				if (App.btApi.ContentsVersion && serverContentsVersion && App.btApi.ContentsVersion < serverContentsVersion) {
					console.log("Application finish because old contents.");
					applican.notification.alert(
						AppConf.message.contentsVersionUp,
						function () { },
						AppConf.message.information,
						AppConf.message.yes);
					applican.finish();
				}
			});
			xhr.fail(function (xhr, status, err) {
				// if (xhr.status === 503) {
				// 	location.href = xhr.responseJSON.url;
				// }
				if (xhr.status === 503) {
					if ('url' in xhr) {
						var errorurl = xhr.responseJSON.url;
						if (_.isNull(errorurl) || _.isEmpty(errorurl)) {
							errorurl = AppConf.message.errorurl;
						}
					}
				}
			});
		},
		getDefaultAjaxHeaders: function () {
			var headers = {};
			headers["X-Client-Contents-Version"] = (this.ContentsVersion) ? this.ContentsVersion: null;
			headers["X-Bundle-Id"] = (this.BundleId) ? this.BundleId: null;
			headers["X-Bundle-Version"] = (this.BundleVersion) ? this.BundleVersion: null;
			headers["X-Platform"] = (this.Platform) ? this.Platform: null;
			headers["X-Platform-Version"] = (this.PlatformVersion) ? this.PlatformVersion: null;
			headers["X-Device-Name"] = (this.DeviceName) ? this.DeviceName: null;
			headers["X-Applican-Version"] = (this.ApplicanVersion) ? this.ApplicanVersion: null;
			headers["X-Uuid"] = (this.Uuid) ? this.Uuid: null;
			headers["X-Uuid-Rfc4122"] = (this.UuidRfc4122) ? this.UuidRfc4122: null;
			headers["X-Registration-Id"] = (this.RegistrationId) ? this.RegistrationId: null;
			return headers;
		},
		getAjaxAuthHeaders: function(){
			var headers= this.getDefaultAjaxHeaders();
			var appTypes = {};
			appTypes[ApplicanEx.consts.device.android] = 1;
			appTypes[ApplicanEx.consts.device.iOS] = 2;

			headers.ApplicationId = this.ApplicationId;
			headers["Content-Type"] = "application/json"
			if( App.getAuthInfo().token ){
				headers.Authorization = App.getAuthInfo().token;
			}
			// NOTE : 取得不能な場合（ブラウザ等）はandroidとして送信する
			headers.ApplicationType = appTypes[ applican.device.platform ] || 1;
			console.log(headers);
			return headers;
		},
		// ログインAPIを叩く
		login: function( userid, password ){
			var a = {};
			a.url = this.rootUrl + "/auth/login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { mailaddress: userid , password: password};
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// SMS用ログインAPIを叩く
		loginSms: function( smstel, password ){
			var a = {};
			a.url = this.rootUrl + "/auth/login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {smstel: smstel, password: password, authType: "2"};
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// SMS送信APIを叩く
		sendsms: function( smstel ){
			var msg = "30分以内に以下の6桁のパスワードを入力してログインしてください。\n"
			var a = {};
			a.url = this.rootUrl + "/sms/sendApp";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {tel: smstel, msg: msg};
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// シームレスログインAPIを叩く
		seamlessLogin: function( token ){
			console.log('seamlessLogin: ' + token);
			token = Buffer(token, 'base64').toString();
//			console.log('seamlessLoginBase64Dec: ' + token);
			token = decodeURIComponent(token);
//			console.log('seamlessLoginUrlDec: ' + token);
			var a = {};
			a.url = this.rootUrl + "/auth/seamless_login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { seamlessparam: token };
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// ログアウトAPIを叩く
		logout: function(){
			var a = {};
			a.url = this.rootUrl + "/auth/logout"
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			return $.ajax(a);
		},
		// options
		//  id,uCoupId,longitude,latitude
		// クーポン利用APIを叩く
		useCoupon: function( params ){
			var options = {};
			options.url = this.rootUrl + "/coupon/use";
			options.headers = this.getAjaxAuthHeaders();
			options.type = "POST"
			options.data = JSON.stringify({ id: params.id, uCoupId: params.uCoupId, longitude: params.longitude, latitude: params.latitude});
			console.log(options.data);
			return $.ajax( options );
		},
		// ポイントを利用してクーポンを取得するAPIを叩く
		exchangeCoupon: function( couponId ){
			var options = {};
			options.url = this.rootUrl + "/user/exchange_coupon";
			options.headers = this.getAjaxAuthHeaders();
			options.type = "POST"
			options.data = JSON.stringify({ couponId: couponId });
			return $.ajax( options );
		},

		// スタンプを取得するAPIを叩く
		getStamp: function( options ){
			var a = {}
			a.url = this.rootUrl + "/stamp/use";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({"latitude": options.latitude,"longitude": options.longitude });
			return $.ajax( a );
		},
		// livepass の registrationID をビートレンドCRMに登録する
		insert: function( args ){

			var a = {}
			a.url = this.rootUrl + "/notification/insert";
			if( AppConf.features.autoregist ){
				a.url = this.rootUrl + "/notification/regist";
			}
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"

			a.data = JSON.stringify({
				"registrationId": args.registrationId,
				//"old": args.registrationId,
			});
			return $.ajax( a );
		},

		// 情報表示済みであることをlivepassに伝える
		popInformation: function( args ){
			var a = {}
			a.url = this.rootUrl + "/information/pop";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({
				"informationId": args.informationId,
				"registrationId": args.registrationId
			});
			return $.ajax( a );
		},
		// 新着情報を既読にする
		readInformation: function( args ){
			var a = {}
			a.url = this.rootUrl + "/information/read";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({
				"informationId": args.informationId,
				"registrationId": args.registrationId
			});
			return $.ajax( a );
		}
	};
	return BtApi;

})();

}).call(this,require("buffer").Buffer)
},{"./applican_ex":187,"buffer":3}],190:[function(require,module,exports){
/**
 * レスポンスデータを有効期限付きでキャッシュする仕組み
 */

var Backbone = require('backbone');
var moment = require("moment");
module.exports = (function () {

	var CacheUtil = {
		responseCache: function(cls, key, expire){
			// キャッシュ用のロジックを入れてBackbone.syncをオーバーライドする
			var originalSync = cls.sync;
			cls.sync = function(method, model, options) {
				if (method === "read") {
					// 通信成功時のコールバック関数をコピー
					var originalSuccess = options.success;

					var cache = App.util.storage.getStorage(key);
					if (cache !== undefined) {
						// localStorage内の検索を行い、キャッシュデータを使って処理を継続させる
						var CacheModel = Backbone.Model.extend({
							localStorage: new Backbone.LocalStorage(AppConf.core.localStorageKey),
							id: key,
						});
						var cacheModel = new CacheModel();
						options.success = function(collection) {
							originalSuccess(cache);
						};
						return originalSync(method, cacheModel, options);
					} else {
						// キャッシュがなければオリジナルのBackbone.syncでAPI通信を行う
						// さらにレスポンスを保存してから成功時のコールバックを呼び出すよう上書き
						options.success = function(collection) {
							App.util.storage.setStorage(key, collection, expire);
							originalSuccess(collection);
						};
						return originalSync(method, model, options);
					}
				} else {
					// read 以外のsave等はキャッシュしないためオリジナルのBackbone.syncを呼び出す
					return originalSync(method, model, options);
				}
			};
		},
		clearCache: function(key){
			App.util.storage.remove(key);
		},
	};
	return CacheUtil;
})();

},{"backbone":"DIOwA5","moment":"Vip+k1"}],191:[function(require,module,exports){
/**
 * 雛形アプリにおける日付操作を共通かしたメソッド群を提供
 */

var moment = require("moment");
module.exports = (function () {

	var DateUtil = {
		isToday: function( date ){
			return DateUtil.atSameDate( date, new Date() );
		},
		atSameDate: function(date1, date2){
			var format = "YYYYMMDD";
			return moment(date1).format(format) === moment(date2).format(format);
		}
	};
	return DateUtil;
})();

},{"moment":"Vip+k1"}],192:[function(require,module,exports){
/**
 * 雛形アプリにおけるでバッグ用メソッド郡を提供
 */
module.exports = (function () {

	var DebugUtil = {
		log: function( arg ){
			if( !AppConf.core.debug ) return;
			console.log( arg );
		},
	}; 

	return DebugUtil;

})();

},{}],193:[function(require,module,exports){
/**
 * 有効期限付きでObjectデータをlocalStorageへ保存する仕組み
 */

var moment = require("moment");
module.exports = (function () {

	var StorageUtil = {
		setStorage: function(key, value, expire){
			try {
				expire = isNaN(expire) ? 0 : expire;
				expire = (new Date).getTime() + expire * 1000;
				var data = {
					expire: expire,
					value: JSON.stringify(value)
				};
				localStorage.setItem(AppConf.core.localStorageKey + '-' + key, JSON.stringify(data));
			} catch(e){
			}
		},
		getStorage: function(key){
			try {
				var data = localStorage[AppConf.core.localStorageKey + '-' + key];
				if (data === undefined) {
					return undefined;
				}
				data = JSON.parse(data);
				if (data.expire > (new Date).getTime()) {
					return JSON.parse(data.value);
				} else {
					localStorage.removeItem(AppConf.core.localStorageKey + '-' + key);
					return undefined;
				}
			} catch(e){
				return undefined;
			}
		},
		remove: function(key){
			try {
				localStorage.removeItem(AppConf.core.localStorageKey + '-' + key);
			} catch(e){
			}
		},
		removeMember: function(){
			try {
				localStorage.removeItem('data-temp');
				localStorage.removeItem('data-temp-' + AppConf.core.localStorageKey);
			} catch(e){
			}
		},
	};
	return StorageUtil;
})();

},{"moment":"Vip+k1"}],194:[function(require,module,exports){
/**
 * 雛形アプリにおけるスタイル操作を共通かしたメソッド群を提供
 * 主に template.css に対応したスタイルを付与するメソッドで構成
 */
module.exports = (function () {

	var StyleUtil = {
		toActive: function( $target ){
			$target.removeClass("btftcolor2").removeClass("btbgcolor2");
			$target.addClass("btftcolor1").addClass("btbgcolor1");
		},
		toInactive: function( $target ){
			$target.removeClass("btftcolor1").removeClass("btbgcolor1");
			$target.addClass("btftcolor2").addClass("btbgcolor2");
		},
	};

	return StyleUtil;

})();

},{}],195:[function(require,module,exports){
var moment = require('moment');

module.exports = (function () {

	var TextUtil = {
		nl2br: function(str){
			if(!str) return "";
			return str.replace(/[\n\r]/g, "<br />");
		}, 
		numberWithDelimiter: function( number ){
			return String(number).toString().replace(/(\d)(?=(\d\d\d)+$)/g , '$1,');
		},
		cardnumWithDelimiter: function( cardnum ){
			if (!_.isString(cardnum)) {
				return '登録されていません';
			}

			return String(cardnum).toString().replace(/(\d)(?=(\d\d\d\d)+$)/g , '$1 ');
		},
		formatDate: function(dateTime){
			return moment(dateTime).format('YYYY年MM月DD日まで');
		},
		formatExpireDate: function(number, dateTime){
			if (number == 0 || !_.isNumber(dateTime)) {
				return '';
			}
			return '(' + this.formatDate(dateTime) + ')';
		},
		formatExpireDate1: function(number, dateTime){
			if (number == 0 || !_.isNumber(dateTime)) {
				return '';
			}
			return '(' + this.formatDate(dateTime) + 'まで有効)';
		},
		addUrlParameters: function(url, params){
			if (params instanceof Array) {
				url += (url.indexOf('?') == -1) ? '?':'&';
				url += params.join('&');
			}
			return url;
		},
		copyTextToClipboard: function(text, callback) {
			var id = "mycustom-clipboard-textarea-hidden-id";
			var existsTextarea = document.getElementById(id);

			if (!existsTextarea) {
				var textarea = document.createElement("textarea");
				textarea.id = id;
				textarea.style.position = 'fixed';
				textarea.style.top = 0;
				textarea.style.left = 0;

				// Ensure it has a small width and height. Setting to 1px / 1em
				// doesn't work as this gives a negative w/h on some browsers.
				textarea.style.width = '1px';
				textarea.style.height = '1px';

				// We don't need padding, reducing the size if it does flash render.
				// textarea.style.padding = 0;

				// // Clean up any borders.
				textarea.style.border = 'none';
				textarea.style.outline = 'none';
				textarea.style.boxShadow = 'none';
				document.querySelector("body").appendChild(textarea);
				existsTextarea = document.getElementById(id);
				existsTextarea.value = text;
				if (applican.config.device_os === "IOS") {
					var editable = textarea.contentEditable;
					var readOnly = textarea.readOnly;

					textarea.contentEditable = true;
					textarea.readOnly = false;

					var range = document.createRange();
					range.selectNodeContents(textarea);

					var selection = window.getSelection();
					selection.removeAllRanges();
					selection.addRange(range);

					textarea.setSelectionRange(0, 999999);
					textarea.contentEditable = editable;
					textarea.readOnly = readOnly;
				} else {
					existsTextarea.select();
				}

				// Avoid flash of white box if rendered for any reason.
				textarea.style.background = 'transparent';

			}


			var status = document.execCommand('copy');
			if (!status) {
				callback && callback("Cannot copy text");
			} else {
				callback && callback("The text is now on the clipboard");
			}
			existsTextarea.parentElement.removeChild(existsTextarea);
			return status;
		},
	};
	return TextUtil;

})();

},{"moment":"Vip+k1"}],196:[function(require,module,exports){
var Backbone = require('backbone');
var CommonEmptyView = require('./common_empty_view.js');
module.exports = (function () {
	var BaseCollectionView = Backbone.Marionette.CollectionView.extend({
		emptyView: CommonEmptyView
	});
	return BaseCollectionView;
})();

},{"./common_empty_view.js":198,"backbone":"DIOwA5"}],197:[function(require,module,exports){
var Backbone = require('backbone');
var CommonEmptyView = require('./common_empty_view.js');
module.exports = (function () {
	var BaseCompositeView = Backbone.Marionette.CompositeView.extend({
		emptyView: CommonEmptyView
	});
	return BaseCompositeView;
})();

},{"./common_empty_view.js":198,"backbone":"DIOwA5"}],198:[function(require,module,exports){
// データが存在しない場合に表示する共通のViewクラス
// See emptyView options of Marionette.CollectionView  
// https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.collectionview.md#collectionviews-emptyview
var Backbone = require('backbone');
module.exports = (function () {
	var CommonEmptyView = Backbone.Marionette.ItemView.extend({
		template: require("./common_empty_view_template.html"),
		initialize: function(options){
		},
	});
	return CommonEmptyView;
})();

},{"./common_empty_view_template.html":199,"backbone":"DIOwA5"}],199:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="emptyView bgcolor1 ftcolor1">データがありません</div>\r\n';
}
return __p;
};

},{}]},{},[7]);