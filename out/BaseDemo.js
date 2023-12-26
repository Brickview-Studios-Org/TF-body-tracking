"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseDemo = /** @class */ (function (_super) {
    __extends(BaseDemo, _super);
    function BaseDemo() {
        var _this = _super.call(this) || this;
        //private static BACKGROUND_URL: string = "--resource/background.png";
        _this._renderer = new PIXI.WebGLRenderer(640, 480, { transparent: true });
        _this._background = new PIXI.Sprite(PIXI.Texture.EMPTY);
        _this._resources = [];
        _this._renderer.backgroundColor = 0x1099bb;
        _this._renderer.transparent = true;
        //this._resources.push(BaseDemo.BACKGROUND_URL);
        document.body.appendChild(_this._renderer.view);
        //
        setTimeout(function () {
            _this.x = _this.stageWidth * 0.5;
            _this.y = _this.stageHeight * 0.5;
            _this._loadResources();
        }, 10);
        return _this;
    }
    BaseDemo.prototype._renderHandler = function (deltaTime) {
        // Clear the background before rendering the scene
        this._renderer.render(this);
    };
    BaseDemo.prototype._startRenderTick = function () {
        PIXI.ticker.shared.add(this._renderHandler, this);
    };
    BaseDemo.prototype._loadResources = function () {
        var _this = this;
        var binaryOptions = { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER };
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            if (resource.indexOf("dbbin") > 0) {
                PIXI.loader.add(resource, resource, binaryOptions);
            }
            else {
                PIXI.loader.add(resource, resource);
            }
        }
        PIXI.loader.once("complete", function (loader, resources) {
            _this._pixiResources = resources;
            //
            //this._background.texture = this._pixiResources[BaseDemo.BACKGROUND_URL].texture;
            //this._renderer.backgroundColor = 0x000000; // Set transparent background color
            //this._background.x = -this._background.texture.width * 0.5;
            //this._background.y = -this._background.texture.height * 0.5;
            //this.addChild(this._background);
            //
            _this._onStart();
            _this._startRenderTick(); // Make sure render after dragonBones update.
        });
        PIXI.loader.load();
    };
    BaseDemo.prototype.createText = function (string) {
        var text = new PIXI.Text(string, { align: "center" });
        text.text = string;
        text.scale.x = 0.7;
        text.scale.y = 0.7;
        text.x = -text.width * 0.5;
        text.y = this.stageHeight * 0.5 - 100.0;
        this.addChild(text);
        return text;
    };
    Object.defineProperty(BaseDemo.prototype, "stageWidth", {
        get: function () {
            return this._renderer.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDemo.prototype, "stageHeight", {
        get: function () {
            return this._renderer.height;
        },
        enumerable: true,
        configurable: true
    });
    return BaseDemo;
}(PIXI.Container));
