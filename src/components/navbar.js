import React, {useContext} from 'react'
import { Container, Navbar as NavbarComp, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../context/userContext'
import { BiLogOut, BiUser, BiMoney, BiMessageSquareDetail } from "react-icons/bi";
import { API } from '../config/api';
import { useQuery } from 'react-query';
import UserProfile from '../assets/blank.jpg'
import CartImg from '../assets/Vector (1).png'
import Nav from 'react-bootstrap/Nav';

export default function Navbar() {
    const [state, dispatch] = useContext(UserContext)
    let navigate = useNavigate()
    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/auth")
    }

    let { data: carts } = useQuery('cartsCache', async () => {
        const response = await API.get('/carts');
        return response.data.data;
    });
    console.log(carts);

    return (
        <NavbarComp expand="sm" className='navbar' >
            <Container>
                <NavbarComp.Brand as={Link} to="/">
                    TOCO
                </NavbarComp.Brand>
                <Nav.Link> 
                <Link to="/" className='navdrop'>
                     Home
                </Link>
                </Nav.Link>
                <Nav.Link>
                <Link to="/productList" className='navdrop'>
                     Product
                </Link>
                </Nav.Link>

                <NavbarComp.Collapse id="basic-navbar-nav">
                    <Link to="/cart" style={{ display: "flex" }}>
                        <img src={CartImg} className="navcart" alt='img' />
                    </Link>
                    <NavDropdown title={
                        <div className="pull-left">
                            <img src={UserProfile} alt="IMG" className='navuser'/>
                        </div>} id="basic-nav-dropdown" className="ms-auto dropdown-toggle">
                        <NavDropdown.Item>
                            <Link to="/profile" className='navdrop'>
                                <BiUser /> Profile
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/history" className='navdrop'>
                                <BiMoney  /> Transaksi
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/faq" className='navdrop'>
                                <BiMessageSquareDetail  /> Faq
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}><BiLogOut /> Logout</NavDropdown.Item>
                    </NavDropdown>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>
    )
}
