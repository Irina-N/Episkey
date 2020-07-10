//Логику реализации корзины нигде не подглядывала, хотела сама додуматься. Надеюсь, не сильно дров наломала.

"use strict"

const buttons = document.querySelectorAll("button");
const basket = document.querySelector(".basket");
const basketTable = document.querySelector(".basket-table");
const emptyBasketText = document.querySelector(".empty-basket");
const basketTableFoot = document.querySelector(".basaket-table-foot");
const basketSumm = document.getElementById('busketSumm');
const basketContent = {};
let itemInBasketNumber = 0;

//
buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        getProduct(event);
    })
});

//получаем продукт, по которому кликнули
function getProduct(clickedButtonEvent) {
    let productNode = clickedButtonEvent.target.parentNode;
    const product = {
        wrap: productNode,
        id: productNode.id,
        name: productNode.querySelector(".product-name"),
        price: productNode.querySelector(".price"),
        button: productNode.querySelector(".btn"),
    }
    
    putInBasket(product);
}

//создаём в объекте basketContent новый продукт с необходимыми свойствами, перечисленными в массиве. Добавляем информацию в HTML-код.
function putInBasket(product) {
    emptyBasketText.classList.add('hidden');
    basketTable.classList.remove('hidden');
    itemInBasketNumber++;
    basketContent[itemInBasketNumber] = [product.id, product.name.innerText, +product.price.innerText];
    basketTableFoot.insertAdjacentHTML("beforebegin", `<tr><td>${product.id}</td><td>${product.name.innerText}</td><td>${+product.price.innerText} руб.</td></tr>`);
    basketSumm.innerText = `${getSumm(basketContent)} руб.`;
}

//получаем сумму цен товаров в корзине.
function getSumm(object) {
    let summ = 0;
    for (let product in object) {
        summ += object[product][2];
    }
    return summ;
}


