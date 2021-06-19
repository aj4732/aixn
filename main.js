song = "";
song2="";
leftwristX=0;
leftwristY=0;
rightWristX=0;
rightWristY=0;
score_leftwrist=0;
score_rightwrist=0;
song_name="";
song_name2="";
function preload()
{
	song = loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is initialized");
}
function draw() {
	image(video, 0, 0, 600, 500);
    fill("#FF0000");
	stroke("#FF0000");
   
  song_name=song.isPlaying();
    if(score_leftwrist>0.2){
        circle(leftwristX,leftwristY,20);
        song2.stop();
        if(song_name=="false"){
          song.play();
          document.getElementById("speed").innerHTML="Song name=Harry potter theme song";
        }
    }
    song_name2=song2.isPlaying();
    if(score_rightwrist>0.2){
        circle(rightWristX,rightWristY,20);
        song.stop();
        if(song_name2=="false"){
          song2.play();
          document.getElementById("speed").innerHTML="Song name=Peter Pan song";
        }
    }
}
function play()
{
	song.play();
    song.setVolume(1);
    song.rate(1);
}


function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
   leftwristY=results[0].pose.leftWrist.y;
   console.log("leftWristX="+leftwristX+"leftWristY="+leftwristY);
  rightWristX=results[0].pose.rightWrist.x;
  rightWristY=results[0].pose.rightWrist.y;
   console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
   score_leftwrist=results[0].pose.leftWrist.confidence;
   console.log(score_leftwrist);
   score_rightwrist=results[0].pose.rightWrist.confidence;
   console.log(score_rightwrist);
    }     
}