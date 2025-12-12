document.addEventListener('DOMContentLoaded', function() {
     
   

       
  var nav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(nav);
  
  
  var tab = document.querySelectorAll('.tabs');
   M.Tabs.init(tab, {
           
           swipeable: false
          
    });
    
   
   var fixedAction = document.querySelectorAll('.fixed-action-btn');
   M.FloatingActionButton.init(fixedAction);
   
    var parallax = document.querySelectorAll('.parallax');
   M.Parallax.init(parallax);
   
  window.addEventListener('scroll', reveal);       
   $(window).scroll(function() {      
    var scroll = $(window).scrollTop();
    if (scroll > 100) {
       $('nav').addClass('displayNav');
       $('nav ul a').addClass('displayBlack');
       $('nav a').addClass('displayBlack');
       
     } else {
       $('nav').removeClass('displayNav');
       $('nav ul a').removeClass('displayBlack');
       $('nav a').removeClass('displayBlack');
     }
   });
    
   //   var feed = new Instafeed({
   //   accessToken: InstagramToken,
   //   limit: 9,
   //   template: '<a target="_blank" href="{{link}}"><img class="image__img" title="{{caption}}" src="{{image}}" /><div class="image__overlay"><div class="image__title hide-on-med-and-down">{{caption}}</div></div></a>'
   // });
   // feed.run();
  
})


function reveal(){
 var reveals = document.querySelectorAll('.reveal');

 for(var i = 0; i < reveals.length; i++){

   var windowheight = window.innerHeight;
   var revealtop = reveals[i].getBoundingClientRect().top;
   var revealpoint = 150;

   if(revealtop < windowheight - revealpoint){
     reveals[i].classList.add('active');
   }
//       else{
//          reveals[i].classList.remove('active');
//        }
 }
}


function userClickedMessage (){



 
 var toValidate = {
   
   formEmail: "Email is Required",
   formMessage: "Message is Required",

 };   
 
 var idKeys = Object.keys(toValidate);
 
 var allValid = true;
 
 idKeys.forEach(function(id){
    var isValid = checkIfValid(id,toValidate[id]);     
    if(!isValid){
       allValid = false;
    
    }
 
 });
 

 
 if(allValid){
     
     submitMessage();
 
 }
  
}


function checkIfValid(elID,message){

  var isValid = document.getElementById(elID).checkValidity();
  

  if(!isValid){
    //warn the user
    M.toast({html: message});
   
    return false;
    }
    return true;  
}

function openForm() {
     document.getElementById("myForm").style.display = "block";
 }

 function closeForm() {
   document.getElementById("myForm").style.display = "none";
 }   
 
 function closeForm1() {
   document.getElementById("submitted").style.display = "none";
 }   
    


 function submitMessage () {

  var userInfoMessage = {};  //userInfo is an Object with properties

  userInfoMessage.formName = document.getElementById("formName").value;
  userInfoMessage.formEmail = document.getElementById("formEmail").value;
  userInfoMessage.formMessage = document.getElementById("formMessage").value;

  const messageFunction = firebase.functions().httpsCallable("messageFunction")
  messageFunction(userInfoMessage)
    .then((result) => {
      document.getElementById("myForm").style.display = "none";
      document.getElementById("submitted").style.display = "block";
    })
    .catch((error) => {

    });
}  