console.log("Hi...I'm store")

const $orderData = $('#ordersTarget');

$(document).ready(function(){
    // -------------------- get orders from localStorage ---------------------
    const cart = JSON.parse(localStorage.getItem('productOrder'));
    console.log('Local Storage Cart = ', cart);
    renderOrder(cart)

});

// ----------------------- orders ------------------------

function createProductTemplate(product){
    return `
        <!-- single column -->
        <div class="col-10 mx-auto col-md-2">
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
                <span class="btn btn-black mx-1">-</span>
                <span class="btn btn-black mx-1">2</span>
                <span class="btn btn-black mx-1">+</span>
            </div>
            <!-- end of cart buttons -->
        </div>
        <!-- end of single column -->
            <!-- single column -->
        <div class="col-10 mx-auto col-md-2">
            <p>$42.00</p>
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


// ----------------------- Add Product to the Cart---------------------------
// get product from products *done
// add product to the cart *done
// save cart in localStorage *done
// set cart values
// display cart item
// show the cart

