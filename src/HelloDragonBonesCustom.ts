/**
 * How to use
 * 1. Load data.
 *
 * 2. Parse data.
 *    factory.parseDragonBonesData();
 *    factory.parseTextureAtlasData();
 *
 * 3. Build armature.
 *    armatureDisplay = factory.buildArmatureDisplay("armatureName");
 *
 * 4. Play animation.
 *    armatureDisplay.animation.play("animationName");
 *
 * 5. Add armature to stage.
 *    addChild(armatureDisplay);
 */
class HelloDragonBonesCustom extends BaseDemo {
    public constructor() {
        super();

        this._resources.push(
            // "resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json",
            "resource/Red/RedShirt_ske.json",
            "resource/Red/RedShirt_tex.json",
            "resource/Red/RedShirt_tex.png"
        );
    }

    protected _onStart(): void {
        const factory = dragonBones.PixiFactory.factory;
        // factory.parseDragonBonesData(this._pixiResource["resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json"].data);
        factory.parseDragonBonesData(this._pixiResources["resource/Red/RedShirt_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/Red/RedShirt_tex.json"].data, this._pixiResources["resource/Red/RedShirt_tex.png"].texture);

        const armatureDisplay = factory.buildArmatureDisplay("RedShirtArmeture", "Redshirtdragonbone");
        armatureDisplay.animation.play("animtion0");

        armatureDisplay.x = 0.0;
        armatureDisplay.y = 200.0;
        this.addChild(armatureDisplay);

        PIXI.ticker.shared.add(this._enterFrameHandler, this);
        
    }

    private _enterFrameHandler(deltaTime: number): void { // Make sure game update before dragonBones update.
        console.log("update frame")
    }
}



