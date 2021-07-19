/**
 *
 * User and Moving instance declarations
 *
 */

const user = new User();
const moving = new Moving();

user.isLoggedIn(async () => {
    const moving = new Moving(user.userId);
    moving.getMovingsList((snapshot) => {
        moving.getMovingsCollaboratorList(user.email, (snapshotCollab) => {
            movingsArr.length = 0;
            snapshot.forEach((doc) => {
                movingsArr.push(doc);
            });
            snapshotCollab.forEach((docCollab) => {
                movingsArr.push(docCollab);
            });
            // console.log(snapshotCollab);
            renderMovings();
        });
    });
});
/**
 * Movings Options Menu (Toggle plus menu button)
 */

const movingsOutput = document.querySelector(".movings-wrapper");
const movingsArr = [];
const movingsCollabArr = [];

function renderMovings() {
    movingsOutput.innerHTML = "";
    movingsArr.forEach((moving) => {
        console.log("dsfsdffd");
        const movingWrapper = document.createElement("div");
        movingWrapper.classList.add("moving-wrapper");
        movingWrapper.id = moving.id;
        const movingTitleDiv = document.createElement("div");
        movingTitleDiv.classList.add("moving__title");
        movingTitleDiv.innerHTML = `<h3>Moving To</h3><h4><a href="#" class="moving-link" id="link-${
            moving.id
        }">${moving.data().movingTitle}</a></h4>`;
        const movingAddressDiv = document.createElement("div");
        movingAddressDiv.classList.add("moving__address");
        movingAddressDiv.innerHTML = `<p>${moving.data().to}</p>`;
        const movingDateDiv = document.createElement("div");
        movingDateDiv.classList.add("moving__date");
        movingDateDiv.innerHTML = `${moving.data().date}`;
        const movingActions = document.createElement("div");
        movingActions.classList.add("moving__actions");
        movingActions.innerHTML = `
                        <button class="icon button-edit" data-bs-toggle="modal" data-bs-target="#editMovingModal" id="edit-${moving.id}">
                            <span class="fas fa-pencil-alt"></span>
                        </button>
                        <button class="icon button-delete">
                            <span class="fas fa-trash"></span>
                        </button>
                    `;
        movingWrapper.appendChild(movingTitleDiv);
        movingWrapper.appendChild(movingAddressDiv);
        movingWrapper.appendChild(movingDateDiv);
        movingWrapper.appendChild(movingActions);
        movingsOutput.appendChild(movingWrapper);
        addEventListersEdit();
        addEventListersRedirects();
    });
}

// Save Moving Section
const saveMovingBtn = document.querySelector("#createMovingForm");

saveMovingBtn.addEventListener("submit", async (event) => {
    event.preventDefault();
    const movingTitle = document.querySelector("#movingTitle").value;
    const movingDescription =
        document.querySelector("#movingDescription").value;
    const movingFrom = document.querySelector("#movingFrom").value;
    const movingTo = document.querySelector("#movingTo").value;
    const movingDate = document.querySelector("#movingDate").value;
    const moving = new Moving(
        user.userId,
        movingTitle,
        movingDescription,
        movingFrom,
        movingTo,
        movingDate
    );
    await moving.addMovingToDb(user);
});

// End Save Moving Section

// Edit Moving Section

const editMovingTitle = document.querySelector("#editMovingTitle");
const editMovingDescription = document.querySelector("#editMovingDescription");
const editMovingFrom = document.querySelector("#editMovingFrom");
const editMovingTo = document.querySelector("#editMovingTo");
const editMovingDate = document.querySelector("#editMovingDate");

// const saveEditMovingBtn = document.querySelector('#saveEditMovingBtn');
const saveEditMovingBtn = document.querySelector("#editMovingForm");

saveEditMovingBtn.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log(editMovingTitle.value);
    await moving.updateMoving(
        user,
        editMovingTitle.value,
        editMovingDescription.value,
        editMovingFrom.value,
        editMovingTo.value,
        editMovingDate.value
    );
});

function addEventListersEdit() {
    const editButtons = document.querySelectorAll(".button-edit");
    editButtons.forEach((button) => {
        const movingId = button.id.split("-")[1];
        const elem = document.querySelector(`#${button.id}`);
        elem.addEventListener("click", async (event) => {
            editMovingTitle.value = "";
            editMovingDescription.value = "";
            editMovingFrom.value = "";
            editMovingTo.value = "";
            editMovingDate.value = "";
            event.preventDefault();
            await moving.getMovingById(movingId);
            console.log(moving);
            editMovingTitle.value = moving.movingTitle;
            editMovingDescription.value = moving.description;
            editMovingFrom.value = moving.from;
            editMovingTo.value = moving.to;
            editMovingDate.value = moving.date;
            console.log(moving.date);
        });
        // console.log(button.id);
    });
}
// End Edit Moving Section

function addEventListersRedirects() {
    const editButtons = document.querySelectorAll(".moving-link");
    editButtons.forEach((button) => {
        const movingId = button.id.split("-")[1];
        const elem = document.querySelector(`#${button.id}`);
        elem.addEventListener("click", async (event) => {
            event.preventDefault();

            window.sessionStorage.setItem("movingId", movingId);

            window.location.href = "moving-details.html";
        });
        // console.log(button.id);
    });
}
