Rombo
=====

Explore binary data.

    require "./setup"

    Bitplane = require "./bitplane"
    ByteArray = require "byte_array"
    Canvas = require "touch-canvas"
    FileReading = require("./lib/file_reading")
    Modal = require("./lib/modal")
    RomReader = require "./rom_reader"

    view = null

    $ ->
      Modal.show FileReading.binaryReaderInput
        success: (buffer) ->
          # Currently return only 1st bank
          global.view = view = RomReader(buffer).bank(0)

          text = Array::map.call view, (value) ->
            "0#{value.toString(16)}".slice(-2)
          .join(" ")

          hex.text text

        error: (evt) ->
          console.log evt
        complete: ->
          Modal.hide()

    canvas = Canvas
      width: 640
      height: 480

    canvas.fill "red"
    
    hex = $ "<pre>"

    $("body").append hex
