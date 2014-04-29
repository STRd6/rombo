Util
====

    module.exports
      bufferTobase64: (buffer) ->
        binaryString = ''
        bytes = new Uint8Array(buffer)
        length = bytes.byteLength
        i = 0

        while i < length
          binary += String.fromCharCode bytes[i]
          i += 1

        btoa binaryString

      base64ToArrayBuffer: (base64) ->
        binaryString = atob(base64)
        length = binaryString.length
        bytes = new Uint8Array length

        i = 0
        while i < length
          ascii = binaryString.charCodeAt(i)
          bytes[i] = ascii
          i += 1
        
        bytes.buffer
