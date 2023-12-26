"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (d, b) {
          d.__proto__ = b;
        }) ||
      function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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

var HelloDragonBonesCustom = /** @class */ (function (_super) {
  __extends(HelloDragonBonesCustom, _super);
  function HelloDragonBonesCustom() {
    var _this = _super.call(this) || this;
    _this._resources.push(
      "resource/Red/YShirt3_ske.json",
      "resource/Red/YShirt3_tex.json",
      "resource/Red/YShirt3_tex.png"
    );
    return _this;
  }

  HelloDragonBonesCustom.prototype._onStart = function () {
    var factory = dragonBones.PixiFactory.factory;

    factory.parseDragonBonesData(
      this._pixiResources["resource/Red/YShirt3_ske.json"].data
    );
    factory.parseTextureAtlasData(
      this._pixiResources["resource/Red/YShirt3_tex.json"].data,
      this._pixiResources["resource/Red/YShirt3_tex.png"].texture
    );
    var armatureDisplay = factory.buildArmatureDisplay(
      "Armature",
      "YShirt3"
    );
    armatureDisplay.animation.play("animtion0");
    armatureDisplay.x = -15;
    armatureDisplay.y = 0;
    this.effectSlot = armatureDisplay.armature.getBone("neck");
    // this.effectSlot.offset.scaleX = 1.5;
    // this.effectSlot.offset.scaleY = 1.5;

    this.left_wrist = armatureDisplay.armature.getBone("left_wrist");
    this.left_elbow = armatureDisplay.armature.getBone("left_elbow");
    this.left_shoulder_joint = armatureDisplay.armature.getBone(
      "left_shoulder_joint"
    );

    this.right_wrist = armatureDisplay.armature.getBone("right_wrist");
    this.right_elbow = armatureDisplay.armature.getBone("right_elbow");
    this.right_shoulder_joint = armatureDisplay.armature.getBone(
      "right_shoulder_joint"
    );

    this.addChild(armatureDisplay);

    this.myCircle = new PIXI.Graphics();
    this.myCircle.lineStyle(2, 0x9933FF);
    this.myCircle.beginFill(0xcc33FF);

    // params: pos x, pos y, radius
    this.myCircle.drawCircle(0, 0, 25);

    this.myCircle.endFill();

    // Add PIXI Graphics object to the PixiJS stage
  this.addChild(this.myCircle);

    PIXI.ticker.shared.add(this._enterFrameHandler, this);
  };
  HelloDragonBonesCustom.prototype._enterFrameHandler = function (deltaTime) {
    this.effectSlot.offset.x = 320 - NeckX;
    this.effectSlot.offset.y = NeckY - 240;

    let leftWrist = 200 -  lWristX; // this 200 is arbitary suposed to be 320 but this works 
    this.left_wrist.offset.x = leftWrist
    this.left_wrist.offset.y =  lWristY -480

    let elbowSide = 200- lElbowX;
    this.left_elbow.offset.x = elbowSide;
    let elbowHeigh = lElbowY - 400;
    this.left_elbow.offset.y =  elbowHeigh

    this.left_shoulder_joint.offset.x = 320 - lShoulderX;
    this.left_shoulder_joint.offset.y = lShoulderY - 240;

    this.right_wrist.offset.x = 420 - rWristX;
    this.right_wrist.offset.y = rWristY - 480;

    
    let relbowSide = 440 - rElbowX;
    this.right_elbow.offset.x =  relbowSide;
    let relbowHeigh = rElbowY - 400;
    this.right_elbow.offset.y = relbowHeigh;

    this.right_shoulder_joint.offset.x = 320 - rShoulderX;
    this.right_shoulder_joint.offset.y = rShoulderY - 240;


    //console.log(lWristY - 240);
    //this.left_wrist.offset.y =  lWristY - 240;
    //

    this.myCircle.x = -400// relbowSide//320 - lElbowX ;
    this.myCircle.y =-600 // relbowHeigh ;

   // console.log("Lwrist y is  " + this.left_wrist.offset.y ) ;
  };
  return HelloDragonBonesCustom;
})(BaseDemo);

var Net;
var noseCircle;
const video = document.createElement("video");
// Wrap your code in DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  video.width = 640;
  video.height = 480;
  // Set the video position to absolute and z-index to -1 to render it behind the Pixi application
  video.style.position = "absolute";
  video.style.zIndex = "-1";
  video.style.transform = "scaleX(-1)";
  video.style.left = `${0}px`;

  video.addEventListener("click", detectFrame);

  document.body.appendChild(video);

  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });

  posenet
    .load()
    .then((net) => {
      Net = net;
      console.log("posenet loaded!");
      detectFrame().then((p) => {
        console.log(p.keypoints[10].position.y);
      });
    })
    .catch((error) => {
      console.error("Error loading PoseNet:", error);
    });

  noseCircle = document.createElement("div");
  noseCircle.setAttribute(
    "style",
    "background-color:red; width:20px; height:20px; position:absolute; z-index:1000; border-radius:50%"
  );
  document.body.appendChild(noseCircle);
  window.requestAnimationFrame(step);
});

async function detectFrame() {
  if (Net == null) {
    console.log("Posenet not loaded");
    return;
  }
  var pose = await Net.estimateSinglePose(video);
  return new Promise((resolve) => {
    resolve(pose);
  });
}

let NoseX = 0;
let NoseY = 0;

let NeckX = 0;
let NeckY = 0;
let lWristX = 0,
  lElbowX = 0,
  lShoulderX = 0;
let lWristY = 0,
  lElbowY = 0,
  lShoulderY = 0;

let rWristX = 0,
  rElbowX = 0,
  rShoulderX = 0;
let rWristY = 0,
  rElbowY = 0,
  rShoulderY = 0;

function step(timestamp) {
  detectFrame().then((p) => {
    NoseX = p.keypoints[0].position.x; //Because we have flipped the image for mirror effect  we take oppsit sides
    NoseY = p.keypoints[0].position.y;

    lWristX = p.keypoints[10].position.x;
    lWristY = p.keypoints[10].position.y;

    lElbowX = p.keypoints[8].position.x;
    lElbowY = p.keypoints[8].position.y;

    lShoulderX = p.keypoints[6].position.x;
    lShoulderY = p.keypoints[6].position.y;

    rWristX = p.keypoints[9].position.x;
    rWristY = p.keypoints[9].position.y;

    rElbowX = p.keypoints[7].position.x;
    rElbowY = p.keypoints[7].position.y;

    rShoulderX = p.keypoints[5].position.x;
    rShoulderY = p.keypoints[5].position.y;

    NeckX = (lShoulderX + rShoulderX) / 2;
    NeckY = (lShoulderY + rShoulderY) / 2;

    //console.log(NoseX)
    noseCircle.style.left =700// `${640 - lWristX}px`;
    noseCircle.style.top =900// `${lWristY}px`;

    //console.log("Tensorf flow x " + (640 - lWristX) + " y " + lWristY )
  });
  window.requestAnimationFrame(step);
}
//window.requestAnimationFrame(step);
