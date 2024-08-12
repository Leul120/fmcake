// src/MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Container,
  SimpleGrid,
  Image,
  Heading,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';

const cakes = [
  { id: 1, name: 'Chocolate Cake', image: 'chocolate-cake.jpg', description: 'Delicious chocolate cake', price: 25 },
  // Add more cakes here
];

const MainPage = () => {
  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.xl">
          <Heading as="h1" size="2xl" mb={8} textAlign="center">
            Welcome to Our Cake Shop
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={8}>
            {cakes.map((cake) => (
              <VStack
                key={cake.id}
                className="bg-white p-4 rounded-lg shadow-md"
                spacing={4}
              >
                <Image src={cake.image} alt={cake.name} boxSize="200px" objectFit="cover" borderRadius="md" />
                <Heading as="h3" size="md">{cake.name}</Heading>
                <Text color="gray.600">{cake.description}</Text>
                <Text fontSize="lg" fontWeight="bold" color="teal.500">${cake.price}</Text>
                <Button as={Link} to={`/cake/${cake.id}`} colorScheme="teal">
                  View Details
                </Button>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default MainPage;
