export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.tickets = null;
    this.url = 'https://ahj-http-server-pfokin.herokuapp.com';
    this.popUpReset = this.popUpReset.bind(this);
    this.popUpSubmit = this.popUpSubmit.bind(this);
  }

  init() {
    this.getTickets();

    this.gui.widget.addEventListener('click', (e) => {
      e.preventDefault();
      let currId;
      if (e.target.tagName === 'path' && e.target.closest('.img')) {
        currId = e.target.closest('.img').dataset.id;
      } else {
        currId = e.target.dataset.id;
      }

      if (currId === 'edit') {
        this.editTicket(e);
      } else if (currId === 'remove') {
        this.removeTicket(e);
      } else if (currId === 'name') {
        this.showDescription(e);
      } else if (currId === 'addTicket') {
        this.addTicket(e);
      }
    });
  }

  async sendXHR(method, query, type) {
    const xhr = new XMLHttpRequest();
    if (method === 'GET') {
      const url = `${this.url}?method=${query}`;
      xhr.open(method, url, false);
      xhr.send();
    } else if (method === 'POST') {
      const url = `${this.url}?method=${type}`;
      xhr.open(method, url, false);
      xhr.send(query);
    } else if (method === 'DELETE') {
      const url = `${this.url}?method=deleteTicket&id=${query}`;
      xhr.open(method, url, false);
      xhr.send();
    }
    return (xhr.responseText);
  }

  async getTickets() {
    console.log(this.tickets);
    const result = JSON.parse(await this.sendXHR('GET', 'allTickets'));
    this.tickets = result;
    console.log(this.tickets);
    this.fillFields((this.tickets));
  }

  async popUpSubmit(e) {
    console.log(this.gui.popUp);
    this.gui.popUp.classList.add('hidden');
  }

  // eslint-disable-next-line class-methods-use-this
  editTicket(e) {
    e.preventDefault();
    this.gui.popUp.innerHTML = '';
    const task = e.target.closest('.task');
    this.gui.popUp.classList.remove('hidden');
    this.gui.popUp.innerHTML += this.gui.addPopUp('Редактировать тикет', e.target, e.target);
    const submit = this.gui.popUp.querySelector('.okeyBtn');
    const cancel = this.gui.popUp.querySelector('.cancel');
    submit.addEventListener('click', this.popUpSubmit);
    cancel.addEventListener('click', this.popUpReset);
  }

  // eslint-disable-next-line class-methods-use-this
  removeTicket(e) {
    console.log('remove', e);
  }

  // eslint-disable-next-line class-methods-use-this
  showDescription(e) {
    console.log('showDescription', e);
  }


  // eslint-disable-next-line class-methods-use-this
  addTicket(e) {
    e.preventDefault();
    this.gui.popUp.innerHTML = '';
    this.gui.popUp.classList.remove('hidden');
    this.gui.popUp.innerHTML += this.gui.addPopUp('Добавить тикет', '', '');
    const submit = this.gui.popUp.querySelector('.okeyBtn');
    const cancel = this.gui.popUp.querySelector('.cancel');
    submit.addEventListener('click', this.popUpSubmit);
    cancel.addEventListener('click', this.popUpReset);
  }

  popUpReset(e) {
    e.preventDefault();
    this.gui.popUp.classList.add('hidden');
  }

  fillFields(tArr) {
    this.gui.tasksList.innerHTML = '';
    tArr.forEach((ticket) => {
      this.gui.tasksList.innerHTML += this.gui.createTask(
        ticket.id, ticket.status, ticket.name, ticket.created,
      );
    });
  }
}
