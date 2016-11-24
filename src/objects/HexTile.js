import { getTileNameByPosition } from 'utils/Utils';

class HexTile extends Phaser.Sprite {

    constructor(game, x, y, type, position) {
        if (type === "W") {
            // Wall
            super(game, x, y, 'hexagon-wall');
        }

        if (type === "E") {
            // Empty
            super(game, x, y, 'hexagon-empty');
        }

        if (type === "B") {
            // Blank
            super(game, x, y, 'hexagon-blank');
        }

        if (type === "S") {
            // Start
            super(game, x, y, 'hexagon-start');
        }

        this.anchor.setTo(0.5);

        // Set custom variables
        this.type = type;
        this.row = position.row;
        this.col = position.col;
        this.name = getTileNameByPosition(this.row, this.col);

        // Set Phaser.Sprite variables
        this.width = this.game.hexagonWidth;
        this.height = this.game.hexagonHeight;

        // Road Layouts
        this.roadLayout = {};

        // Debug text
        if (true) {
            var style = { font: "50px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 150, align: "center", backgroundColor: "#000000" };
            this.text = game.add.text(0, 0, this.name, style);
            this.addChild(this.text);
        }

        // Hexagon Entrances
        // Assume the following is a hexagon
        // Starts from S as 0th index clockwise
        // In total there are 12 entrances. 2 on each side.
        //  S-
        // -  -
        //  --
        // The structure is always (outsideOfHex px) + (insideOfHex px)
        // https://www.html5rocks.com/static/images/screenshots/casestudies/gopherwood/control-points.png
        this.controlPoints = [
            // 0 - 30 Degree
            {
                x: (this.width / 4) + (this.width / 8 + this.width / 4),
                y: (this.height / 4)
            },
            // 1 - 90 Degree
            {
                x: (this.width * 3 / 4),
                y: (this.height / 2)
            },
            // 2 - 150 Degree
            {
                x: (this.width / 4) + (this.width / 8 + this.width / 4),
                y: (this.height * 3 / 4)
            },
            // 3 - 210 Degree
            {
                x: (this.width / 4) + (this.width / 8),
                y: (this.height * 3 / 4)
            },
            // 4 - 270 Degree
            {
                x: (this.width * 1 / 4),
                y: (this.height / 2)
            },
            // 5 - 330 Degree
            {
                x: (this.width / 4) + (this.width / 8),
                y: (this.height / 4)
            },
        ];

        this.entracesPoints = [
            // 0
            {
                x: (this.width * 5 / 8),
                y: 0,
                controlPoint: this.controlPoints[0],
            },
            // 1
            {
                x: (this.width * 3 / 4) + (this.width / 12),
                y: (this.height / 6),
                controlPoint: this.controlPoints[0],
            },
            // 2
            {
                x: (this.width * 3 / 4) + (this.width / 6 ),
                y: (this.height * 3 / 8),
                controlPoint: this.controlPoints[1],
            },
            // 3
            {
                x: (this.width * 3 / 4) + (this.width / 6 ),
                y: (this.height * 5 / 8),
                controlPoint: this.controlPoints[1],
            },
            // 4
            {
                x: (this.width * 3 / 4) + (this.width / 12),
                y: (this.height * 7 / 8),
                controlPoint: this.controlPoints[2],
            },
            // 5
            {
                x: (this.width * 5 / 8),
                y: (this.height),
                controlPoint: this.controlPoints[2],
            },
            // 6
            {
                x: (this.width * 3 / 8),
                y: (this.height),
                controlPoint: this.controlPoints[3],
            },
            // 7
            {
                x: (this.width * 3 / 12),
                y: (this.height * 7 / 8),
                controlPoint: this.controlPoints[3],
            },
            // 8
            {
                x: (this.width * 1 / 12),
                y: (this.height * 5 / 8),
                controlPoint: this.controlPoints[4],
            },
            // 9
            {
                x: (this.width * 1 / 12),
                y: (this.height * 3 / 8),
                controlPoint: this.controlPoints[4],
            },
            // 10
            {
                x: (this.width * 3 / 12),
                y: (this.height / 6),
                controlPoint: this.controlPoints[5],
            },
            // 11
            {
                x: (this.width * 3 / 8),
                y: 0,
                controlPoint: this.controlPoints[5],
            },
        ];
    }

    addRoad(start, end) {
        this.roadLayout[start] = end;
        this.roadLayout[end] = start;
    }


}

export default HexTile;