import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import Heading from '../typography/Heading'
import Text from '../typography/Text'

const Wrapper = styled.div`
`

const StyledPowered = styled.div`
    display: flex;
`

const Footer = props => {

    return (
        <Wrapper className='pt-5'>
            <Container>
                <StyledPowered>
                    <Text>Powered by</Text>
                    <a className='mx-1' href="https://cronitor.io">
                        <Heading variant={6}>Cronitor</Heading>
                    </a>
                    <Text>and</Text>
                    <a className='mx-1' href="https://github.com/thevahidal/cronitor-statuspage">
                        <Heading variant={6}>Cronitor StatusPage</Heading>
                    </a>
                </StyledPowered>
            </Container>
        </Wrapper>
    )
}

export default Footer