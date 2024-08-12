// src/BlogNews.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Link,
} from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';

const posts = [
  {
    id:1,
    title: 'Cake Decorating Tips for Beginners',
    excerpt: 'Learn the basics of cake decorating with these simple tips.',
    image: '/images/cake-decorating.jpg',
    link: '/blog-post/1',
  },
  {
    id:2,
    title: 'Delicious Cake Recipes to Try at Home',
    excerpt: 'Explore our favorite cake recipes that you can easily make at home.',
    image: '/images/cake-recipes.jpg',
    link: '/blog-post/2',
  },
  {
    id:3,
    title: 'Shop News: Our Grand Opening Event!',
    excerpt: 'Join us for the grand opening of our new cake shop location!',
    image: '/images/shop-news.jpg',
    link: '/blog-post/3',
  },
  {
    id:4,
    title: 'Seasonal Specials: Holiday Cakes and More',
    excerpt: 'Check out our seasonal specials for the holidays.',
    image: '/images/seasonal-specials.jpg',
    link: '/blog-post/4',
  },
];

function BlogNews() {
  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.md">
          {/* Blog/News Section */}
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              Blog & News
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Stay updated with our latest articles, tips, and news.
            </Text>
          </VStack>

          {/* Posts */}
          <VStack spacing={8}>
            {posts.map((post, index) => (
              <Box key={index} className="bg-white p-6 rounded-lg shadow-md">
                <HStack spacing={4}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <VStack align="start" spacing={4}>
                    <Heading as="h3" size="lg" color="gray.800">
                      {post.title}
                    </Heading>
                    <Text fontSize="md" color="gray.600">
                      {post.excerpt}
                    </Text>
                    <Link href={post.link} color="teal.500" fontWeight="bold">
                      Read more
                    </Link>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default BlogNews;
