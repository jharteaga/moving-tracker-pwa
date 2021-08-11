const plusBtn = document.querySelector('.plusBtn');
const saveBtn = document.querySelector('.save-btn');

let num = 0;

const createEl = (
  parent,
  el,
  className,
  className2,
  moveTo,
  desc,
  month,
  day,
  year
) => {
  const createDiv = document.createElement(el);
  createDiv.classList.add(className);
  createDiv.classList.add(className2);
  createDiv.innerHTML = `<h2>Moving to</h2><h1 class="place">${moveTo}</h1>
    <div>
    <p class="desc">${desc}</p><p class="date-p">${month} ${day}, ${year}</p>
    </div>
    <div class="exM-cards">
    <i class="fak fa-feather-edit-2" data-bs-toggle="modal"  data-bs-target="#edit-modal"></i>
    <i class="fak fa-delete" data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
    
    
    </div>`;
  parent.appendChild(createDiv);
};

saveBtn.addEventListener('click', () => {
  const newMovesInp = document.querySelectorAll('.newMovesInp');
  const titleInp = newMovesInp[0].value;
  const descInp = newMovesInp[1].value;
  const fromInp = newMovesInp[2].value;
  const toInp = newMovesInp[3].value;
  const dateInp = newMovesInp[4].value;

  const exMain = document.querySelector('.existing-main');

  const d = new Date(dateInp);
  const month = d.toLocaleString('default', { month: 'long' });
  console.log(d);
  createEl(
    exMain,
    'div',
    'ex-movings',
    `ex${num}`,
    titleInp,
    descInp,
    month,
    d.getDate(),
    d.getFullYear()
  );

  const modalDeleteBtn = document.querySelector('.modalDeleteBtn');
  const deleteIcon = document.querySelectorAll('.fa-delete');

  deleteIcon[deleteIcon.length - 1].addEventListener('click', () => {
    console.log(deleteIcon.length - 1);
    modalDeleteBtn.addEventListener('click', () => {
      const cards = document.querySelectorAll('.ex-movings');
      const deleteIcon = document.querySelectorAll('.fa-delete');

      if (cards.length) {
        cards[deleteIcon.length - 1].remove();
      }
      console.log('A');
    });
  });

  //edit
  const editBtn = document.querySelectorAll('.fa-feather-edit-2');

  editBtn[editBtn.length - 1].addEventListener('click', () => {
    const index = editBtn.length - 1;
    editBtn[editBtn.length - 1].classList.add(`active`);
  });

  num += 1;
});

const saveEditBtn = document.querySelector('.save-btn-edit');
console.log('outside');

saveEditBtn.addEventListener('click', () => {
  console.log('inside');
  const editBtn = document.querySelector('.active');
  const newMovesInpEdit = document.querySelectorAll('.newMovesInpEdit');
  const editTitleInp = newMovesInpEdit[0].value;
  const editDescInp = newMovesInpEdit[1].value;
  const editFromInp = newMovesInpEdit[2].value;
  const editToInp = newMovesInpEdit[3].value;
  const editDateInp = newMovesInpEdit[4].value;

  const d = new Date(editDateInp);
  const month = d.toLocaleString('default', { month: 'long' });

  const card = editBtn.parentElement.parentElement;
  const titleEdited = card.children[1];
  const descEdited = card.children[2];
  const fromEdited = card.children[3];
  const toEdited = card.children[4];
  const dateEdited = card.children[5];
  console.log(editTitleInp, newMovesInpEdit[0]);

  titleEdited.innerHTML = editTitleInp;
  descEdited.innerHTML = editDescInp;
  fromEdited.innerHTML = editFromInp;
  toEdited.innerHTML = editToInp;
  dateEdited.innerHTML = month;

  editBtn.classList.remove('active');
});
