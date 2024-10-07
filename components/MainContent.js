import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";

export default function MainContent() {
  return (
    <Box p={4} bg="gray.800" minH="calc(100vh - 64px)">
      <Text fontSize="2xl" color="white" mb={4}>
        Welcome to Your Dashboard
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Box bg="gray.700" height="200px" borderRadius="md" p={4}>
          <Text color="white">Analytics Overview</Text>
        </Box>
        <Box bg="gray.700" height="200px" borderRadius="md" p={4}>
          <Text color="white">Recent Activities</Text>
        </Box>
        <Box bg="gray.700" height="200px" borderRadius="md" p={4}>
          <Text color="white">Profile Information</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
