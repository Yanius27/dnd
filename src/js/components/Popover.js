export default class Popover {
  constructor() {
    this.#createElement();
  }

  #createElement() {
    const popover = document.createElement('div');
    popover.classList.add('popover');
 
    const titleInput = document.createElement('input');
    titleInput.classList.add('titleInput');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Enter a title for this card...');

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('iconsContainer');

    const addButton = document.createElement('button');
    addButton.classList.add('addBtn');
    addButton.textContent = 'Add Card';

    const closeIcon = document.createElement('div');
    closeIcon.classList.add('closeIcon');

    const popoverSettings = document.createElement('span');
    popoverSettings.classList.add('popover_settings');
    popoverSettings.textContent = '...';

    iconsContainer.appendChild(addButton);
    iconsContainer.appendChild(closeIcon);
    iconsContainer.appendChild(popoverSettings);
    popover.appendChild(titleInput);
    popover.appendChild(iconsContainer);

    this._element = popover;
  }

  get element() {
    return this._element;
  }
}