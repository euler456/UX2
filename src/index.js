import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";
import Ribs from './pic/Ribs.jpg';
import XiaoLongBao from './pic/XiaoLongBao.jpg';
import gruel from './pic/gruel.jpg';
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
          <li><NavLink to="/" class="col">Home</NavLink></li>
          <li><NavLink to="/Login" class="col ">Login</NavLink></li>
          <li><NavLink to="/contact" class="col ">Contact</NavLink></li>
          <li><NavLink to="/Setting" class="col ">Setting</NavLink></li>
        
          <li class="col "> <button id="dark" class="btn btn-light" onClick={this.changeColor}>Darkmode</button></li>
          <input id="search" type="text" placeholder="Search.."></input>
        </ul>
        <div id="content">
           <Route exact path="/" component={Home}/>
           <Route exact path="/Login" component={Login}/>
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
  render() {
   
    return (
      <div >
        <h2>Home</h2>
        <h4>Xiao Long Bao</h4>
        <img src={XiaoLongBao} alt="XiaoLongBao"/>
        <p>Xiaolongbao is a type of Chinese steamed bun (baozi) from Jiangsu province, especially associated with Wuxi and Shanghai (Shanghai was formerly a part of Jiangsu province)</p>
        
        <h4 class="order">Order:</h4>
        <input type="number" name="order" class="order1" placeholder="0" ></input>
        <h4>Ribs</h4>
        <img src={Ribs} alt="Ribs"/>
        <p>Ribs of pork, beef, lamb, and venison are a cut of meat. The term ribs usually refers to the less meaty part of the chops, often cooked as a slab (not cut into separate ribs).</p>
        <h4 class="order">Order:</h4>
        <input type="number" name="order" class="order1" placeholder="0"  ></input>
        <h4>gruel</h4>
        <img src={gruel} alt="gruel"/>
        <p>Gruel is a food consisting of some type of cereal—such as ground oats, wheat, rye or rice—boiled in water or milk.</p>
        <h4 class="order">Order:</h4>
        <input type="number" name="order" class="order1" placeholder="0"  ></input>
         <br/>
      
         <form action="https://localhost:9998/api.php?action=login" 
          method="POST" id="loginform">
        <button  id="fat-btn" class="btn btn-success">Order</button>
        </form>
        </div>
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