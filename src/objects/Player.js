import Line from 'objects/Line';

class Player extends Phaser.Group {

    constructor(game, startTile, startPosition) {
        super(game, game.world);

        // Set custom variables
        this.currentTile = startTile;
        this.currentPosition = startPosition;
        this.color = "0x786c44";
        this.line = new Line(startTile, startPosition);

        this.line.clear();
        this.line.lineStyle(10, this.color, 1);
    }

    start() {
        this.line.clear();
        this.line.lineStyle(10, this.color, 1);

        this.line.moveTo(this.currentTile.worldPosition.x + this.currentTile.entracesPoints[this.currentPosition].controlPoint.x,
                         this.currentTile.worldPosition.y + this.currentTile.entracesPoints[this.currentPosition].controlPoint.y);
        this.line.lineTo(this.currentTile.worldPosition.x + this.currentTile.entracesPoints[this.currentPosition].x,
                         this.currentTile.worldPosition.y + this.currentTile.entracesPoints[this.currentPosition].y);
    }

    moveDirection(direction) {
        this.line.moveDirection(direction);
    }
}

export default Player;
