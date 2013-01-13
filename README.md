Touch-box
=========

Touch box is a jQuery plugin that brings resize &amp; drag features to iPad for DOM elements.

-
*(CSS is not required - Only for the demo)*

Example: http://danniehansen.com/touch_box/ - (iPad)

Touch box enabled the user to resize or drag elements of your choice on the site.
This could be images, windows or design elements.

To use Touch box you simple load in the JavaScript after jQuery.
Then you add a class named "touch-box" to your element.

When an element has the class "touch-box" on it you can use data attributes
to tell touch box what to do. Here is an example of how to use Touch box and enable resize & drag.

```html
<div class="touch-box" data-resize="true" data-drag="true"></div>
```

As default these options are turned off when using DOM element initialization.
Where when you use the code initialization those options are turned on.

Here is an example of just how easy it is to enable Touch box using JavaScript.

```javascript
<div class="box"></div>
<script type="text/javascript">
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
</script>
```
