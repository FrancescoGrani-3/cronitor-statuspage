import styled, { keyframes } from 'styled-components'
import { Card } from 'react-bootstrap'

const pulse = keyframes`
    100% {
        transform: scale(2.5);
        opacity: 0;
    }
`

export const Service = styled.div`
    border-bottom: 1px solid ${p => p.theme.colors.card.border};
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

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`

export const Ping = styled.span`
    background-color: ${p => p.status ? p.status === 'ok' ? p.theme.colors.green : p.theme.colors.red : p.theme.colors.gray};
    display: inline-flex;
    height: 40px;
    border-radius: 25px;
    padding: 0 1px;
    width: 100%;
    margin-right: 2px;

    @media (min-width: 576px) {
        margin-right: 2px;
    }

    @media (min-width: 768px) {
        margin-right: 3px;
    }

    @media (min-width: 1200px) {
        margin-right: 5px;
    }
`

export const Circle = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background-color: ${p => p.up ? p.theme.colors.green : p.theme.colors.red};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
    
  &.pulse {

      &:before,
      &:after {
          content: "";
          position: absolute;
          width: ${p => p.size / 1.25}px;
          height: ${p => p.size / 1.25}px;
          background-color: ${p => p.up ? p.theme.colors.green : p.theme.colors.red};
          border-radius: 50%;
          z-index: -1;
          opacity: 0.7;
      }
      &:before {
          animation: ${pulse} 2s ease-out infinite;
      }
      &:after{
          animation: ${pulse} 2s 1s ease-out infinite;
      }
  }
`

export const Date = styled.div`
    display: flex;
    align-items: center;
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
  background-color: ${p => p.theme.colors.card.body};

  .card-header {
    border-radius: ${p => p.theme.sizes.card.radius}px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid ${p => p.theme.colors.card.border};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .status {
        display: flex;
    }
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

