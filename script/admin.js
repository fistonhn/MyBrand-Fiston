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

    
// logout a user

function logout(){
    window.location.href = '../html/login.html';
    console.log("Successfull logout");
  firebase.auth().signOut().then(function() {
  
  }).catch(function(error) {
  
  });
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
  
  
  
  
  
    
    // get all users
  
   const postsList = document.getElementById('tableBody')
  
   db.collection("users").get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
  
       postsList.innerHTML += "<tr id='"+ doc.id +"'> <td>"+ doc.id +"</td> <td>"+ doc.data().Name +"</td>  <td>"+ doc.data().Email +"</td> <td>"+ doc.data().Role +"</td> <td class='all-btn' > <button  onclick='editContent(event)' class='button button2'>"+ 'Edit' +"</button> <button onclick='deletePost(event)' class='button button3'>"+ 'Delete' +"</button> </td> </tr>" 
      });
  });
  
  
  // deleting single user
  
  function deletePost(event){
  
    const id = event.target.parentElement.parentElement.getAttribute('id');
    db.collection('users').doc(id).delete();
  
     // show alert
     document.querySelector('.alert-deleting ').style.display = 'block';
    
     setTimeout(function(){
  
         document.querySelector('.alert-deleting').style.display = 'none';
         window.location.reload();
  
     },3000);
  
  }
  
  
  
    // edit post the modal
  var modalEditing = document.getElementById("myModalEditing");
  
  var spanEditing = document.getElementById("closeEditing");
  
  function editContent(event) {
    
    // view a single post from firestore 
  
    const id = event.target.parentElement.parentElement.getAttribute('id');
    window.localStorage.setItem("id", id);
  
    var docRef = db.collection("users").doc(id);
  
  docRef.get().then(function(doc) {
      if (doc.exists) {
  
        const titleEdit = document.getElementById('titleEdit')
        const titleEdit2 = document.getElementById('titleEdit2')
        const titleEdit3 = document.getElementById('titleEdit3')
  
        titleEdit.value=doc.data().Name;
        titleEdit2.value=doc.data().Email;
        titleEdit3.value=doc.data().Role;
  
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
      const titleEdit2 = document.getElementById('titleEdit2').value
      const titleEdit3 = document.getElementById('titleEdit3').value
  
      db.collection('users').doc(docId).update({
        Name: titleEdit,
        Email: titleEdit2,
        Role: titleEdit3
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