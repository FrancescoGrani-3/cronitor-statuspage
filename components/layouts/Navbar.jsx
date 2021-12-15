import { useEffect, useContext } from "react"
import { Navbar, Nav, Container, } from "react-bootstrap"
import configs from "../../configs"

import { Wrapper, VerticalSeparator } from './index.styled'
import Heading from "../typography/Heading"
import Text from "../typography/Text"
import { ThemeContext } from "../../constants/theme"


const CustomNavbar = (props) => {
    const theme = useContext(ThemeContext)
    
    const handleChangeTheme = () => {
        theme.toggleMode()
    }

    const getThemeChangerLabel = () => {
        if (theme.mode === 'light') return 'Dark'
        else return 'Light'
    }

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
                        <Text muted={true} className=''>Status</Text>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link>
                            <Text onClick={handleChangeTheme}>{getThemeChangerLabel()}</Text>
                        </Nav.Link>
                        {configs.CTA_URL && <Nav.Link target="_blank" href={configs.CTA_URL}>
                            <Text className=''>{configs.CTA_TITLE || 'Support'}</Text>
                        </Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
        </Wrapper>
    )
}

export default CustomNavbar