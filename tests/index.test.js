import Worker from './workerMock.js'
import pHash from '../src/index.js'
import data from './data.json'

describe('index', () => {
  it('can calculate hash from data object', async () => {
    const hash = pHash._calculateHash(data)
    expect(hash.value).toBe('1011010111010110010100100000101100101011001011110011110111111111')
  })

  it('can return hash as hex value', async () => {
    const hash = pHash._calculateHash(data)
    expect(hash.toHex()).toBe('b5d6520b2b2f4000')
  })

  it('can return hash as integer', async () => {
    const hash = pHash._calculateHash(data)
    expect(hash.toInt()).toBe(13102750373803672000)
  })
})