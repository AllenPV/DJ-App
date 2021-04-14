scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song = "";

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    Canvas = createCanvas(400, 400);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model is loaded");
}

function draw() {
    image(Video, 0, 0, 400, 400);
    fill("#ff0000")
    stroke("#ff0000");
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
    }
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    } 
}
if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY = Number(leftWristY);
    newLeftWristY = floor(InNumberLeftWristY*2);
    leftWristY_Divide = newLeftWristY/1000;
    document.getElementById("volume").innerHTML = "volume = "+leftWristY_Divide;
    song.setVolume(leftWristY_Divide);
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}



function Play() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}