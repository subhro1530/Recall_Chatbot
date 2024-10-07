import { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Text,
  VStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Signup successful!",
          description: "Redirecting to login page...",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={8}
      maxW="500px"
      mx="auto"
      mt={10}
      borderRadius="lg"
      boxShadow="lg"
      bg="gray.50"
    >
      <Heading mb={6} textAlign="center" color="teal.600">
        Create Your Account
      </Heading>
      <form onSubmit={handleSignup}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              borderColor="gray.300"
              _focus={{ borderColor: "teal.500" }}
            />
            <FormHelperText>Pick a unique username</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="gray.300"
              _focus={{ borderColor: "teal.500" }}
            />
            <FormHelperText>Use at least 8 characters</FormHelperText>
          </FormControl>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={loading}
            loadingText="Signing Up..."
          >
            Sign Up
          </Button>
        </VStack>
      </form>

      <Stack mt={6} direction="row" justify="center" align="center">
        <Text>Already have an account?</Text>
        <Button
          variant="link"
          colorScheme="teal"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
}
