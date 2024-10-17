import { computeRank, goToGame } from "./utils";

export function makeScoreBox(k, pos, score) {
    const container = k.make([
        k.rect(600, 500),
        k.pos(pos),
        k.color(k.Color.fromHex("#d7f2f7")),
        k.anchor("center"),
        k.outline(4, k.Color.fromHex("#14638e")),
    ])
    container.add([
        k.text(`Current Score : ${computeRank(score)}`),
        k.color(k.Color.fromHex("#14638e")),
        k.area(),
        k.pos(-240, 50),
    ])

    const restartBtn = container.add([
        k.rect(200, 50, { radius: 3 }),
        k.color(k.Color.fromHex("#14638e")),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x + 30, k.center().y + 60),
    ])
    restartBtn.add([
        k.text("Restart", { fontSize: 24 }),
        k.color(k.Color.fromHex("#d7f2f7")),
        k.area(),
        k.anchor("center"),
    ])

    restartBtn.onClick(() => goToGame(k))
    k.onKeyPress("space", () => goToGame(k))
    k.onGamepadButton("south", () => goToGame(k))
    return container
}