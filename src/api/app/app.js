document.getElementById('loginform').addEventListener('submit', function(e) {fetchlogin(e)});
document.getElementById('registerform').addEventListener('submit', function(e) {fetchregister(e)});
document.getElementById('accountexists').addEventListener('input', function(e) {fetchaccountexists(e)});
document.getElementById('linkisloggedin').addEventListener('click', function(e) {fetchisloggedin(e)});
document.getElementById('logoutbutton').addEventListener('click', function(e) {fetchlogout(e)});
//document.getElementById('Ordering').addEventListener('submit', function(e) {fetchOrdering(e)});

function fetchlogin(evt) {
    evt.preventDefault()
    var fd = new FormData();
    fd.append('username', loginuser.value);
    fd.append('password', loginpass.value);
    
    fetch('http://localhost/apitesting/api/api.php?action=login', 
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
    fetch('http://localhost/apitesting/api/api.php?action=register', 
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
function fetchaccountexists(evt) {
    if(evt.srcElement.value.length > 3) {
        fetch('http://localhost/apitesting/api/api.php?action=accountexists&username='+ evt.srcElement.value, 
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
    fetch('http://localhost/apitesting/api/api.php?action=isloggedin', 
    {
        method: 'GET',
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
    fetch('http://localhost/apitesting/api/api.php?action=logout', 
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