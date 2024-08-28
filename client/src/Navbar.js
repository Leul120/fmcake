// src/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  Link,
  IconButton,
  Collapse,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {jwtDecode} from 'jwt-decode'
import { AppContext } from './App';
import axios from 'axios';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Blog/News', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Account', href: '/account' },
];

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [decoded,setDecoded]=useState({})
  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.900');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700');
const {user,setUser,setText,text}=useContext(AppContext)

  

useEffect(()=>{
    setUser(JSON.parse(window.localStorage.getItem('user')))
},[])
console.log(user)
  

  return (
    <ChakraProvider >
      <Box >
        <Flex
          bg={bgColor}
          color={color}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={borderColor}
          align={'center'}
          justify={'space-between'}
        >
          <Flex align={'center'}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
              display={{ md: 'none' }}
            />
            <Box ml={{ base: 0, md: 10 }}>
              <Link href='#home' to='/' fontSize='xl' fontWeight='bold' color='teal.500'>
                FM Cake
              </Link>
            </Box>
          </Flex>

          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <Link to={link.href}
                key={link.label}
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            
            <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/user-dashboard"}
              >
               User Dashboard
              </Link>
              <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/reception-dashboard"}
              >
                Receptionist Dashboard
              </Link>

              <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/baker-dashboard"}
              >
              Baker  Dashboard
              </Link>
              <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/shop-dashboard"}
              >
              Manager Dashboard
              </Link>
          </HStack>

          <HStack>
            
            {!user &&(<><Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'/auth'}
            >
              Sign In
            </Button>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'teal.400'}
              href={'/auth'}
              _hover={{
                bg: 'teal.300',
              }}
            >
              Sign Up
            </Button></>)}
            {user && (<Button>{user.name}</Button>)}
          </HStack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <VStack as={'nav'} spacing={4}>
              {links.map((link) => (
                <Link
                  key={link.label}
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: hoverBgColor,
                  }}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/user-dashboard"}
              >
               User Dashboard
              </Link>
              <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/reception-dashboard"}
              >
                Receptionist Dashboard
              </Link>

              <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/baker-dashboard"}
              >
              Baker  Dashboard
              </Link>
              <Link 
                key='dashboard'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={"/shop-dashboard"}
              >
              Manager Dashboard
              </Link>
            </VStack>
          </Box>
        </Collapse>
      </Box>
    </ChakraProvider>
  );
};

export default Navbar;
