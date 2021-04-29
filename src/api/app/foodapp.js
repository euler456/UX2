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

