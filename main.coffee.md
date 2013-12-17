Rombo
=====

Explore binary data.

    require "./setup"

    ByteArray = require "byte_array"
    Canvas = require "touch-canvas"
    FileReading = require("./lib/file_reading")
    Modal = require("./lib/modal")

    $ ->
      Modal.show FileReading.binaryReaderInput
        success: (buffer) ->
          view = new Uint8Array(buffer)
          
        error: (evt) ->
          console.log evt
        complete: ->
          Modal.hide()

    canvas = Canvas
      width: 640
      height: 480

    canvas.fill "red"

    $("body").append canvas.element()

    # $("body").append $ "<textarea>"
