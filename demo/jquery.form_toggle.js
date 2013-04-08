(function() {

  jQuery(function($) {
    return $.fn.formToggle = function(options) {
      var element_selector, methods, settings;
      settings = $.extend({
        dataAttribute: "toggle",
        reverse: false,
        checkbox: 400,
        radio: null,
        select: null,
        checkboxInit: null,
        radioInit: null,
        selectInit: null,
        parameterize: function(string) {
          return $.trim(string).toLowerCase().replace(/\W/g, '-');
        }
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
            value = settings.parameterize(value);
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
      element_selector = "[data-" + settings.dataAttribute + "], [data-" + settings.dataAttribute + "-prefix]";
      $(element_selector).each(function(index, controller) {
        var setting, target;
        controller = $(controller);
        if (controller.is('select')) {
          return methods.handleSelect(controller, settings.selectInit);
        } else {
          target = methods.targetForController(controller);
          if (controller.is(':checkbox')) {
            setting = settings.checkboxInit;
          }
          if (controller.is(':radio')) {
            setting = settings.radioInit;
          }
          return methods.handleCheckedState(controller, target, setting);
        }
      });
      return $(document).on('change', element_selector, function(event) {
        var controller, group, target;
        controller = $(this);
        if (controller.is('select')) {
          methods.handleSelect(controller, settings.select);
        }
        if (controller.is(':checkbox')) {
          target = methods.targetForController(controller);
          methods.handleCheckedState(controller, target, settings.checkbox);
        }
        if (controller.is(':radio')) {
          group = controller.attr("name");
          return $(":radio[name=" + group + "]").each(function(index, radio) {
            radio = $(radio);
            target = methods.targetForController(radio);
            return methods.handleCheckedState(radio, target, settings.radio);
          });
        }
      });
    };
  });

}).call(this);
