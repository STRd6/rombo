Rombo
=====

Explore binary data.

    require "./setup"

    ByteArray = require "byte_array"
    FileReading = require("./lib/file_reading")
    Modal = require("./lib/modal")
    
    $ ->
      Modal.show FileReading.binaryReaderInput
        success: (arrayBuffer) ->
          console.log arrayBuffer
        error: (evt) ->
          console.log evt
        complete: ->
          Modal.hide()
