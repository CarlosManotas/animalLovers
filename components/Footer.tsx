import styled from 'styled-components';

const Container = styled.footer`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  p {
    margin: 0;
    color: white;
  }
`;

export default function Footer() {
  return (
    <Container>
      <p>Carlos Manotas - 2021</p>
    </Container>
  );
}
