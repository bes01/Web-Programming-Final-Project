let prepareFooter=()=>{let e=document.getElementsByClassName("socialMedia")[0].children;for(let n=0;n<e.length;n++)e[n].addEventListener("mouseover",(()=>{e[n].src="Drinks_Project/dist/images/Footer/"+e[n].id+"_hover.png"})),e[n].addEventListener("mouseout",(()=>{e[n].src="Drinks_Project/dist/images/Footer/"+e[n].id+".png"}))},searchByName=async()=>{let e=document.getElementById("searchDrink"),n=e.value;if(0==n.length)return void showMessage("Please, enter the drink name.","error");if(0==n.trim().length)return void showMessage("Please, enter the drink name, not whitespaces.","error");e.value="";let t="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+n,i=await fetch(t).then((e=>e.json()));await goToPage("Search","animate__zoomIn"),null!=i.drinks?renderDrinks(i.drinks):document.getElementById("result").innerHTML="<h4>No drinks were found with provided name :(</h4>"},prepareSearch=()=>{document.getElementById("searchButton").addEventListener("click",(()=>searchByName())),document.getElementById("searchDrink").addEventListener("keydown",(e=>{13==e.keyCode&&searchByName()}))};const sleep=e=>new Promise((n=>setTimeout(n,e))),markActive=e=>{let n=document.getElementById("menu").children[0].children;for(let t=0;t<n.length;t++)n[t].className="item",n[t].innerHTML==e&&(n[t].className+=" active");document.getElementById("page").innerHTML=e;let t=document.getElementById("burger").children;for(let n=0;n<t.length;n++)t[n].className="",t[n].innerHTML==e&&(t[n].className="active")};let goToPage=async(e,n)=>{"firstLoad"!=n&&(currentDrinkId=-1,document.getElementById("ingredientPage").className="innerContent animate__animated animate__fadeOutLeft",document.getElementById("drinkPage").className="innerContent animate__animated animate__fadeOutLeft",document.getElementById("activePage").className="innerContent animate__animated animate__fadeOutLeft",await sleep(300)),document.getElementById("ingredientPage").style.display="none",document.getElementById("drinkPage").style.display="none",pageKey=e.split(" ").join("");let t=pages[pageKey].html;document.getElementById("activePage").innerHTML=t,"firstLoad"!=n&&(document.getElementById("activePage").className="innerContent animate__animated animate__fadeInRight",document.getElementById("activePage").style.display="block"),markActive(e),pages[pageKey].prepare()},goToDrinkPage=async(e,n)=>{document.getElementById("activePage").className="innerContent animate__animated animate__fadeOutRight",await sleep(300),document.getElementById("activePage").style.display="none",pageKey=e.split(" ").join("");let t=pages[pageKey].html;document.getElementById("drinkPage").innerHTML=t,document.getElementById("drinkPage").className="innerContent animate__animated animate__fadeInLeft",document.getElementById("drinkPage").style.display="block",pages[pageKey].prepare()},goToIngredientPage=async(e,n)=>{document.getElementById("drinkPage").className="innerContent animate__animated animate__fadeOutRight",document.getElementById("activePage").className="innerContent animate__animated animate__fadeOutRight",await sleep(300),document.getElementById("activePage").style.display="none",document.getElementById("drinkPage").style.display="none",pageKey=e.split(" ").join("");let t=pages[pageKey].html;document.getElementById("ingredientPage").innerHTML=t,document.getElementById("ingredientPage").className="innerContent animate__animated animate__fadeInLeft",document.getElementById("ingredientPage").style.display="block",pages[pageKey].prepare()},showBurger=()=>{let e=document.getElementById("burger");"none"==e.style.display?e.style.display="block":e.style.display="none"},prepareNavigation=()=>{let e=document.getElementById("menu").children[0].children;for(let n=0;n<e.length;n++){let t=e[n].innerHTML;e[n].addEventListener("click",(()=>{goToPage(t,"page")}))}let n=document.getElementById("burger").children;for(let e=0;e<n.length;e++){let t=n[e].innerHTML;n[e].addEventListener("click",(()=>{goToPage(t,"page")}))}document.getElementsByClassName("logo")[0].addEventListener("click",(()=>{goToPage("Home","page")}))},currentDrinkId=-1,currentIngredientId=-1,view=(e,n)=>{"drink"==n?(currentDrinkId=e,goToDrinkPage("Drink View","animate__zoomIn")):(currentIngredientId=e,goToIngredientPage("Ingredient View","animate__zoomIn"))};const homePage='\n<h3>Random Drinks</h3>\n<div class="childContent" id="randomDrinks">\n</div>\n<h3>Popular Drinks</h3>\n<div class="childContent" id="popularDrinks">\n</div>\n<h3>Latest Drinks</h3>\n<div class="childContent" id="latestDrinks">\n</div>\n\n';let controller=new AbortController,{signal:signal}=controller;const prepareDrinkCard=(e,n,t,i)=>{let a=e.description;return a.length>40&&(a=a.substring(0,40)+"..."),'\n    <div id ="'+e.id+'" class="drinkCard  animate__animated animate__zoomIn" style="display:none" onclick="view('+e.id+",'"+i+'\')">\n        <img src="'+e.src+'" >\n        <h3 class="cardTitle">'+e.name+'</h3>\n        <p class="cardText">'+a+"</p>\n    </div>\n    "},prepareDrinksRow=async(e,n)=>{let t="",i=!1;for(let e=0;e<5;e++)if(n)t+='\n                <div class="drinkCard loading" onclick="showMessage(\'Please, be patient. Wait until the card is fully loaded\', \'error\')">\n                    <img src="Drinks_Project/dist/images/Home/cocktail.gif">\n                    <h3 class="cardTitle">Drink</h3>\n                    <p class="cardText">Description here.</p>\n                </div>\n                ';else{let e=await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php",{signal:signal}).then((e=>e.json())).catch((e=>{i=!0}));if(i)return;let n=e.drinks[0];t+=prepareDrinkCard({id:n.idDrink,description:n.strInstructions,src:n.strDrinkThumb,name:n.strDrink},0,0,"drink")}if(null!=document.getElementById(e)&&(document.getElementById(e).innerHTML+=t,!n)){let n=document.getElementById(e);if(null!=n){n=n.children;for(let e=0;e<10;e++)n[e].style.display=e<5?"none":"inline-block"}}},prepareIngredientRow=async(e,n)=>{let t="",i=!1;for(let e=0;e<5;e++)if(n)t+='\n            <div class="drinkCard loading" onclick="showMessage(\'Please, be patient. Wait until the card is fully loaded\', \'error\')">\n                <img src="Drinks_Project/dist/images/Home/cocktail.gif">\n                <h3 class="cardTitle">Drink</h3>\n                <p class="cardText">Description here.</p>\n            </div>\n            ';else{let n=await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid="+(e+1),{signal:signal}).then((e=>e.json())).catch((e=>{i=!0}));if(i)return;let a=n.ingredients[0];t+=prepareDrinkCard({id:a.idIngredient,description:a.strDescription,src:"https://www.thecocktaildb.com/Drinks_Project/dist/images/ingredients/"+a.strIngredient+"-Medium.png",name:a.strIngredient},0,0,"ingredient")}if(null!=document.getElementById(e)&&(document.getElementById(e).innerHTML+=t,!n)){let n=document.getElementById(e);if(null!=n){n=n.children;for(let e=0;e<10;e++)n[e].style.display=e<5?"none":"inline-block"}}},changeRowIds=(e,n)=>{document.getElementById(e).id=e+n},prepareHome=async()=>{controller.abort(),controller=new AbortController,signal=controller.signal;let e=["randomDrinks","popularDrinks","latestDrinks"];for(let n=0;n<3;n++){let t=Math.random();changeRowIds(e[n],t),e[n]+=t}prepareDrinksRow(e[0],!0),prepareDrinksRow(e[1],!0),prepareDrinksRow(e[2],!0),prepareDrinksRow(e[0],!1),prepareDrinksRow(e[1],!1),prepareDrinksRow(e[2],!1)},searchPage='\n<div class="filter">\n    <select id=\'type\' class="select" onchange="enableValueSelect()">\n        <option value="" selected disabled hidden>Type</option>\n        <option value="i">Ingredient</option>\n        <option value="a">Alcoholic</option>\n        <option value="c">Category</option>\n        <option value="g">Glass</option>\n    </select>\n    <select id=\'value\' disabled>\n        <option value="" selected disabled hidden>Value</option>\n    </select>\n    <div class="filterButton" onclick="filter()">\n        Filter\n    </div>\n</div>\n<div class="result">\n    <h3>Results</h3>\n    <div id="result">\n        <h4>No drinks were searched yet :)</h4>\n    </div>\n</div>\n';let enableValueSelect=async()=>{let e=document.getElementById("type"),n="https://www.thecocktaildb.com/api/json/v1/1/list.php?"+e.value+"=list",t=await fetch(n).then((e=>e.json())),i=document.getElementById("value");i.innerHTML='<option value="" selected disabled hidden>Value</option>',i.disabled=!0,t=Object.values(t)[0];for(let e=0;e<t.length;e++)t[e]=Object.values(t[e])[0];t.sort();let a=0;for("g"==e.value&&a++;a<t.length;a++)i.innerHTML+=`\n                <option id="${t[a]}" value="${t[a]}">${t[a]}</option>\n            `;i.disabled=!1},renderDrinks=e=>{let n="";for(let t=0;t<e.length;t++)n+=`\n        <div id ="${e[t].idDrink}" class="drinkCard" onclick="view('${e[t].idDrink}','drink');">\n            <img src="${e[t].strDrinkThumb}" >\n            <h3 class="cardTitle">${e[t].strDrink}</h3>\n        </div>\n        `;document.getElementById("result").innerHTML=n},filter=async()=>{let e=document.getElementById("type"),n=document.getElementById("value");if(""==e.value)return void showMessage("Please, first select type of search.","error");if(""==n.value)return void showMessage("Ensure, you have entered the value field.","error");n=n.value.split(" ").join("_");let t="https://www.thecocktaildb.com/api/json/v1/1/filter.php?"+e.value+"="+n,i=await fetch(t).then((e=>e.json()));i=i.drinks,renderDrinks(i)};const CreditsPage='\n<div class="creditRow">\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/google.png">\n        <h3> Special thanks to <a href="https://www.google.com/" target="_blank"> Google</a> for everything.</h3>\n    </div>\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/gulp.png">\n        <h3> Thanks <a href="https://gulpjs.com/" target="_blank"> Gulp</a> for optimizations.</h3>\n    </div>\n</div>\n<div class="creditRow">\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/cocktail_db.png">\n        <h3> Thanks <a href="https://www.thecocktaildb.com/" target="_blank"> The Cocktail DB</a> for the drink jasons.</h3>\n    </div>\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/animation.png">\n        <h3>Thanks <a href="https://animate.style/" target="_blank"> Animatte.css</a> for cool css animations.</h3>\n    </div>\n</div>\n<div class="creditRow">\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/icons.png">\n        <h3> Thanks <a href="https://www.flaticon.com/" target="_blank"> FlatIcon</a> for fancy footer icons.</h3>\n    </div>\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/picresize.png">\n        <h3> Thanks <a href="https://picresize.com/" target="_blank"> PicResize</a> for resizing static images.</h3>\n    </div>\n</div>\n<div class="creditRow">\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/text_generator.png">\n        <h3> Thanks <a href="https://www.blindtextgenerator.com/lorem-ipsum" target="_blank"> Blind Text Generator</a> for random texts.</h3>\n    </div>\n    <div class="credit">\n        <img src="Drinks_Project/dist/images/Credits/u_might_not_need_jquery.png">\n        <h3> And thanks <a href="http://youmightnotneedjquery.com/" target="_blank">Y.M.N.N.jQ.</a> for not using jQuery.</h3>\n    </div>\n</div>\n',aboutUsPage='\n<h3 class="centerText" >Who We Are</h3>\n<div style="width: 100%;">\n    <div class="row">\n        <img src="Drinks_Project/dist/images/AboutUs/who_we_are.jpg">\t\n        <p>\n            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.     \n        </p>\n    </div>\n</div>\n<h3 class="centerText" >Why you should use our Website</h3>\n<div style="width: 100%;">\n    <div class="row">\n        <p>\n            On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.     \n        </p>\n        <img src="Drinks_Project/dist/images/AboutUs/why_you_should_use_our_website.jpg">\t\n    </div>\n</div>\n<h3 class="centerText" >Future Visions</h3>\n<div style="width: 100%;">\n    <div class="row">\n        <img src="Drinks_Project/dist/images/AboutUs/future_visions.jpg">\t\n        <p>\n            The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.  \n        </p>\t\n    </div>\n</div>\n',contactPage='\n<div class="contact">\n    <div class="left">\n        <div class="contactImgDiv">\n            <img class="contactImg" src="Drinks_Project/dist/images/Contact/contact.gif">\t\n        </div>\n        <h3>Contact methods:</h3>\n        <h4>Phone1: <a href="tel:0322 45 87 56">0322 45 87 56</a></h4>\n        <h4>Phone2: <a href="tel:899 34 87 11">899 34 87 11</a></h4>\n        <h4>Email: <a href="mailto:drinks@freeuni.edu.ge">drinks@freeuni.edu.ge</a></h4>\n        <h4>Address: \n        <a \n        href="https://www.google.com/maps/place/Kakha+Bendukidze+Campus/@41.8057235,44.7657262,17z/data=!3m1!4b1!4m5!3m4!1s0x40446e62e22d2541:0x241361d3d3444c62!8m2!3d41.8057235!4d44.7679149"\n        target="_blank"\n        >\n        240 David Agmashenebeli Alley, Tbilisi\n        </a>\n        </h4>\n    </div>\n    <div class="right">\n        <h3>SEND US A MESSAGE</h3>\n        <input id = "FullName" type="text" placeholder="FullName">\n        <input  id = "Email" type="text" placeholder="Email">\n        <input  id = "Phone" type="text" placeholder="Phone">\n        <textarea  id = "Message" placeholder="Message"></textarea>\n        <span id=\'send\' class="button">SEND</span>\n    </div>\n</div>\n';let prepareContact=()=>{document.getElementById("send").addEventListener("click",(()=>{let e=document.getElementsByClassName("right")[0].children,n=!0;for(let t=1;t<=4;t++){if(0==e[t].value.length){showMessage(e[t].id+" field is empty! Please fill it to send us feedback.","error"),n=!n;break}if(!e[t].value.trim()){showMessage(e[t].id+" field contains only whitespaces! Please fill it properly to send us feedback.","error"),n=!n;break}}if(n){for(let n=1;n<=4;n++)e[n].value="";showMessage("Thanks for your feedback!","success")}}))};const goBackFromDrinkView=()=>{let e=document.getElementById("activePage");document.getElementById("drinkPage").className="innerContent animate__animated animate__fadeOutLeft",setTimeout((()=>{document.getElementById("drinkPage").style.display="none",e.className="innerContent animate__animated animate__fadeInRight",e.style.display="block"}),500)},DrinkViewPage='<div onclick="goBackFromDrinkView()" class="back"><h3 >&Larr;</h3></div>\n<div class="centerRow">\n    <div class="column"  style="text-align: center;">\n        <h2 id=\'drinkName\' ></h2>\n        <img id =\'drinkImage\'  class="drinkImg" >\n    </div>\n    <div class="column">\n        <h2 style="text-align: center;">Ingredients</h2>\n        <div id=\'ingredients\' class="ingredientColumn">\n        </div>\n    </div>\n</div>\n<div class="ingredientColumn">\n    <h2>Instrucions</h2>\n    <h3 id=\'drinkInstructions\' class="instructions"></h3>\n</div>\n';let linkToIngredient=async e=>{let n=await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i="+e).then((e=>e.json()));view(n.ingredients[0].idIngredient,"ingredient")},prepareDrinkView=async()=>{let e=(await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+currentDrinkId).then((e=>e.json()))).drinks[0];document.getElementById("drinkName").innerHTML=e.strDrink,document.getElementById("drinkImage").src=e.strDrinkThumb,document.getElementById("drinkInstructions").innerHTML=e.strInstructions;let n=[];for(let t=1;t>0&&null!=e["strIngredient"+t];t++)n.push(e["strIngredient"+t]);let t="";for(let e=0;e<n.length;e++)t+=e%2==0?'<div class="ingredientRow">\n                                    <div class="ingredientColumn" >\n                                        <img class="ingredientImg" src="https://www.thecocktaildb.com/images/ingredients/'+n[e]+'-Medium.png">\n                                        <h3 class="link" onclick="linkToIngredient(\''+n[e]+"')\">"+n[e]+"</h3>\n                                    </div>\n                                ":'\n                                    <div class="ingredientColumn" >\n                                        <img class="ingredientImg" src="https://www.thecocktaildb.com/images/ingredients/'+n[e]+'-Medium.png">\n                                        <h3 class="link" onclick="linkToIngredient(\''+n[e]+"')\">"+n[e]+"</h3>\n                                    </div>\n                                </div>    \n                                ";n.length%2==1&&(t+="</div>"),document.getElementById("ingredients").innerHTML=t};const goBackFromIngredientView=()=>{let e=-1==currentDrinkId?"activePage":"drinkPage",n=document.getElementById(e);document.getElementById("ingredientPage").className="innerContent animate__animated animate__fadeOutLeft",setTimeout((()=>{document.getElementById("ingredientPage").style.display="none",n.className="innerContent animate__animated animate__fadeInRight",n.style.display="block"}),500)},IngredientViewPage='\n<div class="back" onclick="goBackFromIngredientView()"><h3 >&Larr;</h3></div>\n<div class="ingredientRowVol2">\n    <div id="appendLink" class="column">\n        <h2 id="ingredientName"></h2>\n        <img id="ingredientImage" src="">\n    </div>\n    <div class="column">\n        <h2>Description</h2>\n        <h4 id="ingredientDescription"></h4>\n    </div>\n</div>\n',findDrinksByIngredient=async e=>{await goToPage("Search","");let n=document.getElementById("type").children;n[0].removeAttribute("selected"),n[1].setAttribute("selected",!0),await enableValueSelect();let t=document.getElementById(e);document.getElementById("value").children[0].removeAttribute("selected"),null!=t?t.setAttribute("selected",!0):document.getElementById("value").innerHTML+=`<option selected id="${e}" value="${e}">${e}</option>`,filter()};let prepareIngredientView=async()=>{let e=await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid="+currentIngredientId).then((e=>e.json()));e=e.ingredients[0],document.getElementById("ingredientName").innerHTML=e.strIngredient,document.getElementById("ingredientDescription").innerHTML=null==e.strDescription?"No description was found :(":e.strDescription,document.getElementById("ingredientImage").src="https://www.thecocktaildb.com/images/ingredients/"+e.strIngredient+".png",document.getElementById("appendLink").innerHTML+='<h3 class="drinksLink" \n                                                            onclick="findDrinksByIngredient(\''+e.strIngredient+"')\">\n                                                            Show drinks with this ingredient</h3>"},pages={Home:{html:homePage,prepare:()=>{prepareHome()}},Search:{html:searchPage,prepare:()=>{}},Credits:{html:CreditsPage,prepare:()=>{}},AboutUs:{html:aboutUsPage,prepare:()=>{}},Contact:{html:contactPage,prepare:()=>{prepareContact()}},DrinkView:{html:DrinkViewPage,prepare:()=>{prepareDrinkView()}},IngredientView:{html:IngredientViewPage,prepare:()=>{prepareIngredientView()}}},showMessage=(e,n)=>{document.getElementById("message").innerHTML=e;let t=document.getElementById("box");t.className="box animate__animated animate__zoomIn "+n,t.style.display="block",document.getElementById("overLay").style.display="block",document.body.className="disableScroll"},closeMessage=()=>{let e=document.getElementById("overLay");document.body.className="";let n=document.getElementById("box");n.className+=" animate__animated animate__zoomOut",setTimeout((function(){e.style.display="none",n.style.display="none"}),500)},prepareMessage=()=>{document.getElementById("closeMessage").addEventListener("click",(()=>{closeMessage()}))};
//# sourceMappingURL=all.js.map
