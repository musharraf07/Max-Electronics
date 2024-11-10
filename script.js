// Wait for the DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Small image click handler
    var MainImg = document.getElementById("Main-Img");
    var smallimg = document.getElementsByClassName("small-img");

    for (var i = 0; i < smallimg.length; i++) {
        smallimg[i].onclick = function () {
            MainImg.src = this.src;
        };
    }

    // Add event listeners for remove buttons, quantity inputs, and add-to-cart buttons
    const removeCartItemBtn = document.getElementsByClassName('remove-btn');
    for (let i = 0; i < removeCartItemBtn.length; i++) {
        const button = removeCartItemBtn[i];
        button.addEventListener('click', removeCartItem);
    }

    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    const addToCarBtn = document.getElementsByClassName('button');
    for (let i = 0; i < addToCarBtn.length; i++) {
        const button = addToCarBtn[i];
        button.addEventListener('click', addToCartClicked);
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('Thankyou for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// Remove item from cart
function removeCartItem(e) {
    const buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// Handle quantity changes
function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// Handle adding item to cart
function addToCartClicked(e) {
    let button = e.target;
    let shopItem = button.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

// Add item to cart
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // console.log(cartItems);
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    for(let i =0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('This item is already added to cart')
            return
        }
    }  

    
    // Add the new cart row content
    let cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn remove-btn" type="button">REMOVE</button>
        </div> 
    `;

    cartRow.innerHTML = cartRowContent;
    // console.log(cartRow);
    
    cartItems.append(cartRow);

    // Add event listeners for remove button and quantity input
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

// Update the total price of the cart
function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    if (!cartItemContainer) {
        console.error('Cart items container not found!');
        return;
    }

    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let totalPrice = 0;

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        let price = parseFloat(priceElement.innerText.replace('Rs', ''));
        let quantity = quantityElement.value;

        totalPrice += (price * quantity);
    }

    totalPrice = Math.round(totalPrice * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs' + totalPrice;
}
