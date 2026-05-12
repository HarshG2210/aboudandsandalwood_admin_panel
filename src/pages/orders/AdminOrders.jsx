import { Box, HStack, Icon, Spinner, Text, VStack } from "@chakra-ui/react";
import {
  fetchOrders,
  selectOrders,
  selectOrdersLoading,
} from "../../store/slices/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { FiShoppingBag } from "react-icons/fi";
import OrderCard from "./OrderCard";

export default function AdminOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);

  const loading = useSelector(selectOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // LAST ORDER FIRST
  const reversedOrders = useMemo(() => {
    return [...orders].reverse();
  }, [orders]);

  if (loading) {
    return (
      <Box py={24}>
        <VStack spacing={4}>
          <Spinner size="xl" thickness="4px" color="orange.400" />
          <Text color="gray.500">Loading orders...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" p={{ base: 4, md: 8 }}>
      {/* HEADER */}
      <Box mb={10}>
        <HStack justify="space-between" flexWrap="wrap" gap={4}>
          <Box>
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="800"
              color="gray.800"
            >
              Orders Management
            </Text>

            <Text color="gray.500" mt={1}>
              Manage and track all customer orders
            </Text>
          </Box>

          <Box
            bg="white"
            px={6}
            py={4}
            borderRadius="2xl"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Text fontSize="sm" color="gray.500">
              Total Orders
            </Text>

            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {reversedOrders.length}
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* EMPTY */}
      {reversedOrders.length === 0 ? (
        <Box
          bg="white"
          borderRadius="3xl"
          p={20}
          textAlign="center"
          border="1px solid"
          borderColor="gray.100"
        >
          <Icon as={FiShoppingBag} boxSize={14} color="gray.300" mb={4} />

          <Text fontSize="2xl" fontWeight="700" color="gray.700">
            No Orders Found
          </Text>

          <Text color="gray.500" mt={2}>
            Orders will appear here after customers place them.
          </Text>
        </Box>
      ) : (
        <VStack spacing={8} align="stretch">
          {reversedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </VStack>
      )}
    </Box>
  );
}
