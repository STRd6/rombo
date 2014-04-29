Palette
=======

Some test palettes.

    makePalette = (text) ->
      text.split("\n").map (row) ->
        row.split(" ").map (n) ->
          parseInt(n, 10).concat 0xff

    numberToHex = (n) ->
      "0#{n.toString(0x10)}".slice(-2).toUpperCase()

    makeHexColors = (lines) ->
      lines.split("\n").map (line) ->
        "#" + line.split(" ").map (string) ->
          numberToHex parseInt(string, 10)
        .join("")

    module.exports =
      default4Color: makeHexColors """
        20 12 28
        89 125 206
        109 170 44
        222 238 214
      """

      "15-bit RGB": (word) ->
        R = 0b0000000000011111
        G = 0b0000001111100000
        B = 0b0111110000000000

        r = word & R
        g = (word & G) >> 5
        b = (word & B) >> 10

        "rgb(#{r}, #{g}, #{b})"

      defaultPalette: makeHexColors """
        20 12 28
        68 36 52
        48 52 109
        78 74 78
        133 76 48
        52 101 36
        208 70 72
        117 113 97
        89 125 206
        210 125 44
        133 149 161
        109 170 44
        210 170 153
        109 194 202
        218 212 94
        222 238 214
      """
