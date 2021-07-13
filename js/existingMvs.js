//Existing and new moves

//modal

const plusIcon = document.querySelector('.plus-icon');
const modalHidden = document.querySelector('.modal-hidden');
const maskHidden = document.querySelector('.maskForModal-hidden');
const saveBtn = document.querySelector('.saveBtn');
const main = document.querySelector('.existing-main');
const modal_delete_hidden = document.querySelector('.modal-delete-mask-hidden');
const modal_delete = document.querySelector('.modal-delete-mask');

let existingMvs = [];

class NewMoves {
    constructor(title, desc, from, to, date, id) {
        this.title = title;
        this.desc = desc;
        this.from = from;
        this.to = to;
        this.date = date;
        this.id = id;
    }
}

//toggling classes
const classToggle = (class1, class2, el) => {
    el.classList.toggle(class1);
    el.classList.toggle(class2);
};

createEl = (parent, el, className, className2, className3, text1, text2) => {
    const createDiv = document.createElement(el);
    createDiv.classList.add(className);
    createDiv.classList.add(className2);
    createDiv.innerHTML = `<div class="iconCntn"><i class="fas fa-pencil-alt pencil"></i><i class="fas fa-times-circle cross ${className3}"></i></div><h2>${text1}</h2><p>${text2}</p>`;
    parent.appendChild(createDiv);
};

plusIcon.addEventListener('click', () => {
    classToggle('maskForModal-hidden', 'maskForModal', maskHidden);
    classToggle('modal-hidden', 'modal-window-active', modalHidden);
});

const idClass = (id) => {
    return `existing-cntn${id}`;
};
let id = 0;

saveBtn.addEventListener('click', () => {
    const newMovesInp = document.querySelectorAll('.newMovesInp');
    const titleInp = newMovesInp[0].value;
    const descInp = newMovesInp[1].value;
    const fromInp = newMovesInp[2].value;
    const toInp = newMovesInp[3].value;
    const dateInp = newMovesInp[4].value;
    const idNow = id + 1;
    const createMoves = new NewMoves(
        titleInp,
        descInp,
        fromInp,
        toInp,
        dateInp,
        idNow
    );
    id = idNow;
    // idClass(id)
    // console.log(idClass(id))

    existingMvs.push(createMoves);

    classToggle('maskForModal-hidden', 'maskForModal', maskHidden);
    classToggle('modal-hidden', 'modal-window-active', modalHidden);

    createEl(
        main,
        'div',
        'ex-cntn',
        `${idClass(id)}`,
        `cross${id}`,
        titleInp,
        descInp
    );
    console.log(existingMvs);
    const cross = document.querySelectorAll('.cross');
    cross[cross.length - 1].addEventListener('click', (event) => {
        classToggle(
            'modal-delete-mask-hidden',
            'modal-delete-mask',
            modal_delete_hidden
        );
        num = event.target.className.replace(/[^0-9]/g, '');
        console.log(num);
        // console.log(event)
    });

    const pencil = document.querySelectorAll('.pencil');
    const editMaskHidden = document.querySelector('.editMaskForModal-hidden');
    const editHidden = document.querySelector('.editModal-hidden');

    pencil[pencil.length - 1].addEventListener('click', () => {
        const editMovesInp = document.querySelectorAll('.editMovesInp');
        classToggle(
            'editMaskForModal-hidden',
            'editMaskForModal',
            editMaskHidden
        );
        classToggle('editModal-hidden', 'editModal-window-active', editHidden);
        console.log(pencil.length - 1);

        const index = pencil.length - 1;

        editMovesInp[0].value = existingMvs[index].title;
        editMovesInp[1].value = existingMvs[index].desc;
        editMovesInp[2].value = existingMvs[index].from;
        editMovesInp[3].value = existingMvs[index].to;
        editMovesInp[4].value = existingMvs[index].date;
    });
});

const editSave = document.querySelector('.editSaveBtn');

editSave.addEventListener('click', () => {
    console.log('edit');
    const editMovesInp = document.querySelectorAll('.editMovesInp');
    const pencil = document.querySelectorAll('.pencil');
    const index = pencil.length - 1;
    existingMvs[index].title = editMovesInp[0].value;
    existingMvs[index].desc = editMovesInp[1].value;
    existingMvs[index].from = editMovesInp[2].value;
    existingMvs[index].to = editMovesInp[3].value;
    existingMvs[index].date = editMovesInp[4].value;
    const editModalWindow = document.querySelector('.editModal-window-active');
    const editMastModal = document.querySelector('.editMaskForModal');
    classToggle('editMaskForModal-hidden', 'editMaskForModal', editMastModal);
    classToggle('editModal-hidden', 'editModal-window-active', editModalWindow);

    const a = document.querySelector(`.existing-cntn${index + 1} h2`);
    const b = document.querySelector(`.existing-cntn${index + 1} p`);

    a.innerHTML = existingMvs[index].title;
    b.innerHTML = existingMvs[index].desc;
});

const cancelBtn = document.querySelector('.cancel');
cancelBtn.addEventListener('click', () => {
    classToggle(
        'modal-delete-mask-hidden',
        'modal-delete-mask',
        modal_delete_hidden
    );
    // console.log("hello")
});

let num;

const deleteBtn = document.querySelector('.delete');

deleteBtn.addEventListener('click', (event, itemNumber) => {
    itemNumber = num;
    classToggle(
        'modal-delete-mask-hidden',
        'modal-delete-mask',
        modal_delete_hidden
    );
    console.log(itemNumber);
    const exCn = document.querySelector(`.existing-cntn${itemNumber}`);
    // console.log(exCn)
    exCn.remove();
});
