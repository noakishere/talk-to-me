const pContainer = document.querySelector(".paragraph-container");

let textDialogues;
var dialogueIndex = 0;

var backgroundMusic = new Howl({
	src: ["./assets/songs/Traverse.mp3"],
	loop: true,
	volume: 0.5,
	rate: 2.0,
});

// backgroundMusic.play();

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
	paragraphID = `p${dialogueIndex}`;
	paragraph.classList.add(paragraphID);

	if (this.cssClass) {
		if (Array.isArray(this.cssClass)) {
			this.cssClass.forEach((newClass) => {
				paragraph.classList.add(newClass);
			});
		} else {
			paragraph.classList.add(this.cssClass);
		}
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
			newButton.classList.add("startButton");

			newButton.addEventListener("click", function () {
				let newP = new dialogueModel(textDialogues[dialogueIndex]);
				this.style.display = "none";
				dialogueIndex++;
			});

			buttonContainer.appendChild(newButton);
		});

		paragraphDIV.appendChild(buttonContainer);
	} else if (this.options == null && dialogueIndex < textDialogues.length - 1) {
		console.log(
			`${dialogueIndex} is dialogueIndex and ${textDialogues.length} is array length`
		);
		let buttonContainer = document.createElement("div");
		buttonContainer.classList.add("buttonContainer");

		var newButton = document.createElement("button");
		newButton.textContent = "continue";
		newButton.classList.add("startButton");

		newButton.addEventListener("click", function () {
			let newP = new dialogueModel(textDialogues[dialogueIndex]);
			this.style.display = "none";
			dialogueIndex++;
		});

		buttonContainer.appendChild(newButton);
		paragraphDIV.appendChild(buttonContainer);
	} else if (
		this.options == null &&
		dialogueIndex == textDialogues.length - 1
	) {
		let buttonContainer = document.createElement("div");
		buttonContainer.classList.add("buttonContainer");

		var newButton = document.createElement("button");
		newButton.textContent = "the end.";
		newButton.classList.add("startButton");

		newButton.addEventListener("click", function () {
			window.open("pages/about.html", "_blank");
		});

		buttonContainer.appendChild(newButton);
		paragraphDIV.appendChild(buttonContainer);
	}

	pContainer.appendChild(paragraphDIV);

	if (this.cssClass && this.cssClass.includes("right")) {
		anime({
			targets: `.${paragraphID}`,
			translateX: 250,
			easing: "easeOutExpo",
			duration: 2000,
			delay: 500,
		});
	} else if (this.cssClass && this.cssClass.includes("left")) {
		anime({
			targets: `.${paragraphID}`,
			translateX: -250,
			easing: "easeOutExpo",
			duration: 2000,
			delay: 500,
		});
	}
}

// Main start function
function startMe() {
	anime({
		targets: ".paragraph-container",
		backgroundColor: "#d8d8d8",
		easing: "easeOutExpo",
	});

	document.querySelector(".startButton").style.display = "none";
	let newP = new dialogueModel(textDialogues[dialogueIndex]);
	dialogueIndex++;
}

function checkMediaQuery() {}

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
	console.log(textDialogues.length);
	console.log(textDialogues);
});
