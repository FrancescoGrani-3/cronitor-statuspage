import styled from 'styled-components'
import { Card } from 'react-bootstrap'

export const Service = styled.div`
    background-color: ${p => p.theme.colors.card.body};
    ${p => !p.noBorder && `border-bottom: 1px solid #e9e9e9;`}
    padding: 1.5rem 2rem;

    &:last-child {
        border: none;
    }
`

export const Pings = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 0;
`


export const Ping = styled.span`
  background-color: ${p => p.status === 'ok' ? p.theme.colors.green : p.theme.colors.red};
  margin-right: 3px;
  display: inline-flex;
  height: 40px;
  border-radius: 5px;
  padding: 0 1px;
  width: 100%;
`

export const Circle = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background-color: ${p => p.up ? p.theme.colors.green : p.theme.colors.red};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`


export const StyledCardBody = styled(Card.Body)`
  padding: 0;
  border-radius: ${p => p.theme.sizes.card.radius}px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  overflow: hidden;
`

export const StyledCard = styled(Card)`
  border-radius: ${p => p.theme.sizes.card.radius}px;
  border: none;
  box-shadow: 2px 2px 5px #2222;

  .card-header {
    border-radius: ${p => p.theme.sizes.card.radius}px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    background: transparent;
  }

  .card-footer {
    border-radius: ${p => p.theme.sizes.card.radius}px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
