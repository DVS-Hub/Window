const modals = () => {
    function bindModals(triggerSelector, modalSelector, closeSelector){
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }
                modal.style.display = 'block';
                document.body.classList.add('modal-open');
            });
        })
        
        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });
        
        document.addEventListener('click', (e) => {
            if(e.target === modal){
                modal.style.display = 'none';
            document.body.classList.remove('modal-open');    
            }
        });
    }

    function showModalByTime(selector, time){
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.classList.add('modal-open');
        },time);
    }

    bindModals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModals('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTime('.popup', 60000);

}

export default modals;