const pContainer = document.querySelector(".paragraph-container");

let textDialogues;
var dialogueIndex = 0;

var backgroundMusic = new Howl({
	src: ["./assets/songs/Traverse.mp3"],
	loop: false,
	volume: 0.5,
	rate: 2.0,
});

// howlerSound.play();

function dialogueModel(dialogueJSON) {
	this.text = dialogueJSON.text;
	this.options = dialogueJSON.options || null;
	this.sound = dialogueJSON.sound || null;
	this.cssClass = dialogueJSON.cssClass || null;
	this.image = dialogueJSON.image || null;

	let paragraphDIV = document.createElement("div");
	// add class TODO

	// Process paragraph
	let paragraph = document.createElement("p");
	if (this.cssClass) {
		paragraph.classList.add(this.cssClass);
	}

	paragraph.innerHTML = this.text;

	// Process sound to play
	if (this.sound) {
		var howlerSound = new Howl({
			src: dialogueJSON.sound,
			volume: 0.25,
			loop: false,
		});

		// howlerSound.play();
	}

	// Process image
	if (this.image) {
		let imageElement = document.createElement("img");
		imageElement.src = dialogueJSON.image;
		imageElement.classList.add("fadein-element");
		paragraphDIV.appendChild(imageElement);
	}

	paragraphDIV.appendChild(paragraph);

	// Process buttons
	if (this.options) {
		let buttonContainer = document.createElement("div");
		buttonContainer.classList.add("buttonContainer");

		this.options.forEach((option) => {
			var newButton = document.createElement("button");
			newButton.textContent = option;
			buttonContainer.appendChild(newButton);
		});

		paragraphDIV.appendChild(buttonContainer);
	}

	pContainer.appendChild(paragraphDIV);
}

function startMe() {
	// console.log(new dialogueModel(textDialogues[1]));
	// let firstParagraph = document.createElement("div");

	// firstParagraph.innerHTML = textDialogues[dialogueIndex].text;
	// firstParagraph.classList.add("text-paragraph");

	// pContainer.appendChild(firstParagraph);
	pContainer.style.display = "block";
	let newP = new dialogueModel(textDialogues[dialogueIndex]);
	dialogueIndex++;
}

function processDialogueModel(dm) {
	let dialogueModel = dm;
}

// Load json file
function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

//usage:
readTextFile("./assets/dialogues/dialogue.json", function (text) {
	textDialogues = JSON.parse(text);
	console.log(textDialogues);
});
