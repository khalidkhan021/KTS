// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoc8Dk6EOOgbwfVDhZAKzyJx6YZLwy1jE",
    authDomain: "startupsolve.firebaseapp.com",
    databaseURL: "https://startupsolve.firebaseio.com",
    projectId: "startupsolve",
    storageBucket: "startupsolve.appspot.com",
    messagingSenderId: "1048986195805"
  };
  firebase.initializeApp(config);


var db = firebase.firestore();
var storage = firebase.storage();
const messaging = firebase.messaging();


///////////////////////////onDonateStart*********************
function onDonate(){
    var par = document.getElementById('uNameError');
var uName = document.getElementById('uName').value;
if(!uName.length){
par.innerHTML='please fill the field'
return false;

}
if(uName.length){
    par.style.display="none";
    }

var par1 = document.getElementById('emError');
var pa = document.getElementById('num');
var cardNo = document.getElementById('cardNo').value;
if(!cardNo.length){
par1.innerHTML='please fill the field'
return false;
}
if(cardNo.length){
    par1.style.display="none";
    }

    if(cardNo.length<16){
        pa.innerHTML='16 number required'
        return false;
        }
        if(cardNo.length==16){
            pa.style.display="none";
            }


var par2 = document.getElementById('pinError');
var pin = document.getElementById('pin').value;

if(!pin.length){
par2.innerHTML='please fill the field'
return false;
}
if(pin.length){
    par2.style.display="none";
    }
   
    

    var par3 = document.getElementById('AmmountP');
var Ammount = document.getElementById('Ammount').value;
if(!Ammount.length){
par3.innerHTML='please fill the field'
return false;
}
if(Ammount.length){
    par3.style.display="none";
    }

    }



    
function out(){
    var par = document.getElementById('uNameError');
   
    
}
///////////////////////////onDonateEnd*********************


/////////////////////////Auth hai signup form ka //////////////
async function onSubmit() {

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var gender1 = document.getElementById("test1").checked;
    var gender2 = document.getElementById("test2").checked;

    var usernameError = document.getElementById("usernameError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var confirmError = document.getElementById("confirmError");
    var genderError = document.getElementById("genderError");

    //user validation
    if (!username.length) {
        usernameError.innerHTML = "Fill this field";
        return false;
    }
    else if (username.length < 4) {
        usernameError.innerHTML = "Username's length should be greater than Three";
        return false;
    }
    else if (username.indexOf(" ") > -1) {
        usernameError.innerHTML = "Space is not allow!";
        return false;
    }
    // email validations
    var atTheRate = email.indexOf("@");
    if (!email.length) {
        emailError.innerHTML = "Fill this field";
        return false;
    }
    else if (atTheRate == -1 || atTheRate >= email.length - 4) {
        emailError.innerHTML = "Invaild Email";
        return false;
    }
    // password validations
    if (!password.length) {
        passwordError.innerHTML = "Fill this field";
        return false;
    }
    else if (password.length <= 6) {
        passwordError.innerHTML = "password must be greater than Six";
        return false;
    }
    //confirm password validations
    if (!confirmPassword.length) {
        confirmError.innerHTML = "Fill this field";
        return false;
    }
    else if (confirmPassword != password) {
        confirmError.innerHTML = "password not match";
        return false;
    }
    if (!gender1 && !gender2) {
        genderError.innerHTML = "Check any above";
        return false;
    }

     try {
         var email = document.getElementById('email').value;
         var name = document.getElementById('username').value;
         var pwd = document.getElementById('confirmPassword').value;
         var res = await firebase.auth().createUserWithEmailAndPassword(email, pwd);
         await db.collection('users').doc(res.user.uid).set({ name, email });
         window.location = '../../index.html';
     } catch (ex) {
         alert(ex);
     }



    return false;
}
  
///////////////////////////// Sigin firestore//////////////

function signIn() {

    if (navigator.onLine) {
        document.getElementById('result').innerHTML = 'You have not account?';
        console.log('online');
        var email = document.getElementById('email').value;
        var pwd = document.getElementById('password').value;
        showLoader();
        firebase.auth().signInWithEmailAndPassword(email, pwd)
            .then(function (firebaseUser) {
                var result = document.getElementById('result').innerHTML = 'Successfully login';
                localStorage.setItem('login-id', firebase.auth().currentUser.uid);
              //  hideLoader();
                console.log('firebase.auth().currentUser.uid****' + firebase.auth().currentUser.uid);
                ////////////////token
                messaging.onMessage((payload) => {
                    console.log('Payload*******');
                    console.log(payload);
                })

                messaging.requestPermission().then(function () {
                    console.log('Notification permission okay');
                    return messaging.getToken()
                }).then(function (token) {
                   
                    console.log('Current Token*****' + token);
                    db.collection('users').doc(firebase.auth().currentUser.uid).update({ token: token })
                        .then(() => {
                            // localStorage.setItem('fav', JSON.stringify([]));
                            window.location.href = '../index.html';
                        })
                }).catch(function (ex) {
                    console.log(' Notification permissionnhi dy raha hai.', ex);
                });


            })
            .catch(function (error) {
                hideLoader();
                var errorCode = error.code;
                var errorMessage = error.message;
                var consoleError = document.getElementById('consoleError').innerHTML = errorMessage;
            });
        // window.location.href = '../index.html';
    }

    else {
        document.getElementById('result').innerHTML = 'You Are Offline';
    }

}
////////////////////////////// Sigin firestore End//////////////

///////////////////////sign Out///////////////////////
function logOut() {
        showLoader();
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('login-id');
            localStorage.removeItem('currentChatRoomInfo');
           // hideLoader();
            window.location.href = "../index.html";
        }, function (error) {
            document.getElementById('loaderr').style.display = "none";
            console.log("ERROR WHILE LOGGING OUT " + error);
        });
   
    
}

///////////////////////sign Out end/////////////////////

//////////////////////////////submit Ads Auth//////////////////////////

function submitAd(){
        
    if (localStorage.getItem('login-id') == null) {
        window.location.href = "login.html";
    }
        document.getElementById('result').innerHTML = '';  
        var name = document.getElementById("name").value;
        var model = document.getElementById("model").value;
        var year = document.getElementById("year").value;
        year = Number(year);
        var description = document.getElementById("description").value;
        var categories = document.getElementById("categories").value;
        var image = document.getElementById("profile-img").files;

      
        var nameError = document.getElementById("nameError");
        var modelError = document.getElementById("modelError");
        var yearError = document.getElementById("yearError");
        var descriptionError = document.getElementById("descriptionError");
        var categoriesError = document.getElementById("categoriesError");
        var imageError = document.getElementById("imageError");
        
        // console.log('imagelenth',image.length);
        // console.log('categories ======', categories);
        //name validation
        if (!name.length) {
            nameError.innerHTML = "Fill this field";
            return false;
        }
        else if (name.length < 4) {
            nameError.innerHTML = "Name's length should be greater than Three";
            return false;
        }

        //////////////model
        if (!model.length) {
            nameError.innerHTML = "";
            modelError.innerHTML = "Fill this field";
            return false;
        }
        else if (model.length < 4) {
            nameError.innerHTML = "";
            modelError.innerHTML = "Model name length should be greater than Three";
            return false;
        }

        ///////year
        if (year == 0) {
            modelError.innerHTML = "";
            yearError.innerHTML = "Fill this field";
            return false;
        }

        else if (!(year.toString().length == 4)) {
            modelError.innerHTML = "";
            yearError.innerHTML = "Please fill correct year";
            return false;
        }

        ////description
        if (description == '') {
            yearError.innerHTML = "";
            descriptionError.innerHTML = "Fill this field";
            return false;
        }
        if (categories == 'ac0') {
            descriptionError.innerHTML = "";
            categoriesError.innerHTML = "Please select category";
            return false;
        }
        /*
          if (image.length == 0) {
              categoriesError.innerHTML = "";
              imageError.innerHTML = "Please select image";
            
          }
          */
         if(navigator.onLine){
             
                 submitAddDb();

          }
         else{
         document.getElementById('result').innerHTML = 'You Are Offline';
         }
    
        return false;
    }

//////////////////////////////submit Ads Auth End//////////


function submitAddDb(){
    var storageRef = firebase.storage().ref();
    var name = document.getElementById("name").value;
    var targetAmount = document.getElementById("model").value;
    var date = document.getElementById("year").value;
    var description = document.getElementById("description").value;
    var categories = document.getElementById("categories").value;
    var files = document.getElementById('profile-img').files // use the Blob or File API
    var promises = [];
    showLoader();
    for(var i = 0; i < files.length; i++) {
        var file = files[i];    
        var imagesRef = storageRef.child('images/ads_'+ Math.random().toString().substring(2, 6) +'.jpg');
        var promise = new Promise((resolve, reject) => {
            imagesRef.put(file)
            .then(function(snapshot) {
                console.log('Uploaded all or file!', snapshot);
              //  alert('Upload all file***');
                imagesRef.getDownloadURL().then(function(url) {
                    // console.log('url ******', url)
                    var db = firebase.firestore();
                    db.collection('advertise').add({
                        name: name,
                        targetAmount:targetAmount,
                        date:date,
                        des: description,
                        category: categories,
                        id: firebase.auth().currentUser.uid,
                        image:url,
                    });
                    


                // alert('suesssfully add in db');
                    hideLoader();
                    resolve(url);
                  }).catch(function(error) {
                    // Handle any errors
                  });

            }).catch((e) => {
                console.log('bhai kuch masla hai', e);
            });
        })
        promises.push(promise);

    }
   
    return Promise.all(promises);

   
}

///////////////////////////////////////upload image

function uploadImage() {
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images/ads_' + Math.random().toString().substring(2, 6) + '.jpg');
    var file = document.getElementById('imageId').files[0] // use the Blob or File API

    return new Promise((resolve, reject) => {
        imagesRef.put(file)
            .then(function (snapshot) {
                console.log('Uploaded a blob or file!', snapshot);
                imagesRef.getDownloadURL().then(function (url) {
                    // console.log('URL *****', url)
                    resolve(url);
                }).catch(function (error) {
                    // Handle any errors
                });
            }).catch((e) => {
                console.log('bhai kuch masla hai', e)
            });
    })
}
/////////////////////////////get data append

/////////////////getServices

function getServices() {
    if (localStorage.getItem('login-id') == null) {
        window.location.href = "pages/login.html";
    }
    showLoader();
  var i=0;
    var search = document.getElementById('search').value;
    document.getElementById('uorder').innerHTML = '';
    var db = firebase.firestore();
    db.collection("advertise").where("category", "==", search).get().then((res) => {
        res.forEach((doc) => {
            console.log('append howa hai');
            var ul = document.getElementById('uorder'); 

            ul.innerHTML += `
                    <div class="card">
                      <img src="${doc.data().image}" alt="Avatar" style="width:100%">
                      <div class="container">
                        <p class='heart' class="btn4" onclick='favAd(this)' ownerId=${doc.data().id} addId=${doc.id}><svg height="25" aria-hidden="true" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path class="fillColor" fill="lightgray" fav="yes" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                        </svg></p>
                        <h4>
                          <p><b>Name : </b> <b style="color:orange;">${doc.data().name.toUpperCase()}</b></p>
                        </h4>
                        <p><b>Target Amount : </b>${doc.data().targetAmount}</p>
                        <p><b>Date : </b>${doc.data().date}</p>
                        <p><b>Descrition : </b>${doc.data().des}</p>
                      </div>
                      <p>
                        <button class="btn4" onclick='goToSmspage(this)' currentUser=${firebase.auth().currentUser.uid} ownerId=${doc.data().id} addId=${doc.id}
                        >Click here to Donate</button>
                      </p>
                    </div>
            `;
        });
        hideLoader();
    });

}
/////////////////getServices End

///////////loader
function showLoader() {
    var loader = document.getElementById('loaderr');
    loader.style.display = 'block';
}

function hideLoader() {
    var loader = document.getElementById('loaderr');
    loader.style.display = 'none';
}




