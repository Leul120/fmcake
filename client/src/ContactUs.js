// src/ContactUs.js
import React, { useState } from 'react';
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
  Icon,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

function ContactUs() {
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.md">
          {/* Contact Form Section */}
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              Contact Us
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Have questions or inquiries? Fill out the form below and we'll get back to you as soon as possible.
            </Text>
          </VStack>

          <Box className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                {/* Name */}
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" value={contactDetails.name} onChange={handleChange} />
                </FormControl>

                {/* Email */}
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" value={contactDetails.email} onChange={handleChange} />
                </FormControl>

                {/* Message */}
                <FormControl id="message" isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea name="message" value={contactDetails.message} onChange={handleChange} placeholder="Your message" />
                </FormControl>

                {/* Submit Button */}
                <Button type="submit" colorScheme="teal" size="lg" width="full">
                  Submit
                </Button>
              </VStack>
            </form>

            {formSubmitted && (
              <Box mt={6} p={4} bg="green.100" borderRadius="md">
                <Text color="green.800">Your message has been sent successfully!</Text>
              </Box>
            )}
          </Box>

          {/* Location Section */}
          <Box mt={12}>
            <VStack spacing={4} textAlign="center">
              <Heading as="h3" size="lg" color="gray.800">
                Our Location
              </Heading>
              <Text fontSize="lg" color="gray.600">
                123 Cake Street, Bakery Town, CA 90210
              </Text>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3609002374355!2d38.76337857478074!3d9.030804591030602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8589e4c4a803%3A0xbae724e3b927f424!2sAddis%20Ababa%20University%20%7C%20Natural%20Sciences%20Campus!5e0!3m2!1sen!2set!4v1723438820956!5m2!1sen!2set"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </VStack>
          </Box>

          {/* Business Hours Section */}
          <Box mt={12} textAlign="center">
            <Heading as="h3" size="lg" color="gray.800" mb={4}>
              Business Hours
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Monday - Friday: 9 AM - 6 PM
            </Text>
            <Text fontSize="lg" color="gray.600">
              Saturday: 10 AM - 4 PM
            </Text>
            <Text fontSize="lg" color="gray.600">
              Sunday: Closed
            </Text>
          </Box>

          {/* Contact Details Section */}
          <Box mt={12} textAlign="center">
            <Heading as="h3" size="lg" color="gray.800" mb={4}>
              Contact Details
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={2}>
              Phone: (123) 456-7890
            </Text>
            <Text fontSize="lg" color="gray.600" mb={2}>
              Email: info@cakeshop.com
            </Text>
            <HStack spacing={4} justifyContent="center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Icon as={FaFacebook} boxSize={8} color="gray.600" _hover={{ color: 'blue.600' }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Icon as={FaTwitter} boxSize={8} color="gray.600" _hover={{ color: 'blue.400' }} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Icon as={FaInstagram} boxSize={8} color="gray.600" _hover={{ color: 'pink.400' }} />
              </a>
            </HStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default ContactUs;
