import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Select, Card } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const { Option } = Select;

const BakerDashboard = ({socket}) => {
  const [orders, setOrders] = useState([]);
  const [cakeDetails, setCakeDetails] = useState({});
  const [loading, setLoading] = useState(true);
    const [page,setPage]=useState(0)
      const fetchOrders = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/cake/get-orders/?page=${page}`
    );

    const newOrders = response.data.orders.filter(
      (order) => order.status !== 'Delivered' && order.status !== 'Cancelled'
    );
    setOrders((prevOrders) => [ ...newOrders]);

    

    const cakeIds = newOrders.map((order) => order.cakes);
    console.log(cakeIds)
    const cakeDetailsResponse = await axios.post(
      `${process.env.REACT_APP_URL}/cake/cakes`,
      { ids: cakeIds }
    );

    const cakeDetailsMap = cakeDetailsResponse.data.reduce((map, cake) => {
      map[cake._id] = cake;
      return map;
    }, {});

    setCakeDetails((prevDetails) => ({
      ...prevDetails,
      ...cakeDetailsMap,
    }));
  } catch (error) {
    console.error('Error fetching user orders or cake details:', error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchOrders();
}, [page]);
  console.log(cakeDetails)
  useEffect(()=>{
    socket.on('updateOrders',()=>{
      console.log("hello")
      fetchOrders()})
  },[socket])

  const handleStatusChange =async (orderId, status) => {
    try{
    console.log(status)
    await axios.post(`${process.env.REACT_APP_URL}/cake/update-order/${orderId}`, {status:status});
        fetchOrders()
    console.log(`Order ${orderId} status updated to ${status}`);
    }catch(error){
        console.log(error)
    }  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'uniqueNumber',
      key: 'uniqueNumber',
    },
    {
      title: 'Cake Name',
      dataIndex: 'cakes',
      key: 'cakes',
      render: (cakeId) => cakeDetails[cakeId]?.name || 'Loading...',
    },
    {
      title: 'Customer',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Custom Details',
      dataIndex: 'customDetails',
      key: 'customDetails',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Paid Price',
      dataIndex: 'paidPrice',
      key: 'paidPrice',
    },
    {
      title: 'Remaining Price',
      dataIndex: 'remainingPrice',
      key: 'remainingPrice',
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => (
        <Select
          value={record.status}
          onChange={(status) => handleStatusChange(record._id, status)}
          style={{ width: 120 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
          
        
        </Select>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card title="Baker's Dashboard" className="shadow-lg">
        <Table
        className='overflow-auto [&::-webkit-scrollbar]:hidden'
          columns={columns}
          dataSource={orders}
          rowKey={(record) => record.uniqueNumber}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Card title="Cake Details" className="shadow-lg mt-8">
        {orders.map((order) => {
          const cake = cakeDetails[order.cakes];
          return cake ? (
            <div key={order.uniqueNumber} className="mb-4 p-4 border rounded-lg">
              <h3 className="text-xl font-bold mb-2">{cake.name}</h3>
              <p className="mb-2"><strong>Category:</strong> {cake.category}</p>
              <p className="mb-2"><strong>Price:</strong> ${cake.price}</p>
              <p className="mb-2"><strong>Description:</strong> {cake.description}</p>
              <p><strong>Ingredients:</strong> {cake.ingredients.join(', ')}</p>
              <p><strong>Custom text:</strong> {order.customText}</p>
              <p><strong>Additional Instructions:</strong> {order.additionalInstructions}</p>
              <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
            </div>
          ) : (
            <div key={order.uniqueNumber}>Loading cake details...</div>
          );
        })}
      </Card>
    </div>
  );
};

// Example usage with a mock user


export default BakerDashboard
