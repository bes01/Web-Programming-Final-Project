let searchByName = async () => {
    let input = document.getElementById('searchDrink');
    let value = input.value;

    if(value.length == 0){
        showMessage('Please, enter the drink name.', 'error');
        return;
    }
    if(value.trim().length == 0){
        showMessage('Please, enter the drink name, not whitespaces.', 'error');
        return;
    }
    input.value = '';

    goToPage('Search', 'animate__zoomIn')
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + value;
    let drinks = await fetch(url).then(response => response.json());
    renderDrinks(drinks.drinks)
}


let prepareSearch = ()=>{
    document.getElementById('searchButton').addEventListener('click', () => searchByName())
    document.getElementById('searchDrink').addEventListener('keydown', (event) => {
        if(event.keyCode == 13)
            searchByName();
    })
}