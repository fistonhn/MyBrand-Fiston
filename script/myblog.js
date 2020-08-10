
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


// myblog page 


  // get all posts

  const recentPosts = document.getElementById('recentPctn')

  db.collection("posts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
 
      recentPosts.innerHTML += "<p class='post-header'> "+ doc.data().title +" </p>" + "<div class='quoter-post'> "+ doc.data().content + " <button  onclick='readmore()' class='continue-reading' > "+ 'Continue Reading' +"<i id='viewIcon' class='fa fa-chevron-circle-right'></i></button> </div>" 
     });
 });
 
function readmore(){
  window.location.href = "../html/readMore.html";
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