import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <header>
            <Navbar className="color-nav" variant="light" expand="lg" collapseOnSelect style={{ "height": "60px", "zIndex": "99" }}>
                <Container>
                    <LinkContainer to='/' style={{ "width": "15%" }}>
                        <img src="https://images.squarespace-cdn.com/content/v1/50640553e4b0e9530e2dfb13/1595343938815-UAPEFKX5JQM6TM4X3JUV/ke17ZwdGBToddI8pDm48kIfK_2CnwXO3UVDzSQy-8JcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYwL8IeDg6_3B-BRuF4nNrNcQkVuAT7tdErd0wQFEGFSnNIigukk-lmr4DHGResHRu4AsUgwhgCuOQTkADY7myfVMyI9jyypRlXt-SP6XHcIVw/OnePlus_LU_Red_RGB.png" alt="logo" />
                    </LinkContainer>
                    <Nav className="mr-left">
                        {userInfo ?
                            <NavDropdown title={userInfo.name} id="userName">
                                <LinkContainer to='/profile'>
                                    <Nav.Link  >Profile</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/' onClick={logoutHandler}>
                                    <Nav.Link  >Logout</Nav.Link>
                                </LinkContainer>
                                {/* <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item> */}
                            </NavDropdown>
                            :
                            <LinkContainer to='/login'>
                                <Nav.Link ><i className="fas fa-user"></i>  Sign in</Nav.Link>
                            </LinkContainer>
                        }
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fas fa-shopping-cart"></i>  Cart</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
