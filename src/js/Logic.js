export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.url = 'https://ahj-http-server-pfokin.herokuapp.com';
  }

  init() {
    this.gui.btnAdd.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.gui.popUp.classList.contains('hidden')) {
        this.gui.popUp.classList.remove('hidden');
      }
    });
    this.gui.btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      this.gui.popUp.classList.add('hidden');
    });
    this.gui.btnOk.addEventListener('click', (e) => {
      e.preventDefault();
      this.gui.popUp.classList.add('hidden');
      const taskN = this.gui.createTask(1, true, 'ghjlydju jfdsoo', new Date().toString().slice(4, 21));
      this.gui.tasksList.innerHTML += taskN;
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

  async modalSumbit(e) {
    
  }
}
