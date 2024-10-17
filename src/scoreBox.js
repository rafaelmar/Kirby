import { computeRank, goToGame } from "./utils";

export function makeScoreBox(k, pos, score) {
    const container = k.make([
        k.rect(450, 300),
        k.pos(pos),
        k.color(k.Color.fromHex("#d7f2f7")),
        k.anchor("center"),
        k.outline(4, k.Color.fromHex("#14638e")),
    ])
    container.add([
        k.text(`Current Rank : ${computeRank(score)}`),
        k.color(k.Color.fromHex("#14638e")),
        k.pos(-200, -50),
    ])
    container.add([
        k.text(`Current Score: ${score}`),
        k.color(k.Color.fromHex("#14638e")),
        k.area(),
        k.pos(-200, -100),
    ]);

    const restartBtn = container.add([
        k.rect(200, 50, { radius: 3 }),
        k.color(k.Color.fromHex("#14638e")),
        k.area(),
        k.anchor("center"),
        k.pos(0, 60),
    ])
    restartBtn.add([
        k.text("Restart", { fontSize: 24 }),
        k.color(k.Color.fromHex("#d7f2f7")),
        k.area(),
        k.anchor("center"),
    ])

    restartBtn.onClick(() => goToGame(k))
    k.onKeyPress("space", () => goToGame(k))
    //k.onGamepadButton("south", () => goToGame(k))
    return container
}