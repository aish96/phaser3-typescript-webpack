import { debugDraw } from '../utils/debug';
import * as Phaser from 'phaser';
import { Direction, Player } from '../Player';
import { GridPhysics } from '../GridPhysics';
import { GridControls } from '../GridControl';
import React from 'react';
import { render } from 'react-dom';
export default class TestScene extends Phaser.Scene {
    previousDirection: Direction | null = null;
    static readonly TILE_SIZE = 32;
    player!: Phaser.Physics.Arcade.Sprite;
    cursors: any;
    playerGroup!: Phaser.GameObjects.Container;
    gridPhysics: any;
    gridControls: any;
    constructor() {
        super({
            key: 'TestScene'
        });
    }

    preload() {
        this.load.image('tiles', '/assets/tilemaps/dungeon.png');
        this.load.tilemapTiledJSON('dungeon', '/assets/dungeons/dungeon.json');
        this.load.image('player', '/assets/sprites/addition.png');
        this.load.image('box', '/assets/tiles/box.jpg');
    }

    create() {
        var map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'dungeon' });
        var tileset = map.addTilesetImage('dungeon', 'tiles');
        map.createLayer(1, tileset!, 0, 0);
        let layer = map.createLayer(0, tileset!, 0, 0);
        layer!.setCollisionByProperty({ collides: true });
        // debugDraw(layer!, this);

        this.player = this.physics.add.sprite(0, 0, 'player');
        this.player.setOrigin(0.5, 1);

        let box = this.physics.add.sprite(120, 230, 'box');
        box.setOrigin(0.5, 1);
        this.playerGroup = this.add.container(0, 0);
        this.playerGroup.add(this.player);
        // this.playerGroup.setSize(this.player.width + box.width, this.player.height + box.height);
        this.physics.add.collider(this.player, box, this.addSpriteToPlayer.bind(this, box));
        this.physics.world.enable(this.playerGroup);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.playerGroup, false);
        // layer!.setCollision([1, 2, 3, 33, 34, 35, 224, 225, 226, 227, 228, 229, 256, 257, 258, 259, 260, 290, 292]);
        // this.physics.add.collider(this.playerGroup, layer, () => console.log('collide'), noop, this);
        // (this.playerGroup.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        const player = new Player(this.playerGroup, new Phaser.Math.Vector2(3, 0));

        this.gridPhysics = new GridPhysics(player, map);
        this.gridControls = new GridControls(this.input, this.gridPhysics);

        const App = () => <div style={{ textAlign: 'center', zIndex: 1000 }}>hello react</div>;

        // creating the react dom element
        let reactDiv = document.getElementById('react');
        if (!reactDiv) throw new Error('#react not found');
        reactDiv.addEventListener('mousedown', (event: Event) => {
            // if the click is not on the root react div, we call stopPropagation()
            let target = event.target as HTMLElement;
            if (target.id !== 'react') event.stopPropagation();
        });

        // @ts-ignore
        let react = this.add.dom(0, 0, reactDiv);
        render(<App />, react.node);
    }

    addSpriteToPlayer(box: Phaser.GameObjects.Image) {
        this.playerGroup.add(box);
        let xPos, yPos;
        if (this.previousDirection === Direction.LEFT) {
            xPos = this.player.x - TestScene.TILE_SIZE;
            yPos = this.player.y;
        } else if (this.previousDirection === Direction.RIGHT) {
            xPos = this.player.x + TestScene.TILE_SIZE;
            yPos = this.player.y;
        } else if (this.previousDirection === Direction.UP) {
            xPos = this.player.x;
            yPos = this.player.y - TestScene.TILE_SIZE;
        } else if (this.previousDirection === Direction.DOWN) {
            xPos = this.player.x;
            yPos = this.player.y + TestScene.TILE_SIZE;
        }
        box.setPosition(xPos, yPos);
    }

    update(time: number, delta: number) {
        if (this.cursors.left.isDown) {
            this.previousDirection = Direction.LEFT;
        }
        if (this.cursors.right.isDown) {
            this.previousDirection = Direction.RIGHT;
        }
        if (this.cursors.down.isDown) {
            this.previousDirection = Direction.DOWN;
        }
        if (this.cursors.up.isDown) {
            this.previousDirection = Direction.UP;
        }
        this.gridControls.update();
        this.gridPhysics.update(delta);
    }
}
