import React, { useState ,useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchisloggedin,fetchlogout } from './api/app/app.js';
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
const [item, setItem ]= useState([]);
class Home extends React.Component {
  render(){
  
    useEffect(() =>{
      fetch('http://localhost/UX2/src/api/api/orderapi.php?action=displayorderfood',
      {
              method: 'POST',
              credentials: 'include'
          }
          ).then((res)=>res.json())
          .then((result) => {setItem(result);})},[])
          return (
            <table>
            <thead>
                <th>F_id</th>
                <th>Name</th>
                <th>image</th>
                <th>Price</th>
                <th>Quantity</th>
            </thead>
            <tbody>
             {
               item.map(data =>{
                 <tr>
            <td class='fd-id'>{data.F_ID}</td>
            <td class='fd-name'>{data.foodname}</td>
            <td ><img src='../images/{data.image}' style="width: 100px; height: 100px;"></img></td>
            <td class='price'>{data.price}</td>
            <td><input type="number" cla  ss="fd-value" name="quantity" value="0" min="0" max="50"></input></td>
            <td>{data.options}</td>
            <td><button class="btnSelect">Select</button></td>
             </tr>
                })}
            
            </tbody>
        </table>
          );
  }
}



class Login extends React.Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form action="#" method="POST" id="loginform">
              <h4> username</h4>
              <input type="text" name="username" placeholder="user name" id="loginuser" value="username" onchange="getuserid()" required></input>
              <h4> password</h4>
              <input type="password" name="password" placeholder="password" id="loginpass" value="password" required></input>
              <input type="submit" name="submit"></input>
       </form>
        </div>

    );
  }
}


class Sign extends React.Component {
  render() {
    return (
      <div>
       
         <h1>Sign Up</h1>
         <form action="#" method="POST" id="registerform">
              <h1>registerform</h1>
              <h4> username</h4>
             <input type="text" name="username"  id="regusername" value="username" required></input>
             <h4> email</h4>
              <input type="email" name="email"  id="regemail" value="username@username" required></input>
              <h4> phone</h4>
              <input type="text" name="phone"  id="regphone" value="1111111111" required></input>
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
 
  render() {
  
    return (
      <div >
         <h1>Edit My profile</h1>
         <div>
      </div>
      <form action="#" method="POST" id="updateform">
              <h1>updateform</h1>
              <input type="hidden" name="currentusername"  id="currentusername" required hidden></input>
              <h4> username</h4>
              <input type="text" name="username"  id="upusername" value="userna" required></input>
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