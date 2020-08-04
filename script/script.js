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
  // var messagesRef = firebase.database().ref('messages')
  var db=firebase.firestore();
  const auth = firebase.auth();
 

function submitForm(e) {
  
    // e.preventDefault();
    const userName = getInputVal('contact-name');
    const userEmail = getInputVal('contact-email');
    const userWebsite = getInputVal('contact-website');
    const userPhone = getInputVal('contact-phone');
    const userMessage = getInputVal('contact-message');


    db.collection('messages').doc().set({
      name: userName,
      email: userEmail,
      website: userWebsite,
      phone: userPhone,
      message: userMessage
    })
    .then(function (){

            // show alert
            document.querySelector('.alert').style.display = 'block';
    
            setTimeout(function(){
        
                document.querySelector('.alert').style.display = 'none';
                
                document.getElementById('contact-form').reset();
        
            },3000);
    })
    .catch(function (error){window.alert(error)})
    
}



  // function to get form values
  function getInputVal(id){
    return document.getElementById(id).value;
}



  // signin form

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      console.log("user successful login")
    } else {
      // No user is signed in.
    }
  })
    

  function login(){

      const email = document.getElementById('email-login').value;
      const password = document.getElementById('password-login').value;


      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
   
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Error: "+ errorMessage)
      });

  }



  // signup page 



  function signup(e) {
  
    const userName = getInput('name-signup');
    const userEmail = getInput('email-signup');
    const userPassword = getInput('password-signup');
    const userConfirm = getInput('confirm-signup');

    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
      console.log(cred.user)
      const modal = document.getElementById('signupForm').reset();

                  // show alert
                  document.querySelector('.alert-signup').style.display = 'block';
    
                  setTimeout(function(){
              
                      document.querySelector('.alert-signup').style.display = 'none';
                      
                      document.getElementById('signupForm').reset();
              
                  },3000);

    })


  }



  // function to get form values
  function getInput(id){
    return document.getElementById(id).value;
}
















  function myFunction(x) {
    x.classList.toggle("change");

    const list = document.getElementById("list-menu");

    if (list.style.display !== "block") {      
        list.style.display = "block";
    } else 

        list.style.display = "none"; 
    
  }
