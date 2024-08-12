// src/BlogPost.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Link,
  HStack,
} from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';
import { useParams } from 'react-router-dom';

const posts = [
  {
    id: '1',
    title: 'Cake Decorating Tips for Beginners',
    content: 'Detailed content about cake decorating tips...',
    image: '/images/cake-decorating.jpg',
  },
  {
    id: '2',
    title: 'Delicious Cake Recipes to Try at Home',
    content: 'Detailed content about cake recipes...',
    image: '/images/cake-recipes.jpg',
  },
  {
    id: '3',
    title: 'Shop News: Our Grand Opening Event!',
    content: 'Detailed content about the grand opening event...',
    image: '/images/shop-news.jpg',
  },
  {
    id: '4',
    title: 'Seasonal Specials: Holiday Cakes and More',
    content: 'Detailed content about seasonal specials...',
    image: '/images/seasonal-specials.jpg',
  },
];

function BlogPost() {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return <Text>Post not found</Text>;
  }

  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.md">
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              {post.title}
            </Heading>
            <Image
              src={post.image}
              alt={post.title}
              borderRadius="md"
              boxSize="600px"
              objectFit="cover"
            />
            <Text fontSize="lg" color="gray.600" textAlign="left">
              {post.content}
            </Text>
          </VStack>

          {/* Related Posts */}
          <Box mt={12}>
            <Heading as="h3" size="lg" color="gray.800" mb={4}>
              Related Posts
            </Heading>
            <VStack spacing={8}>
              {posts
                .filter((relatedPost) => relatedPost.id !== postId)
                .map((relatedPost) => (
                  <Box key={relatedPost.id} className="bg-white p-6 rounded-lg shadow-md">
                    <HStack spacing={4}>
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        boxSize="150px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start" spacing={4}>
                        <Heading as="h3" size="lg" color="gray.800">
                          {relatedPost.title}
                        </Heading>
                        <Text fontSize="md" color="gray.600">
                          {relatedPost.content.substring(0, 100)}...
                        </Text>
                        <Link href={`/post/${relatedPost.id}`} color="teal.500" fontWeight="bold">
                          Read more
                        </Link>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
            </VStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default BlogPost;
