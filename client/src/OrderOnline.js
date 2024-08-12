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
  RadioGroup,
  Radio,
  Stack,
  Alert,
  AlertIcon,
  Image,
  Tag,
  TagLabel,
  Divider,
  SimpleGrid,
  Skeleton,
  
} from '@chakra-ui/react';
import { useParams,useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';

function OrderOnline() {
  const { cakeId } = useParams(); // Assuming you're using react-router for routing
  const [searchParams]=useSearchParams()
  const message=searchParams.get('message')
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
    fullPrice: '',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
console.log(cakeId)
  // Fetch cake details from server
  const fetchCakeDetails = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/cake/cakes`,{ids:cakeId});
      setCakeDetails(response.data[0]);
      setOrderDetails((prevDetails) => ({ ...prevDetails, cakeType: response.data.name }));
    } catch (error) {
      console.error('Error fetching cake details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Fetch reviews for the cake
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
    
  }, [user,]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = user?._id; // Replace with actual user ID
    const orderData = {
      name: orderDetails.name,
      email: orderDetails.email,
      phone: orderDetails.phone,
      user: userID,
      cakes: cakeId,
      cakeName:cakeDetails.name,
      customDetails: orderDetails.customDescription,
      status: 'Pending',
      customText: orderDetails.customText,
      additionalInstructions: orderDetails.additionalInstructions,
      amount: cakeDetails.price / 2 ,
      deliveryDate: orderDetails.deliveryDate,
      remainingPrice: cakeDetails.price / 2 ,
      uniqueNumber: Math.floor(Math.random() * 7),
    };
console.log(orderDetails)
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/cake/payment/${userID}/${cakeId}`, orderData);
      window.open(response.data.responsed.data.checkout_url, '_blank');
      setOrderSubmitted(true);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12 flex-col flex md:flex-row">
        <span className="float-left ml-4">
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
                <Heading as="h2" size="xl" className="capitalize" color="gray.800">
                  {cakeDetails.name}
                </Heading>
                <Image
                  src={cakeDetails.image}
                  alt={cakeDetails.name}
                  boxSize="300px"
                  objectFit="cover"
                  className="rounded-xl"
                />
                <Text fontSize="lg" color="gray.600">
                  {cakeDetails.description}
                </Text>
                <Tag className="p-2" colorScheme="teal">
                  {cakeDetails.category}
                </Tag>
                <div className="flex gap-3 bg-slate-50 p-3 flex-wrap rounded-lg max-w-72">
                  <p className="text-lg font-bold ">Ingredients:</p>
                  {cakeDetails.ingredients.map((ing, index) => (
                    <Tag key={index} variant="outline" colorScheme="blue">
                      <TagLabel>{ing}</TagLabel>
                    </Tag>
                  ))}
                </div>
              </VStack>
            )
          )}
        </span>

        <Container maxW="container.md">
          {user &&(
          <Box className="bg-white p-8 rounded-lg shadow-md">
        
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                {/* Personal Details */}
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" value={orderDetails.name} onChange={handleChange} />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" value={orderDetails.email} onChange={handleChange} />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input type="tel" name="phone" value={orderDetails.phone} onChange={handleChange} />
                </FormControl>

                {/* Cake Type */}
                <FormControl id="cakeType" isRequired>
                  <FormLabel>Cake Type</FormLabel>
                  <Select name="cakeType" value={orderDetails.cakeType} onChange={handleChange} placeholder="Select cake type">
                    <option value={cakeDetails?.name}>{cakeDetails?.name}</option>
                    <option value="Custom Cake">Custom Cake</option>
                  </Select>
                </FormControl>

                {/* Custom Cake Description */}
                {orderDetails.cakeType === 'Custom Cake' && (
                  <FormControl id="customDescription">
                    <FormLabel>Custom Cake Description</FormLabel>
                    <Textarea
                      name="customDescription"
                      value={orderDetails.customDescription}
                      onChange={handleChange}
                      placeholder="Describe your custom cake requirements"
                    />
                  </FormControl>
                )}

                {/* Custom Text */}
                <FormControl id="customText">
                  <FormLabel>Text to be Written on the Cake</FormLabel>
                  <Input
                    type="text"
                    name="customText"
                    value={orderDetails.customText}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Additional Instructions */}
                <FormControl id="additionalInstructions">
                  <FormLabel>Additional Instructions</FormLabel>
                  <Textarea
                    name="additionalInstructions"
                    value={orderDetails.additionalInstructions}
                    onChange={handleChange}
                    placeholder="Any additional instructions"
                  />
                </FormControl>

                {/* Delivery Date */}
                <FormControl id="deliveryDate" isRequired>
                  <FormLabel>Delivery Date</FormLabel>
                  <Input
                    type="date"
                    name="deliveryDate"
                    value={orderDetails.deliveryDate}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="amount" isRequired>
                  <FormLabel>Half Price</FormLabel>
                  <Input
                    
                    name="amount"
                    value={cakeDetails?.price/2}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Payment Method */}
                

                {/* Submit Button */}
                <Button type="submit" colorScheme="teal" size="lg" width="full">
                  Place Order
                </Button>
              </VStack>
            </form>

            {message && (
              <Alert status="success" mt={6} borderRadius="md">
                <AlertIcon />
                Your order has been placed successfully!
              </Alert>
            )}
          </Box>
          )}

          {/* Reviews Section */}
          <Box mt={12}>
            <Heading as="h3" size="lg" color="gray.800" mb={4}>
              Customer Reviews
            </Heading>
            {loadingReviews ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {Array(2)
                  .fill('')
                  .map((_, i) => (
                    <Box key={i} p={6} bg="white" shadow="md" borderRadius="md">
                      <Skeleton height="20px" width="150px" mb={4} />
                      <Skeleton height="20px" width="100px" mb={4} />
                      <Skeleton height="60px" mb={4} />
                      <Skeleton height="20px" width="80px" />
                    </Box>
                  ))}
              </SimpleGrid>
            ) : reviews.length ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {reviews.map((review) => (
                  <Box key={review._id} p={6} bg="white" shadow="md" borderRadius="md">
                    <HStack spacing={4} alignItems="center">
                      <VStack align="start">
                        <Text fontWeight="bold">{review.user}</Text>
                        <HStack spacing={1}>
                          <Rate value={review.rating} />
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text mt={4}>{review.comment}</Text>
                    <Divider mt={4} />
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text>No reviews yet.</Text>
            )}
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default OrderOnline;
