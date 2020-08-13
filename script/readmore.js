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




// view a single post from firestore 

const docId = window.localStorage.getItem('id');
console.log(docId)


    var docRef = db.collection("posts").doc(docId);
    
    docRef.get().then(function(doc) {
      if (doc.exists) {
        const postOne = document.querySelector('.post-container')
  
          postOne.innerHTML += "<p class='post-header'> "+ doc.data().title +" </p>" + "<div class ='readMore-post'> "+ doc.data().content+" </div>"

        } else {
    
        window.alert("No such document!");
      }
    })

  
    // create a comment 
  function submitComment() {
  
    const userComment = document.getElementById('commenting').value;
    const nameComment = document.getElementById('comment-name').value;
  
    db.collection('posts').doc(docId).update({
        comments: firebase.firestore.FieldValue.arrayUnion({
            author: nameComment,
            comment: userComment,
            'replied-at': new Date().toLocaleString(),
        }),
    })
    .then((res) => {

        window.location.reload();
    })
    .catch((err) => console.log(err));
    
  }

//   retrieving comment from db

const commentList = document.getElementById('commentCtn')

db.collection('posts').doc(docId).get()
.then((doc) => {

    if(doc.data().comments == undefined){
        return (noComment.innerHTML += 'No comment')
    }

    doc.data().comments.reverse()
    .forEach((doc)=> {
        commentList.innerHTML += "<div class='comment-container'> <p class='post-header'> "+ doc.author +" </p> <div class ='quoter-post'> "+ doc.comment +" </div>  </div>" 
    })

})
.catch((err) => console.log(err));
  
  
  
  
    
  


  // toggle button

  function myFunction(x) {
    x.classList.toggle("change");

    const list = document.getElementById("list-menu");

    if (list.style.display !== "block") {      
        list.style.display = "block";
    } else 

        list.style.display = "none"; 
    
  }  