Bitplane
========

Transform a buffer of binary octects into an image data.

http://mrclick.zophar.net/TilEd/download/consolegfx.txt

    masks = [0...8].map (n) ->
      0b1 << n

    modes =
      # 16 bytes of source -> 64 bytes of dest
      # TODO: Untested
      "2BPP NES": (source, dest) ->
        [0...2].forEach (depth) ->
          [0...8].forEach (n) ->
            masks.forEach (mask, i) ->
              dest[n * 8 + i] |= ((source[depth * 8 + n] & mask) >> i) << depth

      # 16 bytes of source -> 64 bytes of dest
      "2BPP SNES": (source, dest, shift=0) ->
        [0...8].forEach (row) ->
          [0...2].forEach (depth) ->
            masks.forEach (mask, i) ->
              dest[row * 8 + i] |= ((source[2 * row + depth] & mask) >> i) << (depth + shift)

      # 24 bytes source -> 64 bytes dest
      "3BPP SNES": -> # TODO

      # 32 bytes source -> 64 bytes dest
      "4BPP SNES": (source, dest) ->
        [0...2].forEach (shift) ->
          modes["2BPP SNES"](source.subarray(shift * 16, (shift + 1) * 16), dest, shift * 2)

      # 64 bytes source -> 64 bytes dest
      "8BPP SNES": (source, dest) ->
        [0...2].forEach (shift) ->
          modes["4BPP SNES"](source.subarray(shift * 32, (shift + 1) * 32), dest, shift * 4)

    module.exports = 
      toPaletteIndices: (view, mode="8BPP SNES") ->
        # TODO: Create correct output buffer based on mode and input size
        # Currently assuming 8BPP

        chunkSize = 64
        outputChunkSize = 64
        ratio = outputChunkSize / chunkSize

        output = new Uint8Array(view.length * ratio)

        unless modes[mode]
          throw "Invalid mode #{mode}, try one of #{Object.keys(modes).join(", ")}"

        if (view.length % chunkSize) != 0
          throw "Invalid buffer length, must be a multiple of #{chunkSize}"

        [0...(view.legth / chunkSize)].forEach (slice) ->
          source = view.subarray(slice * chunkSize, (slice + 1) * chunkSize)
          destination = output.subarray(slice * outputChunkSize, (slice + 1) * outputChunkSize)
          modes[mode](source, destination)

        return output
