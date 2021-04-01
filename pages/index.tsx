import React from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next';
import * as R from 'ramda';
import { Carousel } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

import {
  ControllerButton as ControllerRight,
  AnimalCards,
  Layout,
} from '../components';

const ControllerLeft = styled(ControllerRight)`
  left: -20px;
  cursor: pointer;
  transition: 400ms all;
  &:hover {
    background-color: #ddd;
    left: -22px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 1200px;
  margin: auto;
  padding: 20px 40px;
  width: 85%;
  max-height: 500px;
  @media (min-width: 660px) {
    padding: 20px 40px;
  }
`;

export default function Home({ animals }) {
  const carousel = React.useRef(null);
  const wrapper = React.useRef(null);
  const [countSplit, setCountSplit] = React.useState(3);
  const split = R.splitEvery(countSplit, animals);

  React.useEffect(() => {
    function handlerResize() {
      const width = window.innerWidth;
      const rowCount = width < 480 ? 1 : width < 768 ? 2 : 3;
      setCountSplit(rowCount);
    }
    function handlerClick(event) {
      if (event.target.closest('.cardItem')) {
        // I want to determinate if the click is `left|center|right`
        const clickPosition = Math.floor(event.clientX);
        const side = wrapper.current.getBoundingClientRect().width / 3;
        const position =
          clickPosition > side
            ? clickPosition > side * 2
              ? 'fadeInRight'
              : 'rotateInDownRight'
            : 'bounceIn';
        window.localStorage.setItem('position', position);
      }
    }
    window.addEventListener('click', handlerClick);
    window.addEventListener('resize', handlerResize);
    handlerResize();
    return () => {
      window.removeEventListener('click', handlerClick);
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function handlerNext() {
    carousel.current.next();
  }

  function handlerPrev() {
    carousel.current.prev();
  }

  return (
    <Layout>
      <Wrapper ref={wrapper}>
        <ControllerLeft
          onClick={handlerPrev}
          children={<CaretLeftOutlined />}
        />
        <Carousel dots={false} autoplay ref={carousel}>
          {split.map((container, index) => (
            <AnimalCards key={index} animals={container} />
          ))}
        </Carousel>
        <ControllerRight
          onClick={handlerNext}
          children={<CaretRightOutlined />}
        />
      </Wrapper>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  const data = await fetch(`${BASE_URL}/api/animals`);
  const animals = await data.json();

  if (R.isEmpty(animals)) {
    return {
      notFound: true,
    };
  }

  return {
    props: { animals },
  };
};
