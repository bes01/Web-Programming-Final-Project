let showMessage = (text, code) =>{
    let message = document.getElementById('message');
    message.innerHTML = text;

    let box = document.getElementById('box');
    box.className = "box animate__animated animate__zoomIn " + code;
    box.style.display = 'block';

    let overLay = document.getElementById('overLay');
    overLay.style.display = 'block';

    document.body.className ="disableScroll"
}

let closeMessage = () =>{
    let messageBox = document.getElementById('overLay');
    document.body.className ="";

    let box = document.getElementById('box');
    box.className += " animate__animated animate__zoomOut";

    setTimeout(function() {
        messageBox.style.display = 'none';
        box.style.display = 'none';
    }, 500);
}

let prepareMessage = () =>{
    document.getElementById('closeMessage').addEventListener('click', () =>{closeMessage()});
    // document.getElementById('overLay').addEventListener('click', () =>{closeMessage()});
}