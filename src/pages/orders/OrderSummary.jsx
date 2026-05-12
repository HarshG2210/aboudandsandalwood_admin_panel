import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function OrderSummary({ totalItems, itemsLength, totalAmount }) {
  return (
    <Box
      bg="orange.50"
      borderRadius="2xl"
      p={5}
      border="1px solid"
      borderColor="orange.100"
    >
      <Text fontWeight="700" fontSize="lg" mb={5} color="gray.500">
        Order Summary
      </Text>

      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text color="gray.600">Total Products</Text>

          <Text fontWeight="700" color="gray.800">
            {itemsLength}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="gray.600">Total Quantity</Text>

          <Text fontWeight="700" color="gray.800">
            {totalItems}
          </Text>
        </HStack>

        <Divider />

        <HStack justify="space-between">
          <Text fontWeight="700" fontSize="lg" color="gray.500">
            Total Amount
          </Text>

          <Text fontWeight="800" fontSize="2xl" color="orange.500">
            ₹{Number(totalAmount).toLocaleString()}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
