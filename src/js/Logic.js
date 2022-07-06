export default class Logic{
    constructor(gui){
        this.gui = gui;
    }

    init(){
        this.gui.addTicket.addEventListener('click',() => {
            e.preventDefault();
            if(this.gui.popUp.classList.contains('hidden')){
                this.gui.popUp.classList.remove('hidden');
            }
        })
    }
}