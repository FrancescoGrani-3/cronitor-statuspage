import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Navbar from './Navbar'
import Footer from './Footer'

const Wrapper = styled.div`

`

const Layouts = (props) => {
    return (<Wrapper>
        <Navbar />
        {props.children}
        <Footer />
    </Wrapper>)
}

export default Layouts