export default class Card {
  constructor(title, id) {
    this.#createElement(title, id);
  }

  #createElement(title, id) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.textContent = title;
    card.setAttribute('id', id);

    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('card_deleteIcon');

    card.appendChild(deleteIcon);

    this._element = card;
  }

  get element() {
    return this._element;
  }
}