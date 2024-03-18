import Container from './components/Container';
import Card from './components/Card';
import Popover from './components/Popover';

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
    document.body.appendChild(this.container.element);
    this.popover = new Popover();
    this.#drawCards();
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

// Отрисовываем на странице добавленные карты
  #drawCards() { 
    if (this.#getStorage()) {
      this.cards = this.#getStorage();
      this.#clearTasks();

      for (let col in this.cards) {
        this.cards[col].forEach((el) => {
          const card = new Card(el.task, el.id).element;
          document.querySelector(`.${col}`).querySelector('.column_tasks').appendChild(card);
        });
      }
    }
    this.#cardsListener();
  }

  #clearTasks() {
    const column = document.querySelectorAll('.column_tasks');
    [...column].forEach(el => el.innerHTML = '');
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

    const mouseUpItem = document.elementFromPoint(e.clientX, e.clientY);

    this.actualElement.style.display = 'flex';
    
    if (mouseUpItem) {
      if (mouseUpItem.classList.contains('card') && !mouseUpItem.classList.contains('placeholder')) {
        for (let col in this.cards) {
          this.cards[col] = this.cards[col].filter((el) => el.id !== this.actualElement.id);
        }
        const columnName = mouseUpItem.parentNode.parentNode.className.split(' ')[1];
        const cardsNodes = Array.from(mouseUpItem.parentNode.children);
        this.cards[columnName].splice(cardsNodes.indexOf(mouseUpItem), 0, { task: this.actualElement.textContent, id: this.actualElement.id });
      } else if (mouseUpItem.classList.contains('column_tasks')) {
        for (let col in this.cards) {
          this.cards[col] = this.cards[col].filter((el) => el.id !== this.actualElement.id);
        }
        const columnName = mouseUpItem.parentNode.className.split(' ')[1];
        this.cards[columnName].push({ task: this.actualElement.textContent, id: this.actualElement.id });
      }
    }

    document.body.querySelector('.placeholder').remove();


    this.actualElement.remove();
    this.actualElement = undefined;

    this.#setStorage();
    this.#drawCards();

    document.documentElement.removeEventListener('mouseup', this.#onMouseUp);
    document.documentElement.removeEventListener('mousemove', this.#onMouseMove);

    document.body.style.cursor = 'default';
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
        
        if (e.target.classList.contains('card') && e.target.parentNode.classList.contains('column_tasks')) {
          this.actualElement = e.target;

          const placeHolder = document.createElement('div');
          placeHolder.classList.add('placeholder');
          placeHolder.textContent = this.actualElement.textContent;

          this.actualElement.parentNode.insertBefore(placeHolder, this.actualElement.nextSibling);

          this.shiftX = e.pageX - this.actualElement.getBoundingClientRect().left;
          this.shiftY = e.pageY - this.actualElement.getBoundingClientRect().top;

          document.body.appendChild(this.actualElement);
          this.actualElement.classList.add('dragged');
          this.actualElement.style.left = e.pageX - this.shiftX + 'px'; 
          this.actualElement.style.top = e.pageY - this.shiftY + 'px';

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