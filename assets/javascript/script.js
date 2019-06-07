console.log("Hi")



let products = [];
const $orderData = $('#ordersTarget');
const $productsData = $('#productsTarget');

let cart;
if (localStorage.getItem('productOrder')) {
    cart = JSON.parse(localStorage.getItem('productOrder'));
} else {
    cart = [];
}

$(document).ready(function(){

    // -------------------- products ---------------------
    $.ajax({
        method: "GET",
        url: "https://kanjamadapishopping.herokuapp.com/api/products",
        success: handleSuccess,
        error: handleError
    });


    // --------------------- login in ----------------------
    $("#loginForm").on("submit", function(e) {
        e.preventDefault();
        console.log('SUBMITTING...')

    $.ajax({
        method: "POST",
        url:"https://kanjamadapishopping.herokuapp.com/api/auth/login",
        data: JSON.stringify({
            email: $('#emailInput').val(),
            password: $('#passwordInput').val(),
            rememberMe: $('#rememberInput').prop('checked'),
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: loginSuccess,
        error: loginError,
        });
    });

    // --------------------- Sign UP ----------------------
    $('#singupForm').on("submit", function(e) {
        e.preventDefault();
        console.log('signUp submit....')
    
        $.ajax({
            method: "POST",
            url: "https://kanjamadapishopping.herokuapp.com/api/auth/signup",
            data: JSON.stringify({
                fullName: $('#fullNameInput').val(),
                email: $('#emailR').val(),
                password: $('#passwordR').val(),
                password2: $('#password2R').val(),
                gender: $('#genderR').val(),
                iAgree: $('#rememberCheckBox-iAgree').prop('checked'),
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: signSuccess,
            error: signError,
        })

    });

    // -------------------- get orders from localStorage ---------------------
    const cartOrder = JSON.parse(localStorage.getItem('productOrder'));
    console.log('Local Storage Cart = ', cartOrder);
    renderOrder(cartOrder)

});

// -------------------- end of document.ready -------------

// ----------------------- login ---------------------------

function loginSuccess(res){
    console.log(window);
    console.log(window.location.pathname);
    alert(JSON.stringify(res))
    localStorage.setItem('ap_user', res.session.currentUser.id);
    window.location.pathname = '/shipping.html';

}
function loginError(err){
    console.log(`Error: ${err}`)
}

// ----------------------- sign Up---------------------------

function signSuccess(res){
    window.location.pathname = '/store.html';
    console.log(res);
}

function signError(err){
    console.log(`Error: ${err}`)
}


// ----------------------- products ------------------------

function getProductHtml(product){
    return `
        <!-- single product -->
        <div class="col-10 mx-auto col-md-6 col-lg-4">
            <div class="featured-container p-5">
                <img class="product-img" src="${product.images[1]}" alt="${product.productName}"/>
                <!-- <span class="featured-search-icon" 
                data-toggle="modal" 
                data-target="#productModal"><i class="fas fa-search"></i></span> -->
                <button class="featured-store-link text-captilaze click-order" data-id=${product._id}><i class="fas fa-shopping-cart"></i> add to cart </button>
            </div>
            <h6 class="text-capitalize text-center my-2">${product.productName}</h6>
            <h6 class="text-center"><span class="text-muted old-price mx-2">${product.oldPrice}</span><span class"product-price">${product.price}</span></h6>
        </div>
        <!-- end single product -->
    `
};

function getAllProductHtml(products){
    // console.log(products)
    return products.map(getProductHtml).join("");
};

function renderProduct(productsArr){
    $productsData.empty();
    const productsHtml = getAllProductHtml(productsArr);
    $productsData.append(productsHtml);
};

function handleSuccess(json){
    console.log(json.data);
    products = json.data;
    renderProduct(json.data);

};

function handleError(e){
    console.log('uh oh');
    $('#productsTarget').text('Failed to load products, is the server working?');
};

// ------------------------ Button get product to order ------------------

$($productsData).on("click", function(e) {
    if (e.target.classList.contains('click-order')) {
        const product = products.filter(item => item._id === e.target.getAttribute('data-id'))[0];
        cart.push(product);
        localStorage.setItem('productOrder', JSON.stringify(cart));
    }
});


// ----------------------- Update Product Quantity -----------------------

$($orderData).on("click", function(e){

    // (+)
    if (e.target.classList.contains("addOrder")) {
        console.log('ADD ORDER');
        let id = e.target.getAttribute('data-id');
        console.log(id);
        let tempProduct = cart.find(product => product._id === id);
        tempProduct.amount = tempProduct.amount ? tempProduct.amount + 1 : tempProduct.amount = 2;
        // tempProduct.price = tempProduct.amount * tempProduct.price;
        localStorage.setItem('productOrder', JSON.stringify(cart));
        renderOrder(cart);
    // (-)
    } else if (e.target.classList.contains("removeOrder")) {
        console.log('REMOVE ORDER');
        let id = e.target.getAttribute('data-id');
        console.log(id);
        let tempProduct = cart.find(product => product._id === id);
        if (tempProduct.amount > 1) {
            tempProduct.amount = tempProduct.amount ? tempProduct.amount -1 : tempProduct.amount = 1;
            // tempProduct.price = tempProduct.price / tempProduct.amount;
            localStorage.setItem('productOrder', JSON.stringify(cart));
            renderOrder(cart);
        }
    }
});


// ----------------------- Add to the Cart---------------------------
// -------- order ------
function createProductTemplate(product){
    return `
        <!-- single column -->
        <div class="col-10 mx-auto col-md-2 my-2">
            <img src="${product.images[1]}" alt="${product.productName}" class="img-fluid" />
        </div>
        <!-- end of single column -->
        <!-- single column -->
        <div class="col-10 mx-auto col-md-4">
            <p>${product.productName}</p>
        </div>
        <!-- end of single column -->
        <!-- single column -->
        <div class="col-10 mx-auto col-md-2">
            <p>US$ ${product.price}</p>
        </div>
        <!-- end of single column -->
        <!-- single column -->
        <div class="col-10 mx-auto col-md-2">
            <!-- cart buttons -->
            <div class="d-flex justify-content-center align-items-center">
                <span class="btn btn-black mx-1 removeOrder" data-id="${product._id}">-</span>
                <span class="btn btn-black mx-1 cart-amount">${product.amount || 1}</span>
                <span class="btn btn-black mx-1 addOrder" data-id="${product._id}">+</span>
            </div>
            <!-- end of cart buttons -->
        </div>
        <!-- end of single column -->
            <!-- single column -->
        <div class="col-10 mx-auto col-md-2">
            <p class="priceTotal" >US$ ${product.amount ? product.price * product.amount : product.price}</p>
        </div>
        <!-- end of single column -->
    `
};

function getAllProductLocalHtml(orders){
    // console.log(orders)
    return orders.map(createProductTemplate).join("");
};

function renderOrder(ordersArr){
    const $cartTotal = $('#cart-total');
    const $pricePay = $('#price-pay');
    $orderData.empty();
    const ordersHtml = getAllProductLocalHtml(ordersArr);
    $orderData.append(ordersHtml);
    let total = 0.00;
    let finalPay = 24;
    cart.forEach(item => {
        const amount = item.amount || 1;
        total += item.price * amount;
    });
    $cartTotal.text(`$${total}`);
    totalAmount = total + finalPay
    $pricePay.text(`$${totalAmount}`);  
};


function orderError(e){
    console.log('uh oh');
    $('#ordersTarget').text('Failed to load orders, is the server working?');
};
