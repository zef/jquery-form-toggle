(function() {

  jQuery(function($) {
    return $.fn.formToggle = function(options) {
      var elements, methods, settings;
      settings = $.extend({
        dataAttribute: "toggle",
        reverse: false,
        checkbox: 400,
        radio: null,
        select: null,
        checkboxInit: null,
        radioInit: null,
        selectInit: null
      }, options);
      methods = {
        showOrHideTarget: function(selected, target, args) {
          if ((selected && !settings.reverse) || (settings.reverse && !selected)) {
            return target.show(args);
          } else {
            return target.hide(args);
          }
        },
        targetForController: function(controller, value) {
          var selector, selectorPrefix, selectorSuffix;
          if (value == null) {
            value = null;
          }
          selector = controller.data(settings.dataAttribute);
          selectorPrefix = controller.data("" + settings.dataAttribute + "-prefix");
          selectorSuffix = controller.data("" + settings.dataAttribute + "-suffix");
          if (selector == null) {
            value || (value = controller.val());
            selector = selectorPrefix + value;
            if (selectorSuffix != null) {
              selector += selectorSuffix;
            }
          }
          return $(selector);
        },
        handleCheckedState: function(controller, target, args) {
          var selected;
          selected = $(controller).is(':checked');
          return methods.showOrHideTarget(selected, target, args);
        },
        handleSelect: function(select, args) {
          return select.find("option").each(function(index) {
            var option, selected, target;
            option = $(this);
            target = methods.targetForController(select, option.val());
            selected = option.val() === $(select).val();
            return methods.showOrHideTarget(selected, target, args);
          });
        }
      };
      elements = $("[data-" + settings.dataAttribute + "], [data-" + settings.dataAttribute + "-prefix]");
      elements.filter(':checkbox').each(function(index) {
        var controller, target;
        controller = $(this);
        target = methods.targetForController(controller);
        methods.handleCheckedState(controller, target, settings.checkboxInit);
        return $(controller).on('change', function(event) {
          return methods.handleCheckedState(controller, target, settings.checkbox);
        });
      });
      elements.filter(":radio").each(function(index) {
        var controller, target;
        controller = $(this);
        target = methods.targetForController(controller);
        methods.handleCheckedState(controller, target, settings.radioInit);
        return $(controller).on('change', function(event) {
          var group;
          group = controller.attr("name");
          return $(":radio[name=" + group + "]").each(function(index) {
            var radio;
            radio = $(this);
            target = methods.targetForController(radio);
            return methods.handleCheckedState(radio, target, settings.radio);
          });
        });
      });
      return elements.filter("select").each(function(index) {
        var select;
        select = $(this);
        methods.handleSelect(select, settings.selectInit);
        return select.on('change', function(event) {
          return methods.handleSelect(select, settings.select);
        });
      });
    };
  });

}).call(this);
