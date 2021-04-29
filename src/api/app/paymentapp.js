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