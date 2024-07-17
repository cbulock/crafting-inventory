'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Form } from 'antd';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStore from '../store';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const MyForm = () => {
  const setFormData = useStore((state) => state.setFormData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Name"
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name ? errors.name.message : ''}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      {/* Add other form items here */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
