import { Box, Input, Button, Textarea, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Recall() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [savedItems, setSavedItems] = useState([]);

  const handleSave = () => {
    setSavedItems([...savedItems, { title, description }]);
    setTitle("");
    setDescription("");
  };

  return (
    <Box p={6} bg="gray.800" minH="calc(100vh - 64px)" color="white">
      <Text fontSize="2xl" mb={4}>
        Recall Your Saved Items
      </Text>

      {/* Input Form */}
      <Box mb={6}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
          bg="gray.700"
          border="none"
          color="white"
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb={4}
          bg="gray.700"
          border="none"
          color="white"
        />
        <Button onClick={handleSave} colorScheme="teal">
          Save Item
        </Button>
      </Box>

      {/* Display Saved Items */}
      <Box>
        <Text fontSize="xl" mb={4}>
          Saved Items:
        </Text>
        {savedItems.map((item, index) => (
          <Box key={index} p={4} bg="gray.700" borderRadius="md" mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
