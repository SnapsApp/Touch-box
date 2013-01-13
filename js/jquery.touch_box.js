/**
    Touch box - Enabled resize & drag of DOM elements on the web for iPad.
    Copyright (C) 2013 Dannie Hansen
 
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
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