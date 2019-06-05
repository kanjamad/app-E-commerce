console.log("Hi")


const $productsData = $('#productsTarget');

$(document).ready(function(){
    // -------------------- products ---------------------
    $.ajax({
        method: "GET",
        url: "https://kanjamadapishopping.herokuapp.com/api/products",
        success: handleSuccess,
        error: handleError
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
            <h6 class="text-center"><span class="text-muted old-price mx-2">${product.oldPrice}</span><span>$${product.price}</span></h6>
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
    renderProduct(json.data);
};


function handleError(e){
    console.log('uh oh');
    $('#productsTarget').text('Failed to load products, is the server working?');
};

// ------------------------ get product to order ------------------

$($productsData).on("click", function(e) {
    // e.preventDefault();
    if (e.target.classList.contains('click-order')) {
        console.log(" Yay!!!!!!!!!!........WOOOOHOOOOO I get to order stuff.......");
        console.log('Product ID = ', e.target.getAttribute('data-id'))
    }
});