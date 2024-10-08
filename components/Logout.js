// components/Logout.js
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function Logout() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to the home page after logging out
  };

  return (
    <Button ml={4} mt={5} mb={2} colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
}
