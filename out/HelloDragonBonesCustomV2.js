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
  function HelloDragonBonesCustom(resourceData) {
    var _this = _super.call(this) || this;
    console.log(resourceData.data.skeJson);
    _this._resources.push(
      resourceData.data.skeJson,
      resourceData.data.texJson,
      resourceData.data.texPng
    );
    _this.resourceData = resourceData;
    return _this;
  }

  HelloDragonBonesCustom.prototype._onStart = function () {
    var factory = dragonBones.PixiFactory.factory;

    factory.parseDragonBonesData(
      this._pixiResources[this.resourceData.data.skeJson].data
    );
    factory.parseTextureAtlasData(
      this._pixiResources[this.resourceData.data.texJson].data,
      this._pixiResources[this.resourceData.data.texPng].texture
    );
    var armatureDisplay = factory.buildArmatureDisplay("Armature", "YShirt4");
    armatureDisplay.animation.play("animtion0");
    armatureDisplay.x = -25;
    armatureDisplay.y = 0;
    this.effectSlot = armatureDisplay.armature.getBone("neck");
    this.effectSlot.offset.scaleX = 3.5;
    this.effectSlot.offset.scaleY = 3.5;

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
    this.myCircle.lineStyle(2, 0x9933ff);
    this.myCircle.beginFill(0xcc33ff);

    // params: pos x, pos y, radius
    this.myCircle.drawCircle(0, 0, 25);

    this.myCircle.endFill();

    // Add PIXI Graphics object to the PixiJS stage
    this.addChild(this.myCircle);
    this.myCircle.x = 600

      // Create PIXI Text object
    this.myText = new PIXI.Text('X Value:', { fill: 0xFF00FF, fontSize: 55 });

    // Position the text
    this.myText.x = 720;  // Adjust the x position as needed
    this.myText.y = 0;    // Adjust the y position as needed

    // Add PIXI Text object to the PixiJS stage
    this.addChild(this.myText);
    

    PIXI.ticker.shared.add(this._enterFrameHandler, this);
  };
  HelloDragonBonesCustom.prototype._enterFrameHandler = function (deltaTime) {
    this.effectSlot.offset.x = xOffset - NeckX;
    this.effectSlot.offset.y = NeckY - yOffset;

    // let leftWrist =  // this 200 is arbitary suposed to be 320 but this works
   this.left_wrist.offset.x = xOffset - lWristX;
   this.left_wrist.offset.y = lWristY - yOffset;

   
    this.left_elbow.offset.x = xOffset - lElbowX;
    this.left_elbow.offset.y = lElbowY - yOffset;

    this.left_shoulder_joint.offset.x = xOffset - lShoulderX;
    this.left_shoulder_joint.offset.y = lShoulderY - yOffset;

   this.right_wrist.offset.x = 200 - rWristX;
   this.right_wrist.offset.y = rWristY - 300;
    
  this.right_elbow.offset.x = xOffset - rElbowX;
  this.right_elbow.offset.y = rElbowY - yOffset;

    this.right_shoulder_joint.offset.x = xOffset - rShoulderX;
    this.right_shoulder_joint.offset.y = rShoulderY - yOffset;

    // this.myCircle.x =   xOffset - lShoulderX; 
    // this.myCircle.y =lShoulderY - yOffset; 

    // this.myText.x = xOffset - rShoulderX; 
    // this.myText.y = rShoulderY -yOffset; 
    // this.myText.text = resRecived //  Math.trunc(720 - rShoulderX);

    // console.log("Lwrist y is  " + this.left_wrist.offset.y ) ;
  };
  return HelloDragonBonesCustom;
})(BaseDemo);

var Net;
var greenCircle, redCircle;
const video = document.createElement("video");
var resRecived ;
var xOffset =480 , yOffset = 640 ;
// Wrap your code in DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  
  const container = document.createElement("div"); // Container to center the video
  
  // Set up video element
  //video.height = 640;
  video.style.transform = "scaleX(-1)";
  video.style.border = "5px solid red";
  video.addEventListener("click", detectFrame);

  // Set up container styles
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, 0)"; // Center the container
  container.style.zIndex = "-1";

  // Add video to the container
  container.appendChild(video);
  document.body.appendChild(container);

  // Function to update video size and position
  function updateVideoSizeAndPosition() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate the desired video width based on the aspect ratio of the video
      const videoAspectRatio = 16 / 9; // Assuming 16:9 aspect ratio
      let videoWidth = windowWidth;
      let videoHeight = windowWidth / videoAspectRatio;

      // If the calculated height is greater than the window height, adjust the width
      if (videoHeight > windowHeight) {
          videoHeight = windowHeight;
          videoWidth = windowHeight * videoAspectRatio;
      }

      // Update video styles
      video.style.width = videoWidth + "px";
     video.style.height = videoHeight + "px";

     video.width = videoWidth;
     video.height = videoHeight;


     xOffset = videoWidth/2
     yOffset = videoHeight/2 

     // video.style.width = 1280 + "px";
     //video.style.height = 720 + "px";
  
  }

  // Update video size and position initially and on window resize
  updateVideoSizeAndPosition();
  window.addEventListener("resize", updateVideoSizeAndPosition);
 

  const constraints = {
    video: {
      width: { ideal: 1280 }, //this is opposite in mobile potraite mode.
      height: { ideal: 960 }
    }
  };


  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

    const videoTrack = stream.getVideoTracks()[0];

    // Check the settings of the video track
    const settings = videoTrack.getSettings();
    console.log("avaialble tracks " + stream.getVideoTracks().length)
    
    // Log the requested and actual resolutions
    
    console.log('Actual Resolution:', settings.width, 'x', settings.height);
    resRecived =  settings.width+ 'x' + settings.height
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

  greenCircle = document.createElement("div");
  greenCircle.setAttribute(
    "style",
    "background-color:green; width:20px; height:20px; position:absolute; z-index:1000; border-radius:50%"
  );
  document.body.appendChild(greenCircle);

  redCircle = document.createElement("div");
  redCircle.setAttribute(
    "style",
    "background-color:blue; width:20px; height:20px; position:absolute; z-index:1000; border-radius:50%"
  );
  document.body.appendChild(redCircle);
  window.requestAnimationFrame(step);
});

async function detectFrame() {
  if (Net == null) {
    //console.log("Posenet not loaded");
    return;
  }
  var pose = await Net.estimateSinglePose(video);
  return new Promise((resolve) => {
    resolve(pose);
  });
}

let NoseX = 0;
let NoseY = 0;

let NeckX = 0,
  lastNeckX = 0;
let NeckY = 0,
  lastNeckY = 0;

let lWristX = 0,
  lastLwristX = 0,
  lElbowX = 0,
  lastLElbowX = 0,
  lShoulderX = 0,
  lastLShoulderX = 0;

let lWristY = 0,
  lastLwristY = 0,
  lElbowY = 0,
  lastLElbowY = 0,
  lShoulderY = 0,
  lastLShoulderY = 0;

let rWristX = 0,
  lastRWristX = 0,
  rElbowX = 0,
  lastRElbowX = 0,
  rShoulderX = 0,
  lastRShoulderX = 0;
let rWristY = 0,
  lastRWristY = 0,
  rElbowY = 0,
  lastRElbowY = 0,
  rShoulderY = 0,
  lastRShoulderY = 0;

function step(timestamp) {
  detectFrame().then((p) => {
    NoseX = p.keypoints[0].position.x; //Because we have flipped the image for mirror effect  we take oppsit sides
    NoseY = p.keypoints[0].position.y;

    //console.log("Elbow Score " +  p.keypoints[10].score)

    // Left Shoulder ------------
    if (p.keypoints[6].score > 0.5) {
      if (Math.abs(p.keypoints[6].position.x - lastLShoulderX) > 10) {
        lShoulderX = lShoulderX + (p.keypoints[6].position.x - lShoulderX) / 16;

        lastLShoulderX = lShoulderX;
      }

      if (Math.abs(p.keypoints[6].position.y - lastLShoulderY) > 10) {
        lShoulderY = lShoulderY + (p.keypoints[6].position.y - lShoulderY) / 16;
        lastLShoulderY = lShoulderY;
      }
    }

    // Right Shoulder -
    if (p.keypoints[5].score > 0.5) {
      if (Math.abs(p.keypoints[5].position.x - lastRShoulderX) > 10) {
        rShoulderX = rShoulderX + (p.keypoints[5].position.x - rShoulderX) / 16;

        lastRShoulderX = rShoulderX;
      }

      if (Math.abs(p.keypoints[5].position.y - lastRShoulderY) > 10) {
        rShoulderY = rShoulderY + (p.keypoints[5].position.y - rShoulderY) / 16;
        lastRShoulderY = lShoulderY;
      }
    }
    //Neck
    if (p.keypoints[6].score > 0.5 && p.keypoints[5].score) {
      if (Math.abs((lShoulderX + rShoulderX) / 2 - lastNeckX) > 5) {
        lastNeckX = NeckX;
        lastNeckY = NeckY;

        NeckX = (lShoulderX + rShoulderX) / 2;
        NeckY = (lShoulderY + rShoulderY) / 2;
      }
    }

    //Left Elbow
    if (p.keypoints[8].score > 0.5) {
      if (Math.abs(p.keypoints[8].position.x - lastLElbowX) > 10) {
        lElbowX = lElbowX + (p.keypoints[8].position.x - lElbowX) / 16;
        lastLElbowX = lElbowX;
      }

      if (Math.abs(p.keypoints[8].position.y - lastLElbowY) > 10) {
        lElbowY = lElbowY + (p.keypoints[8].position.y - lElbowY) / 16;
        lastLElbowY = lElbowY;
      }
    }

    //Left Wrist ------------------------------
    // console.log(
    //   "L W Pos  " +
    //     Math.trunc(p.keypoints[10].position.x) +
    //     " " +
    //     Math.trunc(p.keypoints[10].position.y) +
    //     " " +
    //     p.keypoints[10].score
    // );
    if (p.keypoints[10].score > 0.2) {
      if (
        Math.abs(p.keypoints[10].position.x - lastLwristX) > 10 &&
        Math.abs(p.keypoints[10].position.x - lastLwristX) < 1000
      ) {
        lWristX = lWristX + (p.keypoints[10].position.x - lWristX) / 16;
        lastLwristX = lWristX;
      }

      if (
        Math.abs(p.keypoints[10].position.y - lastLwristY) > 10 &&
        Math.abs(p.keypoints[10].position.x - lastLwristX) < 1000
      ) {
        lWristY = lWristY + (p.keypoints[10].position.y - lWristY) / 16;
        lastLwristY = lWristY;
      }

      // redCircle.style.left = `${lWristX}px`;
      // redCircle.style.top = `${lWristY}px`;
    }

    //Right Elbow------------
    if (p.keypoints[7].score > 0.5) {
      if (Math.abs(p.keypoints[7].position.x - lastRElbowX) > 10) {
        rElbowX = rElbowX + (p.keypoints[7].position.x - lastRElbowX) / 16;
        lastRElbowX = rElbowX;
      }
      if (Math.abs(p.keypoints[7].position.y - lastRElbowY) > 10) {
        rElbowY = rElbowY + (p.keypoints[7].position.y - lastRElbowY) / 16;
        lastRElbowY = rElbowY;
      }
    }

    //Right Wrist --------------

    if (p.keypoints[9].score > 0.7) {
      if (Math.abs(p.keypoints[9].position.x - lastRWristX) > 10) {
        rWristX = rWristX + (p.keypoints[9].position.x - rWristX) / 16;
        lastRWristX = rWristX;
      }
      if (Math.abs(p.keypoints[9].position.y - lastRWristY) > 10) {
        rWristY = rWristY + (p.keypoints[9].position.y - rWristY) / 16;
        lastRWristY = rWristY;
      }

      // greenCircle.style.left = `${rWristX}px`;
      // greenCircle.style.top = `${rWristY}px`;
    }
    //console.log(NoseX)

    //console.log("Tensorf flow x " + (640 - lWristX) + " y " + lWristY )
  });
  window.requestAnimationFrame(step);
}
//window.requestAnimationFrame(step);
