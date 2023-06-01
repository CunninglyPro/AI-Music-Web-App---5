var minecraft = "";
var harry_potter = "";

var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

var score_of_left_wrist = 0;
var status_of_minecraft = 0;

var score_of_right_wrist = 0;
var status_of_harry_potter = "";

function preload() {
    minecraft = loadSound('Minecraft.mp3');
    harry_potter = loadSound('Harry Potter Theme Song.mp3');
}

function setup() {
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 500);

    status_of_minecraft = minecraft.isPlaying();
    status_of_harry_potter = harry_potter.isPlaying();

    fill('black');
    stroke('purple');

    if(score_of_left_wrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        harry_potter.stop();

        if (status_of_minecraft == false) {
            minecraft.play();
            document.getElementById("song_name").innerHTML = "Song Playing: Minecraft Theme Song";
        }
    }

    if(score_of_right_wrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        minecraft.stop();

        if(status_of_harry_potter == false) {
            harry_potter.play();
            document.getElementById("song_name").innerHTML = "Song Playing: Harry Potter Theme Song"
        }
    }
}

function modelLoaded() {
    console.log("Model is loaded!");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        score_of_left_wrist = results[0].pose.keypoints[9].score;
        score_of_right_wrist = results[0].pose.keypoints[10].score;
    }
}