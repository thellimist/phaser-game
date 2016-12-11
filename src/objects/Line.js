class Line extends Phaser.Graphics {

    constructor(game, startTile, startPosition) {
        super(game);

        // Set custom variables
        this.currentTile = startTile;
        this.currentPosition = startPosition;
        this.color = "0x786c44";

        this.clear();
        this.lineStyle(10, this.color, 1);
    }

    moveDirection(destinationPosition) {
        // console.log("HERE!");
        // console.log(this.currentTile);
        console.log("CURR " + this.currentPosition);
        console.log("DEST " + destinationPosition);

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



        console.log("AFTER CUR " + this.currentPosition);
    }
}

export default Line;
