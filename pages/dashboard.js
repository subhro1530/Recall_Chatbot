// components/Dashboard.js
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";
import ProfileSection from "@/components/ProfileSection";

export default function Dashboard() {
  return (
    <Box bg="gray.900" minH="100vh" color="white">
      <Navbar />
      <MainContent />
      <Footer />
    </Box>
  );
}
