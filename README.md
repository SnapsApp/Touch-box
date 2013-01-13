Touch-box
=========

Touch box is a jQuery plugin that brings resize &amp; drag features to iPad for DOM elements.

-

Example: http://danniehansen.com/touch_box/ - (iPad)

Touch box enabled the user to resize or drag elements of your choice on the site.
This could be images, windows or design elements.

To use Touch box you simple load in the JavaScript after jQuery.
Then you add a class named "touch-box" to your element.

When an element has the class "touch-box" on it you can use data attributes
to tell touch box what to do. Here is an example of how to use Touch box and enable resize & drag.

<code>
&lt;div class=&quot;touch-box&quot; data-resize=&quot;true&quot; data-drag=&quot;true&quot;&gt;&lt;/div&gt;
</code>

As default these options are turned off when using DOM element initialization.
Where when you use the code initialization those options are turned on.

Here is an example of just how easy it is to enable Touch box using JavaScript.

<code>
&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;<br />
&lt;script type=&quot;text/javascript&quot;&gt;
$(document).ready(function () {
   $('.box').TouchBox({
       resize: true,
       drag: true,
       callback_touches: function (touches) {
           //Touch added or removed from touches. Parameter is given with current touches
           //this is DOM element, so using $(this) wil give you an jQuery element
       },
       callback_change: function () {
           //User dragged or resized element - this is DOM element, so using $(this) wil give you an jQuery element.
       }
   });
});
&lt;/script&gt;
</code>
