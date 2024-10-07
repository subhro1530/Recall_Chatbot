import { Box, Text, Link, SimpleGrid, VStack, HStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.900" py={6} textAlign="center">
      {/* Links Section */}
      <VStack spacing={4} mb={6}>
        <Text fontSize="lg" color="white" fontWeight="bold">
          Recall
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {/* Future Links */}
          <Box>
            <Text fontSize="md" color="gray.300" mb={2}>
              Pages
            </Text>
            <VStack spacing={2}>
              <Link href="#" color="gray.400">
                Home
              </Link>
              <Link href="#" color="gray.400">
                Dashboard
              </Link>
              <Link href="#" color="gray.400">
                Profile
              </Link>
              <Link href="#" color="gray.400">
                Settings
              </Link>
            </VStack>
          </Box>

          {/* Social Media Links */}
          <Box>
            <Text fontSize="md" color="gray.300" mb={2}>
              Follow Us
            </Text>
            <VStack spacing={2}>
              <Link href="https://twitter.com" isExternal color="gray.400">
                Twitter
              </Link>
              <Link href="https://facebook.com" isExternal color="gray.400">
                Facebook
              </Link>
              <Link href="https://linkedin.com" isExternal color="gray.400">
                LinkedIn
              </Link>
              <Link href="https://instagram.com" isExternal color="gray.400">
                Instagram
              </Link>
            </VStack>
          </Box>

          {/* Promotions */}
          <Box>
            <Text fontSize="md" color="gray.300" mb={2}>
              Promotions
            </Text>
            <VStack spacing={2}>
              <Link
                href="https://dummywebsite1.com"
                isExternal
                color="gray.400"
              >
                Dummy Website 1
              </Link>
              <Link
                href="https://dummywebsite2.com"
                isExternal
                color="gray.400"
              >
                Dummy Website 2
              </Link>
              <Link
                href="https://dummywebsite3.com"
                isExternal
                color="gray.400"
              >
                Dummy Website 3
              </Link>
              <Link
                href="https://dummywebsite4.com"
                isExternal
                color="gray.400"
              >
                Dummy Website 4
              </Link>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>

      {/* Copyright Section */}
      <HStack justify="center" mt={4}>
        <Text color="white">© 2024 Recall. All rights reserved.</Text>
      </HStack>
    </Box>
  );
}
