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
      document.getElementById('wrapper-admin').style.display = 'block';  
      document.getElementById('wrapper-login').style.display = 'none';

    } else {
     document.getElementById('wrapper-login').style.display = 'block';    
     document.getElementById('wrapper-admin').style.display = 'none';  
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

  function logout(){
  firebase.auth().signOut().then(function() {

  }).catch(function(error) {

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

            document.getElementById('wrapper-admin-signup').style.display = 'block'; 
            document.getElementById('wrapper-register').style.display = 'none';     
    })


  }

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


// create a post
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
              window.location.reload()
      
          },3000);
  })
  .catch(function (error){window.alert(error)})
  
}


  // get all messages

  const messageList = document.getElementById('allMessages')

  db.collection("messages").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

      messageList.innerHTML += "<div class='comment-container'> <p class='post-header'>" + doc.data().name +" " + doc.data().email +" </p>  <div class='quoter-post'> "+ doc.data().message +" </div> </div>"

     });
});




// add post modal

  var modal = document.getElementById("myModal");

  var btn = document.getElementById("myBtn");
    
  btn.onclick = function() {
    modal.style.display = "block";
  }

  const closeAddPost = document.querySelector(".closeAddPost");
  
  closeAddPost.onclick = function() {

    modal.style.display = "none";
  }



  // view messages modal

  var modalMessage = document.getElementById("myModalMessage");

  var btnMessage = document.getElementById("myBtnMessage");
  
  var spanMessage = document.querySelector(".closeMessagesContainer");

  btnMessage.onclick = function() {
    modalMessage.style.display = "block";
  }

  spanMessage.onclick = function() {
    modalMessage.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modalMessage) {
      modalMessage.style.display = "none";
    }
  }





  
  // get all posts

 const postsList = document.getElementById('tableBody')

 db.collection("posts").get().then(function(querySnapshot) {
   querySnapshot.forEach(function(doc) {

     postsList.innerHTML += "<tr id='"+ doc.id +"'> <td>"+ doc.data().title +"</td> <td>"+ doc.data().content +"</td> <td class='all-btn' ><button  onclick='viewContent(event)' class='button button1'> "+ 'View' +" </button> <button  onclick='editContent(event)' class='button button2'>"+ 'Edit' +"</button> <button onclick='deletePost(event)' class='button button3'>"+ 'Delete' +"</button> </td> </tr>" 
    });
});


// deleting single post

function deletePost(event){

  const id = event.target.parentElement.parentElement.getAttribute('id');
  db.collection('posts').doc(id).delete();

   // show alert
   document.querySelector('.alert-deleting ').style.display = 'block';
  
   setTimeout(function(){

       document.querySelector('.alert-deleting').style.display = 'none';
       window.location.reload();

   },3000);

}


  // view post modal

  var modalView = document.getElementById("myModalView");

  
  var spanView = document.getElementsByClassName("closeView")[0];

  spanView.onclick = function() {
    window.location.reload();
    modalView.style.display = "none";
  }

    
  function viewContent(event){
    modalView.style.display = "block";

  // view a single post from firestore 

  const id = event.target.parentElement.parentElement.getAttribute('id');
  var docRef = db.collection("posts").doc(id);

docRef.get().then(function(doc) {
    if (doc.exists) {

        const postCtn = document.getElementById('ctnPost')

        postCtn.innerHTML += "<p class='post-header'> "+ doc.data().title +" </p>" + "<div class ='readMore-post'> "+ doc.data().content+" </div>"

      } else {

      window.alert("No such document!");
    }
}).catch(function(error) {
  window.alert("Error getting document:", error);
});

  }
  




  // edit post the modal
var modalEditing = document.getElementById("myModalEditing");

var spanEditing = document.getElementById("closeEditing");

function editContent(event) {
  
  // view a single post from firestore 

  const id = event.target.parentElement.parentElement.getAttribute('id');
  window.localStorage.setItem("id", id);

  var docRef = db.collection("posts").doc(id);

docRef.get().then(function(doc) {
    if (doc.exists) {

      const titleEdit = document.getElementById('titleEdit')
      const textArea = document.getElementById('myTextArea')

      titleEdit.value=doc.data().title;
      textArea.value=doc.data().content;

    } else {

      window.alert("No such document!");
    }
}).catch(function(error) {
  window.alert("Error getting document:", error);
});


  modalEditing.style.display = "block";


}

spanEditing.onclick = function() {
  modalEditing.style.display = "none";
}




  // update a post
  function submitUpdate(event) {
    
    const docId = window.localStorage.getItem('id');
    const titleEdit = document.getElementById('titleEdit').value
    const textArea = document.getElementById('myTextArea').value

    db.collection('posts').doc(docId).update({
      title: titleEdit,
      content: textArea
    })
    .then(function (){

            // show alert
            document.querySelector('.alert-updating').style.display = 'block';
            window.localStorage.removeItem('id');
            setTimeout(function(){
               window.location.reload();
                document.querySelector('.alert-updating').style.display = 'none';
        
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