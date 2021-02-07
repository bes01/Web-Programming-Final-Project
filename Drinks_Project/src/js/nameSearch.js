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

    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + value;
    let drinks = await fetch(url).then(response => response.json());
    await goToPage('Search', 'animate__zoomIn')

    if(drinks.drinks != null)
        renderDrinks(drinks.drinks);
    else 
        document.getElementById('result').innerHTML = `<h4>No drinks were found with provided name :(</h4>`;
}


let prepareSearch = ()=>{
    document.getElementById('searchButton').addEventListener('click', () => searchByName())
    document.getElementById('searchDrink').addEventListener('keydown', (event) => {
        if(event.keyCode == 13)
            searchByName();
    })
}