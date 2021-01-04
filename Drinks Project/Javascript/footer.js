let prepareFooter = () =>{
    let socialMedia = document.getElementsByClassName('socialMedia')[0].children;
    for(let i = 0; i < socialMedia.length; i++){
        socialMedia[i].addEventListener('mouseover', ()=>{
            socialMedia[i].src = "../Resources/Footer/" + socialMedia[i].id + "_hover.png"
        })
        socialMedia[i].addEventListener('mouseout', ()=>{
            socialMedia[i].src = "../Resources/Footer/" + socialMedia[i].id + ".png"
        })
    }
}