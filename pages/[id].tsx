import React from 'react';
import styled from 'styled-components';
import { GetStaticProps, GetStaticPaths } from 'next';
import Animated from 'animate-styled';
import {
  Table,
  Space,
  Avatar,
  Button,
  Modal,
  Popconfirm,
  notification,
} from 'antd';
import { StarTwoTone, DeleteTwoTone } from '@ant-design/icons';
import * as R from 'ramda';

const { Column } = Table;
import { Layout, Form } from '../components';
import { UserInfo } from '../lib/helper-types';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const Wrapper = styled.div`
  position: relative;
  max-width: 1200px;
  margin: auto;
  padding: 10px;
  width: 100%;
  @media (min-width: 768px) {
    padding: 20px 40px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  figure {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
    .leftTopSide {
      width: 30%;
    }
  }
`;

type Position = 'fadeInRight' | 'rotateInDownRight' | 'bounceIn';

type Props = {
  animal: UserInfo[];
  id: string;
};

interface StateProps {
  animalInfo: UserInfo[];
  position: Position;
  size: number;
  loading: boolean;
  visible: boolean;
  confirmLoading: boolean;
  error: any;
  popConfirmActiveId: string;
}

interface Actions {
  type: string;
  payload?: any;
}

function reducer(state: StateProps, action: Actions) {
  switch (action.type) {
    case 'TOOGLE_SHOW': {
      return { ...state, visible: !state.visible };
    }
    case 'SHOW_CONFIRM': {
      return { ...state, popConfirmActiveId: action.payload };
    }
    case 'ONSUBMIT': {
      return {
        ...state,
        confirmLoading: true,
      };
    }
    case 'UPDATE_INFO': {
      return {
        ...state,
        animalInfo: action.payload,
        loading: false,
        confirmLoading: false,
        popConfirmActiveId: '',
        visible: false,
      };
    }
    case 'MOREORLESS_USERS': {
      return {
        ...state,
        size: action.payload,
        loading: true,
      };
    }
    case 'DELETE_USER': {
      return {
        ...state,
        confirmLoading: true,
      };
    }
    case 'ERROR_HANDLER': {
      const error = R.propOr('Ups ', 'message')(action.payload);
      return {
        ...state,
        loading: false,
        confirmLoading: false,
        visible: false,
        popConfirmActiveId: '',
        error,
      };
    }
    case 'SET_POSITION': {
      return { ...state, position: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function initialState(state: UserInfo[]) {
  return {
    animalInfo: state,
    position: 'fadeInRight',
    size: 10,
    loading: false,
    visible: false,
    confirmLoading: false,
    error: null,
    popConfirmActiveId: '',
  };
}

export default function AnimalId({ animal, id }: Props) {
  const [state, setState] = React.useReducer(reducer, initialState(animal));
  const [run, setRun] = React.useState(false);

  React.useEffect(() => {
    let value = window.localStorage.getItem('position');
    if (value !== null) {
      setState({ type: 'SET_POSITION', payload: value });
    }
  }, []);

  React.useEffect(() => {
    if (state.error) {
      notification.error({
        message: 'Something went wrong! :(',
        description: state.error,
      });
    }
  }, [state.error]);

  React.useEffect(() => {
    async function uploadInfo() {
      const data = await getInfo();
      setState({ type: 'UPDATE_INFO', payload: data });
    }
    if (run) {
      uploadInfo();
    }
  }, [state.size]);

  function toogleShow() {
    setState({ type: 'TOOGLE_SHOW' });
  }

  async function getInfo() {
    try {
      const data = await fetch(`/api/animals/${id}?size=${state.size}`);
      const animalInfo = await data.json();
      return animalInfo;
    } catch (error) {
      setState({ type: 'ERROR_HANDLER', payload: error });
    }
  }

  async function deleteUser(id: string) {
    setState({ type: 'DELETE_USER' });
    try {
      await fetch(`/api/user/${id}`, { method: 'DELETE' });
      const data = await getInfo();
      setState({ type: 'UPDATE_INFO', payload: data });
    } catch (error) {
      setState({ type: 'ERROR_HANDLER', payload: error });
    }
  }

  async function onSubmit(data: UserInfo, callback) {
    setState({ type: 'ONSUBMIT' });
    try {
      await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      callback();
      const info = await getInfo();
      setState({ type: 'UPDATE_INFO', payload: info });
    } catch (error) {
      console.log(error);
      setState({ type: 'ERROR_HANDLER', payload: error });
    }
  }

  async function toggleUsers() {
    setRun(true);
    const size = state.animalInfo.length > 10 ? 10 : 25;
    setState({
      type: 'MOREORLESS_USERS',
      payload: size,
    });
  }

  const showPopconfirm = (id: string) => {
    setState({ type: 'SHOW_CONFIRM', payload: id });
  };

  return (
    <Layout>
      <Wrapper>
        <Content>
          <div className="leftTopSide">
            <Animated name={state.position} iterationCount={1} duration="600ms">
              <figure>
                <img src={`/${id}.png`} alt={id} />
              </figure>
            </Animated>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="primary"
                onClick={toogleShow}
                style={{ backgroundColor: '#49146E' }}
              >
                + Add new user
              </Button>
              <Button
                onClick={toggleUsers}
                type="primary"
                loading={state.loading}
                style={{ backgroundColor: '#49146E' }}
              >
                Show {state.animalInfo?.length > 10 ? 'less' : 'more'} users
              </Button>
            </div>
            <Table
              rowKey={(record) => record.id}
              dataSource={state.animalInfo}
              pagination={{ pageSize: 5 }}
            >
              <Column
                title="Name"
                dataIndex="name"
                key="name"
                width="20%"
                render={({ given, surname }) => (
                  <span>
                    {given} {surname}
                  </span>
                )}
              />
              <Column title="Age" dataIndex="age" key="age" />
              <Column
                title="Points"
                dataIndex="points"
                key="points"
                width="20%"
                render={(points: string) => (
                  <span>
                    {points} <StarTwoTone />
                  </span>
                )}
              />
              <Column
                title="Lover of"
                dataIndex="animals"
                key="animals"
                responsive={['md']}
                render={(animals) => (
                  <>
                    {animals.map((animal) => (
                      <Avatar key={animal} src={`/${animal}.png`} />
                    ))}
                  </>
                )}
              />
              <Column
                title="Action"
                key="action"
                render={(_, record: UserInfo) => (
                  <Space size="middle">
                    <Popconfirm
                      title="Are you sure to delete this user?"
                      onConfirm={() => deleteUser(record.id)}
                      okText="Yes"
                      cancelText="No"
                      visible={state.popConfirmActiveId === record.id}
                      okButtonProps={{
                        loading: state.confirmLoading,
                      }}
                    >
                      <DeleteTwoTone
                        onClick={() => showPopconfirm(record.id)}
                      />
                    </Popconfirm>
                  </Space>
                )}
              />
            </Table>
          </div>
        </Content>
      </Wrapper>
      <Modal
        title="Add new user"
        visible={state.visible}
        onCancel={toogleShow}
        footer={[
          <Button key="back" onClick={toogleShow}>
            Cancelar
          </Button>,
          <Button
            type="primary"
            loading={state.confirmLoading}
            htmlType="submit"
            form="form1"
            key="send"
          >
            Enviar
          </Button>,
        ]}
      >
        <Form defaultId={id} onSubmit={onSubmit} />
      </Modal>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetch(`${BASE_URL}/api/animals/${params.id}`);
  const animal = await data.json();

  return { props: { animal, id: params.id } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Call the API endpoint to get animals
  const data = await fetch(`${BASE_URL}/api/animals`);
  const animals: string[] = await data.json();

  // Get the paths we want to pre-render based on animals
  const paths = animals.map((animal) => ({
    params: { id: animal },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
