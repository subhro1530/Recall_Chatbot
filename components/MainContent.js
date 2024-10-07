import { Box, SimpleGrid, Text, Flex, Button } from "@chakra-ui/react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useRouter } from "next/router";

// Register the components needed for the charts
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie chart
);

export default function MainContent() {
  const router = useRouter();

  // Data for line chart (Sales over time)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales Over Time",
        data: [30, 45, 60, 50, 80, 100],
        backgroundColor: "rgba(72, 187, 120, 0.2)",
        borderColor: "rgba(72, 187, 120, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Data for pie chart (User logins in a week)
  const pieChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "User Logins",
        data: [12, 19, 10, 5, 14, 8, 20], // Example login data
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(201, 203, 207, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleNavigateToRecall = () => {
    router.push("/recall");
  };

  return (
    <Box p={4} bg="gray.800" minH="calc(100vh - 64px)">
      <Text fontSize="2xl" color="white" mb={4}>
        Welcome to Your Dashboard
      </Text>

      {/* Grid for Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={8}>
        <Box bg="gray.700" borderRadius="md" p={6} boxShadow="lg">
          <Text fontSize="xl" color="white" mb={2}>
            Analytics Overview
          </Text>
          <Text color="gray.400">
            Keep track of the latest insights into your business.
          </Text>
        </Box>
        <Box bg="gray.700" borderRadius="md" p={6} boxShadow="lg">
          <Text fontSize="xl" color="white" mb={2}>
            Recent Activities
          </Text>
          <Text color="gray.400">
            Stay updated with recent events and actions.
          </Text>
        </Box>
        <Box bg="gray.700" borderRadius="md" p={6} boxShadow="lg">
          <Text fontSize="xl" color="white" mb={2}>
            Profile Information
          </Text>
          <Text color="gray.400">
            Manage your personal settings and preferences.
          </Text>
        </Box>
      </SimpleGrid>

      {/* Chart Section */}
      <Flex
        direction="column"
        bg="gray.700"
        borderRadius="md"
        p={6}
        boxShadow="lg"
        mb={8}
      >
        <Text fontSize="xl" color="white" mb={4}>
          Sales Over Time
        </Text>
        <Box h="300px">
          <Line data={lineChartData} options={lineChartOptions} />
        </Box>
      </Flex>

      {/* Pie Chart Section */}
      <Flex
        direction="column"
        bg="gray.700"
        borderRadius="md"
        p={6}
        boxShadow="lg"
        mb={8}
      >
        <Text fontSize="xl" color="white" mb={4}>
          User Logins Over the Week
        </Text>
        <Box h="300px">
          <Pie data={pieChartData} />
        </Box>
      </Flex>

      {/* Navigate to Recall Page */}
      <Button colorScheme="teal" onClick={handleNavigateToRecall} mt={4}>
        Go to Recall Page
      </Button>
    </Box>
  );
}
