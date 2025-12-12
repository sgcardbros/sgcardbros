document.addEventListener('DOMContentLoaded', function() {

  db.collection('groupStatus').onSnapshot(snapshot => {     
    groupStatus (snapshot.docs)   
  }); 

  db.collection('group').where("currentStatus", "!=", "SHIPPED").orderBy("currentStatus", "desc").orderBy("arrivedTimestamp", "desc").onSnapshot(snapshot => {     
    groupDatabase (snapshot.docs)      
  }); 
 

  var nav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(nav);
  
  
  var tab = document.querySelectorAll('.tabs');
  M.Tabs.init(tab, {
  
  swipeable: false
  
  });
  
  
  var fixedAction = document.querySelectorAll('.fixed-action-btn');
  M.FloatingActionButton.init(fixedAction);
  
  
   var mod = document.querySelectorAll('.modal');
    M.Modal.init(mod, {
                
      startingTop: '4%'
               
     });
    
  window.addEventListener('scroll', reveal);

  const orderStatusForm = document.querySelector('#orderStatus');
  orderStatusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      userClickedLogin();
  })
  
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
  }
}

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

 
 function countUp () {
    const counters = document.querySelectorAll('.counter');
    const speed = 400; // The higher the slower
    
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
    
        // Lower inc to slow and higher to slow
        const inc = target / speed;
    
        // Check if target is reached
        if (count < target) {
          // Add inc to count and output in counter
          counter.innerText = Math.ceil(count + inc);
          // Call function every ms
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };
    
      updateCount();
    });  
     
}     
     
     
 
	$('#tableStatus th').on('click', function(){
		var column = $(this).data('column')
        
       
		var order = $(this).data('order')
       
		var text = $(this).html()
		text = text.substring(0, text.length - 1)
        
        var myArray = window.groupDataArray
        
        if (column == "0" | column == "1" | column == "2") {
        
          if(order == 'asc'){
			$(this).data('order', "desc")
			myArray = myArray.sort((a,b) => a[column] > b[column] ? 1 : -1)
			text += '&#9650'

          } 
          
          else{
			$(this).data('order', "asc")
			myArray = myArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
			text += '&#9660'

          }
        
        
        }
        
        else  {
 
            
            if(order == 'asc'){
                $(this).data('order', "desc")
                myArray = myArray.sort(function (a, b) {
                a = a[column].toString().split('/');
                b = b[column].toString().split('/');
                return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
            });
                text += '&#9650'
    
            }
            
             else {
                $(this).data('order', "asc")
                myArray = myArray.sort(function (a, b) {
                a = a[column].toString().split('/');
                b = b[column].toString().split('/');
                return b[2] - a[2] || b[1] - a[1] || b[0] - a[0];
            });
                text += '&#9660'
    
            }
         
        }
        

		$(this).html(text)
		buildTableFirebase(myArray)
	})


function searchTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableStatus");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


function groupStatus (groupStatusData) {

  var lastUpdate = groupStatusData[0].data().lastUpdate 
  var totalCompleted = groupStatusData[0].data().totalCompleted 
  var totalGrading = groupStatusData[0].data().totalGrading 

  document.getElementById("updatedDate").innerHTML = `<u>${lastUpdate}</u>`
  document.getElementById("stats").innerHTML = `<div class="container center pad" >
                                                      <div class="row">
                                                        <div class="col s6">
                                                          <h5>SGCARDBROS HAS <span class="green-text">SUCCESSFULLY GRADED</span></h5>
                                                          <h3 class="counter green-text content" data-target=${totalCompleted}><b><u>0</u></b></h3>
                                                          <h5>CARDS WITH PSA.</h5>
                                                          
                                                        </div>
                                                        
                                                         <div class="col s6">
                                                          <h5>SGCARDBROS CURRENTLY HAS</h5>
                                                          <h3 class="counter blue-text content" data-target=${totalGrading}><b><u>0</u></b></h3>
                                                          <h5>CARDS <span class="blue-text">AWAITING GRADES</span> AT PSA.</h5>
                                                        </div>
                                                      </div>
                                                     </div> 
                                                      `
                                                      
                                                      
  countUp ()

}


function groupDatabase (dataArray) {
  var groupDataArray = []
  dataArray.forEach(doc => {
      var groupNumber = doc.id    
      var category = doc.data().category;
      var currentStatus = doc.data().currentStatus;
      var arrived = doc.data().arrived;
      var entered = doc.data().entered;
      var projected = doc.data().projected;
      var completed = doc.data().completed;
      var cardCount = doc.data().cardCount;

      var groupData = [groupNumber, category, currentStatus, arrived, entered, projected, completed, cardCount]
      groupDataArray.push(groupData)
  })

    window.groupDataArray = groupDataArray
    //console.log(window.groupDataArray)
    buildTableFirebase(groupDataArray)

}

 function buildTableFirebase(dataArray) {

    
    var tbody = document.getElementById("activeGroup");
    
    tbody.innerHTML = ''

    var noLine = document.getElementById("noLine");

    

    if (dataArray.length == 0) {
      noLine.innerHTML = `<h6 class="center"><b>NO ACTIVE ORDER</b></h6>`
    }

    else {
    
    for (var i = 0; i < dataArray.length; i++) {

    var result = `<tr>
                      <td style="text-align:center; font-weight:bold;">${dataArray[i][0]}</td>
                      <td>${dataArray[i][1]}</td>
                      
                      <td style="text-align:center; font-weight:bold;">${dataArray[i][2]}</td>
                      <td style="text-align:center;">${dataArray[i][3]}</td>
                      <td style="text-align:center;">${dataArray[i][4]}</td>
                      <td style="text-align:center;">${dataArray[i][5]}</td>
                      <td style="text-align:center;">${dataArray[i][6]}</td>
                  </tr>`
             
      tbody.innerHTML += result;
   }   
  }
}   


    
    function userClickedLogin () {
               
      var toValidate = {
          orderNumber: "Order Number is Required",
          password: "Mobile Number is Required",

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
          
         login();
               
      }    
    
    }
    
    function login () {
    
       document.getElementById("group").innerHTML = "";
       document.getElementById("tableHeader").innerHTML = "";
       document.getElementById("table-body").innerHTML = "";
       document.getElementById("summary").innerHTML = "";       
       
        var loader = `
           <div class="preloader-wrapper small active valign-wrapper">
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>`
        
       document.getElementById('submitBtn').innerHTML = loader;
    
       var loading =  document.getElementById("loader")
       loading.innerHTML = `  
                                  <div class="progress">
                                      <div class="indeterminate"></div>
                                  </div>
                              `
       loading.scrollIntoView();
              
        var userInfo = {};
        
        userInfo.orderNumber = document.getElementById("orderNumber").value;
        userInfo.password = document.getElementById("password").value;

        firebaseRetrieve (userInfo.orderNumber , userInfo.password)
       
    
    }

    function firebaseRetrieve(orderNumber , password){
      $("#orderLogin").show();

      var dataAll = [orderNumber, password]

      const orderStatusFunction = firebase.functions().httpsCallable("orderStatusFunction")
      orderStatusFunction(dataAll)
        .then((result) => {
          const data = result.data;
          const dataLength = Object.keys(data).length;
          if (dataLength != 0) {
              
              var totalQuantity = data.quantity
              
              var fees = data.fees

              var orderNumber = data.number
              
              var userName = data.name
              
              var category = data.category
              
              var groupNo = data.group;

              var currentStatus = data.currentStatus;
                
              var projectedDate = data.projectedDate;           
             
              var scroll =  document.getElementById("loader")
            
              scroll.scrollIntoView();
              
              document.getElementById("loader").innerHTML = "";
    
    
              document.getElementById("group").innerHTML = `<img src="https://i.imgur.com/HflMyxH.jpg" width="96" height="96" alt="Sg Card Bros" style="float:left; width:96px; height:96px;">
                                                  <div style=\"text-align:center;\">
                                                    <h3 >Order Number: <span class="cursor"><b>${orderNumber}</b></span></h5>
                                                    <h5> <span><i>${userName}</i></span>, your assigned Group number is <b><u>${groupNo}</u></b>.</h5>                                                
                                                    <h5>Current Status: <b><u>${currentStatus}</u></b>.</h5>
                                                    <h5>Projected Date of Completion: <b><u>${projectedDate}</u></b>.</h5><br>
                                                    <h5 style= \"text-transform:uppercase; display: inline;\"><b>${category}</b></h5>
                                                  </div>  `
   
              
              var thHead = document.getElementById("tableHeader");
    
              thHead = "<th style=\'text-align:center;\'>Quantity</th><th style=\'text-align:center;\'>Cert #</th><th>Grade</th><th>Item Description</th><th style=\'text-align:center;\'>Declared Value</th>";
              
              document.getElementById("tableHeader").innerHTML = thHead;    
              var tbody = document.getElementById("table-body");  

              var cards = data.cards
               for (var i = 0; i < cards.length; i++) {
                  var cert = cards[i].cert;   
                  var declaredValue = cards[i].declaredValue;  
                  var description = cards[i].description;
                  var grade = cards[i].grade; 
                  var quantity = cards[i].quantity; 

                   var row = `<tr>
                    <td style=\'text-align:center;\'>${quantity}</td>
                    <td style=\'text-align:center;\'><a target="_blank" href = "https://www.psacard.com/cert/${cert}/psa" >${cert}</a></td>
                    <td>${grade}</td>
                    <td>${description}</td>
                    <td style=\'text-align:center;\'>${declaredValue}</td>
                  </tr>`
        
                  tbody.innerHTML += row; 

               }

                 document.getElementById("summary").innerHTML = `
                                                     
                                                   <p><b>Total Quantity:</b> <u>${totalQuantity}</u></p>
                                                   <p><b>Total Grading Fees:</b> <u>${fees}*</u></p>     
                                                   <p>*Your Cards maybe subjected to an additional "upcharge" fee from PSA depending on how much the card is worth after grading. You will be responsible for this charge.</p>`

                                                    
                var button = ` <button class="btn waves-effect waves-light">Submit</button>`
                
                document.getElementById('submitBtn').innerHTML = button
      

          }
          else {
            console.log("No Order Found")
            document.getElementById("loader").innerHTML = "<h5 style=\"text-align:center;\">No User Information found or wrong order number/password Entered.</h5>"
            var button = ` <button class="btn waves-effect waves-light">Submit</button>`      
            document.getElementById('submitBtn').innerHTML = button      
          }

        })
        .catch((error) => {
          console.error("Error:", error);

        });

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
