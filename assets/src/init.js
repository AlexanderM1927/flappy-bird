const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 500
            }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
}

const game = new Phaser.Game(config)

function preload () {
    this.load.setBaseURL('http://flappy-bird.test')

    
    this.load.image('bg', '/assets/img/bg.png')
}

function create () {
    this.add.image(400, 300, 'bg')
}