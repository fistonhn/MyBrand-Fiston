
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


  // get all posts

  const recentPosts = document.getElementById('recentPctn')

  db.collection("posts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
 
      recentPosts.innerHTML += "<p class='post-header'> "+ doc.data().title +" </p>" + "<div class='quoter-post'> "+ doc.data().content + " <button id='"+ doc.id +"' onclick='viewContent(event)' class='continue-reading' > "+ 'Continue Reading' +"<i id='viewIcon' class='fa fa-chevron-circle-right'></i></button> </div>" 
     });
 });
 
  


// view a single post from firestore 
function viewContent(event){

  const id = event.target.getAttribute('id');
  window.localStorage.setItem("id", id);

  var docRef = db.collection("posts").doc(id);
  
  docRef.get().then(function(doc) {
    if (doc.exists) {
      const postOne = document.querySelector('.post-container')

        // postOne.innerHTML += "<p class='post-header'> "+ doc.data().title +" </p>" + "<div class ='readMore-post'> "+ doc.data().content+" </div>"
  
        window.location.href = "../html/readMore.html";
      } else {
  
      window.alert("No such document!");
    }
  }).catch(function(error) {
  window.alert("Error getting document:", error);
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

function logout(){

firebase.auth().signOut().then(function() {

  window.location.href = '../html/login.html';


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