import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Modal, Form, Card, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Box, InputGroup } from '@chakra-ui/react';

const { Option } = Select;

const UserRoleAssignment = () => {
  const [users, setUsers] = useState([]);
    const [text,setText]=useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [form] = Form.useForm();
  
  useEffect(()=>{
    getUsers()
  },[text])

  // Initialize the Form instance
const getUsers=async ()=>{
    try{
        const response=await axios.get(`${process.env.REACT_APP_URL}/user/?search=${text}`)
        setUsers(response.data.users)
    }catch(error){
        console.log(error)
    }}
  const showModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue({ role: user.role }); // Set initial values for the form
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values)
         await axios.put(`${process.env.REACT_APP_URL}/user/update-user/${currentUser._id}`,{role:values})
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      })
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => showModal(record)}
        >
          Edit Role
        </Button>
      ),
    },
  ];
const handleSearchChange = (event) => {
    setText(event.target.value);
    console.log(text)
  };
  return (
    <div className="p-6">
      <Card title="Assign Roles to Users" >
      <Box className="">
      <InputGroup size="md" maxW="200px" className=''>
        <input
          className='border border-teal-600  border-2 p-2 pr-0 rounded-lg focus:outline-indigo-400   '
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        
      </InputGroup>
    </Box>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        className="mb-4"
      /></Card>
      <Modal
        title={`Edit Role for ${currentUser?.name}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOk}
        >
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select a role">
              <Option value="customer">Customer</Option>
              <Option value="Head-Baker">Head-Baker</Option>
              <Option value="Cake-Decorator">Cake-Decorator</Option>
              <Option value="Assistant-Baker">Assistant-Baker</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Reception">Reception</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserRoleAssignment;

