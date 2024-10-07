import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  Button,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <Box bg={useColorModeValue("gray.800", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
        />
        <HStack spacing={8} alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            Dashboard
          </Text>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Button variant="link" color="white">
              Home
            </Button>
            <Button variant="link" color="white">
              Analytics
            </Button>
            <Button variant="link" color="white">
              Settings
            </Button>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Logout />
        </Flex>
      </Flex>
    </Box>
  );
}
