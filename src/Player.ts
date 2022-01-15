import PlayScene from './scenes/PlayScene';
export enum Direction {
    NONE = 'none',
    LEFT = 'left',
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down'
}
export class Player {
    // container:Phaser.GameObjects.Container;
    constructor(private sprite: Phaser.GameObjects.Container, private tilePos: Phaser.Math.Vector2) {
        const offsetX = PlayScene.TILE_SIZE / 2;
        const offsetY = PlayScene.TILE_SIZE;
        // (this.sprite.body as Phaser.Physics.Arcade.Body).setOrigin(0.5, 1);
        this.sprite.setPosition(tilePos.x * PlayScene.TILE_SIZE + offsetX, tilePos.y * PlayScene.TILE_SIZE + offsetY);
        // this.sprite.setFrame(55);
    }

    getPosition(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    }

    setPosition(position: Phaser.Math.Vector2): void {
        this.sprite.setPosition(position.x, position.y);
    }

    stopAnimation(direction: Direction) {
        // const animationManager = this.sprite.anims.animationManager;
        // const standingFrame = animationManager.get(direction).frames[1].frame.name;
        // this.sprite.anims.stop();
        // this.sprite.setFrame(standingFrame);
    }

    startAnimation(direction: Direction) {
        // this.sprite.anims.play(direction);
    }

    getTilePos(): Phaser.Math.Vector2 {
        return this.tilePos.clone();
    }

    setTilePos(tilePosition: Phaser.Math.Vector2): void {
        this.tilePos = tilePosition.clone();
    }
}
