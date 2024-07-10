document.addEventListener("DOMContentLoaded", function() {
    let cart = {};

    // Add item to cart
    function addToCart(itemName, itemPrice) {
        if (cart[itemName]) {
            cart[itemName].quantity += 1;
        } else {
            cart[itemName] = { price: itemPrice, quantity: 1 };
        }
        updateCart();
        updateMenuItemQuantity(itemName);
    }

    // Remove item from cart
    function removeFromCart(itemName) {
        if (cart[itemName]) {
            cart[itemName].quantity -= 1;
            if (cart[itemName].quantity <= 0) {
                delete cart[itemName];
            }
        }
        updateCart();
        updateMenuItemQuantity(itemName);
    }

    // Update cart UI
    function updateCart() {
        const cartContainer = document.getElementById('cart-container');
        const cartTotalHeader = document.getElementById('cart-total-header');
        const cartTotalFooter = document.getElementById('cart-total');
        
        if (cartContainer) cartContainer.innerHTML = '';
        let total = 0;

        for (let item in cart) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item} - $${cart[item].price.toFixed(2)} x ${cart[item].quantity}</span>
                <button onclick="removeFromCart('${item}')">Remove</button>
            `;
            if (cartContainer) cartContainer.appendChild(cartItem);
            total += cart[item].price * cart[item].quantity;
        }

        if (cartTotalHeader) cartTotalHeader.innerHTML = `Total: $${total.toFixed(2)}`;
        if (cartTotalFooter) cartTotalFooter.innerHTML = `Total: $${total.toFixed(2)}`;
    }

    // Update menu item quantity
    function updateMenuItemQuantity(itemName) {
        const itemQuantitySpan = document.getElementById(`quantity-${itemName}`);
        if (itemQuantitySpan) {
            itemQuantitySpan.innerHTML = cart[itemName] ? cart[itemName].quantity : 0;
        }
    }

    // Bind add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(itemName, itemPrice);
        });
    });

    // Bind increase quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(itemName, itemPrice);
        });
    });

    // Expose functions globally for inline event handlers
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
});
