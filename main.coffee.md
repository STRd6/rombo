Rombo
=====

Explore binary data.

    require "./setup"

    Bitplane = require "./bitplane"
    ByteArray = require "byte_array"
    Canvas = require "touch-canvas"
    FileReading = require("./lib/file_reading")
    Modal = require("./lib/modal")
    Palette = require "./palette"
    RomReader = require "./rom_reader"

    palette = Palette.defaultPalette

    console.log palette

    view = null

    toHex = (view) ->
      text = Array::map.call view, (value) ->
        "0#{value.toString(16)}".slice(-2)
      .join(" ")

      hex.text text

    toCanvas = (view, palette) ->
      pixelSize = 4
      chunkSize = pixelSize * 8

      [0...(view.length / chunkSize)].forEach (chunk) ->
        console.log "drawing chunk #{chunk}"
        [0...8].forEach (row) ->
          [0...8].forEach (col) ->
            index = view[chunk * chunkSize + row * 8 + col]

            debugger if index > 16

            x = chunkSize * (chunk % 10)
            y = chunkSize * (chunk / 10).floor()

            canvas.drawRect
              x: x + col * pixelSize
              y: y + row * pixelSize
              width: pixelSize
              height: pixelSize
              color: palette[index]


    canvas = Canvas
      width: 640
      height: 640

    canvas.fill "black"

    hex = $ "<pre>"
    #$("body").append hex

    $("body").append canvas.element()

    Rom =
      bank: Observable 0
      buffer: Observable null
      keys: Bitplane.modes
      viewMode: Observable Bitplane.modes[0]

    Rom.view = Observable ->
      bank = Rom.bank()
      mode = Rom.viewMode()
      buffer = Rom.buffer()

      if buffer
        Bitplane.toPaletteIndices(RomReader(buffer).bank(bank), mode)
      else
        null

    Rom.view.observe (newView) ->
      toCanvas newView, palette

    template = require("./templates/chooser")
    view = template(Rom)
    $("body").append view

    Modal.show FileReading.binaryReaderInput
      success: (buffer) ->
        Rom.buffer buffer

      error: (evt) ->
        console.log evt
      complete: ->
        Modal.hide()
