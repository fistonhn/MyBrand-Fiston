
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBTtls4QmVPtDay564PdlSSyKS1FzJDNw0",
    authDomain: "mybrand-fiston.firebaseapp.com",
    databaseURL: "https://mybrand-fiston.firebaseio.com",
    projectId: "mybrand-fiston",
    storageBucket: "mybrand-fiston.appspot.com",
    messagingSenderId: "686280672142",
    appId: "1:686280672142:web:b9bc950105bdcebd695adf",
    measurementId: "G-KFFDRNWW3E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    var db=firebase.firestore();
    const auth = firebase.auth();



// signin form
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let docRef = db.collection('users').doc(user.uid);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists && doc.data().Role == "guest") {
                    window.location.href = '../html/guest.html';
                    return true;
                }
                else {
                    window.location.href = '../html/admin.html';
              
                  }
   
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    } 
});



  function login(){

      const email = document.getElementById('email-login').value;
      const password = document.getElementById('password-login').value;

      window.localStorage.setItem("email", email);

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
   
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Error: "+ errorMessage)
      });

  }




  
  // toggle button

  function myFunction(x) {
    x.classList.toggle("change");

    const list = document.getElementById("list-menu");

    if (list.style.display !== "block") {      
        list.style.display = "block";
    } else 

        list.style.display = "none"; 
    
  }