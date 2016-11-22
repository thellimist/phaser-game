import RainbowText from 'objects/RainbowText';
import HexTile from 'objects/HexTile';
import Player from 'objects/Player';
import _ from 'lodash';

class GameState extends Phaser.State {

    preload() {
        // Load assets
        this.game.stage.backgroundColor = 0x444444;
        // this.game.load.image("tiles", "assets/sprites/tiles.png");
        // this.game.load.spritesheet("arrows", "assets/sprites/arrows.png", 420, 420);

        this.game.load.image('hexagon-empty', 'assets/hexagon-empty.png');
        this.game.load.image('hexagon-blank', 'assets/hexagon-blank.png');
        this.game.load.image('hexagon-wall', 'assets/hexagon-wall.png');
        this.game.load.image('hexagon-start', 'assets/hexagon-start.png');

        this.game.load.image("point", "assets/point.png");

        this.game.load.text('standardMap', 'maps/standard');

        // var hexagongame.world.width / game.hexagonScale;
        this.game.hexagonSize = 100;
    }

	create() {
        // Create Objects
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);



        // Add map
        var map = this.game.cache.getText('standardMap');
        this.hexagonTileGroup = this.createMap(this.game, map);
        this.hexagonTileGroup.centerX = this.game.world.centerX
        this.hexagonTileGroup.centerY = this.game.world.centerY
        this.game.stage.addChild(this.hexagonTileGroup);

        // Find start tile
        this.startTile = {};
        this.hexagonTileGroup.forEach(function(item) {
            if (item.type === "S") {
                this.startTile = item;
            }
        }.bind(this));

        this.player = new Player(this.game, this.startTile, 10);
        this.game.stage.addChild(this.player);

        console.log(this.hexagonTileGroup.children[15]);

        this.player.moveTile(this.hexagonTileGroup.children[39], 11);
        // this.player.moveTile(this.hexagonTileGroup.children[21], 1);
        // this.player.moveTile(this.hexagonTileGroup.children[22], 2);
        // this.player.moveTile(this.hexagonTileGroup.children[23], 3);
        // this.player.moveTile(this.hexagonTileGroup.children[24], 4);
        // this.player.moveTile(this.hexagonTileGroup.children[25], 5);
        // this.player.moveTile(this.hexagonTileGroup.children[26], 6);
        // this.player.moveTile(this.hexagonTileGroup.children[30], 7);
        // this.player.moveTile(this.hexagonTileGroup.children[31], 8);
        // this.player.moveTile(this.hexagonTileGroup.children[32], 9);
        // this.player.moveTile(this.hexagonTileGroup.children[33], 10);
        // this.player.moveTile(this.hexagonTileGroup.children[34], 11);
        // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	}

    createMap(game, map) {
        var splitedMap = map.split("\n");

        var hexagonTileGroup = game.add.group();

        for (var i = 0; i < splitedMap.length; i++) {
            for (var j = 0; j < splitedMap[i].length; j++) {
                // console.log("row " + i + " col " + j + "res " + splitedMap[i][j] );

                var tileType = splitedMap[i][j];
                let center = { x: game.world.centerX, y: game.world.centerY }

                var xOffSet = 0;
                var yOffSet = 0;

                var hexagonSize = game.hexagonSize;

                var parity = j & 1
                var xCoord = j * (hexagonSize * 3 / 4) + xOffSet;
                var yCoord = i * hexagonSize - (parity  * hexagonSize / 2) + yOffSet;

                var tile = new HexTile(game, xCoord, yCoord, tileType, {row: i, col: j});

                hexagonTileGroup.add(tile);
            }
        }

        return hexagonTileGroup;
    }

    update() {

    }

    render() {

    }

}

export default GameState;
