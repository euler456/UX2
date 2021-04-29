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

