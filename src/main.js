import kaplay from "kaplay"
import { makeBackground, goToGame } from './utils'
import SCALE_FACTOR from './constants'
import { makePlayer } from "./player";
import { makeScoreBox } from "./scoreBox";

const k = kaplay({
    width: 1280,
    height: 720,
    letterbox: true,
    global: false,
    scale: 2,
})

k.loadSprite("kriby", "./kriby.png");
k.loadSprite("obstacles", "./obstacles.png");
k.loadSprite("background", "./background.png");
k.loadSprite("clouds", "./clouds.png");
k.loadSound("jump", "./jump.wav");
k.loadSound("hurt", "./hurt.wav");
k.loadSound("confirm", "./confirm.wav");

k.scene("start", async () => {
    makeBackground(k);

    const map = k.add([
        k.sprite("background"),
        k.pos(0, 0),
        k.scale(SCALE_FACTOR),
    ]);

    const clouds = map.add([k.sprite("clouds"), k.pos(), { speed: 5 }]);
    clouds.onUpdate(() => {
        clouds.move(clouds.speed, 0);
        if (clouds.pos.x > 700) {
            clouds.pos.x = -500;
        }
    });
    map.add([k.sprite("obstacles"), k.pos()]);

    // await saveFile.load()
    // if (!saveFile.data.maxScore) {
    //     saveFile.data.maxScore = 0
    //     await saveFile.save()
    // }

    const player = k.add(makePlayer(k))
    player.pos = k.vec2(k.center().x - 350, k.center().y + 56);
    const playBtn = k.add([
        k.rect(200, 50, { radius: 3 }),
        k.color(k.Color.fromHex("#14638e")),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x + 30, k.center().y + 60),
    ])
    playBtn.add([
        k.text("Play", { fontSize: 24 }),
        k.color(k.Color.fromHex("#d7f2f7")),
        k.area(),
        k.anchor("center"),
    ])

    playBtn.onClick(() => goToGame(k))

    k.onKeyPress("space", () => goToGame)

    k.onGamepadButton("south", () => goToGame)
})

k.scene("main", async () => {
    let score = 0

    const colliders = await (await fetch("./collidersData.json")).json()
    const collidersData = colliders.data
    makeBackground(k)

    k.setGravity(2500)

    const map = k.add([k.pos(0, -50), k.scale(SCALE_FACTOR)])

    map.add([k.sprite("background"), k.pos()]);

    const clouds = map.add([
        k.sprite("clouds"),
        k.pos(),
        {
            speed: 5,
        },
    ])

    clouds.onUpdate(() => {
        clouds.move(clouds.speed, 0);
        if (clouds.pos.x > 700) {
            clouds.pos.x = -500;
        }
    })

    const platforms = map.add([
        k.sprite("obstacles"),
        k.pos(),
        k.area(),
        {
            speed: 100
        }
    ])
    platforms.onUpdate(() => {
        platforms.move(-platforms.speed, 0);
        if (platforms.pos.x < -490) {
            platforms.pos.x = 300;
            platforms.speed += 30;
        }
    })
    k.loop(1, () => {
        score += 1
    })
    for (const collider of collidersData) {
        platforms.add([
            k.area({
                shape: new k.Rect(k.vec2(0), collider.width, collider.height)
            }),
            k.body({ isStatic: true }),
            k.pos(collider.x, collider.y),
            "obstacle"
        ])
    }
    k.add([k.rect(k.width(), 50), k.pos(0, -100), k.area(), "obstacle"
    ])
    k.add([k.rect(k.width(), 50), k.pos(0, 1000), k.area(), "obstacle"
    ])

    const player = k.add(makePlayer(k))
    player.pos = k.vec2(600, 250);
    player.setControls()
    player.onCollide("obstacle", async () => {
        if (player.isDead) {
            return makeScoreBox(k, 600, 25)
        }

        k.play("hurt")
        platforms.speed = 0;
        player.disableControls()
        k.add(await makeScoreBox(k, k.center(), score))
        player.isDead = true

    })
})

k.go("start")
