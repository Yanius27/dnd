export default class Container {
  constructor() {
    this.#createElement();
  }

  #createElement() {
    const container = document.createElement('div');
    container.classList.add('container');

    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('column');
    toDoDiv.classList.add('toDo');

    const toDoDivHeader = document.createElement('div');
    toDoDivHeader.classList.add('column_header');
    toDoDiv.appendChild(toDoDivHeader);

    const toDoDivTitle = document.createElement('span');
    toDoDivTitle.classList.add('column_title');
    toDoDivTitle.textContent = 'TODO';
    toDoDivHeader.appendChild(toDoDivTitle);

    const toDoColSettings = document.createElement('span');
    toDoColSettings.classList.add('column_settings');
    toDoColSettings.textContent = '...';
    toDoDivHeader.appendChild(toDoColSettings);

    const toDoDivTasks = document.createElement('div');
    toDoDivTasks.classList.add('column_tasks');
    toDoDiv.appendChild(toDoDivTasks);

    const toDoDivFooter = document.createElement('div');
    toDoDivFooter.classList.add('column_footer');
    toDoDiv.appendChild(toDoDivFooter);
    const toDoDivFooterSpan = document.createElement('span');
    toDoDivFooterSpan.classList.add('column_footer-span');
    toDoDivFooterSpan.textContent = '+ Add another card';
    toDoDivFooter.appendChild(toDoDivFooterSpan);




    const inProgressDiv = document.createElement('div');
    inProgressDiv.classList.add('column');
    inProgressDiv.classList.add('inProgress');

    const inProgressDivHeader = document.createElement('div');
    inProgressDivHeader.classList.add('column_header');
    inProgressDiv.appendChild(inProgressDivHeader);

    const inProgressDivTitle = document.createElement('span');
    inProgressDivTitle.classList.add('column_title');
    inProgressDivTitle.textContent = 'IN PROGRESS';
    inProgressDivHeader.appendChild(inProgressDivTitle);

    const inProgressColSettings = document.createElement('span');
    inProgressColSettings.classList.add('column_settings');
    inProgressColSettings.textContent = '...';
    inProgressDivHeader.appendChild(inProgressColSettings);

    const inProgressDivTasks = document.createElement('div');
    inProgressDivTasks.classList.add('column_tasks');
    inProgressDiv.appendChild(inProgressDivTasks);

    const inProgressDivFooter = document.createElement('div');
    inProgressDivFooter.classList.add('column_footer');
    inProgressDiv.appendChild(inProgressDivFooter);
    const inProgressDivFooterSpan = document.createElement('span');
    inProgressDivFooterSpan.classList.add('column_footer-span');
    inProgressDivFooterSpan.textContent = '+ Add another card';
    inProgressDivFooter.appendChild(inProgressDivFooterSpan);





    const doneDiv = document.createElement('div');
    doneDiv.classList.add('column');
    doneDiv.classList.add('done');

    const doneDivHeader = document.createElement('div');
    doneDivHeader.classList.add('column_header');
    doneDiv.appendChild(doneDivHeader);

    const doneDivTitle = document.createElement('span');
    doneDivTitle.classList.add('column_title');
    doneDivTitle.textContent = 'DONE';
    doneDivHeader.appendChild(doneDivTitle);

    const doneColSettings = document.createElement('span');
    doneColSettings.classList.add('column_settings');
    doneColSettings.textContent = '...';
    doneDivHeader.appendChild(doneColSettings);

    const doneDivTasks = document.createElement('div');
    doneDivTasks.classList.add('column_tasks');
    doneDiv.appendChild(doneDivTasks);

    const doneDivFooter = document.createElement('div');
    doneDivFooter.classList.add('column_footer');
    doneDiv.appendChild(doneDivFooter);
    const doneDivFooterSpan = document.createElement('span');
    doneDivFooterSpan.classList.add('column_footer-span');
    doneDivFooterSpan.textContent = '+ Add another card';
    doneDivFooter.appendChild(doneDivFooterSpan);




    container.appendChild(toDoDiv);
    container.appendChild(inProgressDiv);
    container.appendChild(doneDiv);

    this._element = container;
  }

  get element() {
    return this._element;
  }
}