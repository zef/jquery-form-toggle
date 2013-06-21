jQuery Form Toggle
==================

A jQuery plugin that makes it easy to show and hide elements based on the state of a checkbox, radio button, or select menu.

You can also pass callbacks and custom options when you initialize the plugin. See [the code](https://github.com/zef/jquery-form-toggle/blob/master/coffeescript/jquery.form-toggle.coffee) for details.

Although basic functionality like this is easy to write, it can quickly get complex in certain situations. This plugin properly sets up the initial page state based on a form that has already been filled out.

### [View Demo](http://madebykiwi.com/dev_center/jquery_form_toggle)

Basic usage
-----------

```javascript
$(document).ready(function() {
  $(document).formToggle();
});
```

Form Toggle uses HTML data attributes to drive the configuration of the forms. There are two ways to define the elements you are targeting to show or hide.

1. Any element can use its value attribute to help determine what elements you are targeting. To do this, you must define the prefix to use with the value to create a jQuery selector. A form element with the attributes `value="one" data-toggle-prefix=".toggle-"` would target attributes with `$('.toggle-one')`. You may also optionally include a suffix with `data-toggle-suffix`.

2. Check boxes and radio buttons can also simply use explicit jQuery selectors to define what elements they are targeting. Use `data-toggle=".your-selector"` to do this.

Form values are processed through a parameterize function through which 'Some Value' would become 'some-value'. You can provide your own function for this if you need.

Options
-------

There are a few ways in which you can configure formToggle. You can define a custom prefix for data attributes to add another instance of formToggle that is configured differently:

```javascript
$(document).ready(function() {
  $(document).formToggle({
    dataAttribute: 'reverse-toggle',
    reverse: true
  });
});
```

This will use the data attribute name `data-reverse-toggle` (or `data-reverse-toggle-prefix`), and the effect will be reversed.

You can also define custom arguments to be passed to jQuery's [show()](http://api.jquery.com/show/) and [hide()](http://api.jquery.com/hide/) methods. This can be used to control the speed of animation and to define callbacks if you need to do anything else at the same time.

__Note:__ this plugin has been rewritten with a new API. The linked demo still uses the old version, but the functionality is the same.

