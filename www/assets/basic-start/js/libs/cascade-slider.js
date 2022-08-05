(function($) {
  $.fn.cascadeSlider = function(opt) {
    var $this = this,
      itemClass = opt.itemClass || 'cascade-slider_item',
      arrowClass = opt.arrowClass || 'cascade-slider_arrow',
      $item = $this.find('.' + itemClass),
      $arrow = $this.find('.' + arrowClass),
      itemCount = $item.length;

    var wait = false;

    var waitTimeout;

    var defaultIndex = 0;

    changeIndex(defaultIndex);

    var startPosY, currentPosY;

  $(".clickDiv").bind("click", function () {
          if (wait==true){
              // passiert nichts, da gerade Abspielpause
          }else if (wait==false){
              wait = true;
                waitTimeout = setTimeout (function() {
                    wait = false;
                },16000)
          }
  });

    $('#help-view').on('touchstart', function (event) {
        startPosY = event.touches[0].clientY;

    });

    $('#help-view').on('touchend', function (eve) {
        currentPosY = eve.changedTouches[0].clientY;

        var nowIndex = $item.index($this.find('.now'));

        //runter
        if (wait ==true){

        }else if (wait==false){
            if(startPosY < currentPosY){
                wait = true;
                $('.prev div div.my-progress-bar').css({display:'none'});
                $('.next div div.my-progress-bar').css({display:'inline-block'});
                $('.now div div.my-progress-bar').css({display:'none'});

                $('.prev div div div img').css({display:'none'});
                $('.next div div div img').css({display:'block'});
                $('.now div div div img').css({display:'none'});

                $('.prev div div.miniText').css({display:'none'});
                $('.next div div.miniText').css({display:'block'});
                $('.now div div.miniText').css({display:'none'});

                $('.prev div div.clickDiv').css({display:'none'});
                $('.next div div.clickDiv').css({display:'block'});
                $('.now div div.clickDiv').css({display:'none'});
                if(nowIndex == itemCount - 1) {
                    changeIndex(0);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                } else {
                    changeIndex(nowIndex + 1);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                }
                //hoch
            } else if (startPosY > currentPosY) {
                wait = true;
                $('.now div div.my-progress-bar').css({display:'none'});
                $('.prev div div.my-progress-bar').css({display:'inline-block'});
                $('.next div div.my-progress-bar').css({display:'none'});

                $('.now div div div img').css({display:'none'});
                $('.prev div div div img').css({display:'block'});
                $('.next div div div img').css({display:'none'});

                $('.now div div.miniText').css({display:'none'});
                $('.prev div div.miniText').css({display:'block'});
                $('.next div div.miniText').css({display:'none'});

                $('.now div div.clickDiv').css({display:'none'});
                $('.prev div div.clickDiv').css({display:'block'});
                $('.next div div.clickDiv').css({display:'none'});
                if(nowIndex == 0) {
                    changeIndex(itemCount - 1);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                } else {
                    changeIndex(nowIndex - 1);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                }
            }
        }
    });

    $arrow.on('click', function() {
        if (wait ==true){

        }else if (wait==false){
            var action = $(this).data('action'),
                nowIndex = $item.index($this.find('.now'));

            if(action == 'next') {
                wait = true;
                $('.prev div div.my-progress-bar').css({display:'none'});
                $('.next div div.my-progress-bar').css({display:'inline-block'});
                $('.now div div.my-progress-bar').css({display:'none'});

                $('.prev div div div img').css({display:'none'});
                $('.next div div div img').css({display:'block'});
                $('.now div div div img').css({display:'none'});

                $('.prev div div.miniText').css({display:'none'});
                $('.next div div.miniText').css({display:'block'});
                $('.now div div.miniText').css({display:'none'});

                $('.prev div div.clickDiv').css({display:'none'});
                $('.next div div.clickDiv').css({display:'block'});
                $('.now div div.clickDiv').css({display:'none'});
                if(nowIndex == itemCount - 1) {
                    changeIndex(0);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                } else {
                    changeIndex(nowIndex + 1);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                }
            } else if (action == 'prev') {
                wait = true;
                $('.now div div.my-progress-bar').css({display:'none'});
                $('.prev div div.my-progress-bar').css({display:'inline-block'});
                $('.next div div.my-progress-bar').css({display:'none'});

                $('.now div div div img').css({display:'none'});
                $('.prev div div div img').css({display:'block'});
                $('.next div div div img').css({display:'none'});

                $('.now div div.miniText').css({display:'none'});
                $('.prev div div.miniText').css({display:'block'});
                $('.next div div.miniText').css({display:'none'});

                $('.now div div.clickDiv').css({display:'none'});
                $('.prev div div.clickDiv').css({display:'block'});
                $('.next div div.clickDiv').css({display:'none'});
                if(nowIndex == 0) {
                    changeIndex(itemCount - 1);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                } else {
                    changeIndex(nowIndex - 1);
                    waitTimeout = setTimeout(function() {
                        wait = false;
                    },500);
                }
            }
        }


      $('.cascade-slider_dot').removeClass('cur');
      //$('.cascade-slider_dot').next().addClass('cur');
    });
    
    // add data attributes
    for (var i = 0; i < itemCount; i++) {
      $('.cascade-slider_item').each(function(i) {
        $(this).attr('data-slide-number', [i]);
      });
    }
    
    // dots
    $('.cascade-slider_dot').bind('click', function(){
      // add class to current dot on click
      $('.cascade-slider_dot').removeClass('cur');
      $(this).addClass('cur');

      var index = $(this).index();

      $('.cascade-slider_item').removeClass('now prev next');
      var slide = $('.cascade-slider_slides').find('[data-slide-number=' + index + ']');
      slide.prev().addClass('prev');
      slide.addClass('now');
      slide.next().addClass('next');

      if(slide.next().length == 0) {
        $('.cascade-slider_item:first-child').addClass('next');
      }

      if(slide.prev().length == 0) {
        $('.cascade-slider_item:last-child').addClass('prev');
      }
    });

    function changeIndex(nowIndex) {
      // clern all class
      $this.find('.now').removeClass('now');
      $this.find('.next').removeClass('next');
      $this.find('.prev').removeClass('prev');
      if(nowIndex == itemCount -1){
        $item.eq(0).addClass('next');
      }
      if(nowIndex == 0) {
        $item.eq(itemCount -1).addClass('prev');
      }

      $item.each(function(index) {
        if(index == nowIndex) {
          $item.eq(index).addClass('now');
        }
        if(index == nowIndex + 1 ) {
          $item.eq(index).addClass('next');
        }
        if(index == nowIndex - 1 ) {
          $item.eq(index).addClass('prev');
        }
      });
    }
  };
})(jQuery);
