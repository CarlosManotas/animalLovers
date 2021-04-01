import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  min-height: 100%;
`;

const Card = styled.li`
  text-align: center;
  list-style: none;
  width: 100%;
  cursor: pointer;
  height: 400px;
  .cardItem {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background-image: ${(props) => `url(${props.image}.png)`};
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  p {
    opacity: 0;
    color: white;
    font-size: 30px;
    font-weight: bold;
    transition: 1s all;
    margin-top: -30px;
    text-transform: uppercase;
  }
  &:hover {
    p {
      opacity: 1;
      transition: 1s all;
      margin-top: 0px;
    }
  }
`;

export default function AnimalCards({ animals }) {
  return (
    <>
      <Wrapper>
        {animals.map((animal: string) => (
          <Link href={`/${animal}`} key={animal}>
            <Card image={animal}>
              <div className="cardItem" />
              <p>{animal}</p>
            </Card>
          </Link>
        ))}
      </Wrapper>
    </>
  );
}
