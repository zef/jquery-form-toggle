jQuery Form Toggle
==================

A jQuery plugin that makes it easy to show and hide elements based on the state of a checkbox, radio button, or select menu.

You can also pass callbacks and custom options when you initialize the plugin. See [the code](https://github.com/zef/jquery_form_toggle/blob/master/coffeescript/jquery.form_toggle.coffee) for details.


Basic usage
-----------

    $(document).ready(function() {
      $(document).formToggle();
    });


Form Toggle uses HTML data attributes to drive the configuration of the forms. There are two ways to define the elements you are targeting to show or hide.

Any element can use its value attribute to help determine what elements you are targeting. To do this, you must define the prefix to use with the value to create a jQuery selector. A form element with the attributes `value="one" data-toggle-prefix=".toggle-"` would target attributes with `$('.toggle-one')`. You may also optionally include a suffix with `data-toggle-suffix`.

Check boxes and radio buttons can also simply use explicit jQuery selectors to define what elements they are targeting. Use `data-toggle=".your-selector"` to do this.


Options
-------

There are a few ways in which you can configure formToggle. You can define a custom prefix for data attributes to add another instance of formToggle that is configured differently:

    $(document).ready(function() {
      $(document).formToggle({
        prefix: 'reverse-toggle',
        reverse: true
      });
    });

This will use the data attribute name `data-reverse-toggle` (or `data-reverse-toggle-prefix`), and the effect will be reversed.

You can also define custom arguments to be passed to jQuery's [`show()`](http://api.jquery.com/show/) and [`hide()`](http://api.jquery.com/show/) methods. This can be used to control the speed of animation and to define callbacks if you need to do anything else at the same time.

