    const name = document.getElementById("name").value;
    const favoriteFruit = document.getElementById("favoriteFruit").value;
    const fruitQuantity = document.getElementById("fruitQuantity").value;
    const COL_C = 'white';	    // These two const are part of the coloured 	
    const COL_B = '#CD7F32';	//  console.log for functions scheme
  
    var fb_gamedb;
    var userUID;
    var userEmail;

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { signOut}
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get}
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { update }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
    fb_initialiseAndAuthenticate, fb_write, showEmail
};
//initialise DataBase
function fb_initialiseAndAuthenticate() {
    fb_initialise();
    fb_authenticate();
}
function showEmail() {
    fb_readAll()
}
    function fb_initialise() {
    console.log('%c fb_initialise(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        const firebaseConfig = {
        apiKey: "AIzaSyAQ4FYhhhVQvTWxBJstBPqUEM7k1z3HNCs",
        authDomain: "comp-2025-william-kan.firebaseapp.com",
        databaseURL: "https://comp-2025-william-kan-default-rtdb.firebaseio.com",
        projectId: "comp-2025-william-kan",
        storageBucket: "comp-2025-william-kan.firebasestorage.app",
        messagingSenderId: "928584832942",
        appId: "1:928584832942:web:caa21627c817d307485a3f",
        measurementId: "G-L6S6H3WPXE"
    };
    const FB_GAMEAPP = initializeApp(firebaseConfig);
    fb_gamedb= getDatabase(FB_GAMEAPP);
    console.info(fb_gamedb);
    console.log("Hello:")
}
function fb_authenticate() {
    console.log("working function")
    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();

    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    // Create a popup window to sign in
    signInWithPopup(AUTH, PROVIDER).then((result) => {
        //document.getElementById("p_fbAuthenticate").innerHTML = "Authenticated";
        console.log(result);
        console.log(result.user.uid);
        console.log(result.user.email);
        console.log(result.user.displayName);
        userUID = result.user.uid;
        userEmail = result.user.email;
    }).catch((error) => {
        console.log("error authenticating: " + error);
       // document.getElementById("p_fbAuthenticate").innerHTML = "Failled Authenticating";
    });
}
function fb_write() {
    var name = document.getElementById("name").value;
    var favoriteFruit = document.getElementById("favoriteFruit").value;
    var fruitQuantity = document.getElementById("fruitQuantity").value;
    const dbReference= ref(fb_gamedb, ('SalsStrawberry/Users/'+ userUID));

    set(dbReference, { Name: name, FavouriteFruit: favoriteFruit, FruitQuantity: fruitQuantity}).then(() => {
        document.getElementById("statusMessage").innerHTML = "Thank You For Submitting!";

    }).catch((error) => {
        console.log("error:  " + error)
        document.getElementById("statusMessage").innerHTML = "Please Sign In.";

    });
    
}
function fb_readAll() {
    const dbReference= ref(fb_gamedb, 'SalsStrawberry/Users/'+ userUID);

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();

        if (fb_data != null) {
      //      document.getElementById("p_fbReadAll").innerHTML = "successful";
            console.log(fb_data);
       //     ✅ Code for a successful read all goes here

        } else {
         //   document.getElementById("p_fbReadAll").innerHTML = "No Record Found";
        //    ✅ Code for no record found goes here

        }

    }).catch((error) => {
        console.log("error:  " + error);
      //  ❌ Code for a read all error goes here

    });
}
function emailView() {

}