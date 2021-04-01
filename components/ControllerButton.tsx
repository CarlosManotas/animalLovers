import styled from 'styled-components';

const ControllerRight = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: white;
  color: rgb(85, 8, 139);
  position: absolute;
  top: 0;
  bottom: 0;
  right: -20px;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 9999;
  font-size: 20px;
  transition: 400ms all;
  &:hover {
    background-color: #ddd;
    right: -22px;
  }
`;

export default ControllerRight;
