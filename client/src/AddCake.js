// src/CakeEntry.js
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  Checkbox,
  Button,
  VStack,
  Image,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

const CakeEntry = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    ingredients: '',
    isCustom: false,
  });

  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload the image to the server
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${process.env.REACT_APP_URL}/cake/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      const { imageUrl } = response.data;
      setFormData((prevData) => ({ ...prevData, image: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      ingredients: '',
      isCustom: false,
    });
    setImagePreview('');
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/cake/add-cake`, formData);
      console.log(response.data);
      toast({
        title: "Cake added successfully!",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      resetForm();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error adding cake!",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/cakes`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Form Data Submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box className="min-h-screen bg-gray-100 py-12">
        <Container maxW="container.md" bg="white" p={8} borderRadius="md" shadow="md">
          <Heading as="h1" size="xl" textAlign="center" mb={6}>
            Add New Cake
          </Heading>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Cake Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Price</FormLabel>
                <NumberInput
                  min={0}
                  precision={2}
                  step={0.01}
                  value={formData.price}
                  onChange={(valueString) => setFormData({ ...formData, price: valueString })}
                >
                  <NumberInputField name="price" />
                </NumberInput>
              </FormControl>
              <FormControl id="category">
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Vanilla">Vanilla</option>
                  <option value="Red Velvet">Red Velvet</option>
                  <option value="Strawberry">Strawberry</option>
                  <option value="Lemon">Lemon</option>
                  <option value="Carrot">Carrot</option>
                </Select>
              </FormControl>
              <FormControl id="image">
                <FormLabel>Image</FormLabel>
                <Input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                {imagePreview && (
                  <Image src={imagePreview} alt="Image Preview" boxSize="150px" objectFit="cover" mt={4} borderRadius="md" />
                )}
              </FormControl>
              <FormControl id="ingredients">
                <FormLabel>Ingredients (comma separated)</FormLabel>
                <Textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="isCustom">
                <Checkbox
                  name="isCustom"
                  isChecked={formData.isCustom}
                  onChange={handleInputChange}
                >
                  Custom Cake
                </Checkbox>
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Add Cake
              </Button>
            </VStack>
          </form>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default CakeEntry;

