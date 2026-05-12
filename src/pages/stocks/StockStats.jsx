import { Box, HStack, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

import { selectStockStats } from "../../store/slices/stockSlice";
import { useSelector } from "react-redux";

export default function StockStats() {
  const stats = useSelector(selectStockStats);

  return (
    <HStack spacing={6}>
      <Box p={5} bg="white" borderRadius="xl">
        <Stat>
          <StatLabel>Total Logs</StatLabel>
          <StatNumber>{stats.totalChanges}</StatNumber>
        </Stat>
      </Box>

      <Box p={5} bg="green.50" borderRadius="xl">
        <Stat>
          <StatLabel>Stock Added</StatLabel>
          <StatNumber>+{stats.totalIncrease}</StatNumber>
        </Stat>
      </Box>

      <Box p={5} bg="red.50" borderRadius="xl">
        <Stat>
          <StatLabel>Stock Removed</StatLabel>
          <StatNumber>{stats.totalDecrease}</StatNumber>
        </Stat>
      </Box>
    </HStack>
  );
}