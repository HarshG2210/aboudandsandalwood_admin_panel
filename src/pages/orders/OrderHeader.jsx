import {
  Badge,
  Box,
  Grid,
  HStack,
  Icon,
  Select,
  Spinner,
  Text,
  VStack,
  useToast,
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
import {
  fetchOrders,
  selectOrderUpdateLoading,
  updateOrderStatus,
} from "../../store/slices/ordersSlice";
import { useDispatch, useSelector } from "react-redux";

// ================= STATUS CONFIG =================

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

  CONFIRMED: {
    color: "cyan",
    icon: FiCheckCircle,
    label: "Confirmed",
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

// ================= DYNAMIC STATUS OPTIONS =================
// Backend response can contain any status.
// We dynamically generate dropdown options.

const getStatusOptions = (currentStatus) => {
  const defaultStatuses = [
    "PENDING",
    "PROCESSING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  // Add current status if backend sends unknown/new status
  if (currentStatus && !defaultStatuses.includes(currentStatus)) {
    return [...defaultStatuses, currentStatus];
  }

  return defaultStatuses;
};

export default function OrderHeader({ order, totalItems }) {
  const dispatch = useDispatch();

  const toast = useToast();

  // ================= LOADING =================

  const updating = useSelector(selectOrderUpdateLoading(order.id));

  // ================= CURRENT STATUS =================

  const status = statusConfig[order.status] || statusConfig.PENDING;

  // ================= DYNAMIC OPTIONS =================

  const statusOptions = getStatusOptions(order.status);

  // ================= UPDATE STATUS =================

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    // Avoid unnecessary API call
    if (newStatus === order.status) return;

    try {
      // ================= PATCH API =================
      await dispatch(
        updateOrderStatus({
          orderId: order.id,
          status: newStatus,
        })
      ).unwrap();

      // ================= REFETCH ORDERS =================
      // Fetch fresh data from backend
      await dispatch(fetchOrders());

      // ================= SUCCESS =================
      toast({
        title: "Order status updated",
        description: `Order marked as ${newStatus}`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed",
        description: err || "Unable to update order status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
        {/* ================= LEFT ================= */}

        <VStack align="start" spacing={4}>
          <HStack flexWrap="wrap" gap={3}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              color="gray.800"
            >
              Order #{order.id}
            </Text>

            {/* STATUS BADGE */}

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

          {/* ORDER INFO */}

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

        {/* ================= RIGHT ================= */}

        <VStack align="end" spacing={3}>
          <Text fontSize="sm" fontWeight="600" color="gray.500">
            Update Status
          </Text>

          <Box position="relative">
            <Select
              size="md"
              borderRadius="xl"
              w="200px"
              value={order.status || ""}
              bg="white"
              color="gray.800"
              onChange={handleStatusChange}
              isDisabled={updating}
            >
              {statusOptions.map((statusValue) => (
                <option key={statusValue} value={statusValue}>
                  {statusValue
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </Select>

            {/* LOADER */}

            {updating && (
              <Box
                position="absolute"
                top="50%"
                right="12px"
                transform="translateY(-50%)"
              >
                <Spinner size="sm" />
              </Box>
            )}
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}
