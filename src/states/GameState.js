import HexMap from 'objects/HexMap';
import HexTile from 'objects/HexTile';
import Line from 'objects/Line';
import Player from 'objects/Player';
import { getTileNameByPosition } from 'utils/Utils';
import _ from 'lodash';

class GameState extends Phaser.State {

    preload() {
        // Load assets
        this.game.stage.backgroundColor = 0x444444;
        this.game.load.image('hexagon-blank', 'assets/hexagon-blank.png'); // TOOD Change name
        this.game.load.image('hexagon-wall', 'assets/hexagon-wall.png');
        this.game.load.image('hexagon-empty', 'assets/hex-tile.png');
        this.game.load.image('hexagon-start', 'assets/hex-start.png');
        this.game.load.image("point", "assets/point.png");
        this.game.load.text('standardMap', 'maps/standard');

        this.game.hexagonWidth = 400;
        this.game.hexagonHeight = 346;
        this.game.eventLocked = false;
    }

	create() {
        // Create Objects
        // Add map
        this.mapGroup = new Phaser.Group(this.game, this.world);
        this.mapGroup.pivot.x = this.game.world.centerX;
        this.mapGroup.pivot.y = this.game.world.centerY;

        // Create Hexagon Map
        var mapFile = this.game.cache.getText('standardMap');
        this.hexMap = new HexMap(this.game, this.world);
        this.hexMap.pivot.x = this.game.world.centerX;
        this.hexMap.pivot.y = this.game.world.centerY;

        this.hexMap.createMap(mapFile);
        this.mapGroup.add(this.hexMap);

        this.hexMap.scale.set(0.2);

        // Move Map to middle
        this.mapGroup.centerX = this.game.world.centerX;
        this.mapGroup.centerY = this.game.world.centerY;

        // Create selected tile
        this.activeTile = {};

        this.addRandomRoadsToTile(1,4);

        // Create player
        // var startTile = this.hexMap.getStartTile();
        // this.player = new Player(this.game, startTile, 11);
        // this.mapGroup.add(this.player);

        // Start Playing
        // this.player.start();
        // this.player.moveDirection(11);
        // this.player.moveTile(this.hexMap.getTileNeighbor(this.player.currentTile, 11), 7);
        // this.player.moveTile(this.hexMap.getTileNeighbor(this.player.currentTile, 7), 6);
        // this.player.moveTile(this.hexMap.getTileNeighbor(this.player.currentTile, 6), 3);
        // this.player.moveTile(this.hexMap.getTileNeighbor(this.player.currentTile, 3), 9);




        // this.player.moveTile(this.hexMap.getByName(getTileNameByPosition(3,4)), 7);
        // this.player.moveTile(this.hexMap.getByName(getTileNameByPosition(4,3)), 6);
        // this.player.moveTile(this.hexMap.getByName(getTileNameByPosition(5,3)), 7);
        // this.player.moveTile(this.hexMap.getByName(getTileNameByPosition(5,2)), 0);
        // this.player.moveTile(this.hexMap.getByName(getTileNameByPosition(4,2)), 6);
        // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // var aa = new HexTile(this.game, 0, 0, "S", {});
        // aa.centerX = startTile.worldPosition.x;
        // aa.centerY = startTile.worldPosition.y;
        // this.hexMap.add(aa);

        // game.input.addMoveCallback(slideGem, this);





	}

    // Debug
    printOutline(object) {
        var graphics = this.game.add.graphics(0, 0);

        // draw a rectangle
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.drawRect(object.worldPosition.x, object.worldPosition.y, object.width, object.height);
    }

    update() {

    }

    render() {

    }

    addRandomRoadsToTile(row, col) {
        var tile = this.hexMap.getByName(getTileNameByPosition(row,col));

        // var tile = new HexTile(this.game, 0, 0, "E", {row: row, col: col});

        var lineGroup = new Phaser.Group(this.game, this.world);
        lineGroup.pivot.x = 0.5;
        lineGroup.pivot.y = 0.5;

        var possibleDirections = [0,1,2,3,4,5,6,7,8,9,10,11];
        while (possibleDirections.length !== 0) {
            var start = _.sample(possibleDirections);
            possibleDirections = _.pull(possibleDirections, start);
            var end = _.sample(possibleDirections);
            possibleDirections = _.pull(possibleDirections, end);

            tile.addRoad(start, end);

            var line = new Line(this.game, tile, start);
            line.moveDirection(end);
            lineGroup.add(line);
        }

        tile.addChild(lineGroup);
        lineGroup.alignIn(tile, Phaser.CENTER, -tile.x, -tile.y);

        this.activeTile = tile;

        this.game.input.onDown.add(function rotate() {
            if (!this.game.eventLocked && Object.keys(this.activeTile).length > 0) {
                this.game.eventLocked = true;
                var tween = this.game.add.tween(this.activeTile).to( { angle: this.activeTile.angle + 60 }, 150, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function(tile, tween) {
                    this.game.eventLocked = false;
                }, this);
            }
        }, this);


    }
}

export default GameState;
