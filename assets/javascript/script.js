console.log("Hi")


const $productsData = $('#productsTarget');
// cart
let products = [];
// let cart = [];

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

// --------- save product to localStorage ---------------
    // const products = JSON.stringify(json.data);
    // localStorage.setItem('productOrder', products);
    // const productStoredOrder = localStorage.getItem('productOrder');
    // const productOrderObj = JSON.parse(productStoredOrder)
    // console.log(productOrderObj)
    
// ----------get product id from localStorage -------------    
    // result ={}
    // for (var i =0; i< productOrderObj.lenght; i++){
    //     result[productOrderObj[i].id] = productOrderObj[i];
    // }
    // console.log(result);

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


    // --------- save user to localStorage
    const userOrder = JSON.stringify([{id: 'alsdfjaodskh98830', price: '10.00', name: 'Product One', images: 'http://someurl.com'}]);
    localStorage.setItem('userorder', userOrder);
    const userStoredOrder = localStorage.getItem('userorder');
    const userOrderObj = JSON.parse(userStoredOrder)
    console.log(userOrderObj)

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

// ------------------------------------------------------- 


// ----------------------- Add Product to the Cart---------------------------
// get product from products *done
// add product to the cart *done
// save cart in localStorage *done
// set cart values
// display cart item
// show the cart

