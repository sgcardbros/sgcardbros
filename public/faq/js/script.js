document.addEventListener('DOMContentLoaded', function() {


 db.collection('turnaroundTime').orderBy("sequence", "asc").onSnapshot(snapshot => {      
   turnaroundTime (snapshot.docs)          
 }); 


  var tabs = document.querySelectorAll('.tabs');
  M.Tabs.init(tabs);

  var selectBoxes = document.querySelectorAll('select'); 
  M.FormSelect.init(selectBoxes);
  
  var nav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(nav);

  
 var collapsible = document.querySelectorAll('.collapsible');
 M.Collapsible.init(collapsible);
  
    
   
   var fixedAction = document.querySelectorAll('.fixed-action-btn');
   M.FloatingActionButton.init(fixedAction);
   
   
   var coll = document.getElementsByClassName("collapsible");
   var i;
   
   for (i = 0; i < coll.length; i++) {
     coll[i].addEventListener("click", function() {
       this.classList.toggle("active");
       var content = this.nextElementSibling;
       if (content.style.display === "block") {
         content.style.display = "none";
       } else {
         content.style.display = "block";
       }
     });
   }


  // Event listener for input change
  document.getElementById('amount').addEventListener('input', calculateFee);


})



// Function to calculate and display the fee
function calculateFee() {
  
  const amount = parseFloat(document.getElementById('amount').value);

  if (amount) {

    switch(true) {
      case (amount >= 100 && amount <500):
        feePercentage = 14;
        break;
      case (amount >= 500 && amount <1000):
        feePercentage = 13;
        break;
      case (amount >= 1000 && amount <2500):
        feePercentage = 10;
        break;  
      case (amount >= 2500 && amount <5000):
        feePercentage = 9;
        break;
      case (amount >= 5000):
        feePercentage = 7;
        break;
      default:
        feePercentage = 16;
    } 

  var commission = 10;
  // Select the input field and result display
  const feeResult = document.getElementById('feeResult');
  const feeAmount = Math.max(5, feePercentage * amount /100);
  const payout = amount - feeAmount;
  feeResult.innerHTML =       
    `<ul class="browser-default">
      <li><div><p>Sale Price: <span><b>US$${amount.toFixed(2)}</b></span></p></div></li>
      <li><div><p>${feePercentage}% rate fee: <span class="red-text"><b>US${feeAmount.toFixed(2)}</b></span></p></div></li>
      <li><div><p>Payout: <span class="green-text"><b>US$${payout.toFixed(2)}</b></span></p></div></li>
    </ul>`;
  }
  
  else feeResult.innerHTML = "";
}

function scrollUp () {
       
  var loading =  document.getElementById("top")

  loading.scrollIntoView();

}


function turnaroundTime (dataArray) {

var cards = document.getElementById("turnaroundTimes");

dataArray.forEach(doc => {
  
 var category = doc.id  
 var turnaroundDays = doc.data().turnaroundDays;
 var card = `<div class="col s12 m6 l4">
                 <div class="card-panel center z-depth-3">                    
                   <h4 style="text-transform:uppercase;"><b><u>${category}</u></b></h4>
                   <h3>*<span class="green-text"><b>${turnaroundDays}</b></span> Days</h3>  
                   <p>*Inclusive of 1 Week(s) to Enter into PSA</p>                        
                 </div>
               </div>`
        
 cards.innerHTML += card

})

} 


function ctdCard (dataArray){
 
var cards = document.getElementById("ctd");

for (var i = 0; i < dataArray.length; i++) {

var card = `<div class="col s12 m6 l4">
                 <div class="card-panel center z-depth-3">
                
                   <h4 style="text-transform:uppercase;"><b><u>${dataArray[i][4]}</u></b></h4>
             
                   <h5><span style="font-weight:bold;">${dataArray[i][0]}</span></h5>
                   
                   <h3>*<span class="green-text" style="font-weight:bold;">${dataArray[i][3]}</span> Days</h3>  
                   <p>*Inclusive of <span>${dataArray[i][2]}</span> Week(s) to Enter into PSA</p>                        
                 </div>
               </div>`
        
 cards.innerHTML += card
} 




document.getElementById("linearLoader").innerHTML=""


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
