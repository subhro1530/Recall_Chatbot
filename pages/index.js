// pages/index.js
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [status]);

  return (
    <Box p={8} maxW="600px" mx="auto" mt={10}>
      <VStack spacing={4} align="stretch">
        {!session ? (
          <>
            <Heading as="h1" size="lg">
              Welcome to Recall Chatbot
            </Heading>
            <Text>Please log in to access your dashboard.</Text>
            <Button colorScheme="blue" onClick={() => signIn()}>
              Log In
            </Button>
          </>
        ) : (
          <Button colorScheme="red" onClick={() => signOut()}>
            Log Out
          </Button>
        )}
      </VStack>
    </Box>
  );
}
