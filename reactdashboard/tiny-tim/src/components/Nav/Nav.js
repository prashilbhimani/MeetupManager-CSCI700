import React, { Component } from "react";
import  { Navbar } from "react-bootstrap";
class Nav extends Component {
  _launchLogin = () => {
    console.log("func called")
  }
    render() {
      return (
        <Navbar inverse collapse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Project Epic</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text pullRight>
              <Navbar.Link href="#" onClick={this._launchLogin}>Login</Navbar.Link>
            </Navbar.Text>            
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
  
export default Nav;
