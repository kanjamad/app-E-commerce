console.log("Hi i'm user")

const $userData = $('#userTarget');
const $userProfileForm = $('#profileForm');

$(document).ready(function(){
    // -------------------- Get User ---------------------
    const userId = localStorage.getItem('ap_user');
    console.log('USERID = ', userId);
    $.ajax({
        method: "GET",
        url: `https://kanjamadapishopping.herokuapp.com/api/users/${userId}`,
        success: userSuccess,
        error: userError
    });


    // --------------------- Update User ----------------------
    $("#profileForm").on("submit", function(e) {
        e.preventDefault();
        console.log('Edit form ...', $userProfileForm.serialize());

    $.ajax({
        method: "PUT",
        url:`https://kanjamadapishopping.herokuapp.com/api/users/${userId}`,
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
        <button  type="submit" class="btn btn-sm btn-light col" id="edit" data-toggle="modal" data-target="#update">Edit</button>
    </div>

    <div class="mt-5">
        <p class="text-white text-center">
            Want to shopping more?
            <a href="index.html" data-dismiss="modal" aria-hidden="true" class="text-warning">Continue Shopping</a>
        </p>    
    </div>

    `
};

function getProfileFormHtml(user){
    return `
    <div class="form-group">
        <input id="userFullName" type="text" class="form-control form-control-sm bg-light" name="fullName" value="${user.fullName}" placeholder="Full Name">
    </div>

    <div class="form-group">
        <input id="userEmail" type="email" class="form-control form-control-sm bg-light" name="email" value="${user.email}" placeholder="Email">
    </div>

    <div class="form-group">
        <input id="userPassword" type="password"  class="form-control form-control-sm bg-light" name="password" value="${user.password}" placeholder="Enter New Password" >
    </div>

    <div class="form-group">
        <input id="userPassword2" type="password"  class="form-control form-control-sm bg-light" name="password2" value="" placeholder="Confirm Password" >
    </div>

    <div class="form-group">

        <select class="form-control form-control-sm bg-light" for="gender"  name="gender" id="gender">
                <option value="">Your gender</option>
                <option ${user.gender === "Female" ? 'selected' : null} value="F">Female</option>
                <option ${user.gender === "Male" ? 'selected' : null} value="M">Male</option>
            </select>
    </div>

    <div class="mt-5">
        <button  type="submit" class="btn btn-sm btn-light col" id="updateProfile">Save</button>
    </div>

    <div class="mt-5">
        <p class="text-white text-center">
            Want to shopping more?
            <a href="index.html" data-dismiss="modal" aria-hidden="true" class="text-warning">Continue Shopping</a>
        </p>    
    </div>
    `;
};

// function getAllUserHtml(user){
//     // console.log(user)
//     return user.map(getUserHtml).join("");
// };

function renderUser(userArr){
    $userData.empty();
    const userHtml = getUserHtml(userArr);
    $userData.append(userHtml);
};

function renderProfileForm(userObj){
    $userProfileForm.empty();
    const profileFormHtml = getProfileFormHtml(userObj);
    $userProfileForm.append(profileFormHtml);
};

function userSuccess(json){
    console.log(json.data);
    user = json.data;
    renderUser(json.data);
    renderProfileForm(json.data);
    // window.location.pathname = '/editProfile.html';
};



function userError(e){
    console.log('uh oh', e);
    $('#userTarget').text('Failed to load User, is the server working?');
};

// ----------------------- Update User---------------------------

function updateSuccess(res){
    console.log(res);
    console.log(window.location.pathname);
    // window.location.pathname = "/editProfile.html";
        // success page pop up!!
}
function updateError(err){
    console.log(`Error: ${err}`)
}





