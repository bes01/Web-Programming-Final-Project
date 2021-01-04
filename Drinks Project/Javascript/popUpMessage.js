let showMessage = (text, code) =>{
    let message = document.getElementById('message');
    message.innerHTML = text;

    let box = document.getElementById('box');
    box.className += " " + code;
    box.style.display = 'block';

    let overLay = document.getElementById('overLay');
    overLay.style.display = 'block';

    document.body.className ="disableScroll"
}

let closeMessage = () =>{
    let messageBox = document.getElementById('overLay');
    document.body.className ="";
    messageBox.style.display = 'none';

    let box = document.getElementById('box');
    box.className = "box";
    box.style.display = 'none';
}

let prepareMessage = () =>{
    document.getElementById('closeMessage').addEventListener('click', () =>{closeMessage()});
    // document.getElementById('overLay').addEventListener('click', () =>{closeMessage()});
}