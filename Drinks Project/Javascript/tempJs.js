/* 
   Filtering Functionality
*/
let opened = false;
let opendBy = '';
let filter = {
    categories: [],
    glass: [],
    ingredients: [],
    alcoholic: []
}

let filterOptions = (e) =>{
    let option = e.target.innerHTML;
    let filterOptions = document.getElementsByClassName("filterOptions")[0]
    
    if(!opened){
        filterOptions.style.display = 'block'
        opened = true;
        opendBy = option;
    }else if(opened && opendBy == option){ 
        filterOptions.style.display = 'none'
        opened = false;
    } else {
        opendBy = option
    }
    // TODO: List Options after call to toggle and save them
    if(opened){
        switch(option) {
            case 'Category':
                filterOptions.innerHTML = "<h5>კატეგორიაა</h5>"
                break;
            case 'Glass':
                filterOptions.innerHTML = "<h5>ჭიქაა</h5>"
                break;
            case 'Ingredient':
                filterOptions.innerHTML = "<h5>ინგრედიენტიი</h5>"
                break;
            case 'Alcoholic':
                filterOptions.innerHTML = "<h5>ალკოჰოლიანობა</h5>"
                break;
        }
    }
}

/* 
    SearchFunction
*/
let searchFn = () =>{
    let input = document.getElementById("searchDrink");
    console.log(input.value)
    input.value = '';
}

window.onload = () =>{
    let filters = document.querySelectorAll(".filter")
    for( let i = 0; i < filters.length; i++)
        filters[i].addEventListener('click', filterOptions);

    document.getElementById('searchButton').addEventListener('click', searchFn)
}
