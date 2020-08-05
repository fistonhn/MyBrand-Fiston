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


// comment

function submitComment() {

  const userComment = document.getElementById('commenting').value;

  db.collection('comments').doc().set({
    comments: userComment
  })
  .then(function (){

          // show alert
          document.querySelector('.alert-comment').style.display = 'block';
  
          setTimeout(function(){
      
              document.querySelector('.alert-comment').style.display = 'none';
      
          },3000);
  })
  .catch(function (error){window.alert(error)})
  
}


// posts

function submitPost() {

  const postHeader = document.getElementById('post-header').value;
  const postBody = document.getElementById('post-body').value;


  db.collection('posts').doc().set({
    title: postHeader,
    content: postBody
  })
  .then(function (){

          // show alert
          document.querySelector('.alert-posting').style.display = 'block';
  
          setTimeout(function(){
      
              document.querySelector('.alert-posting').style.display = 'none';
              document.querySelector('.newstory-form').reset();
      
          },3000);
  })
  .catch(function (error){window.alert(error)})
  
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

  // edit post the modal
var modalEditing = document.getElementById("myModalEditing");

// Get the button that opens the modal
var btnEditing = document.getElementById("myBtnEdit");

// Get the <span> element that closes the modal
var spanEditing = document.getElementById("closeEditing");

// When the user clicks the button, open the modal 
btnEditing.onclick = function() {
  modalEditing.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanEditing.onclick = function() {
  modalEditing.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  window.alert('kkk')
  if (event.target == modalEditing) {
    modalEditing.style.display = "none";
  }
}






// add post modal

  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }



  // view post modal

  var modalView = document.getElementById("myModalView");

  // Get the button that opens the modal
  var btnView = document.getElementById("myBtnView");
  
  // Get the <span> element that closes the modal
  var spanView = document.getElementsByClassName("closeView")[0];
  
  // When the user clicks the button, open the modal 
  btnView.onclick = function() {
    modalView.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  spanView.onclick = function() {
    modalView.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modalView) {
      modalView.style.display = "none";
    }
  }