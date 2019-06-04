console.log("Hi")


// get products
let url = "https://kanjamadapishopping.herokuapp.com/api/products";

$.ajax({
    method:"GET",
    url: url,
    dataType: "json"
}).done(gotData)

function gotData(data) {
    console.log(data)
    // $each(data, workData)
}

// function workData(index, dataSET) {
//     $('#main').append('<div class="lead">' + dataSET.images + "this is images from data" + index +  '</div>')
// }