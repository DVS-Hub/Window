import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! мы с Вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    checkNumInputs('input[name="user_phone"]');

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let response = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await response.text();
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
            
            let formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'end'){
                for(let key in state){
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    inputs.forEach(item => {
                        item.value = '';
                    });
                    setTimeout(() => {
                        statusMessage.remove();
                    },5000);
                    if(item.getAttribute('data-calc') === 'end'){
                        setTimeout(() => {
                            const modal = document.querySelector('.popup_calc_end');
                            modal.style.display = 'none';
                            document.body.classList.remove('modal-open'); 
                        },5000)
                    }
                    Object.keys(state).forEach(key => delete state[key]);
                    form.forEach(item => {
                        item.reset();
                    });
                });
        });
    });
}

export default forms;