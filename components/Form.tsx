import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Select, Input, Switch, InputNumber } from 'antd';

import { UserInfo, Animals } from '../lib/helper-types';

const schema = yup.object().shape({
  name: yup.object().shape({
    given: yup.string().required('name is required field'),
    surname: yup.string().required('surname is a required field'),
  }),
  age: yup.number().positive().integer().required(),
  points: yup.number().positive().integer().max(100).min(0).required(),
  isActive: yup.bool().required(),
  animals: yup
    .array()
    .of(yup.string())
    .min(1, 'choose at least one')
    .required(),
});

export default function Form({ defaultId, onSubmit }) {
  const [animalsList, setAnimalsList] = React.useState<Animals[]>([]);

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    reset,
  } = useForm<UserInfo>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    async function getAnimals() {
      try {
        const data = await fetch(`/api/animals`);
        const animals = await data.json();
        setAnimalsList(animals);
      } catch (error) {
        console.log(error);
      }
    }
    getAnimals();
  }, []);

  React.useEffect(() => {
    // custom register Antd input
    register('isActive');
    register('animals');
    register('name.given');
    register('name.surname');
    register('age');
    register('points');
  }, [register]);

  function onChange(value, key: string) {
    setValue(key, value);
  }

  function ErrorMessage({ children }) {
    return <p style={{ color: 'red' }}>{children}</p>;
  }

  function onSubmitWithCallback(data: UserInfo) {
    onSubmit(data, reset);
  }

  return (
    <form id="form1" onSubmit={handleSubmit(onSubmitWithCallback)}>
      <label>Name:</label>
      <Input
        type="text"
        name="name.given"
        ref={register}
        onChange={(event) => onChange(event.target.value, 'name.given')}
      />
      <ErrorMessage>{errors.name?.given?.message}</ErrorMessage>
      <label>Lastname:</label>
      <Input
        type="text"
        name="name.surname"
        ref={register}
        onChange={(event) => onChange(event.target.value, 'name.surname')}
      />
      <ErrorMessage>{errors.name?.surname?.message}</ErrorMessage>
      <label>Age:</label>
      <InputNumber
        style={{ width: '100%' }}
        name="age"
        defaultValue={18}
        ref={register}
        onChange={(value) => onChange(value, 'age')}
      />
      <ErrorMessage>{errors.age?.message}</ErrorMessage>
      <label>Points: </label>
      <InputNumber
        style={{ width: '100%' }}
        name="points"
        defaultValue={0}
        max={100}
        min={0}
        ref={register}
        onChange={(value) => onChange(value, 'points')}
      />
      <ErrorMessage>{errors.points?.message}</ErrorMessage>

      <label>Animals that you love:</label>
      <Controller
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={[defaultId]}
        name="animals"
        control={control}
        as={Select}
        options={animalsList.map((animal) => ({ value: animal }))}
      />
      <ErrorMessage>{(errors.animals as any)?.message}</ErrorMessage>
      <label>Is active: </label>
      <Controller
        control={control}
        name="isActive"
        defaultValue={true}
        render={({ onChange }) => <Switch defaultChecked onChange={onChange} />}
      />
      <ErrorMessage>{errors.isActive?.message}</ErrorMessage>
    </form>
  );
}
