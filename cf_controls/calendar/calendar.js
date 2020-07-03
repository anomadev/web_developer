const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

class Calendar {
  constructor(options) {
    this.date = options.date || new Date();
    this.container = options.container;

    // TO DO: Manejo fde botones

    this.calendarTable =  null;
    this.onselect = options.onselect;
    this.buildTable();
    this.bindEvents();
    this.updateTable();
  }

  updateTable() {
    this.calculateDates();
    let firstDayWeek = this.monthStart.getDay();
    let trs =  this.calendarTable.querySelectorAll('tr');

    for (let i = 0; i <= 5; i++) {
      let tr = trs[i];
      let tds = tr.querySelectorAll('td');
      for (let j = 0; j < 7; j++) {
        let td = tds[j];
        let day = (i * 7) + j;
        if(day >= firstDayWeek && (day - firstDayWeek) < this.monthLength) {
          td.innerHTML = day - firstDayWeek + 1;
          td.style.borderStyle = 'solid';
          td.dataset.day = day - firstDayWeek + 1;
        } else {
          td.style.borderStyle = 'none';
          td.innerHTML = '';
          td.removeAttribute('data-day');
        }
      }
    }

    this.container.querySelector('header').innerHTML = `${months[this.date.getMonth()]} - ${this.date.getFullYear()}`;
  }

  bindEvents() {
    this.buttons = {};
    this.buttons.prev = document.createElement('button');
    this.buttons.next = document.createElement('button');
    this.buttons.prev.innerHTML = 'Anterior';
    this.buttons.next.innerHTML = 'Siguiente';
    this.container.querySelector('.body').appendChild(this.buttons.prev);
    this.container.querySelector('.body').appendChild(this.buttons.next);

    this.buttons.prev.addEventListener('click', () => this.prev());
    this.buttons.next.addEventListener('click', () => this.next());
  }

  calculateDates() {
    this.monthStart = new Date(this.date.getFullYear(),this.date.getMonth(),1);
    this.monthEnd = new Date(this.date.getFullYear(),this.date.getMonth()+1, 1);
    this.monthLength = Math.floor((this.monthEnd - this.monthStart) / (1000 * 60 * 60 * 24));
  }

  next() {
    let month = this.date.getMonth();
    if(month == 11) {
      this.date = new Date(this.date.getFullYear() + 1, 0, 1);
    } else {
      this.date = new Date(this.date.getFullYear(), month + 1, 1);
    }
    this.updateTable();
  }

  prev() {
    let month = this.date.getMonth();
    if (month == 11) {
      this.date = new Date(this.date.getFullYear() - 1, 11, 1);
    } else {
      this.date = new Date(this.date.getFullYear(), month - 1, 1);
    }
    this.updateTable();
  }

  select(el) {
    if(!el.dataset.day) return;
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), el.dataset.day);
    this.onselect(date);
  }

  buildTable() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');

    for (let i = 0; i < 7; i++) {
      let td = document.createElement('td');
      td.innerHTML = days[i];
      thead.appendChild(td);
    }

    for (let i = 0; i <= 5; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < 7; j++) {
        let td = document.createElement('td');
        td.addEventListener('click', (event)=>this.select(event.currentTarget));
        tr.appendChild(td);
      }

      table.appendChild(tr);
    }

    this.calendarTable = table;
    table.appendChild(thead);

    let body = document.createElement('div');
    body.classList.add('body');
    body.appendChild(table);
    this.container.classList.add('easeCalendar');
    this.container.appendChild(document.createElement('header'));
    this.container.appendChild(body);

  }
}