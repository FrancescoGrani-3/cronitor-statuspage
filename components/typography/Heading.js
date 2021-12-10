import styled from 'styled-components'

const StyledH2 = styled.h2`
    margin: 0;
    font-weight: bold;
    line-height: 1;
    color: ${p => p.theme.colors.heading};
`

const Heading = ({children, variant, ...props}) => {
    const getElementByVariant = (_variant) => {
        if (!_variant || _variant > 6 || _variant < 1) return 'h2'
        else return 'h' + _variant
    }

    return (
        <StyledH2 as={getElementByVariant(variant)} {...props}>{children}</StyledH2>
    )
} 

export default Heading