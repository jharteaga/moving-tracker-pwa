
// change this values for session variables
const idMoving= "mPkQ3bczO9EHyBQ2LVSt";
const idBox = "0L4BgcxzedWLa60wi5e7";  
// /movings/7lI4hu7cuqmurPqSFa72/boxes/xtV5zrXtZcuN33KHxF2l
/********************************/
/* Display Box Name */
/********************************/

let boxContent = new Box();
boxContent.getBox(idMoving,idBox).then(box => {
    const boxNameDisplay = document.getElementById("boxNameDisplay");
    boxNameDisplay.innerHTML = box.name;
});

/********************************/
//this function change add item modal title
const changeAddItemModalTitle = (title) => {
	const boxLabelsModalLabel = document.getElementById("boxLabelsModalLabel")
	boxLabelsModalLabel.innerHTML = title
}

/********************************/
//this function clean hidden input storing item id 
const cleanHiddenidInput = () => {
	const iditemSelected = document.getElementById("iditemSelected")
	iditemSelected.value = ""
}

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

/*show modal message */
const showModalMsg = (msg) =>{
	const idlblMsg = document.getElementById("idlblMsg")
	idlblMsg.innerHTML=msg
		let myModal = new bootstrap.Modal(document.getElementById("msgItemModal"));
		myModal.show();
}







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