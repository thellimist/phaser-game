import { getTileNameByPosition } from 'utils/Utils';
import HexTile from 'objects/HexTile';
import _ from 'lodash';

class HexMap extends Phaser.Group {

    constructor(game, world) {
        super(game, world);

        this.startTile = {};
        this.directions = [
            { // Even
                11: {row:  -1, col:  0},
                0:  {row:  -1, col:  0},
                1:  {row:   0, col: +1},
                2:  {row:   0, col: +1},
                3:  {row:  +1, col: +1},
                4:  {row:  +1, col: +1},
                5:  {row:  +1, col:  0},
                6:  {row:  +1, col:  0},
                7:  {row:  +1, col: -1},
                8:  {row:  +1, col: -1},
                9:  {row:   0, col: -1},
                10: {row:   0, col: -1},
            },
            { // Odd
                11: {row:  -1, col:  0},
                0:  {row:  -1, col:  0},
                1:  {row:  -1, col: +1},
                2:  {row:  -1, col: +1},
                3:  {row:   0, col: +1},
                4:  {row:   0, col: +1},
                5:  {row:  +1, col:  0},
                6:  {row:  +1, col:  0},
                7:  {row:   0, col: -1},
                8:  {row:   0, col: -1},
                9:  {row:  -1, col: -1},
                10: {row:  -1, col: -1},
            }
        ];
    }

    createMap(mapStructure) {
        var splitedMap = mapStructure.split("\n");

        for (var i = 0; i < splitedMap.length; i++) {
            for (var j = 0; j < splitedMap[i].length; j++) {
                // console.log("row " + i + " col " + j + "res " + splitedMap[i][j] );

                var tileType = splitedMap[i][j];

                var xOffSet = 0;
                var yOffSet = 0;

                var hexagonSize = this.game.hexagonSize;

                var parity = j & 1
                var xCoord = j * (hexagonSize * 3 / 4) + xOffSet;
                var yCoord = i * hexagonSize - (parity  * hexagonSize / 2) + yOffSet;

                var tile = new HexTile(this.game, xCoord, yCoord, tileType, {row: i, col: j});

                this.add(tile);
            }
        }
    }

    getStartTile() {
        if (Object.keys(this.startTile).length !== 0) {
            return this.startTile;
        }

        this.startTile = {};
        this.forEach(function(item) {
            if (item.type === "S") {
                this.startTile = item;
            }
        }.bind(this));

        return this.startTile;
    }

    getTileNeighbor(tile, direction) {
        var parity = tile.col & 1
        var dir = this.directions[parity][direction]

        return this.getByName(getTileNameByPosition(tile.row + dir.row, tile.col + dir.col));

    }

    getTileNeighbors(tile) {
        var neighbors = [];
        _.forEach(this.directions, function(direction) {
            neighbors += this.getTileNeighbor(tile, direction);
        }.bind(this));

        return neighbors;
    }
}

export default HexMap;

