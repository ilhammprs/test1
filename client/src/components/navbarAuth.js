import { Container, Navbar as NavbarComp, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import Login from '../modal/Login'
import Register from '../modal/Register'
import React, { useState, useEffect } from 'react';

export default function NavbarAuth() {
    const [logShow, setLogShow] = useState(false);
    const [regShow, setRegShow] = useState(false);
    const handleLogClose = () => setLogShow(false);
    const handleRegClose = () => setRegShow(false);
    const handleLogShow = () => setLogShow(true);
    const handleRegShow = () => setRegShow(true);
    
    const handleLogin = () => {
        handleLogShow();
    };

    const handleRegister = () => {
        handleRegShow();
    };

    useEffect(() => {}, []);
    return (
        <NavbarComp expand="sm" className='navbar'>
            <Container>
            <NavbarComp.Brand as={Link} to="/auth">
                    TOCO
              </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                  <NavbarComp.Collapse id="basic-navbar-nav">
                    <div className='ms-auto'>
                        <Button 
                            className= 'px-4 mx-2' 
                            variant="outline-dark"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Button 
                            className= 'px-4 mx-2' 
                            variant="dark"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </div>
                </NavbarComp.Collapse>
            </Container>
            <Login
                show={logShow}
                handleClose={handleLogClose}
            />
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </NavbarComp>
    )
}
