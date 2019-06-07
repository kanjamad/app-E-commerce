console.log("Hi i'm user")

const $userData = $('#userTarget');

$(document).ready(function(){
    // -------------------- Get User ---------------------
    $.ajax({
        method: "GET",
        url: "https://kanjamadapishopping.herokuapp.com/api/users",
        success: userSuccess,
        error: userError
    });


    // --------------------- Update User ----------------------
    $("#profileForm").on("submit", function(e) {
        e.preventDefault();
        console.log('Edit form ...')

    $.ajax({
        method: "POST",
        url:"https://kanjamadapishopping.herokuapp.com/api/users",
        data: JSON.stringify({
            fullName: $('#userFullName').val(),
            email: $('#userEmail').val(),
            password: $('#userPassword').val(),
            password2: $('#userPassword2').val(),
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: updateSuccess,
        error: updateError,
        });
    });

});

// ----------------------- user ------------------------

function getUserHtml(user){
    return `
    <form class="mt-5"  >
    
    <div class="form-group">
        <input  type="text" class="form-control form-control-sm bg-light" name="fullName" placeholder="${user.fullName}"/>
    </div>

    <div class="form-group">
        <input  type="email" class="form-control form-control-sm bg-light" name="email" placeholder="${user.email}"/>
    </div>

    <div class="form-group">
        <input  type="text" class="form-control form-control-sm bg-light" name="gender" placeholder="${user.gender}"/>
    </div>

    <div class="mt-5">
        <button  type="submit" class="btn btn-sm btn-light col" data-toggle="modal" data-target="#editProfile" id="edit">Edit</button>
    </div>

    <div class="mt-5">
        <p class="text-white text-center">
            Want to shopping more?
            <a href="index.html" data-dismiss="modal" aria-hidden="true" class="text-warning">Continue Shopping</a>
        </p>    
    </div>

</form>
    `
};

function getAllUserHtml(user){
    // console.log(user)
    return user.map(getUserHtml).join("");
};

function renderUser(userArr){
    $userData.empty();
    const userHtml = getAllUserHtml(userArr);
    $userData.append(userHtml);
};

function userSuccess(json){
    console.log(json.data);
    user = json.data;
    renderUser(json.data);

};

function userError(e){
    console.log('uh oh');
    $('#userTarget').text('Failed to load User, is the server working?');
};

// ----------------------- Update User---------------------------

function updateSuccess(res){
    console.log(window);
    console.log(window.location.pathname);
    // window.location.pathname = '/index.html';
        // success page pop up!!
}
function updateError(err){
    console.log(`Error: ${err}`)
}





