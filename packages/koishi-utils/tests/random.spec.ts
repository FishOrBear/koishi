import { randomId, randomBool, randomReal, randomInt, randomPick, randomSplice, randomMultiPick, randomWeightedPick, isInteger } from '../src'

describe('Random Manipulations', () => {
  test('randomId', () => {
    expect(randomId()).toHaveLength(8)
    expect(randomId(10)).toHaveLength(10)
  })

  test('randomBool', () => {
    for (let i = 0; i < 10; ++i) {
      expect(typeof randomBool(0.5)).toBe('boolean')
      expect(randomBool(0)).toBe(false)
      expect(randomBool(1)).toBe(true)
    }
  })

  test('randomReal', () => {
    let value: number
    for (let i = 0; i < 10; ++i) {
      value = randomReal(2, 5)
      expect(value < 5 && value >= 2).toBe(true)
      value = randomReal(5)
      expect(value < 5 && value >= 0).toBe(true)
    }
  })

  test('randomInt', () => {
    let value: number
    for (let i = 0; i < 10; ++i) {
      value = randomInt(2, 5.9)
      expect(value <= 5 && value >= 2 && isInteger(value)).toBe(true)
      value = randomInt(5.9)
      expect(value <= 5 && value >= 0 && isInteger(value)).toBe(true)
    }
  })

  test('randomPick', () => {
    const source = new Array(10).fill(undefined).map((_, index) => index)
    const value = randomPick(source)
    expect(value < 10 && value >= 0 && isInteger(value)).toBe(true)
    expect(source).toHaveLength(10)
  })

  test('randomSplice', () => {
    const source = new Array(10).fill(undefined).map((_, index) => index)
    const value = randomSplice(source)
    expect(value < 10 && value >= 0 && isInteger(value)).toBe(true)
    expect(source).toHaveLength(9)
    expect(source.indexOf(value)).toBe(-1)
  })

  test('randomMultiPick', () => {
    const source = new Array(10).fill(undefined).map((_, index) => index)
    const values = randomMultiPick(source, 5)
    values.forEach(value => expect(value < 10 && value >= 0 && isInteger(value)).toBe(true))
    expect(values).toHaveLength(5)
    expect(source).toHaveLength(10)
  })

  test('randomWeightedPick', () => {
    const source: Record<string, number> = {}
    for (let index = 0; index < 10; ++index) source[index] = index
    const value = +randomWeightedPick(source)
    expect(value < 10 && value >= 0 && isInteger(value)).toBe(true)
    expect(Object.keys(source)).toHaveLength(10)
  })
})
