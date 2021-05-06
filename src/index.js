import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import "./index.css";
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
/*fetchlogin();
fetchregister();
fetchaccountexists();
fetchisloggedin();
fetchlogout();*/
const green = '#006400';
const black = '#000000';
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = { color: green };
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor(){
    const newColor = this.state.color == green ? black : green;
    this.setState({ color: newColor })
  }
  render() {
    return (
      <div style={{background: this.state.color}}>
      <HashRouter>
      <div class="container">
        <h1 >Freshly Login</h1>
        <ul id="header" class="row">
          <li><NavLink to="/" class="col">Login</NavLink></li>
          <li><NavLink to="/Home" class="col ">Orderchart</NavLink></li>
          <li><NavLink to="/contact" class="col ">Contact</NavLink></li>
          <li><NavLink to="/Setting" class="col ">Setting</NavLink></li>
          <li class="col "> <button id="dark" class="btn btn-light" onClick={this.changeColor}>Darkmode</button></li>
        </ul>
        <div id="content">
           <Route exact path="/" component={Login}/>
           <Route exact path="/Home" component={Home}/>
           <Route path="/Sign" component={Sign}/>
           <Route path="/contact" component={Contact}/>
           <Route path="/Setting" component={Setting}/>
           <Route path="/password" component={password}/>
        </div>
        </div>
        
        </HashRouter>
        </div>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
  }
  componentDidMount() {
    fetch('http://localhost/UX2/src/api/api/orderapi.php?action=displayorderfood',
    {
            method: 'POST',
            credentials: 'include'
        }
        )   .then(response => response.json())
        .then(data => this.setState({ hits: data }));
      }
  render(){
    const { hits } = this.state; 
          return (
            <table>
            <thead>
        
                <th>Name</th>
                <th>image</th>
                <th>Price</th>
                <th>Quantity</th>
            </thead>
            <tbody>
                  {hits.map(hit =>(
                 <tr>
            <td hidden class='fd-id'>{hit.F_ID}</td>
            <td class='fd-name'>{hit.foodname}</td>
            <td ><img src={require(`./pic/${hit.image}.jpg`).default}></img></td>
            <td class='price'>{hit.price}</td>
            <td><input type="number" class="fd-value" name="quantity" min="0" max="50"></input></td>
            <td>{hit.options}</td>
            <td><button class="btnSelect">Select</button></td>
             </tr>
                  ) )}
            </tbody>
        </table>


          );
  }
}



class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.history.push('/Home');
    
    fetch('http://localhost/UX2/src/api/api/userapi.php?action=login', {
      method: 'POST',
      credentials: 'include',
      body: data
      
    }) .then(function(headers) {
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
  
  })
  .catch(function(error) {
      console.log(error)
  });
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form  onSubmit={this.handleSubmit}>
              <h4> username</h4>
              <input type="text" name="username" placeholder="user name" id="loginuser" value="username" onchange="getuserid()" required></input>
              <h4> password</h4>
              <input type="password" name="password" placeholder="password" id="loginpass" value="password" required></input>
              <input type="submit" name="submit"></input>
            
       </form>
        <button>
        <NavLink to="/Sign" id="Signup">Sign Up</NavLink>
       </button>
      </div>

    );
  }
}


class Sign extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: ''
    };
  }
  onChange(evt) {
    this.setState({
      value: evt.target.value.replace(/[^a-zA-Z]/g, '')
    });
 };
 
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('http://localhost/UX2/src/api/api/userapi.php?action=register', {
      method: 'POST',
      credentials: 'include',
      body: data
      
    })   .then(function(headers) {
      if(headers.status == 400) {
          console.log('user exists');
          return;
      }
   
      if(headers.status == 201) {
          console.log('registration updated');
          this.setState({ redirectToReferrer: true});
          return;
      }
     
  })
  .catch(function(error) {console.log(error)});
  }
  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer == true) {
      return <Redirect to={Login} />
    }
    else{
      alert("Fail to sign up");
    }
    return (
      <div>
       
         <h1>Sign Up</h1>
         <form  onSubmit={this.handleSubmit}>
              <h4> username</h4>
             <input type="text" name="username" onChange={this.onChange.bind(this)} value={this.state.value} id="regusername" required></input>
             <h4> email</h4>
              <input type="email" name="email"  id="regemail" value="username@usee" required></input>
              <h4> phone</h4>
              <input type="text" name="phone"  id="regphone" value="11666661" required></input>
              <h4> postcode</h4>
              <input type="number" name="postcode"  id="regpostcode" value="1010" required></input>
              <h4> password</h4>
              <input type="password" name="password" placeholder="password" id="regpassword" value="password" required></input>
              <h4> confirm password</h4>
              <input type="password" name="password2" placeholder="password again" id="regpassword2" value="password" required></input>
             
              <input type="submit" name="submit"></input>
       </form>
      </div>
    );
  }
}

class Setting extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: ''
    };
  }
  onChange(evt) {
    this.setState({
      value: evt.target.value.replace(/[^a-zA-Z]/g, '')
    });
 };
 
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.history.push('/');
    fetch('http://localhost/UX2/src/api/api/userapi.php?action=update', {
      method: 'POST',
      credentials: 'include',
      body: data
      
    })    .then(function(headers) {
      if(headers.status == 400) {
          console.log('username exists');
          return;
      }
   
      if(headers.status == 201) {
          console.log(' updated');
          return;
      }
     
  })
  .catch(function(error) {console.log(error)});
  }
  render() {
  
    return (
      <div >
         <h1>Edit My profile</h1>
         <div>
      </div>
      <form onSubmit={this.handleSubmit}>
              <input type="hidden" name="currentusername"  id="currentusername" required hidden></input>
              <h4> username</h4>
              <input type="text" name="username"  id="upusername"  onChange={this.onChange.bind(this)} value={this.state.value} required></input>
              <h4> email</h4>
              <input type="email" name="email"  id="upemail" value="username@username2" required></input>
              <h4> phone</h4>
              <input type="number" name="phone"  id="upphone" value="1012" required></input>
              <h4> postcode</h4>
              <input type="number" name="postcode"  id="uppostcode" value="10102" required></input>
              <h4> password</h4>
              <input type="password" name="password" placeholder="password" id="uppassword" value="password2" required></input>
              <h4>re-password</h4>
              <input type="password" name="password2" placeholder="password again" id="uppassword2" value="password2" required></input>
             
              <input type="submit" name="submit"></input>
       </form>
      </div>
    );
  }
}
class password extends React.Component {
  render() {
    return (
      <div>
         <h4>New password</h4>
            <input type="password" name="password" placeholder="password"
               id="regpass"  required></input>     <br /> 
                <h4>Confirm password</h4>
              
            <input type="password" name="Confirm" placeholder="Confirm password"
               id="Confirm"  required></input>  <br />   
                <button name="subject" type="submit" id="fat-btn" class="btn btn-success" >Save</button>
        </div>

    );
  }
}

class Contact extends React.Component {
  render() {
    return (
      <div>
        <h2>Contact Method</h2>
        <p>e-mail:xxxx@gmial.com</p>
        <p>Phone Number: xxx-xxx-xxx</p>
        <p>Address: 10 shhh street Brisbane,QLD</p>
      </div>
    );
  }
}



ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);
 
export default Main;