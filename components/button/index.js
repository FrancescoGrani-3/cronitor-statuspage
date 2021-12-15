import { useTheme } from "styled-components"

import { StyledButton } from "./index.styled"
import Text from '../typography/Text'

const Button = ({ iconRotating, loading, loadingText, icon, ...props }) => {
    const theme = useTheme()

    return (
        <StyledButton
            {...props} 
            $hasChildren={props.children}
            $iconRotating={iconRotating}
            disabled={props.disabled || loading}
        >
            {icon && <span className='icon'>
                {
                    icon({
                        size: 17,
                        color: theme.colors.text,
                    })
                }
            </span>}
            {
                props.children && <Text>
                    {!loading ? props.children : (loadingText || 'Loading...')}
                </Text>
            }
        </StyledButton>
    )
}

export default Button