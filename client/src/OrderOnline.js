import React, { useState, useEffect, useContext } from 'react';
import { Rate } from 'antd';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Select,
  Alert,
  AlertIcon,
  Image,
  Tag,
  TagLabel,
  Divider,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';

function OrderOnline({ socket }) {
  const { cakeId } = useParams(); 
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const { user } = useContext(AppContext);
  const [cakeDetails, setCakeDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    cakeType: '',
    customDescription: '',
    paymentMethod: '',
    customText: '',
    amount: 0,
    additionalInstructions: '',
    deliveryDate: '',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const fetchCakeDetails = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/cake/cakes`, { ids: cakeId });
      setCakeDetails(response.data[0]);
      setOrderDetails((prevDetails) => ({ ...prevDetails, cakeType: response.data.name }));
    } catch (error) {
      console.error('Error fetching cake details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/cake/get-review/${cakeId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchCakeDetails();
    fetchReviews();
  }, [user]);
console.log(loadingDetails)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = user?._id; 
    const orderData = {
      name: orderDetails.name,
      email: orderDetails.email,
      phone: orderDetails.phone,
      user: userID,
      cakes: cakeId,
      cakeName: cakeDetails.name,
      customDetails: orderDetails.customDescription,
      status: 'Pending',
      customText: orderDetails.customText,
      additionalInstructions: orderDetails.additionalInstructions,
      amount: cakeDetails.price / 2,
      deliveryDate: orderDetails.deliveryDate,
      remainingPrice: cakeDetails.price / 2,
      uniqueNumber: Math.floor(Math.random() * 7),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/cake/payment/${userID}/${cakeId}`, orderData);
      window.open(response.data.responsed.data.checkout_url, '_blank');
      setOrderSubmitted(true);
      socket.emit('updateOrders');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <ChakraProvider>
    {cakeDetails===null && loadingDetails===false?(
        <Heading size="md" className='text-center flex items-center justify-center text-md text-red-400 h-screen'>Check your network connection!</Heading>
      ):(<div>
      <Box bgColor="#f5f5dc" py={12} display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="flex-start">
      
        <Box flex="1" ml={{ base: 0, md: 4 }}>
          {loadingDetails ? (
            <VStack spacing={8} textAlign="center" mb={12}>
              <Skeleton height="40px" width="200px" />
              <Skeleton boxSize="300px" />
              <Skeleton height="20px" width="300px" />
              <Skeleton height="40px" width="100px" />
              <Skeleton height="20px" width="400px" />
            </VStack>
          ) : (
            cakeDetails && (
              <VStack spacing={8} textAlign="center" mb={12}>
                <Heading as="h2" size="xl" className="capitalize" color="#556b2f">
                  {cakeDetails.name}
                </Heading>
                <Image
                  src={cakeDetails.image}
                  alt={cakeDetails.name}
                  boxSize="300px"
                  objectFit="cover"
                  borderRadius="xl"
                />
                <Text fontSize="lg" color="#6b8e23">
                  {cakeDetails.description}
                </Text>
                <Tag bgColor="#556b2f" color="#f5f5dc" size="lg">
                  {cakeDetails.category}
                </Tag>
                <Box display="flex" gap={3} bgColor="#fffacd" p={3} borderRadius="lg" flexWrap="wrap" maxW="96">
                  <Text fontSize="lg" fontWeight="bold" color="#556b2f">
                    Ingredients:
                  </Text>
                  {cakeDetails.ingredients.map((ing, index) => (
                    <Tag key={index} height={8} variant="solid" bgColor="#6b8e23" color="#f5f5dc">
                      <TagLabel>{ing}</TagLabel>
                    </Tag>
                  ))}
                </Box>
              </VStack>
            )
          )}
        </Box>

        <Container maxW="container.md" flex="1">
          {user && (
            <Box bgColor="white" p={8} borderRadius="lg" boxShadow="md">
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl id="name" isRequired>
                    <FormLabel color="#556b2f">Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={orderDetails.name}
                      onChange={handleChange}
                      borderColor="#556b2f"
                      _focus={{ borderColor: "#6b8e23" }}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel color="#556b2f">Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={orderDetails.email}
                      onChange={handleChange}
                      borderColor="#556b2f"
                      _focus={{ borderColor: "#6b8e23" }}
                    />
                  </FormControl>
                  <FormControl id="phone" isRequired>
                    <FormLabel color="#556b2f">Phone</FormLabel>
                    <Input
                      type="tel"
                      name="phone"
                      value={orderDetails.phone}
                      onChange={handleChange}
                      borderColor="#556b2f"
                      _focus={{ borderColor: "#6b8e23" }}
                    />
                  </FormControl>

                  <FormControl id="cakeType" isRequired>
                    <FormLabel color="#556b2f">Cake Type</FormLabel>
                    <Select
                      name="cakeType"
                      value={orderDetails.cakeType}
                      onChange={handleChange}
                      placeholder="Select cake type"
                      borderColor="#556b2f"
                      _focus={{ borderColor: "#6b8e23" }}
                    >
                      <option value={cakeDetails?.name}>{cakeDetails?.name}</option>
                      <option value="Custom Cake">Custom Cake</option>
                    </Select>
                  </FormControl>

                  {orderDetails.cakeType === 'Custom Cake' && (
                    <FormControl id="customDescription">
                      <FormLabel color="#556b2f">Custom Cake Description</FormLabel>
                      <Textarea
                        name="customDescription"
                        value={orderDetails.customDescription}
                        onChange={handleChange}
                        placeholder="Describe your custom cake requirements"
                        borderColor="#556b2f"
                        _focus={{ borderColor: "#6b8e23" }}
                      />
                    </FormControl>
                  )}

                  <FormControl id="customText">
                    <FormLabel color="#556b2f">Text to be Written on the Cake</FormLabel>
                    <Input
                      type="text"
                      name="customText"
                      value={orderDetails.customText}
                      onChange={handleChange}
                      borderColor="#556b2f"
                      _focus={{ borderColor: "#6b8e23" }}
                    />
                  </FormControl>

                  <FormControl id="additionalInstructions">
                    <FormLabel color="#556b2f">Additional Instructions</FormLabel>
                    <Textarea
                      name="additionalInstructions"
                      value={orderDetails.additionalInstructions}
                      onChange={handleChange}
                      placeholder="Any additional requests"
                      borderColor="#556b2f"
                      _focus={{ borderColor: "#6b8e23" }}
                    />
                  </FormControl>

                  <FormControl id="deliveryDate" isRequired>
                    <FormLabel color="#556b2f">Delivery Date</FormLabel>
                    <Input
                      type="date"
                      name="deliveryDate"
                      value={orderDetails.deliveryDate}
                      onChange={handleChange}
                      borderColor="#556b2f"
                      _focus={{ borderColor: "#6b8e23" }}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    bgColor="#556b2f"
                    color="white"
                    _hover={{ bgColor: "#6b8e23" }}
                    _active={{ bgColor: "#556b2f" }}
                    width="full"
                    size="lg"
                  >
                    Submit Order
                  </Button>
                </VStack>
              </form>
            </Box>
          )}
        </Container>
      </Box>

      {message && (
        <Container maxW="container.md">
          <Alert status="success" mt={4} variant="left-accent">
            <AlertIcon />
            {message}
          </Alert>
        </Container>
      )}

      <Box>
        <Divider my={12} />
        <Heading as="h3" size="lg" mb={6} color="#556b2f">
          Reviews
        </Heading>
        {loadingReviews ? (
          <SimpleGrid columns={1} spacing={10}>
            {[1, 2, 3].map((_, index) => (
              <Box key={index} borderRadius="lg" padding="6" boxShadow="lg" bg="white">
                <Skeleton height="40px" width="200px" />
                <Skeleton height="20px" width="300px" mt={4} />
                <Skeleton height="20px" width="100px" mt={4} />
              </Box>
            ))}
          </SimpleGrid>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <Box key={review._id} borderRadius="lg" padding="6" boxShadow="lg" bg="white" mb={6}>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" color="#556b2f">
                  {review.user}
                </Text>
                <Rate disabled value={review.rating} />
              </HStack>
              <Text mt={4} color="#6b8e23">
                {review.comment}
              </Text>
            </Box>
          ))
        ) : (
          <Text color="#556b2f">No reviews yet.</Text>
        )}
      </Box></div>)}
    </ChakraProvider>
  );
}

export default OrderOnline;
