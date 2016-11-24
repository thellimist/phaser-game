class Player extends Phaser.Graphics {

    constructor(game, startTile, startPosition) {
        super(game);

        // Set custom variables
        this.currentTile = startTile;
        this.currentPosition = startPosition;
        this.color = "0x008800";
    }

    moveTile(nextTile, destinationPosition) {
        // Convert currentTile end to nextTile begining
        // Basically if even position + 5 if odd position - 5
        var convertedEntrancePosition = (this.currentPosition % 2 == 0) ? ((this.currentPosition + 5) % 12) : ((this.currentPosition + 7) % 12);

        this.bezierCurveTo(
            nextTile.worldPosition.x + nextTile.entracesPoints[convertedEntrancePosition].controlPoint.x,
            nextTile.worldPosition.y + nextTile.entracesPoints[convertedEntrancePosition].controlPoint.y,
            nextTile.worldPosition.x + nextTile.entracesPoints[destinationPosition].controlPoint.x,
            nextTile.worldPosition.y + nextTile.entracesPoints[destinationPosition].controlPoint.y,
            nextTile.worldPosition.x + nextTile.entracesPoints[destinationPosition].x,
            nextTile.worldPosition.y + nextTile.entracesPoints[destinationPosition].y);

        this.currentTile = nextTile;
        this.currentPosition = destinationPosition;
    }

    start() {
        this.clear();
        this.lineStyle(5, this.color, 1);

        this.moveTo(this.currentTile.worldPosition.x + this.currentTile.entracesPoints[this.currentPosition].controlPoint.x,
                    this.currentTile.worldPosition.y + this.currentTile.entracesPoints[this.currentPosition].controlPoint.y);
        this.lineTo(this.currentTile.worldPosition.x + this.currentTile.entracesPoints[this.currentPosition].x,
                    this.currentTile.worldPosition.y + this.currentTile.entracesPoints[this.currentPosition].y);

    }
}

export default Player;

