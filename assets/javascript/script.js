console.log("Hi")


var productsData;

$(document).ready(function(){
    // -------------------- products ---------------------
    $productsData = $('#productsTarget');
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
                <img  src="${product.images[1]}" alt="${product.productName}"/>
                <!-- <span class="featured-search-icon" 
                data-toggle="modal" 
                data-target="#productModal"><i class="fas fa-search"></i></span> -->
                <a href="#" class="featured-store-link text-captilaze">add to cart</a>
            </div>
            <h6 class="text-capitalize text-center my-2">${product.productName}</h6>
            <h6 class="text-center"><span class="text-muted old-price mx-2">${product.oldPrice}</span><span>$${product.price}</span></h6>
        </div>
        <!-- end single product -->
    
    `
};

function getAllProductHtml(products){
    console.log(products)
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

