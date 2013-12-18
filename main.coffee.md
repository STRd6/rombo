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
      chunkSize = 64
      pixelSize = 8

      [0...(view.length / chunkSize)].forEach (chunk) ->
        console.log "drawing chunk #{chunk}"
        [0...8].forEach (row) ->
          [0...8].forEach (col) ->
            index = view[chunk * chunkSize + row * 8 + col]
            if index > 16
              debugger

            x = chunkSize * (chunk % 10)
            y = chunkSize * (chunk / 10).floor()

            canvas.drawRect
              x: x + col * 8
              y: y + row * 8
              width: pixelSize
              height: pixelSize
              color: palette[index]

    $ ->
      Modal.show FileReading.binaryReaderInput
        success: (buffer) ->
          # Currently return only 1st bank
          global.view = view = Bitplane.toPaletteIndices(RomReader(buffer).bank(0))

          toCanvas(view, palette)

        error: (evt) ->
          console.log evt
        complete: ->
          Modal.hide()

    canvas = Canvas
      width: 640
      height: 640

    canvas.fill "black"

    hex = $ "<pre>"
    #$("body").append hex

    $("body").append canvas.element()
