class Player extends Phaser.Graphics {

    constructor(game, startTile, startPosition) {
        super(game);

        // Set custom variables
        this.currentTile = startTile;
        this.currentPosition = startPosition;
        this.color = "0x008800";

        // Set Phaser.Sprite variables
        this.game = game;
        this.width = this.size;
        this.height = this.size;

        // bezierGraphics = this.game.add.graphics(0, 0);

        this.clear();
        this.lineStyle(5, this.color, 1);


        // this.moveTo(this.currentTile.worldPosition.x + this.currentTile.entracesPoints[0].x,
        //             this.currentTile.worldPosition.y + this.currentTile.entracesPoints[0].y);

        // this.bezierCurveTo(
        //     this.currentTile.worldPosition.x + this.currentTile.entracesPoints[0].controlPoint.x,
        //     this.currentTile.worldPosition.y + this.currentTile.entracesPoints[0].controlPoint.y,
        //     this.currentTile.worldPosition.x + this.currentTile.entracesPoints[6].controlPoint.x,
        //     this.currentTile.worldPosition.y + this.currentTile.entracesPoints[6].controlPoint.y,
        //     this.currentTile.worldPosition.x + this.currentTile.entracesPoints[6].x,
        //     this.currentTile.worldPosition.y + this.currentTile.entracesPoints[6].y);
    }

    moveTile(nextTile, entrancePosition) {
        this.moveTo(this.currentTile.worldPosition.x + this.currentTile.entracesPoints[this.currentPosition].x,
                    this.currentTile.worldPosition.y + this.currentTile.entracesPoints[this.currentPosition].y);
        this.bezierCurveTo(
            this.currentTile.worldPosition.x + this.currentTile.entracesPoints[this.currentPosition].controlPoint.x,
            this.currentTile.worldPosition.y + this.currentTile.entracesPoints[this.currentPosition].controlPoint.y,
            nextTile.worldPosition.x + nextTile.entracesPoints[entrancePosition].controlPoint.x,
            nextTile.worldPosition.y + nextTile.entracesPoints[entrancePosition].controlPoint.y,
            nextTile.worldPosition.x + nextTile.entracesPoints[entrancePosition].x,
            nextTile.worldPosition.y + nextTile.entracesPoints[entrancePosition].y);

        this.alphe = 1;
        var tween = this.game.add.tween(this).to( { alpha: 0 }, 2000, "Linear", true, 200);

        this.currentTile = nextTile;
        this.currentPosition = entrancePosition;
    }
}

export default Player;

