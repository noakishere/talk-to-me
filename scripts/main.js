const pContainer = document.querySelector(".paragraph-container");

let textDialogues;
var dialogueIndex = 0;

function dialogueModel(dialogueJSON) {
	this.text = dialogueJSON.text;
	this.options = dialogueJSON.options || null;
	this.sound = dialogueJSON.sound || null;
	this.cssClass = dialogueJSON.cssClass || null;

	let paragraphDIV = document.createElement("div");
	// add class TODO

	let paragraph = document.createElement("p");
	if (this.cssClass) {
		paragraph.classList.add(this.cssClass);
	}

	if (this.sound) {
		var howlerSound = new Howl({
			src: dialogueJSON.sound,
		});

		howlerSound.play();
	}

	paragraph.textContent = this.text;

	paragraphDIV.appendChild(paragraph);

	pContainer.appendChild(paragraphDIV);
}

function startMe() {
	// console.log(new dialogueModel(textDialogues[1]));
	// let firstParagraph = document.createElement("div");

	// firstParagraph.innerHTML = textDialogues[dialogueIndex].text;
	// firstParagraph.classList.add("text-paragraph");

	// pContainer.appendChild(firstParagraph);
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
readTextFile("jtm/assets/dialogues/dialogue.json", function (text) {
	textDialogues = JSON.parse(text);
	console.log(textDialogues);
});
