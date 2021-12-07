import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Navbar from './Navbar'

const Wrapper = styled.div`

`

const Layouts = (props) => {
    return (<Wrapper>
        <Navbar />
        {props.children}
    </Wrapper>)
}

export default Layouts