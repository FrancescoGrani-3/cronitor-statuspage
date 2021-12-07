import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, } from "react-bootstrap"
import styled from 'styled-components'

import Heading from "../typography/Heading"
import Text from "../typography/Text"

const Wrapper = styled.div`
    padding: 2rem 0;
    background-color: red;
`

const CustomNavbar = (props) => {
    return (
        <Wrapper>
            <Navbar>
                <Container>
                    <Nav>
                    <Heading variant={6}>
                        Pabla
                    </Heading>
                    <Text muted className='mx-2'>Status</Text>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </Wrapper>
    )
}

export default CustomNavbar