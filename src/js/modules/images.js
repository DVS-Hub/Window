const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImg = document.createElement('img');

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';
    bigImg.style.height = '70%';

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if(target && target.classList.contains('preview')){
            imgPopup.style.display = 'flex';
            bigImg.setAttribute('src', target.parentNode.getAttribute('href'));
            imgPopup.appendChild(bigImg);
            document.body.style.overflow = 'hidden';
        }else if(target && target.matches('div.popup')){
            console.log(target);
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }

    });

};

export default images;