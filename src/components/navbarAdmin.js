import React, {useContext} from 'react'
import { Container, Navbar as NavbarComp, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../context/userContext'
import { BiLogOut, BiMoney, BiBookAdd } from "react-icons/bi";
import UserProfile from '../assets/blank.jpg'

export default function NavbarAdmin() {
    const [state, dispatch] = useContext(UserContext)
    let navigate = useNavigate()
    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/auth")
    }

    return (
        <NavbarComp expand="sm" className='navbar' >
            <Container>
            <NavbarComp.Brand as={Link} to="/transaction">
                    TOCO
              </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                  <NavbarComp.Collapse id="basic-navbar-nav">
                    <NavDropdown className="dropdown-toggle ms-auto" title={
                        <div className="pull-left">
                            <img src={UserProfile} alt="IMG" className='navuser'/>
                        </div>} id="basic-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/product" className='navdrop'>
                                <BiBookAdd /> Product
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/transaction" className='navdrop'>
                                <BiMoney  /> Transaksi
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
