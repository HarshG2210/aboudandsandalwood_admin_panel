import { Badge, Box, Text, VStack } from "@chakra-ui/react";

export default function StockHistoryCard({ item }) {
  return (
    <Box p={4} bg="white" borderRadius="xl" shadow="sm">
      <VStack align="start">
        <Text fontWeight="bold">
          {item.variant.label} ({item.variant.size})
        </Text>

        <Text>Price: ₹{item.variant.price}</Text>

        <Badge colorScheme={item.change > 0 ? "green" : "red"}>
          {item.change > 0 ? "+" : ""}
          {item.change}
        </Badge>

        <Text>
          {item.previous_stock} → {item.new_stock}
        </Text>

        <Text fontSize="sm">{item.reason}</Text>
      </VStack>
    </Box>
  );
}