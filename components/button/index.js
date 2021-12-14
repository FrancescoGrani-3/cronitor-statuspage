import { useTheme } from "styled-components"

import { StyledButton } from "./index.styled"
import Text from '../typography/Text'

const Button = ({ ...props }) => {
    const theme = useTheme()

    return (
        <StyledButton
            {...props} hasChildren={props.children}
            disabled={props.disabled || props.loading}
        >
            {props.icon && <span className='icon'>
                {
                    props.icon({
                        size: 17,
                        color: theme.colors.text,
                    })
                }
            </span>}
            {
                props.children && <Text>
                    {!props.loading ? props.children : (props.loadingText || 'Loading...')}
                </Text>
            }
        </StyledButton>
    )
}

export default Button