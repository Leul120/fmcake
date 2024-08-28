import React, { useContext, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Link,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Spinner,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import { AppContext } from './App';
import { SearchIcon } from '@chakra-ui/icons';

function Main() {
  const [cakes, setCakes] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { text, setText } = useContext(AppContext);
  const toast = useToast();

  useEffect(() => {
    fetchCrew();
  }, []);

  useEffect(() => {
    fetchCakes();
  }, [text]);

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_URL}/cake/get-all-cakes/?search=${text}`);
      setCakes(response.data.cakes);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching cakes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCrew = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/user`);
      setCrew(response.data.users.filter((e) => e.role !== "customer"));
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching team members.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setText(event.target.value);
  };

  return (
    <ChakraProvider>
      <Box className="min-h-screen bg-ivory relative" bgColor="#f5f5dc">
        {/* Search Bar */}
        <Box className="fixed top-0 right-0 mt-20 mr-40 z-10">
          <InputGroup size="md" maxW="250px">
            <input
              className="border border-dark-green border-2 p-2 pr-0 rounded-lg focus:outline-none"
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              style={{ color: '#556b2f', backgroundColor: '#fffacd' }}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                icon={<SearchIcon />}
                aria-label="Search"
                bgColor="#556b2f"
                color="#f5f5dc"
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Hero Section */}
        <Box
          id="home"
          className="relative h-screen flex items-center justify-center bg-cover bg-center backdrop-blur-lg overflow-hidden bg-carousel"
          bgImage="url('/path/to/your/hero-image.jpg')" // Update with an actual image path
          bgColor="#f5f5dc"
        >
          <Box className="absolute top-0 left-0 w-full h-full bg-dark-green opacity-40"></Box>
          <Box textAlign="center" className="p-8 rounded-lg shadow-lg z-10" bgColor="rgba(245, 245, 220, 0.8)">
            <Text fontSize="4xl" fontWeight="extrabold" color="#556b2f">
              Welcome to FM Cake
            </Text>
            <Text mb={6} fontSize="lg" color="#6b8e23">
              Delicious cakes made with love and passion.
            </Text>
            <Link href="#menu">
              <Button variant="solid" bgColor="#556b2f" color="#f5f5dc" size="lg">
                Order Now
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Menu Section */}
        <Box py={12} bgColor="#f5f5dc">
          <Container maxW="container.xl" id='menu'>
            <Heading as="h2" size="xl" textAlign="center" color="#556b2f" mb={8} fontWeight="bold">
              Our Menu
            </Heading>
            {loading ? (
              <VStack spacing={4}>
                <Spinner size="xl" color="#556b2f" />
                <Text>Loading cakes...</Text>
              </VStack>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
                {cakes.map((cake, index) => (
                  <Box
  key={index}
  bgColor="rgba(245, 245, 220, 0.8)"
  borderRadius="md"
  boxShadow="lg"
  overflow="hidden"
  className="transform transition-transform hover:scale-105 flex flex-col items-center relative truncate"
  p={6}
  
  // Adjust this margin to give space for the image above the box
>
  <Box className="relative w-full flex justify-center">
    <Image
      src={cake.image}
      alt={cake.name}
      objectFit="cover"
      className="h-56 w-56 rounded-full"
      loading='lazy'
      style={{
        position: 'absolute',
        top: '-50%',
        zIndex: 1,
      }}
    />
  </Box>
  <Box className="w-full text-center mt-28">
    <Heading as="h3" size="md" color="#556b2f" fontWeight="bold">
      {cake.name}
    </Heading>
    <Text mt={4} color="#6b8e23">
      {cake.description}
    </Text>
    <Text fontSize="lg" fontWeight="bold" color="#8b4513">
      ${cake.price}
    </Text>
    <Button
      as={Link}
      href={`/order/${cake._id}`}
      bgColor="#556b2f"
      color="#f5f5dc"
      mt={4}
      className="hover:decoration-none"
      style={{ textDecoration: 'none' }}
    >
      View Details
    </Button>
  </Box>
</Box>

                ))}
              </SimpleGrid>
            )}
          </Container>
        </Box>

        {/* About Section */}
        <Box id="about" py={12} bgColor="#fffacd">
          <Container maxW="container.xl" textAlign="center">
            <Heading as="h2" size="xl" color="#556b2f" mb={4} fontWeight="bold">
              About Us
            </Heading>
            <Text color="#6b8e23" fontSize="lg" maxW="2xl" mx="auto" mb={8}>
              At Cake Shop, we bake cakes with the finest ingredients and a lot of love. Our mission is to make every
              celebration sweeter and more memorable with our delicious cakes.
            </Text>
            <Heading as="h3" size="lg" color="#556b2f" mb={4} fontWeight="bold">
              Our Story
            </Heading>
            <Text color="#6b8e23" fontSize="lg" maxW="2xl" mx="auto" mb={8}>
              Cake Shop was founded in 2020 with the vision of bringing joy to every celebration. Our team of expert
              bakers and decorators are dedicated to crafting cakes that are as beautiful as they are delicious.
            </Text>
            <Heading as="h3" size="lg" color="#556b2f" mb={4} fontWeight="bold">
              Meet Our Team
            </Heading>
            {isLoading ? (
              <VStack spacing={4}>
                <Spinner size="xl" color="#556b2f" />
                <Text>Loading team...</Text>
              </VStack>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
                {crew.map((cre, index) => (
                  <Box
                    key={index}
                    bgColor="rgba(245, 245, 220, 0.8)"
                    borderRadius="md"
                    boxShadow="lg"
                    overflow="hidden"
                    className="transform transition-transform hover:scale-105"
                  >
                    <Image src={cre.profile} alt="Baker" objectFit="cover" />
                    <Box p={6}>
                      <Heading as="h4" size="md" color="#556b2f" fontWeight="bold">
                        {cre.name}
                      </Heading>
                      <Text mt={4} color="#6b8e23">
                        {cre.role}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box id="testimonials" py={12} bgColor="#f5f5dc">
          <Container maxW="container.xl">
            <Heading as="h2" size="xl" color="#556b2f" mb={8} fontWeight="bold" textAlign="center">
              Testimonials
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
              {/* Example Testimonials */}
              <Box
                bgColor="rgba(245, 245, 220, 0.8)"
                borderRadius="md"
                boxShadow="lg"
                overflow="hidden"
                className="transform transition-transform hover:scale-105"
              >
                <Box p={6}>
                  <Text color="#6b8e23">
                    "The cakes here are absolutely delicious! I always order from Cake Shop for every special occasion."
                  </Text>
                  <Text mt={4} fontWeight="bold" color="#8b4513">
                    - Customer Name
                  </Text>
                </Box>
              </Box>
              {/* Repeat similar blocks for more testimonials */}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box id="contact" py={12} bgColor="#fffacd">
          <Container maxW="container.xl" textAlign="center">
            <Heading as="h2" size="xl" color="#556b2f" mb={8} fontWeight="bold">
              Contact Us
            </Heading>
            <VStack spacing={4}>
              <HStack spacing={4} alignItems="center" justifyContent="center">
                <FaPhone color="#6b8e23" />
                <Text fontSize="lg" color="#6b8e23">
                  +1 (123) 456-7890
                </Text>
              </HStack>
              <HStack spacing={4} alignItems="center" justifyContent="center">
                <FaEnvelope color="#6b8e23" />
                <Text fontSize="lg" color="#6b8e23">
                  info@cakeshop.com
                </Text>
              </HStack>
              <HStack spacing={4} alignItems="center" justifyContent="center">
                <FaMapMarkerAlt color="#6b8e23" />
                <Text fontSize="lg" color="#6b8e23">
                  123 Bakery St, Sweet City, CA 12345
                </Text>
              </HStack>
              <Box as="form" w="full" maxW="lg" mt={8} bgColor="rgba(245, 245, 220, 0.8)" p={6} borderRadius="md" boxShadow="lg">
                <FormControl id="name" isRequired mb={4}>
                  <FormLabel color="#556b2f">Name</FormLabel>
                  <Input placeholder="Your name" borderColor="#556b2f" />
                </FormControl>
                <FormControl id="email" isRequired mb={4}>
                  <FormLabel color="#556b2f">Email</FormLabel>
                  <Input type="email" placeholder="Your email" borderColor="#556b2f" />
                </FormControl>
                <FormControl id="message" isRequired mb={4}>
                  <FormLabel color="#556b2f">Message</FormLabel>
                  <Textarea placeholder="Your message" borderColor="#556b2f" />
                </FormControl>
                <Button
                  type="submit"
                  variant="solid"
                  bgColor="#556b2f"
                  color="#f5f5dc"
                  _hover={{ bg: "#6b8e23", color: "#fffacd" }}
                  size="lg"
                >
                  Send Message
                </Button>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Main;
