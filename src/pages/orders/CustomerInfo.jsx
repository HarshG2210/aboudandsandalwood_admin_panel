import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FiMail, FiUser } from "react-icons/fi";

export default function CustomerInfo({ user }) {
  return (
    <Box bg="gray.50" borderRadius="2xl" p={5} mb={6}>
      <HStack mb={4}>
        <Box bg="orange.100" p={2} borderRadius="xl">
          <Icon as={FiUser} color="orange.500" />
        </Box>

        <Text fontWeight="700" fontSize="lg" color="gray.500">
          Customer
        </Text>
      </HStack>

      <VStack align="start" spacing={3}>
        <HStack align="start">
          <Icon as={FiUser} mt="2px" color="gray.500" />

          <Box>
            <Text fontSize="sm" color="gray.500">
              Username
            </Text>

            <Text fontWeight="600" color="gray.800">
              {user?.username}
            </Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Icon as={FiMail} mt="2px" color="gray.500" />

          <Box>
            <Text fontSize="sm" color="gray.500">
              Email
            </Text>

            <Text fontWeight="600" color="gray.800">
              {user?.email}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}
