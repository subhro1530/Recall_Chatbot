import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"; // Importing icons for menu items
import Logout from "./Logout";
import Link from "next/link"; // Importing Link from next/link

export default function Navbar() {
  return (
    <Box bg="#1F2937" px={4}>
      {" "}
      {/* Dark Background */}
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={<HamburgerIcon color="white" />}
          aria-label="Open Menu"
          display={{ md: "none" }}
        />
        <HStack spacing={8} alignItems="center">
          <Image src="/logo.png" alt="Logo" width="100px" />

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="/dashboard" passHref>
              <Button
                variant="link"
                color="white"
                _hover={{ color: "teal.400" }}
              >
                Home
              </Button>
            </Link>
            <Link href="/recall" passHref>
              <Button
                variant="link"
                color="white"
                _hover={{ color: "teal.400" }}
              >
                Recall
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button
                variant="link"
                color="white"
                _hover={{ color: "teal.400" }}
              >
                About Us
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                variant="link"
                color="white"
                _hover={{ color: "teal.400" }}
              >
                Contact Us
              </Button>
            </Link>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Menu>
            <MenuButton as={Button} variant="outline" colorScheme="teal" mr={2}>
              <Avatar size="sm" name="Profile" borderWidth="0" />{" "}
              {/* No border */}
            </MenuButton>
            <MenuList
              bg="#4A5568" // Dark background for the dropdown
              color="white" // White text
              borderWidth="0" // No border
              zIndex={1000} // Ensure dropdown is on top
            >
              <MenuItem
                icon={<FaUser />}
                bg="#4A5568"
                _hover={{ opacity: "0.5" }}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={<FaCog />}
                bg="#4A5568"
                _hover={{ opacity: "0.5" }}
              >
                Settings
              </MenuItem>
              <Logout />
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
