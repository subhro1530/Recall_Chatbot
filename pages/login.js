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
} from "@chakra-ui/react";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const router = useRouter();

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
        alert("Signup successful! Please login.");
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
    <Box maxW="400px" mx="auto" p={4} mt={8}>
      <VStack spacing={4} as="form" onSubmit={handleAuth}>
        <Heading>{isSignup ? "Signup" : "Login"}</Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" name="username" placeholder="Username" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" placeholder="Password" />
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={loading}
          width="full"
        >
          {loading
            ? isSignup
              ? "Signing up..."
              : "Logging in..."
            : isSignup
            ? "Signup"
            : "Login"}
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>

      <Stack mt={4} direction="row" justify="center" align="center">
        <Text>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Link color="teal.500" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Signup"}
        </Link>
      </Stack>
    </Box>
  );
}
