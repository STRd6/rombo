Rom Reader
==========

Read rom data by byte.

    # TODO: Handle both HiROM and LoROM
    bankSize = 1024 * 30 # 32kb

Strip extra headers.

    module.exports = (buffer) ->

      view = new Uint8Array(buffer)

      remainder = view.length % 1024

      if remainder is 512
        return view.subarray(512, bankSize + 512)
      else if remainder is 0
        return view.subarray(0, bankSize)
      else
        throw "Invalid ROM length"
