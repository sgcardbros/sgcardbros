var value = ""
var globalCollectionID = ""
var collectionAll = ""
var $uploadCrop;
window.loaded = 0;
window.search = 0;
       
 document.addEventListener("DOMContentLoaded", function() {
  
  getFirst()

    var nav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(nav);

    var materialboxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxed); 

    var collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);

    var selectBoxes = document.querySelectorAll('select'); 
    M.FormSelect.init(selectBoxes);    
    
    var tab = document.querySelectorAll('.tabs');
    M.Tabs.init(tab);

    window.addEventListener("scroll", handleInfiniteScroll);

    window.addEventListener('scroll', reveal);       
    $(window).scroll(function() {      
      var scroll = $(window).scrollTop();
      if (scroll > 100) {
        
        $('nav').addClass('displayNav');


        
      } else {
        $('nav').removeClass('displayNav');


      }
    });

});

function reveal(){
  var reveals = document.querySelectorAll('.reveal');

  for(var i = 0; i < reveals.length; i++){

    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if(revealtop < windowheight - revealpoint){
      reveals[i].classList.add('active');
    }
  }
} 

var latestDoc = null;
const limitNumber = 9;

const getFirst = async () => {
  var collectionID = "jordanPC"
  var collectionBody = document.getElementById("jordanPC");
  const ref = db.collection('jordanPC').orderBy("description", "asc").limit(limitNumber);
  const data = await ref.get()

  data.docs.forEach(doc => {

    var cert = doc.id    
    var certData = doc.data().cert;
    var description = doc.data().description;
    var imageURL = doc.data().imageURL;
    var population = doc.data().population;  
    var value = doc.data().value;
    var company = doc.data().company;
    var grade = doc.data().grade;
    var date = doc.data().date;

    var card = `
                  <div class="col s12 m4">
                     <div class="card transparent z-depth-0 hoverable">
                     
                      <div class="imageContainer">
                        
                         <div class="thumbnail activator waves-effect waves-block waves-light col s12">

                            <img class="portrait activator" id=${"portrait" + collectionID + cert} src=${imageURL}>
                        </div>

                        <div class="center">
                          <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
                          <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">   
                        </a> 
                      </div>
                    </div>
 
                  <div class="card-reveal">
                    <i class="card-title material-icons grey-text text-darken-4 right">close</i>
                    <br>                   
                    <h6 class="card-title grey-text text-darken-4">${description}</h6>
                    <br>
                    <h6 class="grey-text text-darken-2"><i>GRADE</i>: <span class="red-text"><b>${company} ${grade}</b></span></h6>
                    <h6 class="grey-text text-darken-2"><i>POP</i>: <span class="blue-text"><b>${population}</b></span></h6>
                    <h6 class="grey-text text-darken-2"><i>AUCTION PRICE</i>: <span class="light-green-text accent-4"><b>$${value}</b></span></h6>
                     <br>
                     <br>
                      <div class="center">
                        <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
                            <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">
                            <br>
                            <button class="checkPrice">Buy Now on eBay</button>
                        </a> 
                      </div>     
                  </div> 
                 </div>      

                </div>`                                                            
                                                                   
    collectionBody.innerHTML += card;
    

    });

  window.latestDoc = data.docs[data.docs.length - 1]
  window.loaded = 1

  $('#linearLoader').hide();
  $('.fixedDiv').hide();

  window.addEventListener("scroll", handleInfiniteScroll);

}

const loading = document.querySelector(".loading")
const getNext = async () => {

  loading.classList.add("active")

  var collectionID = "jordanPC"
  var collectionBody = document.getElementById("jordanPC");
  const ref = db.collection('jordanPC').orderBy("description", "asc").startAfter(window.latestDoc).limit(limitNumber);

  const data = await ref.get()

  data.docs.forEach(doc => {

    var cert = doc.id    
    var certData = doc.data().cert;
    var description = doc.data().description;
    var imageURL = doc.data().imageURL;
    var population = doc.data().population;  
    var value = doc.data().value;
    var company = doc.data().company;
    var grade = doc.data().grade;
    var date = doc.data().date;
    var card = `
                  <div class="col s12 m4">
                     <div class="card transparent z-depth-0 hoverable">
                     
                      <div class="imageContainer">
                        
                         <div class="thumbnail activator waves-effect waves-block waves-light col s12">

                            <img class="portrait activator" id=${"portrait" + collectionID + cert} src=${imageURL}>
                        </div>

                        <div class="center">
                          <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
                          <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">   
                        </a> 
                      </div>
                    </div>
 
                  <div class="card-reveal">
                    <i class="card-title material-icons grey-text text-darken-4 right">close</i>
                    <br>                   
                    <h6 class="card-title grey-text text-darken-4">${description}</h6>
                    <br>
                    <h6 class="grey-text text-darken-2"><i>GRADE</i>: <span class="red-text"><b>${company} ${grade}</b></span></h6>
                    <h6 class="grey-text text-darken-2"><i>POP</i>: <span class="blue-text"><b>${population}</b></span></h6>
                    <h6 class="grey-text text-darken-2"><i>AUCTION PRICE</i>: <span class="light-green-text accent-4"><b>$${value}</b></span></h6>
                     <br>
                     <br>
                      <div class="center">
                        <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
                            <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">
                            <br>
                            <button class="checkPrice">Buy Now on eBay</button>
                        </a> 
                      </div>     
                  </div> 
                 </div>      

                </div>`                                                              
                                                                   
    collectionBody.innerHTML += card;


    });

    loading.classList.remove("active")

    //update latest latest doc    
    window.loaded = 1
    window.latestDoc = data.docs[data.docs.length - 1]

    if (data.empty || data.docs.length < limitNumber) {
      window.removeEventListener("scroll", handleInfiniteScroll);
    }



}


const handleInfiniteScroll = () => {
  const footerHeight = document.querySelector('footer').offsetHeight;
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - footerHeight;
  

  if (endOfPage && window.loaded === 1 && window.search === 0) {
    window.loaded = 0
    getNext()
    
  }

  if (endOfPage && window.loaded === 1 && window.search === 1) {
    window.loaded = 0
    getNextSearch()
    
  }


};

function delay(fn, ms) {
  let timer = 0
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}


$('#search').keyup(delay(function (e) {
  
    var searchTerm = $(this).val().toLowerCase();   

    if (searchTerm == "") {

      var collectionBody = document.getElementById("jordanPC");
      collectionBody.innerHTML = ''
      window.search = 0;
      getFirst()

    }

    else {searchCollection(searchTerm)}

    
    
      
}, 500));

  const searchCollection = async (searchTerm) => {
    window.search = 1;
    window.searchTerm = searchTerm
;
    const ref = db.collection('jordanPC').where("searchTerms", "array-contains", searchTerm).orderBy("description", "asc").limit(limitNumber);

    const data = await ref.get()
    var collectionID = "jordanPC"
    var collectionBody = document.getElementById("jordanPC");
    collectionBody.innerHTML = ''

  data.docs.forEach(doc => {

    var cert = doc.id    
    var certData = doc.data().cert;
    var description = doc.data().description;
    var imageURL = doc.data().imageURL;
    var population = doc.data().population;  
    var value = doc.data().value;
    var company = doc.data().company;
    var grade = doc.data().grade;
    var date = doc.data().date;

    var card = 
      `<div class="col s12 m4">
          <div class="card transparent z-depth-0 hoverable">
          
            <div class="imageContainer">
              
              <div class="thumbnail activator waves-effect waves-block waves-light col s12">

                  <img class="portrait activator" id=${"portrait" + collectionID + cert} src=${imageURL}>
              </div>

              <div class="center">
                <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
                <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">   
              </a> 
            </div>
          </div>

        <div class="card-reveal">
          <i class="card-title material-icons grey-text text-darken-4 right">close</i>
          <br>                   
          <h6 class="card-title grey-text text-darken-4">${description}</h6>
          <br>
          <h6 class="grey-text text-darken-2"><i>GRADE</i>: <span class="red-text"><b>${company} ${grade}</b></span></h6>
          <h6 class="grey-text text-darken-2"><i>POP</i>: <span class="blue-text"><b>${population}</b></span></h6>
          <h6 class="grey-text text-darken-2"><i>AUCTION PRICE</i>: <span class="light-green-text accent-4"><b>$${value}</b></span></h6>
          <br>
          <br>
            <div class="center">
              <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
                  <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">
                  <br>
                  <button class="checkPrice">Buy Now on eBay</button>
              </a> 
            </div>     
        </div> 
      </div>      

      </div>`                                                                   
                                                                   
    collectionBody.innerHTML += card;
    

    });

    //update latest latest doc    
    window.latestDoc = data.docs[data.docs.length - 1]
    window.addEventListener("scroll", handleInfiniteScroll);


     if (data.empty || data.docs.length < limitNumber) {

       window.removeEventListener("scroll", handleInfiniteScroll);
       
    }


  }


const getNextSearch = async () => {

  const ref = db.collection('jordanPC').where("searchTerms", "array-contains", window.searchTerm).orderBy("description", "asc").startAfter(window.latestDoc).limit(limitNumber);

  const data = await ref.get()
  var collectionID = "jordanPC"
  var collectionBody = document.getElementById("jordanPC");

data.docs.forEach(doc => {

  var cert = doc.id    
  var certData = doc.data().cert;
  var description = doc.data().description;
  var imageURL = doc.data().imageURL;
  var population = doc.data().population;  
  var value = doc.data().value;
  var company = doc.data().company;
  var grade = doc.data().grade;
  var date = doc.data().date;

  var card = 
  `<div class="col s12 m4">
        <div class="card transparent z-depth-0 hoverable">
        
          <div class="imageContainer">
            
            <div class="thumbnail activator waves-effect waves-block waves-light col s12">

                <img class="portrait activator" id=${"portrait" + collectionID + cert} src=${imageURL}>
            </div>

            <div class="center">
              <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
              <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">   
            </a> 
          </div>
        </div>

      <div class="card-reveal">
        <i class="card-title material-icons grey-text text-darken-4 right">close</i>
        <br>                   
        <h6 class="card-title grey-text text-darken-4">${description}</h6>
        <br>
        <h6 class="grey-text text-darken-2"><i>GRADE</i>: <span class="red-text"><b>${company} ${grade}</b></span></h6>
        <h6 class="grey-text text-darken-2"><i>POP</i>: <span class="blue-text"><b>${population}</b></span></h6>
        <h6 class="grey-text text-darken-2"><i>AUCTION PRICE</i>: <span class="light-green-text accent-4"><b>$${value}</b></span></h6>
        <br>
        <br>
          <div class="center">
            <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${description}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\">
                <img src=\"https://i.imgur.com/pXmJZIV.png\" alt=\"ebay\">
                <br>
                <button class="checkPrice">Buy Now on eBay</button>
            </a> 
          </div>     
      </div> 
    </div>      

    </div>`                                                        
                                                                  
  collectionBody.innerHTML += card;
  

  });

  

  //update latest latest doc    
  window.latestDoc = data.docs[data.docs.length - 1]

  if (data.empty || data.docs.length < limitNumber) {

    window.removeEventListener("scroll", handleInfiniteScroll);
      
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


