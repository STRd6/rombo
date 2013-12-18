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

  it "should convert 4BPP SNES", ->
    source = new Uint8Array(32)

    source[0] = 0b1
    source[1] = 0b1
    source[16] = 0xff

    result = Bitplane.toPaletteIndices(source, "4BPP SNES")

    assert.equal result.length, 64

    console.log result

    assert.equal result[0], 7, "out[0] should equal 7"

    [1...8].forEach (n) ->
      assert.equal result[n], 4, "out[#{n}] should equal 4"

    [8...64].forEach (n) ->
      assert.equal result[n], 0