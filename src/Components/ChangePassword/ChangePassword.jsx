import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './ChangePassword.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
     <Header/>
    <div className="change-password-container">
      <h2>Change Password</h2>
      <Form
        form={form}
      
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
      
          name="currentPassword"
          rules={[{ required: true, message: 'Please enter your current password' }]}
        >
          <Input.Password placeholder="Enter Current Password" />
        </Form.Item>

        <Form.Item
         
          name="newPassword"
          rules={[{ required: true, message: 'Please enter your new password' }]}
        >
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>

        <Form.Item
      
          name="confirmNewPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter Confirm New Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            save
          </Button>
        </Form.Item>
      </Form>
    </div>
    <Footer/>
    </div>
  );
};

export default ChangePassword;
