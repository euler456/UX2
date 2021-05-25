

//===========================user========================================
document.getElementById('loginform').addEventListener('submit', function(e) {fetchlogin(e)});
document.getElementById('registerform').addEventListener('submit', function(e) {fetchregister(e)});
document.getElementById('updateform').addEventListener('submit', function(e) {fetchupdate(e)});
document.getElementById('accountexists').addEventListener('input', function(e) {fetchaccountexists(e)});
document.getElementById('linkisloggedin').addEventListener('click', function(e) {fetchisloggedin(e)});
document.getElementById('logoutbutton').addEventListener('click', function(e) {fetchlogout(e)});
//document.getElementById('Ordering').addEventListener('submit', function(e) {fetchOrdering(e)});

/*function getuserid() {
    var currentusername = document.getElementById("loginuser");
    document.getElementById("currentusername").value = currentusername.value;
  }*/

  
function fetchlogin(evt) {
    evt.preventDefault()
    var fd = new FormData();
    fd.append('username', loginuser.value);
    fd.append('password', loginpass.value);
    
    fetch('http://localhost/apitesting/api/userapi.php?action=login', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 401) {
            console.log('login failed');
            localStorage.removeItem('csrf');
            localStorage.removeItem('username');
            localStorage.removeItem('phone');
            localStorage.removeItem('email');
            localStorage.removeItem('postcode');
            localStorage.removeItem('CustomerID');
            return;
        }
        if(headers.status == 203) {
            console.log('registration required');
            // only need csrf
        }
        headers.json().then(function(body) {
            // BUG is this a 203 or 200?
            localStorage.setItem('csrf', body.Hash);
            localStorage.setItem('CustomerID',loginuser.value);
            localStorage.setItem('username', body.username);
            localStorage.setItem('email', body.email);
            localStorage.setItem('phone', body.phone);
            localStorage.setItem('postcode', body.postcode);
        })
    })
    .catch(function(error) {
        console.log(error)
    });
}
function fetchregister(evt) {
    evt.preventDefault();
    var fd = new FormData();
    fd.append('username', regusername.value);
    fd.append('email', regemail.value); //lop off # in hex code
    fd.append('phone', regphone.value);
    fd.append('postcode', regpostcode.value);
    fd.append('password', regpassword.value);
    fd.append('password2', regpassword2.value);
    fd.append('csrf', localStorage.getItem('csrf'));
    fetch('http://localhost/apitesting/api/userapi.php?action=register', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('user exists');
            return;
        }
     
        if(headers.status == 201) {
            console.log('registration updated');
            return;
        }
       
    })
    .catch(function(error) {console.log(error)});
}
function fetchupdate(evt) {
    evt.preventDefault();
    var fd = new FormData();
    fd.append('currentusername',currentusername.value);
    fd.append('username', upusername.value);
    fd.append('email', upemail.value); //lop off # in hex code
    fd.append('phone', upphone.value);
    fd.append('postcode', uppostcode.value);
    fd.append('password', uppassword.value);
    fd.append('password2', uppassword2.value);
    fd.append('csrf', localStorage.getItem('csrf'));
    fetch('http://localhost/apitesting/api/userapi.php?action=update', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('user exists');
            return;
        }
     
        if(headers.status == 201) {
            console.log(' updated');
            return;
        }
       
    })
    .catch(function(error) {console.log(error)});
}
function fetchaccountexists(evt) {
    if(evt.srcElement.value.length > 3) {
        fetch('http://localhost/apitesting/api/userapi.php?action=accountexists&username='+ evt.srcElement.value, 
        {
            method: 'GET',
            credentials: 'include'
        })
        .then(function(headers) {
            if(headers.status == 204) {
                console.log('user does not exist');
                return;
            }
            if(headers.status == 400) {
                console.log('user exists');
                return;
            }
            headers.json().then(function(body) {
                console.log(body);
            })
        })
        .catch(function(error) {console.log(error)});
    }
}
function fetchisloggedin(evt) {
    fetch('http://localhost/apitesting/api/userapi.php?action=isloggedin', 
    {
        method: 'POST',
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 403) {
            console.log('not logged in');
            localStorage.removeItem('csrf');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('phone');
            localStorage.removeItem('postcode');
            localStorage.removeItem('CustomerID');
            return;
        }
        headers.json().then(function(body) {
            localStorage.setItem('csrf', body.Hash);
        })
    })
    .catch(function(error) {console.log(error)});
}
function fetchlogout(evt) {
    fetch('http://localhost/apitesting/api/userapi.php?action=logout', 
    {
        method: 'GET',
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status != 200) {
            console.log('logout failed Server-Side, but make client login again');
        }
        localStorage.removeItem('csrf');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('postcode');
        localStorage.removeItem('CustomerID');    
    })
    .catch(function(error) {console.log(error)});
}
//=========================displayfood==========================
document.getElementById('productform').innerHTML=fetchdisplayfood();
function fetchdisplayfood(){
fetch('http://localhost/apitesting/api/foodapi.php?action=displayfood',
{
    method: 'POST',
    credentials: 'include'
}
).then((res)=>res.json())
.then(response=>{console.log(response);
    let output = '';
    for(let i in response){
        output+=`<tr>
        <td>${response[i].F_ID}</td>
        <td>${response[i].foodname}</td>
        <td>${response[i].description}</td>
        <td ><img src='../images/${response[i].image }' style="width: 100px; height: 100px;"></td>
        <td>${response[i].options}</td>
        <td>${response[i].price}</td>
        <td><input type="submit" name="delete" value="delete"  onclick="fetchdelete(${response[i].F_ID})"></td>
        </tr>`;
    }
    document.querySelector('.tbody').innerHTML = output;
}).catch(error=>console.error(error));
}
document.getElementById('Addfood').addEventListener('submit', function(e) {fetchAddfood(e)});
function fetchAddfood(evt) {
    evt.preventDefault();
    var fd = new FormData();
    fd.append('foodname', foodname.value);
    fd.append('price', price.value);
    fd.append('description', description.value); 
    fd.append('options', options.value);
    fd.append('image', image.value);
    fetch('http://localhost/apitesting/api/foodapi.php?action=addfood', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('can not add');
            return;
        }
     
        if(headers.status == 201) {
            console.log('addfood succussful');
            return;
        }
    })
    .catch(function(error) {console.log(error)});
}

function fetchdelete(foodID) {
    var fd = new FormData();
    fd.append('F_ID', foodID);
    fetch('http://localhost/apitesting/api/foodapi.php?action=deleteFOOD', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('can not delete');
            return;
        }
     
        if(headers.status == 201) {
            console.log('delete succussful');
            return;
        }
       
    })
    .catch(function(error) {console.log(error)});
}
document.getElementById('updatefood').addEventListener('submit', function(e) {fetchupdatefood(e)});
function fetchupdatefood(evt) {
    evt.preventDefault();
    var fd = new FormData();
    fd.append('F_ID', F_ID2.value);
    fd.append('foodname', foodname2.value);
    fd.append('price', price2.value);
    fd.append('description', description2.value); 
    fd.append('options', options2.value);
    fd.append('image', image2.value);
    fetch('http://localhost/apitesting/api/foodapi.php?action=updatefood', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('can not update');
            return;
        }
     
        if(headers.status == 201) {
            console.log('update succussful');
            return;
        }
       
    })
    .catch(function(error) {console.log(error)});
}
document.getElementById('createorder').addEventListener('click', function(e) {fetchcreateorder(e)});
function fetchcreateorder(evt) {
    
    var orderstatus= "Notpayed";
    var totalprice= 0 ;
    evt.preventDefault();
    var fd = new FormData();
    fd.append('orderstatus', orderstatus );
    fd.append('totalprice', totalprice );
    fetch('http://localhost/apitesting/api/foodapi.php?action=createorder', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('can not order you are not loggedin');
            return;
        }
     
        if(headers.status == 201) {
            console.log('going to order');
            location.replace("../app/orderform.html")
            return;
        }
       
    })
    .catch(function(error) {console.log(error)});
}

//==========================order===================
document.getElementById('orderform').innerHTML=fetchdisplayorderfood();
function fetchdisplayorderfood(){
fetch('http://localhost/apitesting/api/orderapi.php?action=displayorderfood',
{
    method: 'POST',
    credentials: 'include'
}
).then((res)=>res.json())
.then(response=>{console.log(response);
    let output = '';
    for(let i in response){
        output+=`<tr>
        <td class='fd-id'>${response[i].F_ID}</td>
        <td class='fd-name'>${response[i].foodname}</td>
        <td ><img src='../images/${response[i].image}' style="width: 100px; height: 100px;"></td>
        <td class='price'>${response[i].price}</td>
        <td><input type="number" class="fd-value" name="quantity" value="0" min="0" max="50"></td>
        <td>${response[i].options}</td>
        <td><button class="btnSelect">Select</button></td>
        </tr>`;
    }
    document.querySelector('.ordertbody').innerHTML = output;
}).catch(error=>console.error(error));
}



document.getElementById('ordernameid').innerHTML=fetchorderID();
function fetchorderID(){
fetch('http://localhost/apitesting/api/orderapi.php?action=orderID',
{
    method: 'GET',
    credentials: 'include'
}
).then((res)=>res.json())
.then(response=>{console.log(response);
    let output = '';
    for(let i in response){
        output+=`<tr>
        <td type="text" class="orderid">${response[i].orderID}</td>
        <td><button id="btnorderid" class="btnorderid">Select</button></td>
        </tr>`;
    }
    document.querySelector('.order_id').innerHTML = output;
}).catch(error=>console.error(error));
}


$(document).ready(function(){
    var col6;
    $("#ordernameid").on('click', '.btnorderid', function() {
        var currentRow = $(this).closest("tr");
        col6 = currentRow.find(".orderid").html();
      });
    
    $("#orderform").on('click', '.btnSelect', function() {
        $("#ordernameid .btnorderid").trigger("click");
      var currentRow = $(this).closest("tr");
      var col1 = currentRow.find(".fd-value").val(); 
      var col2 = currentRow.find(".fd-id").html(); 
      var col3 = currentRow.find(".fd-name").html(); 
      var col4 = currentRow.find(".price").html();
      var col5 =col4 * col1;
      if(col1 !=0){
      var fd = new FormData();
      fd.append('F_ID',col2 );
      fd.append('foodname', col3 );
      fd.append('price', col4 );
      fd.append('quantity', col1 );
      fd.append('totalprice', col5 );
      fd.append('orderID', col6 );
      fetch('http://localhost/apitesting/api/orderapi.php?action=orderquantity', 
      {
          method: 'POST',
          body: fd,
          credentials: 'include'
      })
     .then(function(headers) {
          if(headers.status == 400) {
              console.log('fail to add');
              return;
          }
       
          if(headers.status == 201) {
              console.log('addfood succussful');
              return;
          }
      })
      .catch(function(error) {console.log(error)});}
      else{
          alert("please select value");
      }

    });
    $( "#showorderform" ).ready(function() {
        setTimeout(function() {
        $("#ordernameid .btnorderid").trigger("click");
        var fd = new FormData();
       fd.append('orderID', col6 );
    fetch('http://localhost/apitesting/api/orderapi.php?action=showorderform',
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    }
    ).then((res)=>res.json())
    .then(response=>{console.log(response);
        let output = '';
        for(let i in response){
            output+=`<tr>
            <td class='fd-name'>${response[i].foodname}</td>
            <td class='price'>${response[i].price}</td>
            <td>${response[i].quantity}</td>
            <td >${response[i].totalprice}</td>
            <td><input type="submit" name="delete" value="delete"  onclick="fetchorderdelete(${response[i].orderitem_ID})"></td>
            </tr>`;
        }
        document.querySelector('.showtbody').innerHTML = output;
    }).catch(error=>console.error(error));
      },200);
    }); 
    $("#sumtotalprice").click(function() {
        $("#ordernameid .btnorderid").trigger("click");
        var fd = new FormData();
        fd.append('orderID', col6 );
      fetch('http://localhost/apitesting/api/orderapi.php?action=sumtotalprice', 
      {
          method: 'POST',
          body: fd,
          credentials: 'include'
      })
     .then(function(headers) {
          if(headers.status == 400) {
              console.log('sumtotalprice');
              return;
          }
       
          if(headers.status == 201) {
              console.log('fail to sum');
              return;
          }
      })
      .catch(function(error) {console.log(error)});
    });
});
  

/*document.getElementById('showorderform').innerHTML=fetchshoworderform();
function fetchshoworderform(){
    var fd = new FormData();
    fd.append('orderID', col6 );
fetch('http://localhost/apitesting/api/orderapi.php?action=showorderform',
{
    method: 'POST',
    body: fd,
    credentials: 'include'
}
).then((res)=>res.json())
.then(response=>{console.log(response);
    let output = '';
    for(let i in response){
        output+=`<tr>
        <td class='fd-name'>${response[i].foodname}</td>
        <td class='price'>${response[i].price}</td>
        <td>${response[i].quantity}</td>
        <td >${response[i].totalprice}</td>
        <td><input type="submit" name="delete" value="delete"  onclick="fetchorderdelete(${response[i].orderitem_ID})"></td>
        </tr>`;
    }
    document.querySelector('.showtbody').innerHTML = output;
}).catch(error=>console.error(error));
}
*/



function fetchorderdelete(orderitem_ID) {
    var fd = new FormData();
    fd.append('orderitem_ID', orderitem_ID);
    fetch('http://localhost/apitesting/api/orderapi.php?action=orderdelete', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('can not delete');
            return;
        }
     
        if(headers.status == 201) {
            console.log('delete succussful');
            return;
        }
       
    })
    .catch(function(error) {console.log(error)});
}

//===================payment==========================
document.getElementById('confirmorderform').innerHTML=fetchconfirmorderform();
function fetchconfirmorderform(){
fetch('http://localhost/apitesting/api/paymentapi.php?action=confirmorderform',
{
    method: 'GET',
    credentials: 'include'
}
).then((res)=>res.json())
.then(response=>{console.log(response);
    let output = '';
    for(let i in response){
        output+=`<tr>
        <td type="text" class="orderID">${response[i].orderID}</td>
        <td type="datetime" class="ordertime">${response[i].ordertime}</td>
        <td type="number" class="totalprice">${response[i].totalprice}</td>
        <td><button id="btnorderID" class="btnorderID">Select</button></td>
        </tr>`;
    }
    document.querySelector('.orderconfirmtbody').innerHTML = output;
}).catch(error=>console.error(error));
}

document.getElementById('checkout').addEventListener('submit', function(e) {fetchcheckout(e)});
function fetchcheckout(evt) {
    evt.preventDefault();
    var fd = new FormData();
    fd.append('cname', cname.value);
    fd.append('ccnum', ccnum.value);
    fd.append('expmonth', expmonth.value);
    fd.append('expyear', expyear.value); 
    fd.append('cvv', cvv.value);
    fetch('http://localhost/apitesting/api/paymentapi.php?action=checkout', 
    {
        method: 'POST',
        body: fd,
        credentials: 'include'
    })
    .then(function(headers) {
        if(headers.status == 400) {
            console.log('can not checkout');
            return;
        }
     
        if(headers.status == 201) {
            window.location.href = "../app/ordercomplete.html";
            updateorderstatus();
            return;
        }
       
    })
    .catch(function(error) {console.log(error)});
}

$(document).ready(function(){
    var orderID;
    $("#confirmorderform").on('click', '.btnorderID', function() {
        var currentRow = $(this).closest("tr");
        orderID = currentRow.find(".orderID").html(); 
        alert(orderID);
      });
      $("#checkoutupdate").click(function() {
        $("#confirmorderform .btnorderID").trigger("click");
      var fd = new FormData();
      fd.append('orderID', orderID );
      fetch('http://localhost/apitesting/api/paymentapi.php?action=checkoutupdate', 
      {
          method: 'POST',
          body: fd,
          credentials: 'include'
      })
     .then(function(headers) {
          if(headers.status == 400) {
              console.log('fail to update');
              return;
          }
       
          if(headers.status == 201) {
              console.log('update succussful');
              return;
          }
      })
    .catch(function(error) {console.log(error)});
    });
});