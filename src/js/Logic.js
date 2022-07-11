
export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.tickets = null;
    this.url = 'https://ahj-http-server-pfokin.herokuapp.com';
  }

  init() {
    this.getTickets();

    this.gui.widget.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(e.target.dataset);
      if(e.target.dataset.id === 'edit') {
        this.editTicket(e);
      } else if (e.target.dataset.id === 'remove') {
        this.removeTicket(e);
      } else if (e.target.dataset.id === 'title'){
        this.showDescription(e);
      } else if (e.target.dataset.id === 'addTicket') {
        this.addTicket(e);
      }


    });

    // this.gui.btnAdd.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   if (this.gui.popUp.classList.contains('hidden')) {
    //     this.gui.popUp.classList.remove('hidden');
    //   }
    // });
    // this.gui.btnCancel.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   this.gui.popUp.classList.add('hidden');
    // });
    // this.gui.btnOk.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   this.gui.popUp.classList.add('hidden');
    //   const taskN = this.gui.createTask(1, true, 'ghjlydju jfdsoo', new Date().toString().slice(4, 21));
    //   this.gui.tasksList.innerHTML += taskN;
    // });
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
    const result = JSON.parse(await this.sendXHR('GET', 'allTickets'));
    this.tickets = result;
    this.fillFields((this.tickets));
  }

  // eslint-disable-next-line class-methods-use-this
  editTicket(e) {
    console.log('edit', e);
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
    console.log('addTicket', e);
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
