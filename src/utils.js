function newElement(element, classname, text){
    let creation = document.createElement(element);
    classname !== undefined ? creation.classList.add(classname) : false;
    creation.textContent = text !== undefined ? text : '';
    return creation;
}

function createImage(src){
    let creation = document.createElement('img');
    creation.src = src;
    return creation;
}

export{
    newElement,
    createImage,
}