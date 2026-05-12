import {
    Badge,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";

import OrderItemCard from "./OrderItemCard";

export default function OrderItems({ items, totalItems }) {
    return (
      <VStack spacing={5} align="stretch">
        <HStack justify="space-between">
          <Text
            fontSize="2xl"
            fontWeight="800"
            color="gray.800"
          >
            Ordered Items
          </Text>
  
          <Badge
            colorScheme="purple"
            px={4}
            py={2}
            borderRadius="full"
            fontSize="sm"
          >
            {totalItems} Qty
          </Badge>
        </HStack>
  
        {items.map((item, index) => (
          <OrderItemCard key={index} item={item} />
        ))}
      </VStack>
    );
  }