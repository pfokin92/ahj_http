/* eslint-disable class-methods-use-this */
export default class Gui {
  constructor() {
    this.widget = document.querySelector('.widget');
    this.tasksList = document.querySelector('.tasks_list');
    this.popUp = document.querySelector('.popup');
    this.btnCancel = document.querySelector('.cancel');
    this.btnOk = document.querySelector('.okeyBtn');
  }

  createTask(id, status, name, date) {
    let done = '';
    if (status) {
      done += '<svg class="done" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z"/></svg>';
    }
    const newTask = `
    <tr class="task" data-id="${id}">
        <td class="status" data-id="${status}">
            <p class="round">${done}</p>
        </td>
        <td class="text" data-id="name">${name}</td>
        <td class="date" data-id="date">${date}</td>
        <td class="change">
            <p class="round edit-btn"><svg class="img edit" data-id="edit" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/><path d="M0 0h48v48h-48z" fill="none"/></svg></p>
        </td>
        <td class="change">
            <p class="round remove-btn"><svg class="img close" data-id="remove" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg></p>
        </td>
    </tr>`;
    return newTask;
  }

  addPopUp(header, title, description, idform, name, id) {
    const newPopUp = `
      <div class="content">
          <h3 class="popover_header">${header}</h3>
          <form class="form" name="${name}" data-id="${id}" data-idform="${idform}" enctype="multipart/form-data">
              <p class="name-new-ticket">?????????????? ????????????????</p>
              <input class="input-name-new-ticket" name="title" data-id="name-edit" value="${title}">
              <p class="description-new-ticket">?????????????????? ????????????????</p>
              <textarea class="input-description-new-ticket" name="description" data-id="description-edit">${description}</textarea>
              <p class="btn_block">
                  <a class="btn cancel">????????????</a>
                  <a class="btn okeyBtn">????</a>
              </p>
          </form>
      </div>`;
    return newPopUp;
  }

  showDescription(header, name, description) {
    const newPopUp = `
    <div class="content">
        <h3 class="popover_header">${header}</h3>
          <p class="name-new-ticket">?????????????? ????????????????</p>
          <p class="show-description" data-id="name-edit">${name}</p>
          <p class="description-new-ticket">?????????????????? ????????????????</p>
          <p class="show-description" data-id="description-edit">${description}</p>
          <p class="btn_block">
              <a class="btn cancel">??????????????</a>
          </p>
    </div>
    `;
    return newPopUp;
  }

  showVertification(name, idform) {
    const newPopUp = `
    <div class="content">
        <h3 class="popover_header">???? ???????????? ?????????????? ?????????? <span class="show-name">${name}</span>?</h3>
        <form class="form" action="submit" data-idform="${idform}">
          <p class="btn_block">
              <a class="btn cancel">??????</a>
              <a class="btn okeyBtn">????</a>
          </p>
        </form>
    </div>
    `;
    return newPopUp;
  }
}
