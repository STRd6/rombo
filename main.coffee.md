Rombo
=====

Explore binary data.

    require "./setup"

    ByteArray = require "byte_array"
    Canvas = require "touch-canvas"
    FileReading = require("./lib/file_reading")
    Modal = require("./lib/modal")

    view = null

    bankSize = 1024 * 30 # 32kb

    $ ->
      Modal.show FileReading.binaryReaderInput
        success: (buffer) ->
          global.view = view = new Uint8Array(buffer)

          console.log view.length

          section = view.subarray(0, bankSize)
          text = Array::map.call section, (value) ->
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

    # $("body").append canvas.element()
    
    hex = $ "<pre>"

    $("body").append hex
