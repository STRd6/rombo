Rom Reader
==========

Read rom data by byte.

    # TODO: Handle both HiROM and LoROM
    bankSize = 1024 * 32 # 32kb

Strip extra headers.

    module.exports = (buffer) ->
      view = new Uint8Array(buffer)

      remainder = view.length % 1024

      if remainder is 512
        rom = view.subarray(512)
      else if remainder is 0
        rom = view.subarray(0)
      else
        throw "Invalid ROM length"

      bank: (n) ->
        rom.subarray(bankSize * n, bankSize * (n + 1))
