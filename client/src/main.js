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
import { Carousel } from 'antd';
import './App.css'
import { SearchIcon } from '@chakra-ui/icons';
function Main() {
  const [cakes, setCakes] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const {text,setText}=useContext(AppContext)
  const toast = useToast();
useEffect(()=>{
  fetchCrew();
},[])
  useEffect(() => {
    fetchCakes();
    
  }, [text]);
console.log(text)
  const fetchCakes = async () => {
    try {
      setLoading(true)
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
    console.log(text)
  };

  return (
    <div>
    <ChakraProvider>
       <Box className="min-h-screen bg-transparent relative">
    {/* Search Bar */}
    <Box className="fixed top-0 right-0 mt-20 mr-40 z-10">
      <InputGroup size="md" maxW="200px" className=''>
        <input
          className='border border-teal-600  border-2 p-2 pr-0 rounded-lg focus:outline-indigo-400   '
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <InputRightElement width="4.5rem"  >
          <IconButton
            h="1.75rem"
            size="sm"
            icon={<SearchIcon />}
            aria-label="Search"
          />
        </InputRightElement>
      </InputGroup>
    </Box>

    {/* Hero Section */}
    <Box
      id="home"
      className="relative mt-0 h-screen flex items-center justify-center bg-cover bg-center backdrop-blur-lg bg-white/30 overflow-hidden"
    >
      <div class="absolute top-0 left-0 w-full h-full bg-carousel"></div>
      <Box
        textAlign="center"
        className="backdrop-blur-md bg-white/40 p-8 rounded-lg shadow-lg z-10"
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Welcome to FM Cake
        </Text>
        <Text mb={6} fontSize="lg" color="gray.500">
          Delicious cakes made with love and passion.
        </Text>
        <Link href="#menu">
          <Button variant="solid" colorScheme="teal" size="lg">
            Order Now
          </Button>
        </Link>
      </Box>
    </Box>

          {/* Menu Section */}
          <Box className='bg-gradient-to-b from-slate-50 to-blue-900 backdrop-blur-md'>
          <Box id="menu" py={12} className="bg-transparent ">
            <Container maxW="container.xl">
              <Heading as="h2" size="xl" textAlign="center" color="gray.800" mb={8} fontWeight="bold">
                Our Menu
              </Heading>
              {loading ? (
                <VStack spacing={4}>
                  <Spinner size="xl" />
                  <Text>Loading cakes...</Text>
                </VStack>
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
                  {cakes.map((cake, index) => (
                    <Box
                      key={index}
                      className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                    >
                      <Image src={cake.image} alt={cake.name} objectFit="cover"  className="h-56 w-full" />
                      <Box p={6}>
                        <Heading as="h3" size="md" color="gray.800" fontWeight="bold">
                          {cake.name}
                        </Heading>
                        <Text mt={4} color="gray.600">
                          {cake.description}
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color="teal.500">
                          ${cake.price}
                        </Text>
                        <Button as={Link} href={`/order/${cake._id}`} colorScheme="teal" mt={4}>
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
        <Box id="about" py={12} className=" bg-transparent">
          <Container maxW="container.xl" textAlign="center">
            <Heading as="h2" size="xl" color="gray.800" mb={4} fontWeight="bold">
              About Us
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="2xl" mx="auto" mb={8}>
              At Cake Shop, we bake cakes with the finest ingredients and a lot of love. Our mission is to make every
              celebration sweeter and more memorable with our delicious cakes.
            </Text>
            <Heading as="h3" size="lg" color="gray.800" mb={4} fontWeight="bold">
              Our Story
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="2xl" mx="auto" mb={8}>
              Cake Shop was founded in 2020 with the vision of bringing joy to every celebration. Our team of expert
              bakers and decorators are dedicated to crafting cakes that are as beautiful as they are delicious.
            </Text>
            <Heading as="h3" size="lg" color="gray.800" mb={4} fontWeight="bold">
              Meet Our Team
            </Heading>
            {isLoading ? (
              <VStack spacing={4}>
                <Spinner size="xl" />
                <Text>Loading team...</Text>
              </VStack>):(
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
              {crew.map((cre, index) => (
                <Box
                  key={index}
                  className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Image src={cre.profile} alt="Baker" objectFit="cover" />
                  <Box p={6}>
                    <Heading as="h4" size="md" color="gray.800" fontWeight="bold">
                      {cre.name}
                    </Heading>
                    <Text mt={4} color="gray.600">
                      {cre.role}
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>)}
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box id="testimonials" py={12} className="bg-transparent ">
          <Container maxW="container.xl">
            <Heading as="h2" size="xl" color="gray.800" mb={8} fontWeight="bold" textAlign="center">
              Testimonials
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
              {['Best cake I ever had!', 'Delicious and beautifully decorated!', 'Amazing taste and texture!'].map(
                (quote, index) => (
                  <Box
                    key={index}
                    className="backdrop-blur-md bg-white/40 rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105"
                  >
                    <Text fontSize="lg" color="gray.600" mb={4}>
                      "{quote}"
                    </Text>
                    <Text fontWeight="bold" color="gray.800">
                      Satisfied Customer
                    </Text>
                  </Box>
                )
              )}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box id="contact" py={12} className="bg-transparent ">
          <Container maxW="container.xl" textAlign="center">
            <Heading as="h2" size="xl" color="gray.800" mb={8} fontWeight="bold">
              Contact Us
            </Heading>
            <HStack justifyContent="center" mb={8} spacing={10}>
              <HStack alignContent='center'>
                <FaPhone color="teal" size="20px" />
                <Text color="gray.600" fontSize="lg">
                  +123 456 7890
                </Text>
              </HStack>
              <HStack>
                <FaEnvelope color="teal" size="20px" />
                <Text color="gray.600" fontSize="lg">
                  info@cakeshop.com
                </Text>
              </HStack>
              <HStack>
                <FaMapMarkerAlt color="teal" size="20px" />
                <Text color="gray.600" fontSize="lg">
                  123 Cake Street, Baker City
                </Text>
              </HStack>
            </HStack>
            <form action="/submit-contact" method="POST">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input id="name" name="name" placeholder="Your Name" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" name="email" type="email" placeholder="Your Email" />
                </FormControl>
              </SimpleGrid>
              <FormControl mb={8}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea id="message" name="message" placeholder="Your Message" />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg">
                Send Message
              </Button>
            </form>
          </Container>
        </Box>
        </Box>
      </Box>
    </ChakraProvider></div>
  );
}

export default Main;



