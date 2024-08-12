// src/Gallery.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';

const galleryImages = [
  { src: '/images/cake1.jpg', alt: 'Chocolate Cake' },
  { src: '/images/cake2.jpg', alt: 'Vanilla Cake' },
  { src: '/images/cake3.jpg', alt: 'Red Velvet Cake' },
  { src: '/images/cake4.jpg', alt: 'Custom Cake' },
  { src: '/images/cake5.jpg', alt: 'Birthday Cake' },
  { src: '/images/cake6.jpg', alt: 'Wedding Cake' },
];

const testimonials = [
  {
    name: 'Alice Johnson',
    image: '/images/customer1.jpg',
    cake: '/images/cake1.jpg',
    text: 'The chocolate cake was absolutely delicious! It was the highlight of our party.',
  },
  {
    name: 'Mark Smith',
    image: '/images/customer2.jpg',
    cake: '/images/cake2.jpg',
    text: 'Vanilla cake from this shop is my favorite. Always fresh and tasty!',
  },
  {
    name: 'Sophia Brown',
    image: '/images/customer3.jpg',
    cake: '/images/cake3.jpg',
    text: 'Red velvet cake was a hit at our wedding. Beautifully decorated and tasted amazing.',
  },
];

function Gallery() {
  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.xl">
          {/* Gallery Section */}
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              Gallery
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Explore our collection of high-quality cake images, including custom orders and special events.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
            {galleryImages.map((image, index) => (
              <Box key={index} className="overflow-hidden rounded-lg shadow-md">
                <Image src={image.src} alt={image.alt} className="w-full h-60 object-cover transition-transform transform hover:scale-105" />
              </Box>
            ))}
          </SimpleGrid>

          {/* Testimonials Section */}
          <Box mt={12}>
            <Heading as="h3" size="lg" color="gray.800" textAlign="center" mb={8}>
              Customer Testimonials
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {testimonials.map((testimonial, index) => (
                <Box key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <HStack spacing={4} mb={4}>
                    <Avatar src={testimonial.image} alt={testimonial.name} />
                    <VStack align="start">
                      <Text fontWeight="bold" color="gray.800">{testimonial.name}</Text>
                      <Image src={testimonial.cake} alt="Cake" boxSize="50px" objectFit="cover" borderRadius="md" />
                    </VStack>
                  </HStack>
                  <Text color="gray.600">{testimonial.text}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default Gallery;
