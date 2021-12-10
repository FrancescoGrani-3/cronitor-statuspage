import { Wrapper } from './index.styled'
import Navbar from './Navbar'
import Footer from './Footer'

const Layouts = (props) => {
    return (<Wrapper>
        <Navbar />
        {props.children}
        <Footer />
    </Wrapper>)
}

export default Layouts