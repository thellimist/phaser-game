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
        this.moveTo(this.currentTile.entracesPoints[this.currentPosition].x,
                    this.currentTile.entracesPoints[this.currentPosition].y);

        this.bezierCurveTo(
            this.currentTile.entracesPoints[this.currentPosition].controlPoint.x,
            this.currentTile.entracesPoints[this.currentPosition].controlPoint.y,
            this.currentTile.entracesPoints[destinationPosition].controlPoint.x,
            this.currentTile.entracesPoints[destinationPosition].controlPoint.y,
            this.currentTile.entracesPoints[destinationPosition].x,
            this.currentTile.entracesPoints[destinationPosition].y);

        // console.log("CUR " + this.currentPosition + " _ DES" + destinationPosition);
        // console.log(this.currentTile.entracesPoints[this.currentPosition]);
        // console.log(this.currentTile.entracesPoints[destinationPosition]);

        // this.lineTo(this.currentTile.entracesPoints[destinationPosition].x,
        //             this.currentTile.entracesPoints[destinationPosition].y);


        // this.moveTo(this.startTile.worldPosition.x + this.startTile.entracesPoints[this.currentPosition].x,
        //             this.startTile.worldPosition.y + this.startTile.entracesPoints[this.currentPosition].y);

        // this.bezierCurveTo(
        //     this.startTile.worldPosition.x + this.startTile.entracesPoints[this.currentPosition].controlPoint.x,
        //     this.startTile.worldPosition.y + this.startTile.entracesPoints[this.currentPosition].controlPoint.y,
        //     this.startTile.worldPosition.x + this.startTile.entracesPoints[destinationPosition].controlPoint.x,
        //     this.startTile.worldPosition.y + this.startTile.entracesPoints[destinationPosition].controlPoint.y,
        //     this.startTile.worldPosition.x + this.startTile.entracesPoints[destinationPosition].x,
        //     this.startTile.worldPosition.y + this.startTile.entracesPoints[destinationPosition].y);

        // this.currentTile = nextTile;

        // Need to convert destinationPoisition to entrance position for the next round.
        this.currentPosition = (destinationPosition + 5) % 12;
    }
}

export default Line;
