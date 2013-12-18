Bitplane = require "../bitplane"

describe "Bitplane", ->
  it "should convert 2BPP SNES", ->
    source = new Uint8Array(16)
    
    source[0] = 0xff
    source[1] = 0b1

    result = Bitplane.toPaletteIndices(source)

    assert.equal result[0], 3

    [1...8].forEach (n) ->
      assert.equal result[n], 1

    [8...64].forEach (n) ->
      assert.equal result[n], 0
