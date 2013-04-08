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

      # used to process the value to create a selector
      parameterize: (string) ->
        $.trim(string).toLowerCase().replace(/\W/g, '-')

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
          value = settings.parameterize(value)
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


    element_selector = "[data-#{settings.dataAttribute}], [data-#{settings.dataAttribute}-prefix]"

    # set initial state
    $(element_selector).each (index, controller) ->
      controller = $(controller)
      if controller.is('select')
        methods.handleSelect controller, settings.selectInit
      else
        target  = methods.targetForController(controller)
        setting = settings.checkboxInit if controller.is(':checkbox')
        setting = settings.radioInit    if controller.is(':radio')
        methods.handleCheckedState controller, target, setting


    $(document).on 'change', element_selector, (event) ->
      controller = $(this)

      if controller.is('select')
        methods.handleSelect controller, settings.select

      if controller.is(':checkbox')
        target = methods.targetForController(controller)
        methods.handleCheckedState controller, target, settings.checkbox

      if controller.is(':radio')
        group = controller.attr("name")
        $(":radio[name=#{group}]").each (index, radio) ->
          radio = $(radio)
          target = methods.targetForController(radio)
          methods.handleCheckedState radio, target, settings.radio



