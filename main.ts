scene.onOverlapTile(SpriteKind.Player, assets.tile`ground sky`, function (sprite, location) {
    if (234 == velocity || (236 == velocity || 235 == velocity)) {
        statusbar.value += -1
    } else if (237 == velocity || (238 == velocity || 239 == velocity)) {
        statusbar.value += -2
    } else if (240 <= velocity) {
        statusbar.value += -3
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(mySprite2, effects.spray, 65)
    mySprite2 = sprites.create(assets.image`Enenmy`, SpriteKind.Enemy)
    mySprite2.follow(mySprite, randint(32, 100))
    statusbar2 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar2.attachToSprite(mySprite2)
    statusbar2.max = randint(33, 97)
    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile3`)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    if (234 == velocity || (236 == velocity || 235 == velocity)) {
        statusbar.value += -1
    } else if (237 == velocity || (238 == velocity || 239 == velocity)) {
        statusbar.value += -2
    } else if (240 <= velocity) {
        statusbar.value += -3
    }
})
controller.combos.attachCombo("B", function () {
    myDart = darts.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 1 . . . . . . . . . . . . . . 
        . 1 1 b 2 . . . . . . 2 b . . . 
        . . 1 1 . . . . . . . . 2 b . . 
        d d d d d d d d d d d d d 2 b . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 b 
        d d d d d d d d d d d d d 2 b . 
        . . 1 1 . . . . . . . . 2 b . . 
        . 1 1 b 2 . . . . . . 2 b . . . 
        1 1 . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    tiles.placeOnTile(myDart, mySprite.tilemapLocation())
    myDart.throwDart()
    start = 1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar2.value += -2
    sprites.destroy(myDart, effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    pause(100)
    statusbar.value += -2
})
let myDart: Dart = null
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let mySprite2: Sprite = null
let velocity = 0
let start = 0
let mySprite: Sprite = null
let item = 0
tiles.setCurrentTilemap(tilemap`level2`)
mySprite = sprites.create(img`
    .......ff...............
    ....ffff2ff.............
    ..ffeeeef2ff............
    .ffeeeeef22ff...........
    .feeeeffeeeef...........
    .fffffee2222ef..........
    fffe222ffffe2f.1e.......
    ffffffffeeefff.1ee......
    fefe44ebf44eef.1.ee.....
    .fee4d4bfddef..1..ee....
    ..feee4dddee...1...e.b..
    ...f2222eedde..1...e..b.
    ...f444e44dde..2dddedddb
    ...fffffeeee...1...e..b.
    ..ffffffff.....1...e.b..
    ..fff..ff......1..ee....
    ...............1.ee.....
    ...............1ee......
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
start = 0
tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 2))
velocity = 98
mySprite.setVelocity(0, -30)
scene.cameraFollowSprite(mySprite)
mySprite2 = sprites.create(img`
    ................55..............
    ................545.............
    ................5445............
    ................5445............
    ................54245...........
    ................542245..........
    .........222222.542245..........
    ..............2.5422245.........
    .........222..225422245.........
    ...........22...54222245........
    ............22..54222245........
    .............22.542222245.......
    ..............22542222245.......
    ................542222245.......
    ................5422222245......
    ................54222222245.....
    ................54222222245.....
    ................542222222245....
    ................542222222245....
    ................544444444445....
    `, SpriteKind.Enemy)
tiles.placeOnTile(mySprite2, tiles.getTileLocation(93, 3))
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar2 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
statusbar.attachToSprite(mySprite)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
controller.moveSprite(mySprite, 99, 66)
statusbar2.attachToSprite(mySprite2)
statusbar2.max = 33
mySprite2.follow(mySprite, 65)
game.onUpdate(function () {
    if (controller.up.isPressed()) {
    	
    } else {
        mySprite.setVelocity(0, velocity)
    }
})
game.onUpdateInterval(randint(20000, 359000), function () {
    music.play(music.createSong(assets.song`song`), music.PlaybackMode.InBackground)
})
game.onUpdateInterval(1, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        velocity = 33
    } else if (controller.up.isPressed() || (controller.right.isPressed() || (controller.left.isPressed() || controller.down.isPressed()))) {
        velocity = 34
    } else {
        velocity += 6
        mySprite.setVelocity(0, velocity)
    }
})
game.onUpdateInterval(30000, function () {
    if (start == 1) {
        effects.clouds.startScreenEffect(1000)
        sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.clouds, 34)
        game.splash("Refresh")
        start = 0
    }
})
