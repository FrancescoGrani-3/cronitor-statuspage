import { Container } from 'react-bootstrap'

import { Wrapper, StyledPowered } from './index.styled'
import Heading from '../typography/Heading'
import Text from '../typography/Text'


const Footer = props => {

    return (
        <Wrapper className='pt-5'>
            <Container>
                <StyledPowered>
                    <Text>Powered by</Text>
                    <a className='mx-1' href="https://cronitor.io">
                        <Heading variant={6}>Cronitor</Heading>
                    </a>
                </StyledPowered>
            </Container>
        </Wrapper>
    )
}

export default Footer