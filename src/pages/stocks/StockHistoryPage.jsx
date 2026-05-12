// src/components/stock/StockHistoryDashboard.jsx

import { ArrowDownIcon, ArrowUpIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {
  fetchStockHistory,
  selectStockHistory,
  selectStockLoading,
  selectStockStats,
} from "../../store/slices/stockSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

const StatCard = ({ title, value, color }) => {
  return (
    <Box
      bg="white"
      borderRadius="20px"
      p={5}
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <Text fontSize="sm" fontWeight="600" color="gray.500" mb={2}>
        {title}
      </Text>

      <Text fontSize="3xl" fontWeight="bold" color={color}>
        {value}
      </Text>
    </Box>
  );
};

const StockHistoryPage = () => {
  const dispatch = useDispatch();

  const history = useSelector(selectStockHistory);
  const loading = useSelector(selectStockLoading);
  const stats = useSelector(selectStockStats);

  useEffect(() => {
    dispatch(fetchStockHistory());
  }, [dispatch]);

  const lowStockItems = useMemo(() => {
    return history.filter(
      (item) => item.variant?.stock <= item.variant?.low_stock_threshold
    );
  }, [history]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="80vh" direction="column" gap={4}>
        <Spinner size="xl" thickness="4px" color="blue.500" />
        <Text color="gray.700" fontWeight="600">
          Loading Stock History...
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      bg="#f4f7fb"
      minH="100vh"
      p={{
        base: 4,
        md: 8,
      }}
    >
      {/* HEADER */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        flexWrap="wrap"
        gap={4}
      >
        <Box>
          <Text
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight="bold"
            color="gray.800"
          >
            Stock History Dashboard
          </Text>

          <Text mt={2} color="gray.600" fontSize="md">
            Complete stock movement tracking and inventory analysis
          </Text>
        </Box>

        <Badge
          px={4}
          py={2}
          borderRadius="full"
          colorScheme="purple"
          fontSize="14px"
        >
          Total Records: {history.length}
        </Badge>
      </Flex>

      {/* STATS */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(4, 1fr)",
        }}
        gap={6}
        mb={8}
      >
        <GridItem>
          <StatCard
            title="Total Changes"
            value={stats.totalChanges}
            color="blue.500"
          />
        </GridItem>

        <GridItem>
          <StatCard
            title="Total Stock Added"
            value={`+${stats.totalIncrease}`}
            color="green.500"
          />
        </GridItem>

        <GridItem>
          <StatCard
            title="Total Stock Removed"
            value={stats.totalDecrease}
            color="red.500"
          />
        </GridItem>

        <GridItem>
          <StatCard
            title="Low Stock Variants"
            value={lowStockItems.length}
            color="orange.500"
          />
        </GridItem>
      </Grid>

      {/* LOW STOCK ALERT */}
      {lowStockItems.length > 0 && (
        <Box
          bg="orange.50"
          border="1px solid"
          borderColor="orange.200"
          borderRadius="20px"
          p={5}
          mb={8}
        >
          <Flex align="center" gap={3} mb={4}>
            <Icon as={WarningIcon} color="orange.500" boxSize={6} />

            <Text fontSize="xl" fontWeight="bold" color="orange.700">
              Low Stock Alert
            </Text>
          </Flex>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {lowStockItems.map((item) => (
              <Box
                key={item.id}
                bg="white"
                p={4}
                borderRadius="16px"
                border="1px solid"
                borderColor="orange.200"
              >
                <Text fontWeight="bold" color="gray.800">
                  {item.variant.label}
                </Text>

                <Text color="gray.600">Size: {item.variant.size}</Text>

                <Text color="red.500" fontWeight="700" mt={1}>
                  Current Stock: {item.variant.stock}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      )}

      {/* TABLE */}
      <Box
        bg="white"
        borderRadius="24px"
        overflow="hidden"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.200"
      >
        <Flex
          justify="space-between"
          align="center"
          px={6}
          py={5}
          bg="gray.900"
        >
          <Text fontSize="xl" fontWeight="bold" color="white">
            Complete Stock Activity
          </Text>

          <Text color="gray.300" fontSize="sm">
            Real-time inventory tracking
          </Text>
        </Flex>

        <Divider />

        <TableContainer>
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th color="gray.800">Variant</Th>
                <Th color="gray.800">Size</Th>
                <Th color="gray.800">Price</Th>
                <Th color="gray.800">Previous</Th>
                <Th color="gray.800">New</Th>
                <Th color="gray.800">Change</Th>
                <Th color="gray.800">Current Stock</Th>
                <Th color="gray.800">Reason</Th>
                <Th color="gray.800">Date</Th>
                <Th color="gray.800">Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {history.map((item) => {
                const positive = item.change > 0;

                return (
                  <Tr
                    key={item.id}
                    _hover={{
                      bg: "gray.50",
                    }}
                  >
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" color="gray.800">
                          {item.variant.label}
                        </Text>

                        <Text fontSize="sm" color="gray.500">
                          ID: #{item.variant.id}
                        </Text>
                      </VStack>
                    </Td>

                    <Td>
                      <Badge
                        colorScheme="purple"
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {item.variant.size}
                      </Badge>
                    </Td>

                    <Td>
                      <Text fontWeight="600" color="green.600">
                        ₹{item.variant.price}
                      </Text>
                    </Td>

                    <Td>
                      <Text color="gray.700">{item.previous_stock}</Text>
                    </Td>

                    <Td>
                      <Text fontWeight="600" color="gray.800">
                        {item.new_stock}
                      </Text>
                    </Td>

                    <Td>
                      <HStack spacing={2}>
                        <Icon
                          as={positive ? ArrowUpIcon : ArrowDownIcon}
                          color={positive ? "green.500" : "red.500"}
                        />

                        <Text
                          fontWeight="bold"
                          color={positive ? "green.500" : "red.500"}
                        >
                          {positive ? "+" : ""}
                          {item.change}
                        </Text>
                      </HStack>
                    </Td>

                    <Td>
                      <Badge
                        colorScheme={
                          item.variant.is_low_stock ? "red" : "green"
                        }
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        {item.variant.stock} Left
                      </Badge>
                    </Td>

                    <Td>
                      <Badge
                        colorScheme={
                          item.reason === "initial stock" ? "blue" : "orange"
                        }
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="capitalize"
                      >
                        {item.reason}
                      </Badge>
                    </Td>

                    <Td>
                      <Text fontSize="sm" color="gray.700" fontWeight="500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </Text>

                      <Text fontSize="xs" color="gray.500">
                        {new Date(item.created_at).toLocaleTimeString()}
                      </Text>
                    </Td>

                    <Td>
                      {item.variant.is_low_stock ? (
                        <Badge colorScheme="red" px={3} py={1}>
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge colorScheme="green" px={3} py={1}>
                          Healthy
                        </Badge>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default StockHistoryPage;
