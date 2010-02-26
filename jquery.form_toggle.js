jQuery(function($) {
  $.fn.form_toggle = function(options) {
    var settings = $.extend({
      prefix        : 'toggle',
      reverse       : false,
      // You can pass aruments to show and hide here.
      // Useful for sending callbacks if you need to do anything besides showing and hiding.
      checkbox      : 'normal',
      radio         : null,
      select        : null,
      // These are called when the page is loaded.
      // You pobably don't want to have a visual effect here
      // But you might need the callback
      checkbox_init : null,
      radio_init    : null,
      select_init   : null
      
    }, options);
    var functions = {
      show_or_hide_element : function(selected, element, args) {
        if ((selected && !settings.reverse) || (settings.reverse && !selected)) {
          element.show(args);
        } else{
          element.hide(args);
        }
      },
      handle_checked_state : function(controller, element, args) {
        selected = $(controller).attr('checked');
        functions.show_or_hide_element(selected, element, args);
      },
      handle_select : function(select, args) {
        $(select).find('option').each(function(index) {
          var element = $('.' + $(this).val());
          var selected = $(this).val() == $(select).val();

          functions.show_or_hide_element(selected, element, args);
        });
      }
      // settings.command(element);
    };
    var elements = $('[class*=' + settings.prefix + ']');


    elements.filter(':checkbox').each(function(index) {
      checkbox = $(this);
      matcher = new RegExp('^' + settings.prefix + '-');

      classes = $.grep(checkbox.attr('class').split(' '), function(class_name, index) {
        return class_name.match(matcher);
      });

      $.each(classes, function(index) {
        var element = $(this.replace(settings.prefix + '-', '.'));
        functions.handle_checked_state(checkbox, element, settings.checkbox_init);

        checkbox.change(function() {
          functions.handle_checked_state(this, element, settings.checkbox);
        });
      });
    });


    elements.filter(':radio').each(function(index) {
      var element = $('.' + $(this).val());
      functions.handle_checked_state(this, element, settings.radio_init);

      $(this).change(function() {
        var group = $(this).attr('name');

        $(':radio[name = ' + group + ']').each(function(index) {
          element = $('.' + $(this).val());
          functions.handle_checked_state(this, element, settings.radio);
        });
      });
    });

    elements.filter('select').each(function(index) {
      functions.handle_select(this, settings.select_init);

      $(this).change(function() {
        functions.handle_select(this, settings.select);
      });
    });
  };
});
