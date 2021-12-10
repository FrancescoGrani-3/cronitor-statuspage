import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, } from "react-bootstrap"
import configs from "../../configs"

import { Wrapper, VerticalSeparator } from './index.styled'
import Heading from "../typography/Heading"
import Text from "../typography/Text"


const CustomNavbar = (props) => {
    return (
        <Wrapper>
            <Navbar>
                <Container>
                    <Nav className="d-flex align-items-center">
                        <a href={configs.WEBSITE_URL}>
                            <Heading variant={6}>
                                {configs.NAME}
                            </Heading>
                        </a>
                        <VerticalSeparator className="mx-2"/>
                        <Text muted className=''>Status</Text>
                    </Nav>
                    {configs.CTA_URL && <Nav className="ml-auto">
                        <Nav.Link target="_blank" href={configs.CTA_URL}>{configs.CTA_TITLE || 'Support'}</Nav.Link>
                    </Nav>}
                    {/* <Nav className="ml-auto">
                        <Nav.Link>Support</Nav.Link>
                    </Nav> */}
                </Container>
            </Navbar>
        </Wrapper>
    )
}

export default CustomNavbar