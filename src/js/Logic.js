export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.tickets = null;
    // this.url = 'http://localhost:7070/';
    this.url = 'https://ahj-http-server-pfokin.herokuapp.com';
    this.popUpReset = this.popUpReset.bind(this);
    this.popUpSubmit = this.popUpSubmit.bind(this);
    this.remove = this.remove.bind(this);
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
      xhr.open(method, url, true);
      xhr.send(query);
    } else if (method === 'DELETE') {
      const url = `${this.url}?method=deleteTicket&id=${query}`;
      xhr.open(method, url, false);
      xhr.send();
    }
    return (xhr.responseText);
  }

  async getTickets() {
    const result = JSON.parse(await this.sendXHR('GET', 'allTickets'));
    this.tickets = result;
    this.fillFields((this.tickets));
  }

  async popUpSubmit(e) {
    e.preventDefault();
    const form = e.target.closest('.form');
    const name = form.querySelector('.input-name-new-ticket').value;
    const description = form.querySelector('.input-description-new-ticket').value;
    const idForm = form.dataset.idform;
    if (idForm === 'edit') {
      const { id } = form.dataset;
      const request = new FormData();
      request.append('id', id);
      request.append('title', name);
      request.append('description', description);
      await (this.sendXHR('POST', request, 'editTicket'));
    } else if (idForm === 'add') {
      const request = new FormData();
      request.append('title', name);
      request.append('description', description);
      await (this.sendXHR('POST', request, 'createTicket'));
    }
    this.getTickets();
    await this.gui.popUp.classList.add('hidden');
  }

  async remove(e) {
    e.preventDefault();
    const form = e.target.closest('.form');
    const { id } = form.dataset;
    const request = new FormData();
    request.append('id', id);
    await (this.sendXHR('DELETE', request, ''));
    await this.gui.popUp.classList.add('hidden');
    this.getTickets();
  }

  popUpReset(e) {
    e.preventDefault();
    this.gui.popUp.classList.add('hidden');
  }

  // eslint-disable-next-line class-methods-use-this
  async editTicket(e) {
    e.preventDefault();
    this.gui.popUp.innerHTML = '';
    const task = e.target.closest('.task');
    const ticket = JSON.parse(await this.sendXHR('GET', `ticketById&id=${task.dataset.id}`));
    this.gui.popUp.classList.remove('hidden');
    this.gui.popUp.innerHTML += this.gui.addPopUp('Редактировать тикет', ticket.name, ticket.description, 'edit', ticket.name, ticket.id);
    const submit = this.gui.popUp.querySelector('.okeyBtn');
    const cancel = this.gui.popUp.querySelector('.cancel');
    submit.addEventListener('click', this.popUpSubmit);
    cancel.addEventListener('click', this.popUpReset);
  }

  // eslint-disable-next-line class-methods-use-this
  async removeTicket(e) {
    e.preventDefault();
    this.gui.popUp.innerHTML = '';
    const task = e.target.closest('.task');
    const ticket = JSON.parse(await this.sendXHR('GET', `ticketById&id=${task.dataset.id}`));
    this.gui.popUp.classList.remove('hidden');
    this.gui.popUp.innerHTML += this.gui.showVertification(ticket.name, 'remove');
    const submit = this.gui.popUp.querySelector('.okeyBtn');
    const cancel = this.gui.popUp.querySelector('.cancel');
    submit.addEventListener('click', this.remove);
    cancel.addEventListener('click', this.popUpReset);
  }

  // eslint-disable-next-line class-methods-use-this
  async showDescription(e) {
    e.preventDefault();
    this.gui.popUp.innerHTML = '';
    const task = e.target.closest('.task');
    const ticket = JSON.parse(await this.sendXHR('GET', `ticketById&id=${task.dataset.id}`));
    this.gui.popUp.classList.remove('hidden');
    this.gui.popUp.innerHTML += this.gui.showDescription('Тикет', ticket.name, ticket.description);
    const cancel = this.gui.popUp.querySelector('.cancel');
    cancel.addEventListener('click', this.popUpReset);
  }

  // eslint-disable-next-line class-methods-use-this
  addTicket(e) {
    e.preventDefault();
    this.gui.popUp.innerHTML = '';
    this.gui.popUp.classList.remove('hidden');
    this.gui.popUp.innerHTML += this.gui.addPopUp('Добавить тикет', '', '', 'add', '');
    const submit = this.gui.popUp.querySelector('.okeyBtn');
    const cancel = this.gui.popUp.querySelector('.cancel');
    submit.addEventListener('click', this.popUpSubmit);
    cancel.addEventListener('click', this.popUpReset);
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
