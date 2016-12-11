import Line from 'objects/Line';
import HexTile from 'objects/HexTile';

class Player extends Line {

    constructor(game, startTile, startPosition) {
        super(game, startTile, startPosition);
        // this.anchor.x = 0.5;
        // this.anchor.y = 0.5;
        // this.pivot.x = startPosition.centerX;
        // this.pivot.y = startPosition.centerY;

        this.color = "0xaa00ff";
        this.clear();
        this.lineStyle(10, this.color, 1);

        // var aa = new HexTile(this.game, 0, 0, "S", {});
        // aa.centerX = startTile.worldPosition.x;
        // aa.centerY = startTile.worldPosition.y;
        // this.addChild(aa);
    }

    start() {
        this.clear();
        this.lineStyle(30, this.color, 1);

        this.moveTo(this.currentTile.entracesPoints[this.currentPosition].controlPoint.x,
                    this.currentTile.entracesPoints[this.currentPosition].controlPoint.y);
        this.lineTo(this.currentTile.entracesPoints[this.currentPosition].x,
                    this.currentTile.entracesPoints[this.currentPosition].y);
    }

    moveToTile(nextTile, destinationPosition) {
        this.currentTile = nextTile;
        this.moveTo(this.currentTile.entracesPoints[this.currentPosition].x,
                    this.currentTile.entracesPoints[this.currentPosition].y);

        this.bezierCurveTo(
            this.currentTile.entracesPoints[this.currentPosition].controlPoint.x,
            this.currentTile.entracesPoints[this.currentPosition].controlPoint.y,
            this.currentTile.entracesPoints[destinationPosition].controlPoint.x,
            this.currentTile.entracesPoints[destinationPosition].controlPoint.y,
            this.currentTile.entracesPoints[destinationPosition].x,
            this.currentTile.entracesPoints[destinationPosition].y);

        // Need to convert destinationPoisition to entrance position for the next round.
        if (this.currentTile.col % 2) {
            this.currentPosition = (destinationPosition + 5) % 12;
        } else {
            this.currentPosition = (destinationPosition + 7) % 12;
        }


    }
}

export default Player;
