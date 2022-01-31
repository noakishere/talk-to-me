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

const fadeInClassName = "fadein-element";
const fadeOutClassName = "fadeout-element";

// Dom elements
// const answerP = document.getElementById("result");
const answerP = document.querySelector(".result");

let capture;

let index = 0;

function setup() {
	// Canvas Setup
	var myCanvas = createCanvas(600, 350);
	myCanvas.parent("canvasContainer");
	capture = createCapture(VIDEO);
	capture.size(320, 240);
	capture.hide();

	speechRecProcess();
}

function draw() {
	background(255);
	image(capture, 0, 0, 600, 350);
	filter(INVERT);
}

function speechRecProcess() {
	// Speech rec
	let lang = navigator.language || "en-US";
	let speechRec = new p5.SpeechRec(lang, gotSpeech);

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
