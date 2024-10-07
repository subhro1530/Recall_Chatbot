import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Flex,
  Image,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [status]);

  return (
    <Box
      position="relative"
      minHeight="100vh"
      bg="gray.900"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      {/* Use Chakra's Image component for the background GIF */}
      <Image
        src="https://media2.giphy.com/media/n0cNexfj7YIhxtiTTb/200w.gif?cid=6c09b95261isc2i57riqbdr72cryrst84nutrrw8ijde4r48&ep=v1_videos_search&rid=200w.gif&ct=v"
        alt="Background GIF"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        objectFit="cover"
        width="100%"
        height="100%"
        zIndex={-1}
        opacity={0.3} // Adjust opacity for effect
      />

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="lg"
        backdropFilter="blur(10px)"
        p={8}
        maxWidth="600px"
        textAlign="center"
        boxShadow="lg"
        zIndex={1} // Ensures content is above the background
      >
        <Image
          src="/logo.png"
          alt="Logo"
          boxSize="150px"
          objectFit="contain"
          mb={6}
        />
        <Heading as="h1" size="2xl" fontWeight="300" color="white" mb={6}>
          <Typewriter
            options={{
              strings: ["Welcome to Recall!"],
              autoStart: true,
              loop: true,
            }}
          />
        </Heading>
        <Text color="gray.300" fontSize="lg" mb={6}>
          An advanced chatbot experience to help you recall important details
          quickly and efficiently.
        </Text>

        <VStack spacing={4}>
          {!session ? (
            <>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => signIn()}
                w="full"
              >
                Log In
              </Button>
              <Button
                colorScheme="green"
                size="lg"
                w="full"
                onClick={() => router.push("/signup")} // Sign-up button routing
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button colorScheme="red" size="lg" onClick={() => signOut()}>
              Log Out
            </Button>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
