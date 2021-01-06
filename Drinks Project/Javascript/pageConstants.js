const homePage = `
<h3>Random Drinks</h3>
<div class="childContent" id="randomDrinks">
</div>
<h3>Popular Drinks</h3>
<div class="childContent" id="popularDrinks">
</div>
<h3>Latest Drinks</h3>
<div class="childContent" id="latestDrinks">
</div>
<h3>Popular Ingredients</h3>
<div class="childContent" id="popularIngredients">
</div>
`;

const prepareDrinkCard = (json) =>{
    let description = json.description;
    if(description.length > 40)
        description = description.substring(0, 40) + "...";
    return `
    <div id ="` + json.id + `" class="drinkCard" style="display:none;">
        <img src="` + json.src + `"">
        <h3 class="cardTitle">`+ json.name +`</h3>
        <p class="cardText">` + description +`</p>
    </div>
    `;
};

const prepareDrinksRow = async (rowId, loading) =>{
    let drinks = ``;
    for(let i = 0; i < 5; i++){
        if(loading){
            drinks += `
                <div class="drinkCard loading">
                    <img src="../Resources/Home/cocktail.gif">
                    <h3 class="cardTitle">Drink</h3>
                    <p class="cardText">Description here.</p>
                </div>
                `;
        } else {
            let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(response => response.json());
            let drink = resp.drinks[0];
            drinks += prepareDrinkCard({id: drink.idDrink, description: drink.strInstructions, src: drink.strDrinkThumb, name: drink.strDrink});
        }
    }
    if(loading)
        document.getElementById(rowId).innerHTML += drinks;
    else 
        document.getElementById(rowId).innerHTML += drinks;
};

const prepareIngredientRow = async (rowId, loading) =>{
    let ingredients = ``;
    for(let i = 0; i < 5; i++){
        if(loading){
            ingredients += `
            <div class="drinkCard loading">
                <img src="../Resources/Home/cocktail.gif">
                <h3 class="cardTitle">Drink</h3>
                <p class="cardText">Description here.</p>
            </div>
            `;
        } else {
            let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=' + (i + 1)).then(response => response.json());
        let ingredient = resp.ingredients[0];
        ingredients += prepareDrinkCard({id: ingredient.idIngredient, description: ingredient.strDescription, 
            src: "https://www.thecocktaildb.com/images/ingredients/" + ingredient.strIngredient + "-Medium.png", name: ingredient.strIngredient});
        }
        
    }
    if(loading)
        document.getElementById(rowId).innerHTML += ingredients;
    else 
        document.getElementById(rowId).innerHTML += ingredients;
};

const replaceLoadings = (rowId) =>{
    let childs = document.getElementById(rowId).children;
    for(let i = 0; i < childs.length; i++){
        if(childs[i].className == "drinkCard loading"){
            childs[i].style.display="none";
        } else {
            childs[i].style.display="inline-block";
            childs[i].className += " animate__animated animate__zoomIn";
        }
    }  
};

const prepareHome = async () => {
    prepareDrinksRow('randomDrinks', false);
    prepareDrinksRow('popularDrinks', false);
    prepareDrinksRow('latestDrinks', false);
    prepareIngredientRow('popularIngredients', false);

    prepareDrinksRow('randomDrinks', true);
    prepareDrinksRow('popularDrinks', true);
    prepareDrinksRow('latestDrinks', true);
    prepareIngredientRow('popularIngredients', true);

    setTimeout(function() {
        replaceLoadings('randomDrinks');
        replaceLoadings('popularDrinks');
        replaceLoadings('latestDrinks');
        replaceLoadings('popularIngredients');
    }, 5000);
};

const searchPage = `<h3>SearchPage</h3>`;

const CreditsPage = `
<div class="creditRow">
    <div class="credit">
        <img src="../Resources/Credits/google.png">
        <h3> Special thanks to <a href="https://www.google.com/" target="_blank"> Google</a>!</h3>
    </div>
</div>
<div class="creditRow">
    <div class="credit">
        <img src="../Resources/Credits/cocktail_db.png">
        <h3> Special thanks to <a href="https://www.thecocktaildb.com/" target="_blank"> The Cocktail DB</a>!</h3>
    </div>
    <div class="credit">
        <img src="../Resources/Credits/animation.png">
        <h3> Special thanks to <a href="https://animate.style/" target="_blank"> Animatte.css</a>!</h3>
    </div>
</div>
<div class="creditRow">
    <div class="credit">
        <img src="../Resources/Credits/icons.png">
        <h3> Special thanks to <a href="https://www.flaticon.com/" target="_blank"> FlatIcon</a>!</h3>
    </div>
    <div class="credit">
        <img src="../Resources/Credits/picresize.png">
        <h3> Special thanks to <a href="https://picresize.com/" target="_blank"> PicResize</a>!</h3>
    </div>
</div>
<div class="creditRow">
    <div class="credit">
        <img src="../Resources/Credits/text_generator.png">
        <h3> Special thanks to <a href="https://www.blindtextgenerator.com/lorem-ipsum" target="_blank"> Blind Text Generator</a>!</h3>
    </div>
    <div class="credit">
        <img src="../Resources/Credits/u_might_not_need_jquery.png">
        <h3> Special thanks to <a href="http://youmightnotneedjquery.com/" target="_blank">You Might Not Need jQuery</a>!</h3>
    </div>
</div>
`;

const aboutUsPage = `
<h3>Who We Are</h3>
<div style="width: 100%;">
    <div class="row">
        <img src="../Resources/AboutUs/who_we_are.jpg">	
        <p>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.     
        </p>
    </div>
</div>
<h3>Why you should use our Website</h3>
<div style="width: 100%;">
    <div class="row">
        <p>
            On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.     
        </p>
        <img src="../Resources/AboutUs/why_you_should_use_our_website.jpg">	
    </div>
</div>
<h3>Future Visions</h3>
<div style="width: 100%;">
    <div class="row">
        <img src="../Resources/AboutUs/future_visions.jpg">	
        <p>
            The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.  
        </p>	
    </div>
</div>
`;

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
    Home: {html:homePage, prepare: () =>{prepareHome()}},
    Search: {html:searchPage, prepare: () =>{}},
    Credits: {html:CreditsPage, prepare: () =>{}},
    AboutUs: {html:aboutUsPage, prepare: () =>{}},
    Contact: {html:contactPage, prepare: () =>{prepareContact()}}
};