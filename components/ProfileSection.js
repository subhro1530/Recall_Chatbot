import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ProfileSection() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { username, bio, email };

    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        toast({
          title: "Profile updated.",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error.",
          description: "There was a problem updating your profile.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error.",
        description: "There was a problem updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} bg="gray.700" borderRadius="md" boxShadow="lg">
      <Text fontSize="2xl" color="white" mb={4}>
        Profile Information
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel color="white">Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            bg="gray.800"
            color="white"
            border="none"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color="white">Bio</FormLabel>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            bg="gray.800"
            color="white"
            border="none"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color="white">Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            bg="gray.800"
            color="white"
            border="none"
          />
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Update Profile
        </Button>
      </form>
    </Box>
  );
}
