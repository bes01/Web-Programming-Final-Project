let goToPage = (page) =>{
    pageKey = page.split(' ').join('');
    let content = pages[pageKey].html;
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = content;
    let menuItems = document.getElementById('menu').children[0].children;
    for(let i = 0; i < menuItems.length; i++){
        menuItems[i].className = "item";
        if(menuItems[i].innerHTML == page)
            menuItems[i].className += " active";
    }
    pages[pageKey].prepare();
};

let prepareNavigation = () =>{
    let menuItems = document.getElementById('menu').children[0].children;
    for(let i = 0; i < menuItems.length; i++){
        let page = menuItems[i].innerHTML;
        menuItems[i].addEventListener('click', ()=>{goToPage(page)})
    }
    document.getElementsByClassName('logo')[0].addEventListener('click', ()=>{goToPage('Home')})
}
