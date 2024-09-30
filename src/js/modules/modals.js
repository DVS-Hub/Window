const modals = (state) => {
    function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, reqiredInput){
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = scrollWidth();
        const err = document.createElement('div');
        err.classList.add('status');
        err.textContent = 'Введите все данные';

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }
                if(reqiredInput){ 
                    let res = true;
                    reqiredInput.forEach(item => {
                        if(!state[item]) {
                            res = false;
                            e.target.parentNode.appendChild(err);
                        }
                    });
                    if(res) {
                        hideAllModals();
                        modal.style.display = 'block';
                        document.body.classList.add('modal-open');
                        document.body.style.marginRight = `${scroll}px`;
                    }
                }else {
                    hideAllModals();
                    modal.style.display = 'block';
                    document.body.classList.add('modal-open');
                    document.body.style.marginRight = `${scroll}px`;
                }


            });
        })
        
        close.addEventListener('click', () => {
            hideAllModals();
            // modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`;
        });
        
        document.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay){
                hideAllModals();
                // modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;    
            }
        });
        function hideAllModals(){
            windows.forEach(item => {
                item.style.display = 'none';
                err.remove();
            });
        }
    }

    function showModalByTime(selector, time){
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.classList.add('modal-open');
        },time);
    }

    function scrollWidth() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();
        return scrollWidth;
    }

   



    bindModals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModals('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTime('.popup', 60000);
    bindModals('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModals('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, ['form', 'width', 'height']);
    bindModals('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false, ['type', 'profile']);
}

export default modals;