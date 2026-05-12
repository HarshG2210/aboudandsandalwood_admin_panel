import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FiMapPin, FiPhone } from "react-icons/fi";

export default function ShippingInfo({ address }) {
  return (
    <Box bg="gray.50" borderRadius="2xl" p={5} mb={6}>
      <HStack mb={4}>
        <Box bg="blue.100" p={2} borderRadius="xl">
          <Icon as={FiMapPin} color="blue.500" />
        </Box>

        <Text fontWeight="700" fontSize="lg" color="gray.500">
          Shipping Address
        </Text>
      </HStack>

      <VStack align="start" spacing={3}>
        <Text fontWeight="700" color="gray.800">
          {address?.full_name}
        </Text>

        <Text fontSize="sm" color="gray.600" lineHeight="1.8">
          {address?.line1}
          <br />
          {address?.line2}
          <br />
          {address?.city}, {address?.state}
          <br />
          {address?.postal_code}
          <br />
          {address?.country}
        </Text>

        <HStack pt={2}>
          <Icon as={FiPhone} color="gray.500" />

          <Text fontWeight="600" fontSize="sm" color="gray.800">
            {address?.phone}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
