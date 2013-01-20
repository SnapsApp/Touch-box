Touch-box
=========

Touch box is a jQuery plugin that brings resize, drag & rotate features to iPad and other touch devices for DOM elements.

-
*(CSS is not required - Only for the demo)*

Example: http://danniehansen.com/touch_box/ - (Only tested on iPad)

Touch box enabled the user to resize, drag or rotate elements of your choice on the site.
This could be images, windows or design elements.

To use Touch box you simple load in the JavaScript after jQuery.
Then you add a class named "touch-box" to your element.

When an element has the class "touch-box" on it you can use data attributes
to tell touch box what to do. Here is an example of how to use Touch box and enable resize & drag.

```html
<div class="touch-box" data-resize="true" data-drag="true" data-rotate="true"></div>
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
       callback_size_change: function (newWidth, newHeight) {
           //User changed the size of the DOM element - this is DOM element, so using $(this) wil give you an jQuery element.
       },
       callback_position_change: function (newLeft, newTop) {
           //User changed the position of the DOM element - this is DOM element, so using $(this) wil give you an jQuery element.
       },
       callback_degree_change: function (lastDegree, newDegree) {
           //User changed the degrees of the DOM element - this is DOM element, so using $(this) wil give you an jQuery element.
       }
   });
});
</script>
```

The plugin it self is made so that it keeps the current element in focus over other Touch Box elements.
Let's say you make a gallery of this. Then each time you start dragging, resizing or rotating an image it will come
on top of all other TouchBox elements.

One thing to keep in mind is that the element you will be using Touch Box on require a position:absolute and a set left/top.
Next version will set this it self.
