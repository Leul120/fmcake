import React, { useContext, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  VStack,
  Image,
  Text,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Spinner,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { AppContext } from './App';
import { Tag } from 'antd';

const UserDashboard = ({socket}) => {
  const [orders, setOrders] = useState([]);
  const [cakeDetails, setCakeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  
    const fetchOrders = async () => {
      try {
        if (user) {
          const response = await axios.get(`${process.env.REACT_APP_URL}/cake/get-user-orders/${user._id}`);
          setOrders(response.data);

          // Fetch cake details for each order
          const cakeDetailsPromises = response.data.map((order) =>
            axios.get(`${process.env.REACT_APP_URL}/cake/cakes/${order.cakes}`)
          );
          const cakeDetailsResponses = await Promise.all(cakeDetailsPromises);

          // Map cake details to orders
          const cakeDetailsMap = {};
          cakeDetailsResponses.forEach((response) => {
            const cakeId = response.data._id;
            cakeDetailsMap[cakeId] = response.data;
          });

          setCakeDetails(cakeDetailsMap);
        }
      } catch (error) {
        console.error('Error fetching user orders or cake details:', error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchOrders();
  }, [user]);
useEffect(()=>{
  socket.on('updateOrders',()=>{
      console.log("hello")
      fetchOrders()})
},[socket])
  
console.log(orders)
  const currentOrders = orders.filter((order) => order.status !== 'Delivered');
  const pastOrders = orders.filter((order) => order.status === 'Delivered');
console.log(pastOrders)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewData = {
      user: user.name,
      cake: selectedOrder.cakes,
      rating: form.rating.value,
      comment: form.comment.value,
    };
    try {
      await axios.post(`${process.env.REACT_APP_URL}/cake/give-review`, reviewData);
      toast({
        title: "Review submitted.",
        description: "Your review has been successfully submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error.",
        description: "An error occurred while submitting your review.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box className="min-h-screen bg-gray-100 py-12">
        <Container maxW="container.lg" bg="white" p={8} borderRadius="md" shadow="md">
          {/* <Heading as="h1" size="xl" textAlign="center" mb={6}>
            User Dashboard
          </Heading> */}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10}>
            <Stat>
              <StatLabel>Total Orders</StatLabel>
              <StatNumber>{orders.length}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Current Orders</StatLabel>
              <StatNumber>{currentOrders.length}</StatNumber>
            </Stat>
          </SimpleGrid>

          {loading ? (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Heading as="h2" size="lg" mb={4}>
                Current Orders
              </Heading>
              <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
                {currentOrders.map((order) => (
                  
                  <GridItem key={order._id} className="bg-gray-50 p-4 rounded-lg shadow">
                  {console.log(order)}
                    <Heading as="h3" size="md" mb={2}>
                      {cakeDetails[order.cakes]?.name}
                    </Heading>
                    <Image
                      src={cakeDetails[order.cakes]?.image}
                      alt={cakeDetails[order.cakes]?.name}
                      borderRadius="md"
                    />
                    <Text mt={2}>Unique Code: {order.uniqueNumber}</Text>
                    <Tag color='orange'> {order.status}</Tag>
                    <Text>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</Text>
                    <Text>Total Amount:{order.totalAmount}</Text>
                    <Text>Price: ${order.paidPrice + order.remainingPrice}</Text>
                    <Text>Additional Instructions: {order.additionalInstructions}</Text>
                    <Text>Custom Details: {order.customDetails}</Text>
                    
                  </GridItem>
                ))}
              </Grid>

              <Heading as="h2" size="lg" mt={10} mb={4}>
                Past Orders
              </Heading>
              <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
                {pastOrders.map((order) => (
                  <GridItem key={order._id} className="bg-gray-50 p-4 rounded-lg shadow">
                  {console.log(order)}
                    <Heading as="h3" size="md" mb={2}>
                      {cakeDetails[order.cakes]?.name}
                    </Heading>
                    <Image
                      src={cakeDetails[order.cakes]?.image}
                      alt={cakeDetails[order.cakes]?.name}
                      borderRadius="md"
                      className='h-56'
                    />
                    <Tag color='blue'> {order.status}</Tag>
                    <Text>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</Text>
                    <Text>Total Amount: {order.totalAmount?.toFixed(2)}</Text>
                    <Text>Price: ${order.paidPrice + order.remainingPrice}</Text>
                    <Text>Custom Details: {order.customDetails}</Text>
                    <Button mt={4} colorScheme="teal" onClick={() => { setSelectedOrder(order); onOpen(); }}>
                      Give Review
                    </Button>
                  </GridItem>
                ))}
              </Grid>
            </>
          )}
        </Container>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Give Review</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleReviewSubmit}>
              <ModalBody>
                <FormControl id="rating" isRequired>
                  <FormLabel>Rating</FormLabel>
                  <Input type="number" min="1" max="5" name="rating" />
                </FormControl>
                <FormControl id="comment" mt={4}>
                  <FormLabel>Comment</FormLabel>
                  <Textarea name="comment" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="teal" type="submit">
                  Submit Review
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default UserDashboard;
