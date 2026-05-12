import {
  Badge,
  Box,
  Grid,
  HStack,
  Icon,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

const statusConfig = {
  PENDING: {
    color: "orange",
    icon: FiClock,
    label: "Pending",
  },

  PROCESSING: {
    color: "blue",
    icon: FiPackage,
    label: "Processing",
  },

  SHIPPED: {
    color: "purple",
    icon: FiTruck,
    label: "Shipped",
  },

  DELIVERED: {
    color: "green",
    icon: FiCheckCircle,
    label: "Delivered",
  },

  CANCELLED: {
    color: "red",
    icon: FiBox,
    label: "Cancelled",
  },
};

export default function OrderHeader({ order, totalItems }) {
  const status = statusConfig[order.status] || statusConfig.PENDING;

  return (
    <Box
      px={{ base: 5, md: 8 }}
      py={6}
      bg="linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr auto",
        }}
        gap={6}
        alignItems="center"
      >
        <VStack align="start" spacing={4}>
          <HStack flexWrap="wrap" gap={3}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              color="gray.800"
            >
              Order #{order.id}
            </Text>

            <Badge
              colorScheme={status.color}
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
            >
              <HStack spacing={2}>
                <Icon as={status.icon} />
                <Text>{status.label}</Text>
              </HStack>
            </Badge>
          </HStack>

          <HStack spacing={6} flexWrap="wrap" color="gray.600">
            <HStack>
              <Icon as={FiCalendar} />
              <Text fontSize="sm">
                {new Date(order.created_at).toLocaleString()}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FiShoppingBag} />
              <Text fontSize="sm">{totalItems} Items</Text>
            </HStack>

            <HStack>
              <Icon as={FiCreditCard} />
              <Text fontSize="sm" color="gray.800">
                ₹{Number(order.total_amount).toLocaleString()}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <VStack align="end" spacing={3}>
          <Text fontSize="sm" fontWeight="600" color="gray.500">
            Update Status
          </Text>

          <Select
            size="md"
            borderRadius="xl"
            w="180px"
            value={order.status}
            bg="white"
            color="gray.800"
          >
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </VStack>
      </Grid>
    </Box>
  );
}
