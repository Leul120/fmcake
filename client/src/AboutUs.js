// src/AboutUs.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Stack,
  VStack,
  HStack,
} from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Head Baker',
    image: '/images/john_doe.jpg',
    bio: 'John has over 20 years of baking experience and is passionate about creating beautiful and delicious cakes.',
  },
  {
    name: 'Jane Smith',
    role: 'Pastry Chef',
    image: '/images/jane_smith.jpg',
    bio: 'Jane specializes in intricate pastry designs and loves experimenting with new flavors.',
  },
  {
    name: 'Emily Johnson',
    role: 'Decorator',
    image: '/images/emily_johnson.jpg',
    bio: 'Emily has an eye for detail and transforms cakes into stunning works of art with her decorating skills.',
  },
];

function AboutUs() {
  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.xl">
          {/* Story Section */}
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              About Us
            </Heading>
            <Text fontSize="lg" color="gray.600">
              At Cake Shop, we bake cakes with the finest ingredients and a lot of love. Our mission is to make every celebration sweeter and more memorable with our delicious cakes.
            </Text>
          </VStack>

          {/* Team Section */}
          <Box mb={12}>
            <Heading as="h3" size="lg" color="gray.800" textAlign="center" mb={8}>
              Our Team
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {teamMembers.map((member, index) => (
                <Box key={index} className="border rounded-lg p-6 bg-white shadow-md">
                  <Image src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-t-md mb-4" />
                  <Heading as="h4" size="md" color="gray.800" mb={2}>
                    {member.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" mb={4}>
                    {member.role}
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {member.bio}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Ingredients Section */}
          <Box>
            <Heading as="h3" size="lg" color="gray.800" textAlign="center" mb={8}>
              Our Ingredients
            </Heading>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={8} alignItems="center">
              <Image src="/images/ingredients.jpg" alt="Ingredients" className="w-full h-60 object-cover rounded-md" />
              <Text fontSize="lg" color="gray.600">
                We use only the finest and freshest ingredients in our cakes. From high-quality flour to organic eggs and the best chocolate, every ingredient is carefully selected to ensure the best taste and quality.
              </Text>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default AboutUs;
