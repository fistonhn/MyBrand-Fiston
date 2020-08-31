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
    window.localStorage.removeItem('email');
    window.location.href = '../html/login.html';
    console.log("Successfull logout");
  firebase.auth().signOut().then(function() {
  
  }).catch(function(error) {
  
  });
  }

  const userEmail = window.localStorage.getItem('email');
 
  
// create a post
function submitPost() {

    const postHeader = document.getElementById('post-header').value;
    const postBody = document.getElementById('post-body').value;
  
  
    db.collection('posts').doc().set({
      email: userEmail,
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
  
  
  
  
    
    // get all posts
  
   const postsList = document.getElementById('tableBody')
  
   db.collection("posts").where("email", "==", userEmail).get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) { 
         
        document.querySelector('.zeroBlog').style.display = 'none';
        document.getElementById('tableBlog').style.display = 'block';

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