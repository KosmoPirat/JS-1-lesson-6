"use strict";

let basket = {
    goodList: [],

    countTotalPrice() {
        let totalPrice = 0;
        this.goodList.forEach( function(element, index) {
            totalPrice += element.price;
        });
        return totalPrice;

    },

    countTotalNumber() {
        let totalNumber = 0;
        this.goodList.forEach(function(element, index) {
            totalNumber++;
        });
        return totalNumber;
    },

    putToBasket(good) {
        let idx = this.goodList.findIndex(function(elem) {
            return elem.name === good.name;
        });
        if (idx === -1) {
            this.goodList.push(Object.assign({}, good));
            this.goodList[this.goodList.length - 1].count = 1;
        } else {
            this.goodList[idx].count += 1;
        }
    },

    generateGoodHtml(index) {
        let currentGood = this.goodList[index];
        return `<li>${index+1}. ${currentGood.name} - ${currentGood.price}</li>`;
    },

    printBasketTotalValues() {
        let basketDiv = document.querySelector('#basket');
        let goodListStr = 'Корзина пуста';
        if (this.goodList.length > 0) {
            goodListStr = '<ul>';
            for (let i = 0; i < this.goodList.length; i++) {
                goodListStr += this.generateGoodHtml(i);
            }
            goodListStr += `<p>В корзине ${this.countTotalNumber()} товаров на ${this.countTotalPrice()} рублей.</p>`
        }
        basketDiv.innerHTML = goodListStr;
    }
};

let goodsList = [
    {
        name: "Fish",
        price: 20
    },
    {
        name: "Meat",
        price: 150
    },
    {
        name: "Chips",
        price: 30
    }

];

goodsList.forEach(function(item, index){
    basket.putToBasket(item);
    if (index % 2 == 1) {
        basket.putToBasket(item)
    }
});

basket.printBasketTotalValues();

