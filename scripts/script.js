// Constants
const dialogues = [
	{
		acceptedAnswer: "hello",
		dialogueAnswer: "I love you",
	},
	{
		acceptedAnswer: "bye",
		dialogueAnswer: "I love you dude",
	},
];

const JSONPath = "/assets/dialogues/dialogue.json";

const fadeInClassName = "fadein-element";
const fadeOutClassName = "fadeout-element";

// Dom elements
const answerP = document.querySelector(".result");
const canvasContainer = document.querySelector("#canvasContainer");

// SetupElements
let capture;
let speechRec;

let mySong;
let bg;

let isStarted = false;

let index = 0;

function preload() {
    // Sound setup
    // mySong = loadSound("assets/songs/leit.mp3");
}

function setup() {
	// Canvas Setup
	var myCanvas = createCanvas(600, 350);
	myCanvas.parent("canvasContainer");
	
    // Video setup
    
    // Song setup
    // mySong.loop();
    // mySong.setVolume(0.5);
    // mySong.rate(2);

    // Speech input setup
	
}

function draw() {
    
    if(isStarted){
        canvasContainer.style.display = "block";
    }

	background(255);
	if(capture != null){
        image(capture, 0, 0, 600, 350);
    } 
	filter(INVERT);
}

function startMe() {
    isStarted = true;
    setUpVideo();
    speechRecProcess();

    index = 0;

    document.querySelector(".startButton").style.display = "none";
    document.querySelector(".endButton").style.display = "block";
}

function endMe() {
    capture.remove(); // stops webcam
    speechRec.stop();

    isStarted = false;
    canvasContainer.style.display = "none";
    answerP.innerHTML = "";

    document.querySelector(".endButton").style.display = "none";
    document.querySelector(".startButton").style.display = "block";
    document.querySelector(".startButton").innerHTML = "Restart";
}

function setUpVideo() {
    capture = createCapture(VIDEO);
	capture.size(320, 240);
	capture.hide();
}


function speechRecProcess() {
	// Speech rec
	let lang = navigator.language || "en-US";
	speechRec = new p5.SpeechRec(lang, gotSpeech);

	let continous = true;
	let interim = false;
	speechRec.start(continous, interim);

	function gotSpeech() {
		if (speechRec.resultValue && index < dialogues.length && speechRec.resultString.toLowerCase() === dialogues[index].acceptedAnswer.toLowerCase()) {
            
            answerP.innerHTML = dialogues[index].dialogueAnswer;
            
			index++;
		}
		console.log(speechRec);
	}
}



function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("/assets/dialogues/dialogue.json", function(text){
    var data = JSON.parse(text);
    answerP.innerHTML = data[1].text + " " + data[1].answer[0];
    answerP.classList.add(fadeInClassName);
    console.log(data);
});
