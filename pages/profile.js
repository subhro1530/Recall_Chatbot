import { useEffect, useState } from "react";
import { Box, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react"; // Import signIn function

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/profile");
          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }
          const data = await response.json();
          setProfileData(data);
        } catch (error) {
          setError(error.message);
          toast({
            title: "Error fetching profile",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status, toast]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>Please log in to view your profile.</Text>
        <Button onClick={() => signIn()} colorScheme="blue" mt={4}>
          Log In
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Heading as="h1">Welcome, {session.user.name}</Heading>
      {error && <Text color="red.500">{error}</Text>}
      {profileData ? (
        <>
          <Text>Bio: {profileData.bio}</Text>
          <Text>Profile Picture: {profileData.profilePicture}</Text>
          <Input
            placeholder="Update Bio"
            value={profileData.bio}
            onChange={(e) =>
              setProfileData({ ...profileData, bio: e.target.value })
            }
          />
          <Input
            placeholder="Update Profile Picture URL"
            value={profileData.profilePicture}
            onChange={(e) =>
              setProfileData({ ...profileData, profilePicture: e.target.value })
            }
          />
          <Button onClick={handleUpdateProfile}>Update Profile</Button>
        </>
      ) : (
        <Text>No profile data found.</Text>
      )}
    </Box>
  );
};

const handleUpdateProfile = async () => {
  const response = await fetch("/api/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();
  if (response.ok) {
    console.log("Profile updated:", data);
  } else {
    console.error("Error updating profile:", data.message);
  }
};

export default ProfilePage;
