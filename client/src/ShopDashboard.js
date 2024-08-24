import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Statistic, Dropdown, Menu, Modal, Form, Input, notification, Tag, Select, DatePicker } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useToast } from '@chakra-ui/react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles
import axios from 'axios';
import UserRoleAssignment from './assignRole';
import { Link } from 'react-router-dom';

const { Option } = Select;

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 8000 },
];

const recentOrders = [
  { id: '001', customer: 'John Doe', status: 'Completed' },
  { id: '002', customer: 'Jane Smith', status: 'Pending' },
  { id: '003', customer: 'Alice Johnson', status: 'Canceled' },
  { id: '004', customer: 'Bob Brown', status: 'Completed' },
];

const inventoryData = [
  { name: 'Chocolate Cake', stock: 30 },
  { name: 'Vanilla Cake', stock: 20 },
  { name: 'Red Velvet Cake', stock: 15 },
];

const customerData = [
  { name: 'John Doe', email: 'john@example.com', orders: 10 },
  { name: 'Jane Smith', email: 'jane@example.com', orders: 5 },
  { name: 'Alice Johnson', email: 'alice@example.com', orders: 8 },
];

const salesReportsData = [
  { month: 'Jan', sales: 5000 },
  { month: 'Feb', sales: 6000 },
  { month: 'Mar', sales: 5500 },
  { month: 'Apr', sales: 7000 },
];

const promotionsData = [
  { title: 'Winter Sale', discount: '20%' },
  { title: 'Buy One Get One Free', discount: '50%' },
];

const teamData = [
  { name: 'Emily Clark', role: 'Manager', contact: 'emily@example.com' },
  { name: 'Michael Lee', role: 'Baker', contact: 'michael@example.com' },
];

const feedbackData = [
  { customer: 'John Doe', feedback: 'Great cakes!', rating: 5 },
  { customer: 'Jane Smith', feedback: 'Delicious but a bit expensive.', rating: 4 },
];

const settingsData = {
  address: '123 Cake Street, Bakery City',
  contact: 'contact@cakebakery.com',
  hours: 'Mon-Fri: 9am - 6pm',
};

const ShopDashboard = ({socket}) => {
  const [promotionModalVisible, setPromotionModalVisible] = useState(false);
  const [form] = Form.useForm();
    const [orderNumber,setOrderNumber]=useState({})
    const [orders,setOrders]=useState([])
    const [customer,setCustomer]=useState([])
    const [crew,setCrew]=useState([])
    const [bestSelling,setBestSelling]=useState([])
    const toast=useToast()
  const handleAddPromotion = () => {
    form.validateFields()
      .then(values => {
        notification.success({ message: 'Promotion Added Successfully!' });
        setPromotionModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleMenuClick = (e) => {
    console.log('Menu Clicked:', e.key);
  };
  const getOrderNumbers=async()=>{
    try{
        const response=await axios.get(`${process.env.REACT_APP_URL}/cake/get-order-numbers`)
        console.log(response.data)
        setOrderNumber(response.data)
    }catch(error){
        console.log(error)
    }
  }
  const getRecentOrders=async()=>{
    try{
        const response=await axios.get(`${process.env.REACT_APP_URL}/cake/get-orders`)
        console.log(response.data)
        setOrders(response.data.orders)
    }catch(error){
        console.log(error)
    }
  }
  const getAllUsers=async(req,res)=>{
    try{
       const response=await axios.get(`${process.env.REACT_APP_URL}/user/?sort=-orderNumber`) 
       console.log(response.data)
       setCustomer(response.data.users)
    }catch(error){
        console.log(error)
    }
  }
  useEffect(()=>{
    
      getAllUsers()
    getOrderNumbers()
    getRecentOrders()
    fetchCrew()
    fetchBestSelling()
    
  },[])
    

  // Listening for updates to order numbers
  

  // Listening for updates to recent orders
  useEffect(()=>{
    socket.on('updateUsers', () => {
    getAllUsers();
  });
    socket.on('updateOrderNumbers', () => {
    getOrderNumbers();
  });
    socket.on('updateOrders',()=>{
      console.log("hello")
      getRecentOrders()})
  },[socket])

  // Listening for updates to the crew
  socket.on('updateCrew', () => {
    fetchCrew();
  });

  // Listening for updates to best-selling items
  socket.on('updateBestSelling', () => {
    fetchBestSelling();
  });
const fetchCrew = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/user`);
    const crewMembers = response.data.users.filter((member) => member.role !== "customer");
    setCrew(crewMembers);
  } catch (error) {
    console.log(error);
    toast({
      title: "Error fetching team members.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } finally {
    // Add any necessary cleanup or additional logic here
  }
};
console.log(crew)

  const fetchBestSelling=async ()=>{
    try{
      const response=await axios.get(`${process.env.REACT_APP_URL}/cake/get-all-cakes/?sort=-sold&limit=3`)
      console.log(response.data)
      setBestSelling(response.data.cakes)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Total Orders" className="shadow-md">
        <Statistic title="Delivered" value={orderNumber.delivered} />
          <Statistic title="Completed" value={orderNumber.completed} />
          <Statistic title="Pending" value={orderNumber.pending} />
          <Statistic title="Canceled" value={orderNumber.cancelled} />
        </Card>

        <Card title="Revenue Over Time" className="shadow-md">
          <LineChart width={500} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </Card>

        <Card title="Best-Selling Cakes" className="shadow-md">
          <ul>
            {bestSelling?.map(item => (
             <Statistic title={item.name} value={item.sold} />
            ))}
          </ul>
        </Card>
      </div>

      <div className="mb-6">
        <Card title="Recent Orders" className="shadow-md">
          <Table className='overflow-auto [&::-webkit-scrollbar]:hidden' columns={[
            { title: 'Order ID', dataIndex: '_id', key: '_id' },
            { title: 'Customer', dataIndex: 'email', key: 'email' },
            { title: 'Cake', dataIndex: 'cakeName', key: 'cakeName' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
            { title: 'Action', key: 'action', render: (_, record) => <a>View Details</a> },
          ]} dataSource={orders} />
        </Card>
      </div>

      <div className="mb-6">
        <Card title="Inventory Management" className="shadow-md">
          <Link to='/add-cake'><Button type="primary" icon={<PlusOutlined />} >Add New Cake</Button></Link>
          <Table columns={[
            { title: 'Cake Name', dataIndex: 'name', key: 'name' },
            { title: 'Stock', dataIndex: 'stock', key: 'stock' },
          ]} dataSource={inventoryData} />
        </Card>
      </div>

      <div className="mb-6">
        <Card title="Customer Management" className="shadow-md">
          <Table columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'Orders', dataIndex: 'orderNumber', key: 'orderNumber' },
          ]} dataSource={customer} />
        </Card>
      </div>

      <div className="mb-6">
        <Card title="Sales Reports" className="shadow-md">
          <Table columns={[
            { title: 'Month', dataIndex: 'month', key: 'month' },
            { title: 'Sales', dataIndex: 'sales', key: 'sales' },
          ]} dataSource={salesReportsData} />
        </Card>
      </div>


      <div className="mb-6">
        <Card title="Team Management" className="shadow-md">
          <Table columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Role', dataIndex: 'role', key: 'role' },
            { title: 'Contact', dataIndex: 'email', key: 'email' },
          ]} dataSource={crew} />
        </Card>
      </div>
          <UserRoleAssignment/>
      <div className="mb-6">
        <Card title="Feedback and Reviews" className="shadow-md">
          <Table columns={[
            { title: 'Customer', dataIndex: 'customer', key: 'customer' },
            { title: 'Feedback', dataIndex: 'feedback', key: 'feedback' },
            { title: 'Rating', dataIndex: 'rating', key: 'rating', render: rating => <Tag color="blue">{rating}</Tag> },
          ]} dataSource={feedbackData} />
        </Card>
      </div>

      <div className="mb-6">
        <Card title="Settings" className="shadow-md">
          <p><strong>Address:</strong> {settingsData.address}</p>
          <p><strong>Contact:</strong> {settingsData.contact}</p>
          <p><strong>Hours:</strong> {settingsData.hours}</p>
        </Card>
      </div>

      <Modal
        title="Add Promotion"
        visible={promotionModalVisible}
        onOk={handleAddPromotion}
        onCancel={() => setPromotionModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Promotion Title" rules={[{ required: true, message: 'Please enter promotion title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="discount" label="Discount (%)" rules={[{ required: true, message: 'Please enter discount!' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShopDashboard;
