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



  


  // signup page 
  function signup(e) {
  
    const userName = getInput('name-signup');
    const userEmail = getInput('email-signup');
    const userPassword = getInput('password-signup');

    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
      
      return db.collection('users').doc(cred.user.uid).set({
        Name: userName,
        Role: 'guest'
      });

    }).then(()=>{
      const modal = document.getElementById('signupForm').reset();

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