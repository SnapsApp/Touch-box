/**
 * Released by Dannie Hansen - 2013 on January, 13.
 * Can be used however you wish to. As long as credits stay.
 **/
;(function ($) {
    "use strict";
    
    var undef, zindex = 400;
    
    $.fn.TouchBox = function (options) {
        var defaults = {
            drag: true,
            resize: true,
            callback_touches: null,
            callback_change: null
        }
        
        if(options != undef) $.extend(defaults, options);
        
        this.each(function () {
            var $this = $(this),
                touches = 0,
                diffX = 0,
                diffY = 0,
                startWidth = 0,
                startHeight = 0,
                startDistance = 0,
                ignoreTouch = false,
                startX = 0,
                startY = 0;
            
            $this.bind('touchstart', function (e) {
                zindex += 1;
                
                $this.css({ zIndex: zindex });
                
                touches = e.originalEvent.touches.length;
                
                if(ignoreTouch) ignoreTouch = false;
                
                if(!ignoreTouch) {
                    var offset = $this.offset(),
                        x = e.originalEvent.touches[0].pageX,
                        y = e.originalEvent.touches[0].pageY;
                    
                    startX = offset.left;
                    startY = offset.top;
                    
                    diffX = x - offset.left;
                    diffY = y - offset.top;
                }
                
                if(defaults.resize && touches == 2) {
                    startWidth = $this.width();
                    startHeight = $this.height();
                    var x = e.originalEvent.touches[0].pageX,
                        y = e.originalEvent.touches[0].pageY,
                        x2 = e.originalEvent.touches[1].pageX,
                        y2 = e.originalEvent.touches[1].pageY,
                        xd = x2 - x,
                        yd = y2 - y,
                        distance = Math.sqrt(xd*xd + yd*yd);
                    
                    startDistance = distance;
                }
            }).bind('touchmove', function (e) {
                if(defaults.callback_touches != null) defaults.callback_touches.apply(this, [touches]);
                
                var change = false;
                
                if(defaults.resize && touches == 2) {
                    var x = e.originalEvent.touches[0].pageX,
                        y = e.originalEvent.touches[0].pageY,
                        x2 = e.originalEvent.touches[1].pageX,
                        y2 = e.originalEvent.touches[1].pageY,
                        xd = x2 - x,
                        yd = y2 - y,
                        distance = Math.sqrt(xd*xd + yd*yd),
                        offset = $this.offset(),
                        halfDistance = ((distance - startDistance)/2);
                    
                    $this.css({
                        width: (startWidth + (distance - startDistance))+'px',
                        height: (startHeight + (distance - startDistance))+'px',
                        left: (startX-halfDistance)+'px',
                        top: (startY-halfDistance)+'px'
                    });
                    
                    change = true;
                }
                
                if(defaults.drag && !ignoreTouch && touches == 1) {
                    var x = e.originalEvent.touches[0].pageX,
                        y = e.originalEvent.touches[0].pageY;
                    
                    $this.css({
                        left: (x-diffX)+'px',
                        top: (y-diffY)+'px'
                    });
                    
                    change = true;
                }
                
                if(change && defaults.callback_change != null) defaults.callback_change.apply(this, []);
                
                e.preventDefault();
            }).bind('touchend', function (e) {
                touches -= 1;
                
                if(touches == 1) ignoreTouch = true;
                
                if(defaults.callback_touches != null) defaults.callback_touches.apply(this, [touches]);
            });
        });
    };
    
    $(document).ready(function () {
        var $boxes = $('.touch-box');
        
        if($boxes.length > 0) {
            $boxes.each(function () {
                var $this = $(this),
                    options = {
                        'drag': false,
                        'resize': false
                    },
                    resize = $this.attr('data-resize'),
                    drag = $this.attr('data-drag');
                
                if(resize != undef && resize == 'true') options['resize'] = true;
                if(drag != undef && drag == 'true') options['drag'] = true;
                
                $this.TouchBox(options);
            });
        }
    });
})(jQuery);