import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Grid,
  VStack,
  Avatar,
  IconButton,
  useToast,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { EditIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component

export default function Profile() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (session) {
      fetch(`/api/profile?username=${session.user.name}`)
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.username);
          setBio(data.bio || "");
          setEmail(data.email || "");
          setProfilePicture(data.profilePicture || "");
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [session]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("profilePicture", profilePicture);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Profile updated.",
          description: "Your profile has been successfully updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Update failed.",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box height="100vh" bg="gray.900" color="white">
      <Navbar />
      <Flex direction="column" align="center" justify="center" p={4}>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 3fr" }}
          gap={6}
          width="100%"
          maxW="1200px"
        >
          <Box
            bg="gray.800"
            p={6}
            borderRadius="md"
            shadow="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar size="xl" src={profilePicture} mb={4} />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              mb={4}
            />
            <Text fontSize="lg" fontWeight="bold">{username}</Text>
            <Text fontSize="md" color="gray.400" mb={4}>{email}</Text>
            <Button
              leftIcon={<EditIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={() => alert('Edit Profile Picture Functionality Here')}
            >
              Edit Profile Picture
            </Button>
          </Box>

          <Box bg="gray.800" p={6} borderRadius="md" shadow="md">
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              <Heading as="h2" size="lg" textAlign="center" mb={4}>
                Profile Settings
              </Heading>

              <FormControl id="username" mb={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </FormControl>

              <FormControl id="bio" mb={4}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                />
              </FormControl>

              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" isLoading={loading}>
                Update Profile
              </Button>
            </VStack>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
}
