let homePage = `
<h3>Random Drinks</h3>
<div class="childContent" id="randomDrinks">
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
</div>
<h3>Popular Drinks</h3>
<div class="childContent" id="popularDrinks">
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
</div>
<h3>Latest Drinks</h3>
<div class="childContent" id="latestDrinks">
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
</div>
<h3>Popular Ingredients</h3>
<div class="childContent" id="popularIngredients">
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
    <div class="drinkCard">
        <img src="../Resources/sample.jpg">
        <h3 class="cardTitle">Negroni</h3>
        <p class="cardText">Stir into glass over ice, garnish and serve.</p>
    </div>
</div>
`;

let searchPage = `<h3>searchPage</h3>`;

let placeOrderPage = `<h3>placeOrderPage</h3>`;

let aboutUsPage = `<h3>aboutUsPage</h3>`;

let contactPage = `
<div class="contact">
    <div class="left">
        <h3>Contact methods:</h3>
        <h4>Phone1: 0322 45 87 56</h4>
        <h4>Phone2: 899 34 87 11</h4>
        <h4>Email: drinks@freeuni.edu.ge</h4>
        <h4>Address: 240 David Agmashenebeli Alley, Tbilisi</h4>
    </div>
    <div class="right">
        <h3>SEND US A MESSAGE</h3>
        <input type="text" placeholder="FullName">
        <input type="text" placeholder="Email">
        <input type="text" placeholder="Phone">
        <textarea placeholder="Message"></textarea>
        <span class="button">SEND</span>
    </div>
</div>
`;

let pages = {
    Home: homePage,
    Search: searchPage,
    PlaceOrder: placeOrderPage,
    AboutUs: aboutUsPage,
    Contact: contactPage
};

let goToPage = (page) =>{
    page = page.split(' ').join('');
    console.log(page);
    let content = pages[page];
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = content;
    let menuItems = document.getElementById('menu').children[0].children;
    for(let i = 0; i < menuItems.length; i++){
        menuItems[i].className = "item";
        if(menuItems[i].innerHTML == page)
            menuItems[i].className += " active";
    }
};

