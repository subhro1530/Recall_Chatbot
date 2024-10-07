import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
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
          <Image src="/logo.png" alt="Logo" width="100px" />
          
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
