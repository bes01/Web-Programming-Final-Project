const homePage = `
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

const searchPage = `<h3>searchPage</h3>`;

const placeOrderPage = `<h3>placeOrderPage</h3>`;

const aboutUsPage = `<h3>About</h3>`;

const contactPage = `
<div class="contact">
    <div class="left">
        <h3>Contact methods:</h3>
        <h4>Phone1: <a href="tel:0322 45 87 56">0322 45 87 56</a></h4>
        <h4>Phone2: <a href="tel:899 34 87 11">899 34 87 11</a></h4>
        <h4>Email: <a href="mailto:drinks@freeuni.edu.ge">drinks@freeuni.edu.ge</a></h4>
        <h4>Address: 
        <a 
        href="https://www.google.com/maps/place/Kakha+Bendukidze+Campus/@41.8057235,44.7657262,17z/data=!3m1!4b1!4m5!3m4!1s0x40446e62e22d2541:0x241361d3d3444c62!8m2!3d41.8057235!4d44.7679149"
        target="_blank"
        >
        240 David Agmashenebeli Alley, Tbilisi
        </a>
        </h4>
    </div>
    <div class="right">
        <h3>SEND US A MESSAGE</h3>
        <input id = "FullName" type="text" placeholder="FullName">
        <input  id = "Email" type="text" placeholder="Email">
        <input  id = "Phone" type="text" placeholder="Phone">
        <textarea  id = "Message" placeholder="Message"></textarea>
        <span id='send' class="button">SEND</span>
    </div>
</div>
`;

let prepareContact = () =>{
    document.getElementById('send').addEventListener('click', () =>{
        let inputs = document.getElementsByClassName('right')[0].children
        let validation = true;
        for(let i = 1; i <= 4; i++){
            if(inputs[i].value.length == 0){
                showMessage(inputs[i].id + ' field is empty! Please fill it to send us feedback.', 'error');
                validation = !validation;
                break;
            } else if(!inputs[i].value.trim()) {
                showMessage(inputs[i].id + ' field contains only whitespaces! Please fill it properly to send us feedback.', 'error');
                validation = !validation;
                break;
            }
        }
        if(validation){
            for(let i = 1; i <= 4; i++)
                inputs[i].value='';
            showMessage('Thanks for your feedback!', 'success');
        }
    })
};

let pages = {
    Home: {html:homePage, prepare: () =>{}},
    Search: {html:searchPage, prepare: () =>{}},
    PlaceOrder: {html:placeOrderPage, prepare: () =>{}},
    AboutUs: {html:aboutUsPage, prepare: () =>{}},
    Contact: {html:contactPage, prepare: () =>{prepareContact()}}
};