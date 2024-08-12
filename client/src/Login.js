// src/LoginSignup.js
import React, { useContext, useEffect, useState } from 'react';
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
  Text,
  useToast,
} from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';

function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const toast = useToast();
  const {control,reset,handleSubmit,watch}=useForm()
  const navigate=useNavigate()
  const {user}=useContext(AppContext)
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])
  console.log(user)
  const onSubmit =async (data) => {
    // e.preventDefault();
    try{
    console.log(data)
    if(isSignup){
       const response= await axios.post(`${process.env.REACT_APP_URL}/user/signup`,data)
       console.log(response.data)
       window.localStorage.setItem('token',response.data.token)
        window.localStorage.setItem('user',JSON.stringify({name:response.data.user.name,
        email:response.data.user.email,
        _id:response.data.user._id,
        role:response.data.user.role,
       }))
    }else{
        const response= await axios.post(`${process.env.REACT_APP_URL}/user/login`,data)
       console.log(response.data)
       window.localStorage.setItem('token',response.data.token)
       window.localStorage.setItem('user',JSON.stringify({name:response.data.user.name,
        email:response.data.user.email,
        _id:response.data.user._id,
        role:response.data.user.role,
       }))
    }
    toast({
      title: isSignup ? "Account created." : "Logged in.",
      description: isSignup ? "Your account has been successfully created." : "You have successfully logged in.",
      status: "success",
      duration: 5000,
      isClosable: true,

    });
  navigate('/')
  }catch(error){
        console.log(error)
        toast({
      title: isSignup ? "Invalid Email!" : "Incorrect Email or Password!",
      description: isSignup ? "" : "",
      status: "error",
      duration: 5000,
      isClosable: true,
    })
    }
  };
  const validatePasswordMatch = (value) => {
    const password = watch('password');
    return value === password || 'Passwords do not match';
  };
  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.sm">
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              {isSignup ? "Sign Up" : "Log In"}
            </Heading>
            <Text fontSize="lg" color="gray.600">
              {isSignup ? "Create an account to save your order history and preferences." : "Log in to access your account."}
            </Text>
          </VStack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              {isSignup && (
                <FormControl id="name" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Controller
                  name='name'
                  control={control}
                  render={({field})=>(
                    <Input type="text" {...field}/>
                  )}
                  />
                </FormControl>
              )}
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Controller
                  name='email'
                  control={control}
                  render={({field})=>(
                    <Input type="email" {...field} />
                  )}
                  />
               
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Controller
                  name='password'
                  control={control}
                  render={({field})=>(
                    <Input type="password" {...field} />
                  )}
                  />
              </FormControl>
              {isSignup && (
                <FormControl id="confirm-password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{required:true,validate:validatePasswordMatch}}
                  render={({field})=>(
                    <Input type="password" {...field} />
                  )}
                  />
                </FormControl>
              )}
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                {isSignup ? "Sign Up" : "Log In"}
              </Button>
            </VStack>
          </form>

          <Text mt={4} color="gray.600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button variant="link" colorScheme="teal" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Log In" : "Sign Up"}
            </Button>
          </Text>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default LoginSignup;
