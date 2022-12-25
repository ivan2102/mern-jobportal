import styled from 'styled-components'

const Wrapper = styled.main`
  text-align: center;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: rgb(29,17, 96);
  }
  a {
    color: rgb(29, 17, 96);
    text-decoration: underline;
    text-transform: capitalize;
  }
`

export default Wrapper