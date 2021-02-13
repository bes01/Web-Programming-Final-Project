const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));

const markActive = (page) =>{
    let menuItems = document.getElementById('menu').children[0].children;
    for(let i = 0; i < menuItems.length; i++){
        menuItems[i].className = "item";
        if(menuItems[i].innerHTML == page || (menuItems[i].innerHTML == 'About Us' && page == 'AboutUs'))
            menuItems[i].className += " active";
    }

    document.getElementById('page').innerHTML = page;
    let burger = document.getElementById('burger').children;
    for(let i = 0; i < burger.length; i++){
        burger[i].className = '';
        if(burger[i].innerHTML == page || (burger[i].innerHTML == 'About Us' && page == 'AboutUs'))
            burger[i].className = 'active';
    }
}

let goToPage = async (page, from) =>{
    /* From Ingredient View To Search Page Case */
    window.location.hash = page;
    /* * * * * * ** * * * * * * * * * * * * * * */
    if(from != "firstLoad"){
        currentDrinkId = -1;
        document.getElementById('ingredientPage').className = "innerContent animate__animated animate__fadeOutLeft";
        document.getElementById('drinkPage').className = "innerContent animate__animated animate__fadeOutLeft";
        document.getElementById('activePage').className = "innerContent animate__animated animate__fadeOutLeft";

        await sleep(300);
    }

    document.getElementById('ingredientPage').style.display = 'none';
    document.getElementById('drinkPage').style.display = 'none';
    pageKey = page.split(' ').join('');
    let content = pages[pageKey].html;
    document.getElementById('activePage').innerHTML = content;
    if (from != 'firstLoad'){
        document.getElementById('activePage').className = "innerContent animate__animated animate__fadeInRight"
        document.getElementById('activePage').style.display = 'block';
    }

    markActive(page);

    pages[pageKey].prepare();
};

let goToDrinkPage = async (page, animation) =>{
    document.getElementById('activePage').className = "innerContent animate__animated animate__fadeOutRight";

    await sleep(300);

    document.getElementById('activePage').style.display = 'none';

    pageKey = page.split(' ').join('');
    let content = pages[pageKey].html;
    document.getElementById('drinkPage').innerHTML = content;
    document.getElementById('drinkPage').className = "innerContent animate__animated animate__fadeInLeft"
    document.getElementById('drinkPage').style.display = 'block';
    
    pages[pageKey].prepare();
};

let goToIngredientPage = async (page, from) =>{
    document.getElementById('drinkPage').className = "innerContent animate__animated animate__fadeOutRight";
    document.getElementById('activePage').className = "innerContent animate__animated animate__fadeOutRight";

    await sleep(300);

    document.getElementById('activePage').style.display = 'none';
    document.getElementById('drinkPage').style.display = 'none';

    pageKey = page.split(' ').join('');
    let content = pages[pageKey].html;
    document.getElementById('ingredientPage').innerHTML = content;
    document.getElementById('ingredientPage').className = "innerContent animate__animated animate__fadeInLeft"
    document.getElementById('ingredientPage').style.display = 'block';
    
    pages[pageKey].prepare();
};

let showBurger = () =>{
    let burger = document.getElementById('burger');
    if(burger.style.display == 'none'){
        burger.style.display = 'block';
    } else {
        burger.style.display = 'none';
    }
}

let hashLoad = () =>{
    let page = window.location.hash.substr(1);
    goToPage(page);
}

let prepareNavigation = () =>{
    let menuItems = document.getElementById('menu').children[0].children;
    for(let i = 0; i < menuItems.length; i++){
        let page = menuItems[i].innerHTML;
        menuItems[i].addEventListener('click', ()=>{goToPage(page, 'page')})
        menuItems[i].addEventListener('click', () => window.location.hash = page.split(' ').join(''));
    }
    let burger = document.getElementById('burger').children;
    for(let i = 0; i < burger.length; i++){
        let page = burger[i].innerHTML;
        burger[i].addEventListener('click', ()=>{goToPage(page, 'page')})
        burger[i].addEventListener('click', () => window.location.hash = page.split(' ').join(''));
    }
    document.getElementsByClassName('logo')[0].addEventListener('click', ()=>{goToPage('Home', 'page')})
    document.getElementsByClassName('logo')[0].addEventListener('click', () => window.location.hash = 'Home')
    if(window.location.hash.substr(1) == '')
        window.location.hash = 'Home'
}
