import { Box, SimpleGrid, Button, Flex, VStack, Text } from "@chakra-ui/react";
import { Line, Pie, Bar } from "react-chartjs-2"; // Added Bar chart
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
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
  ArcElement, // Pie chart
  BarElement // Bar chart
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

  // Data for bar chart (Revenue per Product)
  const barChartData = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Revenue",
        data: [300, 500, 700, 400],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
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
    <Box p={6} bg="gray.800" minH="calc(100vh - 64px)">
      <Text fontSize="2xl" color="white" mb={6}>
        Welcome to Your Dashboard
      </Text>

      {/* Buttons for quick access */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => router.push("/analytics")}
        >
          View Analytics
        </Button>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => router.push("/activities")}
        >
          View Activities
        </Button>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => router.push("/profile")}
        >
          Manage Profile
        </Button>
      </SimpleGrid>

      {/* Chart Section */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* Line Chart Section */}
        <Flex
          direction="column"
          bg="gray.700"
          borderRadius="md"
          p={6}
          boxShadow="lg"
        >
          <Text fontSize="xl" color="white" mb={4}>
            Sales Over Time
          </Text>
          <Box h="300px">
            <Line data={lineChartData} options={chartOptions} />
          </Box>
          <Text color="gray.400" mt={4}>
            Track how your sales are growing month by month. We provide
            real-time updates.
          </Text>
        </Flex>

        {/* Pie Chart Section */}
        <Flex
          direction="column"
          bg="gray.700"
          borderRadius="md"
          p={6}
          boxShadow="lg"
        >
          <Text fontSize="xl" color="white" mb={4}>
            User Logins Over the Week
          </Text>
          <Box h="300px">
            <Pie data={pieChartData} />
          </Box>
          <Text color="gray.400" mt={4}>
            Analyze daily user logins to understand user engagement patterns.
          </Text>
        </Flex>

        {/* Bar Chart Section */}
        <Flex
          direction="column"
          bg="gray.700"
          borderRadius="md"
          p={6}
          boxShadow="lg"
        >
          <Text fontSize="xl" color="white" mb={4}>
            Revenue by Product
          </Text>
          <Box h="300px">
            <Bar data={barChartData} options={chartOptions} />
          </Box>
          <Text color="gray.400" mt={4}>
            Keep track of how different products are performing in terms of
            revenue.
          </Text>
        </Flex>

        {/* Promotion Section */}
        <Flex
          direction="column"
          bg="gray.700"
          borderRadius="md"
          p={6}
          boxShadow="lg"
        >
          <Text fontSize="xl" color="white" mb={4}>
            Promotions and Offers
          </Text>
          <Text color="gray.400" mb={4}>
            Explore exciting promotions to boost your business.
          </Text>
          <Button
            colorScheme="orange"
            onClick={() => window.open("https://dummywebsite1.com", "_blank")}
          >
            Visit Promotion 1
          </Button>
          <Button
            colorScheme="orange"
            mt={4}
            onClick={() => window.open("https://dummywebsite2.com", "_blank")}
          >
            Visit Promotion 2
          </Button>
        </Flex>
      </SimpleGrid>

      {/* Navigate to Recall Page */}
      <Button colorScheme="teal" onClick={handleNavigateToRecall} mt={8}>
        Go to Recall Page
      </Button>
    </Box>
  );
}
