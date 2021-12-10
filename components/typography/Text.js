import styled from 'styled-components'

const StyledP = styled.p`
    margin: 0;
    line-height: 1;
    color: ${p => p.theme.colors.text};
`

const Text = ({ children, className, ...props }) => {

    return (
        <StyledP className={`${className} ${props.muted ? 'text-muted' : ''}`} {...props}>{children}</StyledP>
    )
}

export default Text