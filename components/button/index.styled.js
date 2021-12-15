import styled, { keyframes } from "styled-components"
import { Button } from "react-bootstrap"

export const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`

export const StyledButton = styled(Button)`
    display: flex;
    border-radius: ${({ theme }) => theme.sizes.card.radius}px;
    align-items: center;
    
    ${
        p => p.$hasChildren
            ? `padding: 0.5rem 1rem;`
            : `padding: 0.5rem;`
    }
    ${
        p => p.variant === 'transparent' && `
            background-color: rgba(0, 0, 0, 0.1);
        `
    }

    .icon {
        display: flex;
        animation: ${rotate} 1s ${p => p.$iconRotating && `infinite`};

        ${
            p => p.$hasChildren && `
                margin-right: 0.75rem;
            `
        }
    }
`