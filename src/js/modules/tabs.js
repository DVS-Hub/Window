const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
          tabs = document.querySelectorAll(tabSelector),
          contents = document.querySelectorAll(contentSelector);

    function hideContent(){
        contents.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showContent(i = 0){
        contents[i].style.display = 'block';
        contents[i].classList.add('animate__animated', 'animate__fadeIn');
        tabs[i].classList.add(activeClass);
    }

    hideContent();
    showContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        console.log(target);
        if (target && (target.classList.contains(tabSelector.replace(/\./, "")) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./, ""))))
            tabs.forEach((item, i) => {
                if(target == item || target.parentNode == item){
                    hideContent();
                    showContent(i);
                }
            });
    });
}


export default tabs;