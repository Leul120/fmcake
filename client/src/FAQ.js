// src/FAQ.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'You can place an order online through our website or visit our shop in person.',
  },
  {
    question: 'What ingredients do you use?',
    answer: 'We use high-quality, fresh ingredients sourced from local suppliers whenever possible.',
  },
  {
    question: 'Do you offer delivery services?',
    answer: 'Yes, we offer delivery services within a 10-mile radius of our shop.',
  },
  {
    question: 'Can I customize my cake?',
    answer: 'Absolutely! We offer a range of customization options for all our cakes.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We do not accept returns on custom cakes. If you have any issues with your order, please contact us directly.',
  },
];

function FAQ() {
  return (
    <ChakraProvider>
      <Box className="bg-gray-100 py-12">
        <Container maxW="container.md">
          <VStack spacing={8} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="gray.800">
              Frequently Asked Questions
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Find answers to common questions about our products and services.
            </Text>
          </VStack>

          <Accordion allowMultiple>
            {faqs.map((faq, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton _expanded={{ bg: 'teal.500', color: 'white' }}>
                    <Box flex="1" textAlign="left">
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default FAQ;
