let capture;

function setup() {
	// Camera setup
	createCanvas(600, 350);
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
		if (speechRec.resultValue) {
			if (document.getElementById("speechResult") == null) {
				let p = createP(speechRec.resultString);
				p.id("speechResult");
			} else {
				document.getElementById("speechResult").innerHTML =
					speechRec.resultString;
			}
		}
		console.log(speechRec);
	}
}
