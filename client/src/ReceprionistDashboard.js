import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Tag, Spin, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Box, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const { Option } = Select;

const ReceptionistDashboard = ({socket}) => {
  const [orders, setOrders] = useState([]);
  const [cakeDetails, setCakeDetails] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text,setText]=useState('')
  const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/cake/get-orders/?search=${text}`);
        const fetchedOrders = response.data.orders || [];
        console.log(fetchedOrders)
        // Ensure fetchedOrders is an array
        if (!Array.isArray(fetchedOrders)) {
          throw new Error('Unexpected data format for orders');
        }

        setOrders(fetchedOrders);

      } catch (error) {
        console.error('Error fetching orders or cake details:', error);
        message.error('Failed to load orders');
        setOrders([]);  // Set to empty array if there's an error
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    

fetchOrders()
  }, [text]);
 

    socket.on('updateOrders',()=>{
      console.log("hello")
      fetchOrders()})
  

console.log(cakeDetails)
  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  const handleUpdateOrder = async (values) => {
    try {
      const updatedOrder = {
        ...selectedOrder,
        status: values.status,
      };
      console.log(updatedOrder)
      
      await axios.post(`${process.env.REACT_APP_URL}/cake/update-order/${selectedOrder._id}`, updatedOrder);
      // setOrders((prevOrders) =>
      //   prevOrders.map((order) =>
      //     order._id === selectedOrder._id ? { ...order, ...updatedOrder } : order
      //   )
      // );
      
      message.success('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      message.error('Failed to update order');
    } finally {
      setIsModalVisible(false);
      setSelectedOrder(null);
    }
  };

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'uniqueNumber',
      key: 'uniqueNumber',
    },
    {
      title: 'Cake Name',
      dataIndex: 'cakeName',
      key: 'cakeName',
      // render: (text, record) => cakeDetails[record.cakes]?.name || text,
    },
    {
      title: 'Customer Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
        title:'Remaining Price',
        dataIndex:'remainingPrice',
        key:'remainingPrice'
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
  let color;
  if (status === 'Completed') {
    color = 'green';
  } else if (status === 'delivered') {
    color = 'blue';
  } else if (status === 'Cancelled') {
    color = 'red';
  } else {
    color = 'orange';
  }
  return <Tag color={color}>{status.toUpperCase()}</Tag>;
},
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Update Status
        </Button>
      ),
    },
  ];
  const handleSearchChange = (event) => {
    setText(event.target.value);
    console.log(text)
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Receptionist Dashboard</h1>
      <Box className="fixed top-0 right-0 mt-20 mr-40 z-10">
      <InputGroup size="md" maxW="200px" className=''>
        <input
          className='border border-teal-600  border-2 p-2 pr-0 rounded-lg focus:outline-indigo-400   '
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        
      </InputGroup>
    </Box>
      {loading ? (
        <Spin tip="Loading Orders..." />
      ) : (
        <Table className='overflow-auto [&::-webkit-scrollbar]:hidden' columns={columns} dataSource={orders} rowKey="_id" />
      )}
      <Modal
        title="Update Order Status"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <Form
            initialValues={{
              status: selectedOrder.status,
              
            }}
            onFinish={handleUpdateOrder}
          >
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                {/* <Option value="Pending">Pending</Option> */}
                <Option value="Completed">Completed</Option>
                <Option value="Cancelled">Cancelled</Option>
                <Option value="Delivered">Delivered</Option>
              </Select>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Order
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ReceptionistDashboard;
