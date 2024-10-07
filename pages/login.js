import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  Stack,
  Link,
  HStack,
  Divider,
  useToast,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const router = useRouter();
  const toast = useToast();

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (isSignup) {
      // Call signup API or your custom logic for signup
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Signup successful!",
          description: "Please login with your new account.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsSignup(false); // Switch back to login after signup
      } else {
        setError(data.message || "Signup failed.");
        setLoading(false);
        return;
      }
    } else {
      // Login logic using NextAuth
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        setError("Invalid credentials, please try again.");
        setLoading(false);
      } else {
        router.push(res.url || "/dashboard");
      }
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      height="100vh"
      bgGradient="linear(to-r, teal.400, blue.500)"
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        maxW="400px"
        w="full"
        position="relative"
      >
        <VStack spacing={6} as="form" onSubmit={handleAuth}>
          <Heading as="h1" size="lg" color="teal.500">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </Heading>

          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              focusBorderColor="teal.400"
              bg="gray.50"
              borderRadius="md"
              _hover={{ borderColor: "teal.300" }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              focusBorderColor="teal.400"
              bg="gray.50"
              borderRadius="md"
              _hover={{ borderColor: "teal.300" }}
            />
          </FormControl>

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={loading}
            width="full"
            size="lg"
          >
            {loading
              ? isSignup
                ? "Signing up..."
                : "Logging in..."
              : isSignup
              ? "Create Account"
              : "Log In"}
          </Button>

          <Divider />

          {/* Social Auth Buttons */}
          <HStack justify="center" width="full" mt={4}>
            <Button
              leftIcon={<Icon as={FaGoogle} />}
              colorScheme="red"
              variant="outline"
              width="full"
            >
              {isSignup ? "Sign up with Google" : "Log in with Google"}
            </Button>
          </HStack>
        </VStack>

        <Stack mt={8} direction="row" justify="center" align="center">
          <Text fontSize="sm" color="gray.600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <Link
            color="teal.500"
            fontWeight="bold"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
}
