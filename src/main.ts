import React from 'react';

import * as Phaser from 'phaser';

import TestScene from './scenes/PlayScene';

export const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'content',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scale: {
        zoom: 2
    },
    scene: [TestScene]
});

// ReactDOM.render(<LittleApp />, document.getElementById('littleApp'));
