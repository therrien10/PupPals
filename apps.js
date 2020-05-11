const userList = document.querySelector("#details");
const updateForm = document.querySelector('#update-form');




//Auth Changes
auth.onAuthStateChanged(function(user) {
  if(user){
    var ID = user.uid;
    var docRef = db.collection("users").doc(ID);
    

    updateForm.addEventListener('submit', (e) => {
      e.preventDefault();
       docRef.update({
          humanName: updateForm['update-human-name'].value,
          dogName: updateForm['update-dog-name'].value,
          breed: updateForm['update-breed'].value,
          age: updateForm['update-age'].value,
          color: updateForm['update-color'].value,
          size: updateForm['update-size'].value,
          state: updateForm['update-state'].value
        });
        updateForm.reset();
      });


    docRef.get().then(function(doc) {
    if (doc.exists) {
      

        const html = `
          <div><h3>User Info </h3> </div>
          <div> Human Name:  ${doc.data().humanName}   </div>
          <div> Dog Name:  ${doc.data().dogName}  </div>
          <div> Breed:  ${doc.data().breed}   </div>
          <div> Age:  ${doc.data().age}   </div>
          <div> Color:  ${doc.data().color} </div>
          <div> Size:  ${doc.data().size} </div>
          <div> State:  ${doc.data().state} </div>
        `;
        userList.innerHTML = html;
        
      

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


    x.style.display = "block";
    y.style.display = "block";
    document.getElementById("status").textContent="Logged In";
    document.getElementById("status").style.color = "green";

  }
  else{
    
    x.style.display = "none";
    y.style.display = "none";
    document.getElementById("status").textContent="Logged Out";
    document.getElementById("status").style.color = "red";
   
  }
});



var x = document.getElementById("sortID");
var y = document.getElementById("list_div");


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Get User info

  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  
  
//Sign Up

  //Auto logged in W/ this function

  auth.createUserWithEmailAndPassword(email, password).then(cred => {

    return db.collection('users').doc(cred.user.uid).set({
      humanName: signupForm['human-name'].value,
      dogName: signupForm['dog-name'].value,
      breed: signupForm['breed'].value,
      age: signupForm['age'].value,
      color: signupForm['color'].value,
      size: signupForm['size'].value ,
      state: signupForm['state'].value,
      image: signupForm['fileButton'].value
      
    });

  }).then(() => {
    signupForm.reset(); 
    
  });

});


//Logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
  
  });
});


//Login


const loginForm = document.querySelector('#signIN-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();


  //Get User info
  const loginEmail = loginForm['signIN-email'].value;
  const loginPassword = loginForm['signIN-password'].value;


  auth.signInWithEmailAndPassword(loginEmail,loginPassword).then(cred => {
    

    loginForm.reset();
    
    loginForm.querySelector('.error').innerHTML = " ";
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;

  });

});




