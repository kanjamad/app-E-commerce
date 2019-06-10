console.log("hi.....filter")
// filter buttons
// $(document).ready(function(){
// select all filter buttons
// const filterBtn = document.querySelectorAll(".filter-btn");
// console.log(filterBtn)

// filterBtn.forEach(function(btn){
//     btn.addEventListener("click", function(e){
//         e.preventDefault();

//     })
// })

// ----------- search box ------------

 //target search box
const search = document.getElementById("search-item");

search.addEventListener("keyup", function() {
    let value = search.value.toLowerCase().trim();

    const items = document.querySelectorAll(".store-item");
    items.forEach(function(item) {
        let type = item.dataset.item;
     // console.log(type);

     // if (type.includes(value)) {
     //   item.style.display = "block";
     // } else {
     //   item.style.display = "none";
     // }
     // length of input
        let length = value.length;
     // remove the part of type string
        let match = type.slice(0, length);
        if (value === match) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});

