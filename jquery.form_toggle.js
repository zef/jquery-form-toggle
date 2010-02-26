jQuery(function($) {

  $.fn.form_toggle = function(options) {
    var settings = $.extend({
      prefix : 'toggle',
      reverse : false,
      speed : 'normal'
      // command : function(area) {
      //   area.toggle('normal');
      // }
    }, options);
    var functions = {
      show_or_hide_element : function(selected, element, animate) {
        if ((selected && !settings.reverse) || (settings.reverse && !selected)) {
          element.show(settings.speed);
        } else{
          if (animate == false) {
            element.hide();
          } else {
            element.hide(settings.speed);
          }
        }
      },
      handle_checked_state : function(controller, element, animate) {
        selected = $(controller).attr('checked');
        functions.show_or_hide_element(selected, element, animate);
      },
      handle_select : function(select, animate) {
        $(select).find('option').each(function(index) {
          var element = $('.' + $(this).val());
          var selected = $(this).val() == $(select).val();

          functions.show_or_hide_element(selected, element, animate);
        });
      }
      // settings.command(element);
    };
    var elements = $('[class|=' + settings.prefix + ']');


    elements.filter(':checkbox').each(function(index) {
      var element;

      element = $($(this).attr('class').split(' ')[0].replace(settings.prefix + '-', '.'));
      functions.handle_checked_state(this, element, false);

      $(this).change(function() {
        functions.handle_checked_state(this, element);
      });
    });

    elements.filter(':radio').each(function(index) {
      var element;

      element = $('.' + $(this).val());
      functions.handle_checked_state(this, element, false);

      $(this).change(function() {
        var group = $(this).attr('name');

        $(':radio[name = ' + group + ']').each(function(index) {
          element = $('.' + $(this).val());
          functions.handle_checked_state(this, element);
        });

      });
    });

    elements.filter('select').each(function(index) {
      functions.handle_select(this, false);
      
      $(this).change(function() {
        functions.handle_select(this, false);
      });

    });

  };

});
