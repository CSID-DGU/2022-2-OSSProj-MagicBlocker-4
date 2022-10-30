/**
 * Game utility
 */

const UTIL = require('./util')
const MODULE = require('./module')
const Position = MODULE.Position

const Gutil = {

  /* ---------------------------------------------------------------- Game
   */

  /**
   * Get random rotation
   *
   * @returns {number} rotation (float)
   */
  getRandomRotation: function () {
    return UTIL.getRandomArbitrary(-Math.PI, Math.PI)
  },

  /**
   * Convert tile index to point (0, 0)
   *
   * @param {number} tileIndexX - index of tile x
   * @param {number} tileIndexY - index of tile y
   * @param {number} [tileWidth=46] - tile width size
   * @param {number} [tileHeight=46] - tile height size
   * @param {boolean} [isMiddle=false] - return middle point or not
   * @returns {Position} return position of tile at (0, 0)
   */
  convertTileIndexToPoint: function (tileIndexX, tileIndexY, tileWidth, tileHeight, isMiddle) {
    if (typeof tileWidth === 'undefined') tileWidth = 46
    if (typeof tileHeight === 'undefined') tileHeight = 46
    if (typeof isMiddle === 'undefined') isMiddle = false
    let result
    const x = tileIndexX * tileWidth
    const y = tileIndexY * tileHeight
    const zeroPos = new Position(x, y)

    if (!isMiddle) {
      result = zeroPos
    } else {
      // we got point (0, 0) of the tile
      // so we need to convert it to middle point of this tile
      var middlePos = new Position(zeroPos.x + tileWidth / 2, zeroPos.y + tileHeight / 2)
      result = middlePos
    }

    return result
  },

  /**
   * Convert point to tile index
   *
   * @param {number} pointX
   * @param {number} pointY
   * @param {number} [tileWidth=46] - tile width size
   * @param {number} [tileHeight=46] - tile height size
   * @returns {Position}
   */
  convertPointToTileIndex: function (pointX, pointY, tileWidth, tileHeight) {
    if (typeof tileWidth === 'undefined') tileWidth = 46
    if (typeof tileHeight === 'undefined') tileHeight = 46
    const tileIndexX = Math.round(pointX / tileWidth)
    const tileIndexY = Math.round(pointY / tileHeight)
    const result = new Position(tileIndexX, tileIndexY)

    return result
  }
}

module.exports = Gutil
