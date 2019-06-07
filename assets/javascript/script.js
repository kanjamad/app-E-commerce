console.log("Hi")



let products = [];
const $orderData = $('#ordersTarget');
const $productsData = $('#productsTarget');

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
            <h6 class="text-center"><span class="text-muted old-price mx-2">${product.oldPrice}</span><span>${product.price}</span></h6>
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
    // e.preventDefault();
    if (e.target.classList.contains('click-order')) {
        let cart;
        if (localStorage.getItem('productOrder')) {
            cart = JSON.parse(localStorage.getItem('productOrder'));
        } else {
            cart = [];
        }
        const product = products.filter(item => item._id === e.target.getAttribute('data-id'))[0];
        cart.push(product);
        localStorage.setItem('productOrder', JSON.stringify(cart));
    }

});

// ----------------------- login ---------------------------

function loginSuccess(res){
    console.log(window);
    console.log(window.location.pathname);
    window.location.pathname = '/shipping.html';


    // --------- save user to localStorage ------------------
    // const userOrder = JSON.stringify(res.data);
    // localStorage.setItem('userorder', userOrder);
    // const userStoredOrder = localStorage.getItem('userorder');
    // const userOrderObj = JSON.parse(userStoredOrder)
    // console.log(userOrderObj)

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
            <p>${product.price}</p>
        </div>
        <!-- end of single column -->
        <!-- single column -->
        <div class="col-10 mx-auto col-md-2">
            <!-- cart buttons -->
            <div class="d-flex justify-content-center align-items-center">
                <span class="btn btn-black mx-1 removeOrder"  >-</span>
                <span class="btn btn-black mx-1">2</span>
                <span class="btn btn-black mx-1 addOrder"  >+</span>
            </div>
            <!-- end of cart buttons -->
        </div>
        <!-- end of single column -->
            <!-- single column -->
        <div class="col-10 mx-auto col-md-2">
            <p >$42.00</p>
        </div>
        <!-- end of single column -->
    `
};

function getAllProductLocalHtml(orders){
    // console.log(orders)
    return orders.map(createProductTemplate).join("");
};

function renderOrder(ordersArr){
    $orderData.empty();
    const ordersHtml = getAllProductLocalHtml(ordersArr);
    $orderData.append(ordersHtml);
};


function orderError(e){
    console.log('uh oh');
    $('#ordersTarget').text('Failed to load orders, is the server working?');
};

// --------------------- Cart fanctionality -----------------

// $($orderData).on("click", function(e){
//     if (e.target.classList.contains("addOrder")) {
//         let order;
//         if (localStorage.getItem('productOrder')) {
//             order = JSON.parse(localStorage.getItem('productOrder'));
//         } else {
//             order = [];
//         }
//         const tempProduct = products.filter(item => item._id === e.target.getAttribute('data-id'))[0];
//         tempProduct +1;
//         order.push(tempProduct);
//         localStorage.setItem('productOrder', JSON.stringify(order));
//     } else if (e.target.classList.contains("removeOrder")) {
//             let order;
//         if (localStorage.getItem('productOrder')) {
//             order = JSON.parse(localStorage.getItem('productOrder'));
//         } else {
//             order = [];
//         }
//         const tempProduct = products.filter(item => item._id === e.target.getAttribute('data-id'))[0];
//         tempProduct -1;
//         order.push(tempProduct);
//         localStorage.setItem('productOrder', JSON.stringify(order));
        

//     }
// });



