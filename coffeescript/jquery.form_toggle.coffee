jQuery ($) ->
  $.fn.formToggle = (options) ->
    settings = $.extend
      dataAttribute: "toggle"
      reverse: false

      # You can pass arguments to show and hide here.
      # Useful for sending callbacks if you need to do anything besides showing and hiding.
      checkbox: 400
      radio: null
      select: null

      # These are called when the page is loaded.
      # You probably don't want to have a visual effect here,
      # but you might need the callback.
      checkboxInit: null
      radioInit: null
      selectInit: null
    , options

    methods =
      showOrHideTarget: (selected, target, args) ->
        if (selected and not settings.reverse) or (settings.reverse and not selected)
          target.show args
        else
          target.hide args

      targetForController: (controller, value = null) ->
        selector = controller.data(settings.dataAttribute)
        selectorPrefix = controller.data("#{settings.dataAttribute}-prefix")
        selectorSuffix = controller.data("#{settings.dataAttribute}-suffix")

        unless selector?
          value ||= controller.val()
          selector = selectorPrefix + value
          selector += selectorSuffix if selectorSuffix?

        $(selector)

      handleCheckedState: (controller, target, args) ->
        selected = $(controller).is(':checked')
        methods.showOrHideTarget selected, target, args

      handleSelect: (select, args) ->
        select.find("option").each (index) ->
          option = $(this)
          target = methods.targetForController(select, option.val())
          selected = option.val() == $(select).val()

          methods.showOrHideTarget selected, target, args


    elements = $("[data-#{settings.dataAttribute}], [data-#{settings.dataAttribute}-prefix]")

    elements.filter(':checkbox').each (index) ->
      controller = $(this)
      target = methods.targetForController(controller)

      methods.handleCheckedState controller, target, settings.checkboxInit

      $(controller).on 'change', (event) ->
        methods.handleCheckedState controller, target, settings.checkbox


    elements.filter(":radio").each (index) ->
      controller = $(this)
      target = methods.targetForController(controller)

      methods.handleCheckedState controller, target, settings.radioInit

      $(controller).on 'change', (event) ->
        group = controller.attr("name")
        $(":radio[name=#{group}]").each (index) ->
          radio  = $(this)
          target = methods.targetForController(radio)
          methods.handleCheckedState radio, target, settings.radio


    elements.filter("select").each (index) ->
      select = $(this)
      methods.handleSelect select, settings.selectInit
      select.on 'change', (event) ->
        methods.handleSelect select, settings.select

