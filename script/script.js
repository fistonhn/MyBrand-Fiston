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
 
  // contact page

  window.localStorage.removeItem('email');

function submitForm() {
  
    const userName = getInputVal('contact-name');
    const userEmail = getInputVal('contact-email');
    const userMessage = getInputVal('contact-message');



    if (userName == "") {

      // alert("Name must be filled out");
      document.querySelector('.alert-name').style.display = 'block';
      setTimeout(function(){
        
        document.querySelector('.alert-name').style.display = 'none';
        
    },3000);

      return false;
    }

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
    if (!validateEmail(userEmail)) {

      // alert("email is not allowed to be empty and should be a valid email!");
      document.querySelector('.alert-email').style.display = 'block';

      setTimeout(function(){
        
        document.querySelector('.alert-email').style.display = 'none';
        
    },3000);

      return false;
    }

    if (userMessage == "") {

      // alert("message must be filled out");
      document.querySelector('.alert-message').style.display = 'block';

      setTimeout(function(){
        
        document.querySelector('.alert-message').style.display = 'none';
        
    },3000);

      return false;
    }




    db.collection('messages').doc().set({
      name: userName,
      email: userEmail,
      message: userMessage
    })
    .then(function (){

            // show alert
            document.querySelector('.alert').style.display = 'block';
    
            setTimeout(function(){
        
                document.querySelector('.alert').style.display = 'none';
                
                window.location.reload()
        
            },3000);
    })
    .catch(function (error){window.alert(error)})
    
}



  // function to get form values
  function getInputVal(id){
    return document.getElementById(id).value;
}



  


  // signup page 
  function signup(e) {
  
    const userName = getInput('name-signup');
    const userEmail = getInput('email-signup');
    const userPassword = getInput('password-signup');



    
    if (userName == "") {

      alert("Name must be filled out");
      return false;
    }

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
    if (!validateEmail(userEmail)) {

      alert("email is not allowed to be empty and should be a valid email!");

      return false;
    }

    if (userPassword.length < 6) {

      alert("password must be filled out and least 6 characters long.");
      return false;
    }







    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
      
      return db.collection('users').doc(cred.user.uid).set({
        Name: userName,
        Role: 'guest',
        Email: userEmail
      });

    }).then(()=>{
      window.localStorage.setItem("email", userEmail);
      document.getElementById('signupForm').reset();

      window.location.href = "../html/guest.html";
    })


  }

  function getInput(id){
    return document.getElementById(id).value;
}

// logout a user

function logout(){
  window.location.href = '../html/login.html';
  console.log("Successfull logout");
firebase.auth().signOut().then(function() {

}).catch(function(error) {

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