
// change this values for session variables
const idMoving= "7lI4hu7cuqmurPqSFa72";
const idBox = "xtV5zrXtZcuN33KHxF2l";  
// /movings/7lI4hu7cuqmurPqSFa72/boxes/xtV5zrXtZcuN33KHxF2l
/********************************/
/* Display Box Name */
/********************************/

let boxContent = new Box();
boxContent.getBox(idMoving,idBox).then(box => {
    const boxNameDisplay = document.getElementById("boxNameDisplay");
    boxNameDisplay.innerHTML = box.name;
});


// ***********************************************
//Print items from firebase
//************************************************
boxContent.getItems(idMoving,idBox).then(items => {
    printItems(items);
});

/*detecting change in breakpoint to change edit box modal size*/
/************************************************************** */
let resizeModal = new ResizeModal(900,idItemModalDialog)

resizeModal.onLoad();
resizeModal.onScreenSizeChange();

/************************************************************** */









/*
// Elements for taking the snapshot
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);

document.getElementById("start").addEventListener("click", function () {
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		// Not adding `{ audio: true }` since we only want video now
		navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
			//video.src = window.URL.createObjectURL(stream);
			video.srcObject = stream;
			// video.play();  // or autplay
		});
	} else {
		console.log("media devices not available in this browser");
	}

});
*/