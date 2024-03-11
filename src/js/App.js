import Container from './components/Container';
import Card from './components/Card';
import Popover from './components/PopOver';

export default class App {
  constructor() {
    this.storage = localStorage;
    this.cards = {
      toDo: [],
      inProgress: [],
      done: [],
    },
    this.columns = Object.keys(this.cards);
    this.container = new Container();
    this.popover = new Popover();
    this.#drawElements();
    this.actualElement;
    this.shiftX;
    this.shiftY;
    // this.cursorBorder;
    this.#addCardlistener();
    this.#addPopoverListener();
  }

// Сохраняем данные в localStorage
  #setStorage() {
    this.storage.setItem('cards', JSON.stringify(this.cards));
  }

// Возвращаем данные из localStorage
  #getStorage() {
    return JSON.parse(this.storage.getItem('cards'));
  }

// Отрисовываем все элементы на странице
  #drawElements() {
    document.body.appendChild(this.container.element);
    if (this.#getStorage()) {
      this.cards = this.#getStorage();
      this.#clearTasks();
      this.#drawCards();
    }
  }

// Отрисовываем на странице добавленные карты
  #drawCards() { 
    for (let col in this.cards) {
      this.cards[col].forEach((el) => {
        const card = new Card(el.task, el.id).element;
        document.querySelector(`.${col}`).querySelector('.column_tasks').appendChild(card);
      });
    }

    this.#cardsListener();
  }

  #clearTasks() {
    const columns = document.querySelectorAll('.column_tasks');
    [...columns].forEach(el => el.innerHTML = '');
  }

// Коллбэк для обработчика события добавления новой карты 
  #addCard(column) {
    const value = this.popover.element.querySelector('.titleInput').value;
    const id = `${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 10000)}`;
    if (value && value !== '') {
      this.columns.forEach((col) => {
        if (column.classList.contains(col)) {
          this.cards[col].push({
            task: value,
            id: id
          });
        }
      });
      this.#setStorage();
      this.#clearTasks();
      this.#drawCards();
    }  
    this.popover.element.querySelector('.titleInput').value = '';
  }

// Добавляем обработчик событий для кнопок поповера
  #addPopoverListener() {
    this.popover.element.addEventListener('click', (e) => {
      const column = e.target.closest('.column');
      if (e.target.classList.contains('closeIcon')) {
        this.popover.element.previousElementSibling.style.removeProperty('opacity');
        this.popover.element.remove();
      } if (e.target.classList.contains('addBtn')) {
        this.#addCard(column);
        this.popover.element.previousElementSibling.style.removeProperty('opacity');
        this.popover.element.remove();
      }
    });
  }

// Добавляем обработчик событий для '+ Add another card'
  #addCardlistener() {
    const addTasksIcons = this.container.element.querySelectorAll('.column_footer-span');
    [...addTasksIcons].forEach((el) => {
      el.addEventListener('click', (event) => {
        [...addTasksIcons].forEach(elem => elem.style.removeProperty('opacity'));
        event.target.style.opacity = '0';
        el.parentNode.appendChild(this.popover.element);
      });
    });
  }


// Коллбэк для обработчика события mouseup
  #onMouseUp = (e) => {
    this.actualElement.style.display = 'none';

    // this.cursorBorder.style.display = 'none';
    document.body.style.cursor = 'default';

    const mouseUpItem = document.elementFromPoint(e.clientX, e.clientY);

    this.actualElement.style.display = 'flex';

    if (!mouseUpItem || mouseUpItem === document.querySelector('html')) {
      this.actualElement.classList.remove('dragged');
      this.actualElement.remove();

      this.actualElement = undefined;
      document.body.style.cursor = 'default';

      this.#clearTasks();
      this.#drawCards();

      document.documentElement.removeEventListener('mouseup', this.#onMouseUp);
      document.documentElement.removeEventListener('mousemove', this.#onMouseMove);

      return;
    }
    if (mouseUpItem.classList.contains('card')) {
      for (let col in this.cards) {
        this.cards[col] = this.cards[col].filter((el) => el.id !== this.actualElement.id);
      }
      const columnName = mouseUpItem.parentNode.parentNode.className.split(' ')[1];
      const cardsNodes = Array.from(mouseUpItem.parentNode.children);
      this.cards[columnName].splice(cardsNodes.indexOf(mouseUpItem), 0, { task: this.actualElement.textContent, id: this.actualElement.id })
    } else if (mouseUpItem.classList.contains('column_tasks')) {
      for (let col in this.cards) {
        this.cards[col] = this.cards[col].filter((el) => el.id !== this.actualElement.id);
      }
      const columnName = mouseUpItem.parentNode.className.split(' ')[1];
      this.cards[columnName].push({ task: this.actualElement.textContent, id: this.actualElement.id });
    }

    this.actualElement.classList.remove('dragged');
    this.actualElement.remove();

    this.actualElement = undefined;

    this.#setStorage();
    this.#clearTasks();
    this.#drawCards();

    document.documentElement.removeEventListener('mouseup', this.#onMouseUp);
    document.documentElement.removeEventListener('mousemove', this.#onMouseMove);
  }

  
// Коллбэк для обработчика события mouseMove
  #onMouseMove = (e) => {
    this.actualElement.style.left = e.pageX - this.shiftX + 'px'; 
    this.actualElement.style.top = e.pageY - this.shiftY + 'px';

    // this.cursorBorder.style.left = e.pageX - 9 + 'px';
    // this.cursorBorder.style.top = e.pageY - 10 + 'px';
  }


  #cardsListener() {
    const cards = document.querySelectorAll('.card');
    [...cards].forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('card_deleteIcon')) {
          const removeCard = e.target.parentNode;
          for (let col in this.cards) {
            this.cards[col] = this.cards[col].filter((el) => el.id !== removeCard.id);
          }
          this.#setStorage();
          this.#clearTasks();
          this.#drawCards();
        }
      });
    })

    const columnTasks = document.querySelectorAll('.column_tasks');
    [...columnTasks].forEach((elem) => {
      elem.addEventListener('mousedown', (e) => {
        e.preventDefault();

        // const cursorBorders = document.body.querySelectorAll('.cursorBorder');
        // [...cursorBorders].forEach(e => e.remove());
        
        if (e.target.classList.contains('card')) {
          this.actualElement = e.target;

          this.shiftX = e.pageX - this.actualElement.getBoundingClientRect().left;
          this.shiftY = e.pageY - this.actualElement.getBoundingClientRect().top;
          document.body.appendChild(this.actualElement);
          this.actualElement.style.left = e.pageX - this.shiftX + 'px'; 
          this.actualElement.style.top = e.pageY - this.shiftY + 'px';
          this.actualElement.classList.add('dragged');

          document.body.style.cursor = 'grabbing';

          // this.cursorBorder = document.createElement('div');
          // this.cursorBorder.classList.add('cursorBorder');
          // document.body.append(this.cursorBorder);
          // this.cursorBorder.style.display = 'block';
          // this.cursorBorder.style.left = e.pageX - 9 + 'px';
          // this.cursorBorder.style.top = e.pageY - 10 + 'px';

          document.documentElement.addEventListener('mouseup', this.#onMouseUp);
          document.documentElement.addEventListener('mousemove', this.#onMouseMove);
        }
      });
    });
  };
}