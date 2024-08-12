// src/ProfileManagement.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';

function ProfileManagement() {
  const toast = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    toast({
      title: "Profile updated.",
      description: "Your profile details have been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.md">
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              Profile Management
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Manage your personal details, addresses, and payment methods.
            </Text>
          </VStack>

          <form onSubmit={handleSave}>
            <VStack spacing={4} align="start">
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" />
              </FormControl>
              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="payment">
                <FormLabel>Payment Method</FormLabel>
                <Input type="text" placeholder="Credit Card / PayPal / etc." />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Save Changes
              </Button>
            </VStack>
          </form>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default ProfileManagement;
