/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { useState } from 'react';
import Router, { withRouter } from 'next/router';

//import configuration variable
import { CONFIG } from '@config/config';

//import dependencies libaries
import $ from "jquery";
import { InputGroup, InputGroupAddon, Button, Input, Nav, NavItem, NavLink } from 'reactstrap';


//import scss module parts
import Styles from '@includes_sass_module/frontend/navbar/navbar.module.scss';

class Index extends React.Component {
    static getStaticProps() {
        return {CONFIG};
    }

    render() {
        return (
            <Nav className={ Styles.navbar }>
              <NavItem>
                 <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button>To the Left!</Button>
                        </InputGroupAddon>
                        <Input />
                      </InputGroup>
              </NavItem>
            </Nav>
        )
    }
}
export default withRouter(Index);