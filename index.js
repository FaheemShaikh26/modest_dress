document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.closest('.product-block').querySelector('img').src;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: name, price: price, quantity: 1, image: image });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(name + " added to cart!");
        });
    });
});
