/*
    Some Global Variables/
*/
let currentDrinkId = -1;
let currentIngredientId = -1;
/* * * * * * * * * * * * * */


let view = (id, choose) =>{
    if(choose == "drink"){
        currentDrinkId = id;
        goToDrinkPage('Drink View', 'animate__zoomIn');
    }else{
        currentIngredientId = id;
        goToIngredientPage('Ingredient View', 'animate__zoomIn');
    }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Home Page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

let controller = new AbortController();
let { signal } = controller;

const prepareDrinkCard = (json, rowId, index, choose) =>{
    let description = json.description;
    if(description.length > 40)
        description = description.substring(0, 40) + "...";
    return `
    <div id ="` + json.id + `" class="drinkCard  animate__animated animate__zoomIn" style="display:none" onclick="view(` + json.id + `,'` + choose +`')">
        <img src="` + json.src + `" >
        <h3 class="cardTitle">`+ json.name +`</h3>
        <p class="cardText">` + description +`</p>
    </div>
    `;

};
const prepareDrinksRow = async (rowId, loading) =>{
    let drinks = ``;
    let stop = false;
    for(let i = 0; i < 5; i++){
        if(loading){
            drinks += `
                <div class="drinkCard loading" onclick="showMessage('Please, be patient. Wait until the card is fully loaded', 'error')">
                    <img src="images/Home/cocktail.gif">
                    <h3 class="cardTitle">Drink</h3>
                    <p class="cardText">Description here.</p>
                </div>
                `;
        } else {
            let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php', { signal }).then(response => response.json()).catch((error) => {
                stop = true;
            });
            if(stop)
                return;
            let drink = resp.drinks[0];
            drinks += prepareDrinkCard({id: drink.idDrink, description: drink.strInstructions, src: drink.strDrinkThumb, name: drink.strDrink}, rowId, i, "drink");
        }
    }
    if(document.getElementById(rowId) != null){
        document.getElementById(rowId).innerHTML += drinks;
        if(!loading) {
            let children = document.getElementById(rowId)
            if(children != null){
                children = children.children;
                for(let i = 0; i < 10; i++){
                    if(i < 5)
                        children[i].style.display = 'none'
                    else
                        children[i].style.display = 'inline-block'
                }
            }
        }
    }
};

const prepareIngredientRow = async (rowId, loading) =>{
    let ingredients = ``;
    let stop = false;
    for(let i = 0; i < 5; i++){
        if(loading){
            ingredients += `
            <div class="drinkCard loading" onclick="showMessage('Please, be patient. Wait until the card is fully loaded', 'error')">
                <img src="images/Home/cocktail.gif">
                <h3 class="cardTitle">Drink</h3>
                <p class="cardText">Description here.</p>
            </div>
            `;
        } else {
            let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=' + (i + 1), { signal }).then(response => response.json()).catch((error) => {
                stop = true;
            });
            if(stop)
                return;
            let ingredient = resp.ingredients[0];
            ingredients += prepareDrinkCard({id: ingredient.idIngredient, description: ingredient.strDescription, 
                src: "https://www.thecocktaildb.com/images/ingredients/" + ingredient.strIngredient + "-Medium.png", name: ingredient.strIngredient}, rowId, i, "ingredient");
        }
    }

    if(document.getElementById(rowId) != null){
        document.getElementById(rowId).innerHTML += ingredients;
        if(!loading) {
            let children = document.getElementById(rowId)
            if(children != null){
                children = children.children;
                for(let i = 0; i < 10; i++){
                    if(i < 5)
                        children[i].style.display = 'none'
                    else
                        children[i].style.display = 'inline-block'
                }
            }
        }
    }
};


const changeRowIds = (rowId, dummy) =>{
    document.getElementById(rowId).id = rowId + dummy
}

const prepareHome = async () => {
    // To abort previous calls
    controller.abort();
    
    controller = new AbortController();
    signal = controller.signal;

    // To change new/existing div, not previous
    let dummies = ['randomDrinks', 'popularDrinks', 'latestDrinks', 'popularIngredients'];
    for(let i = 0; i < 4; i++){
        let dummy = Math.random();
        changeRowIds(dummies[i], dummy);
        dummies[i] += dummy;
    }

    prepareDrinksRow(dummies[0], true);
    prepareDrinksRow(dummies[1], true);
    prepareDrinksRow(dummies[2], true);
    prepareIngredientRow(dummies[3], true);

    prepareDrinksRow(dummies[0], false);
    prepareDrinksRow(dummies[1], false);
    prepareDrinksRow(dummies[2], false);
    prepareIngredientRow(dummies[3], false);
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Search Page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const searchPage = `
<div class="filter">
    <select id='type' class="select" onchange="enableValueSelect()">
        <option value="" selected disabled hidden>Type</option>
        <option value="i">Ingredient</option>
        <option value="a">Alcoholic</option>
        <option value="c">Category</option>
        <option value="g">Glass</option>
    </select>
    <select id='value' disabled>
        <option value="" selected disabled hidden>Value</option>
    </select>
    <div class="filterButton" onclick="filter()">
        Filter
    </div>
</div>
<div class="result">
    <h3>Results</h3>
    <div id="result">
        <h4>No drinks were searched yet :)</h4>
    </div>
</div>
`;

let enableValueSelect = async () =>{
    let type = document.getElementById('type');
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?' + type.value + '=list';
    let values = await fetch(url).then(response => response.json());
    let valueField = document.getElementById('value');
    valueField.innerHTML = '<option value="" selected disabled hidden>Value</option>';
    valueField.disabled = true;    

    values = Object.values(values)[0];
    for(let i = 0; i < values.length; i++)
        values[i] = Object.values(values[i])[0];
    values.sort();

    /* 
        First element is empty in glass options.
    */
    let i = 0;
    if(type.value == 'g')
        i++;
    /* ------------------------------------------ */

    for(; i < values.length; i++)
        valueField.innerHTML += `
                <option id="${values[i]}" value="${values[i]}">${values[i]}</option>
            `;

    valueField.disabled = false;    
};

let renderDrinks = (drinks) =>{
    let result = ``;

    for(let i = 0; i < drinks.length; i++){
        result += `
        <div id ="${drinks[i].idDrink}" class="drinkCard" onclick="view('${drinks[i].idDrink}','drink');">
            <img src="${drinks[i].strDrinkThumb}" >
            <h3 class="cardTitle">${drinks[i].strDrink}</h3>
        </div>
        `;
    }

    document.getElementById('result').innerHTML = result;
}

let filter = async ()=>{
    let type = document.getElementById('type');
    let value = document.getElementById('value');
    if(type.value == ""){
        showMessage('Please, first select type of search.', 'error');
        return;
    }
    if(value.value == ""){
        showMessage('Ensure, you have entered the value field.', 'error');
        return;
    }

    value = value.value.split(' ').join('_')
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + type.value + '=' + value;
    let drinks = await fetch(url).then(response => response.json());
    drinks = drinks.drinks;

    renderDrinks(drinks);
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Credits Page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const CreditsPage = `
<div class="creditRow">
    <div class="credit">
        <img src="images/Credits/google.png">
        <h3> Special thanks to <a href="https://www.google.com/" target="_blank"> Google</a> for everything.</h3>
    </div>
    <div class="credit">
        <img src="images/Credits/gulp.png">
        <h3> Thanks <a href="https://gulpjs.com/" target="_blank"> Gulp</a> for optimizations.</h3>
    </div>
</div>
<div class="creditRow">
    <div class="credit">
        <img src="images/Credits/cocktail_db.png">
        <h3> Thanks <a href="https://www.thecocktaildb.com/" target="_blank"> The Cocktail DB</a> for the drink jasons.</h3>
    </div>
    <div class="credit">
        <img src="images/Credits/animation.png">
        <h3>Thanks <a href="https://animate.style/" target="_blank"> Animatte.css</a> for cool css animations.</h3>
    </div>
</div>
<div class="creditRow">
    <div class="credit">
        <img src="images/Credits/icons.png">
        <h3> Thanks <a href="https://www.flaticon.com/" target="_blank"> FlatIcon</a> for fancy footer icons.</h3>
    </div>
    <div class="credit">
        <img src="images/Credits/picresize.png">
        <h3> Thanks <a href="https://picresize.com/" target="_blank"> PicResize</a> for resizing static images.</h3>
    </div>
</div>
<div class="creditRow">
    <div class="credit">
        <img src="images/Credits/text_generator.png">
        <h3> Thanks <a href="https://www.blindtextgenerator.com/lorem-ipsum" target="_blank"> Blind Text Generator</a> for random texts.</h3>
    </div>
    <div class="credit">
        <img src="images/Credits/u_might_not_need_jquery.png">
        <h3> And thanks <a href="http://youmightnotneedjquery.com/" target="_blank">Y.M.N.N.jQ.</a> for not using jQuery.</h3>
    </div>
</div>
`;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    About Us Page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const aboutUsPage = `
<h3 class="centerText" >Who We Are</h3>
<div style="width: 100%;">
    <div class="row">
        <img src="images/AboutUs/who_we_are.jpg">	
        <p>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.     
        </p>
    </div>
</div>
<h3 class="centerText" >Why you should use our Website</h3>
<div style="width: 100%;">
    <div class="row">
        <p>
            On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.     
        </p>
        <img src="images/AboutUs/why_you_should_use_our_website.jpg">	
    </div>
</div>
<h3 class="centerText" >Future Visions</h3>
<div style="width: 100%;">
    <div class="row">
        <img src="images/AboutUs/future_visions.jpg">	
        <p>
            The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.  
        </p>	
    </div>
</div>
`;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Contact Page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const contactPage = `
<div class="contact">
    <div class="left">
        <div class="contactImgDiv">
            <img class="contactImg" src="images/Contact/contact.gif">	
        </div>
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

const goBackFromDrinkView = () =>{
    let activePage = document.getElementById('activePage');
    document.getElementById('drinkPage').className = 'innerContent animate__animated animate__fadeOutLeft'
    setTimeout(()=>{
        document.getElementById('drinkPage').style.display = 'none';
        activePage.className = 'innerContent animate__animated animate__fadeInRight';
        activePage.style.display ='block';
    }, 500);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Drink Page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const DrinkViewPage = `<div onclick="goBackFromDrinkView()" class="back"><h3 >&Larr;</h3></div>
<div class="centerRow">
    <div class="column"  style="text-align: center;">
        <h2 id='drinkName' ></h2>
        <img id ='drinkImage'  class="drinkImg" >
    </div>
    <div class="column">
        <h2 style="text-align: center;">Ingredients</h2>
        <div id='ingredients' class="ingredientColumn">
        </div>
    </div>
</div>
<div class="ingredientColumn">
    <h2>Instrucions</h2>
    <h3 id='drinkInstructions' class="instructions"></h3>
</div>
`;

let linkToIngredient = async (name)=> {
    let ingredient = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + name).then(response => response.json());
    view(ingredient.ingredients[0].idIngredient, "ingredient");
}

let prepareDrinkView = async () =>{
    let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + currentDrinkId).then(response => response.json());
    let drink = resp.drinks[0];

    document.getElementById('drinkName').innerHTML = drink.strDrink;
    document.getElementById('drinkImage').src = drink.strDrinkThumb;
    document.getElementById('drinkInstructions').innerHTML = drink.strInstructions;

    let ingredientNames = [];
    for(let i = 1; i >0; i++){
        if(drink['strIngredient' + i] == null)
            break;
        ingredientNames.push(drink['strIngredient' + i]);
    }

    let ingredientDivs = ``;
    for(let i = 0; i < ingredientNames.length; i++){
        if(i % 2 == 0){
            ingredientDivs += `<div class="ingredientRow">
                                    <div class="ingredientColumn" >
                                        <img class="ingredientImg" src="https://www.thecocktaildb.com/images/ingredients/` + ingredientNames[i] +`-Medium.png">
                                        <h3 class="link" onclick="linkToIngredient('`+ ingredientNames[i] +`')">` + ingredientNames[i] +`</h3>
                                    </div>
                                `;
        } else {
            ingredientDivs += `
                                    <div class="ingredientColumn" >
                                        <img class="ingredientImg" src="https://www.thecocktaildb.com/images/ingredients/` + ingredientNames[i] +`-Medium.png">
                                        <h3 class="link" onclick="linkToIngredient('`+ ingredientNames[i] +`')">` + ingredientNames[i] +`</h3>
                                    </div>
                                </div>    
                                `;
        }
    }
    if(ingredientNames.length % 2 == 1)
        ingredientDivs += `</div>`

    document.getElementById('ingredients').innerHTML = ingredientDivs;
}

const goBackFromIngredientView = () =>{
    let to = currentDrinkId == -1 ? 'activePage' : 'drinkPage';
    let prevPage = document.getElementById(to);
    document.getElementById('ingredientPage').className = 'innerContent animate__animated animate__fadeOutLeft'
    setTimeout(()=>{
        document.getElementById('ingredientPage').style.display = 'none';
        prevPage.className = 'innerContent animate__animated animate__fadeInRight';
        prevPage.style.display ='block';
    }, 500);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Ingredient Page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const IngredientViewPage = 
`
<div class="back" onclick="goBackFromIngredientView()"><h3 >&Larr;</h3></div>
<div class="ingredientRowVol2">
    <div id="appendLink" class="column">
        <h2 id="ingredientName"></h2>
        <img id="ingredientImage" src="">
    </div>
    <div class="column">
        <h2>Description</h2>
        <h4 id="ingredientDescription"></h4>
    </div>
</div>
`;

const findDrinksByIngredient = async (name) =>{
    await goToPage('Search', '');
    let options = document.getElementById('type').children;
    options[0].removeAttribute("selected");
    options[1].setAttribute("selected", true);
    await enableValueSelect();
    let selected = document.getElementById(name);
    document.getElementById('value').children[0].removeAttribute("selected");
    // Some Ingredients are not supported in getAllIngredients Call
    if(selected != null)
        selected.setAttribute("selected",true);
    else 
        document.getElementById('value').innerHTML += `<option selected id="${name}" value="${name}">${name}</option>`;
    filter();
};

let prepareIngredientView = async () =>{
    let ingredient = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=' + currentIngredientId).then(response => response.json());
    ingredient = ingredient.ingredients[0];
    
    document.getElementById('ingredientName').innerHTML = ingredient.strIngredient;
    document.getElementById('ingredientDescription').innerHTML = ingredient.strDescription == undefined ? 'No description was found :(' : ingredient.strDescription;
    document.getElementById('ingredientImage').src = 'https://www.thecocktaildb.com/images/ingredients/' + ingredient.strIngredient + '.png';
    document.getElementById('appendLink').innerHTML += `<h3 class="drinksLink" 
                                                            onclick="findDrinksByIngredient('`+ ingredient.strIngredient +`')">
                                                            Show drinks with this ingredient</h3>`;
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Gathering Every Page's Information into one object
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let pages = {
    Home: {html:homePage, prepare: () =>{prepareHome()}},
    Search: {html:searchPage, prepare: () =>{}},
    Credits: {html:CreditsPage, prepare: () =>{}},
    AboutUs: {html:aboutUsPage, prepare: () =>{}},
    Contact: {html:contactPage, prepare: () =>{prepareContact()}},
    DrinkView: {html:DrinkViewPage, prepare: ()=>{prepareDrinkView()}},
    IngredientView: {html:IngredientViewPage, prepare: ()=>{prepareIngredientView()}}
};
