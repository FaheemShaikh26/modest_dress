document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cartContainer');
    const cartTotalElement = document.getElementById('cartTotal');
    const clearCartBtn = document.getElementById('clearCartBtn');

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-cart-msg';
            emptyMsg.innerText = 'Your cart is currently empty.';
            cartContainer.appendChild(emptyMsg);
            cartTotalElement.innerText = '0.00';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-card';

            const imgSrc = item.image ? item.image : 'https://images.unsplash.com/photo-1550503195-2eb42a20fc21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

            itemElement.innerHTML = `
                <img src="${imgSrc}" alt="${item.name}">
                <div class="cart-card-name">${item.name}</div>
                <div class="cart-card-price">₹${item.price.toLocaleString('en-IN')}</div>
                <div class="cart-card-actions">
                    <div class="cart-card-quantity">Qty: ${item.quantity}</div>
                    <div class="cart-card-total">₹${itemTotal.toLocaleString('en-IN')}</div>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(itemElement);
        });

        cartTotalElement.innerText = total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const indexToRemove = parseInt(this.getAttribute('data-index'));
                cart.splice(indexToRemove, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    clearCartBtn.addEventListener('click', function () {
        localStorage.removeItem('cart');
        renderCart();
    });

    renderCart();
});
