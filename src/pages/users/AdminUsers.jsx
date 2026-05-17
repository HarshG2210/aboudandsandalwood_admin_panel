import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiShield,
  FiUser,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";
import {
  fetchRegisteredUsers,
  selectUsers,
  selectUsersCount,
  selectUsersLoading,
} from "../../store/slices/registeredUserSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminUsers() {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const count = useSelector(selectUsersCount);
  const loading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchRegisteredUsers());
  }, [dispatch]);

  // STATS
  const completedProfiles = users.filter((u) => u.profile_completed).length;

  const incompleteProfiles = users.filter((u) => !u.profile_completed).length;

  const activeUsers = users.filter((u) => u.is_active).length;

  const verifiedUsers = users.filter((u) => u.is_otp_verified).length;

  if (loading) {
    return (
      <Flex justify="center" align="center" h="70vh">
        <VStack spacing={4}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="purple.500" />
          <Text color="gray.700" fontWeight="600">
            Loading Registered Users...
          </Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg="#f4f7fc" p={{ base: 4, md: 8 }}>
      {/* HEADER */}
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        mb={8}
        gap={4}
      >
        <Box>
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="800"
            color="gray.800"
          >
            Registered Users
          </Text>

          <Text color="gray.600" fontSize="md" mt={1}>
            Manage and monitor all platform users
          </Text>
        </Box>

        <Flex
          bg="white"
          px={6}
          py={4}
          borderRadius="2xl"
          align="center"
          gap={4}
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Flex
            w="55px"
            h="55px"
            borderRadius="full"
            bg="purple.100"
            justify="center"
            align="center"
          >
            <Icon as={FiUsers} boxSize={7} color="purple.600" />
          </Flex>

          <Box>
            <Text color="gray.500" fontSize="sm" fontWeight="600">
              Total Registered Users
            </Text>

            <Text fontWeight="800" fontSize="3xl" color="gray.800">
              {count}
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* STATS */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5} mb={8}>
        <Box
          bg="white"
          p={5}
          borderRadius="2xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Stat>
            <HStack justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontWeight="700">
                  Active Users
                </StatLabel>

                <StatNumber color="green.600">{activeUsers}</StatNumber>
              </Box>

              <Flex
                w="50px"
                h="50px"
                borderRadius="xl"
                bg="green.100"
                justify="center"
                align="center"
              >
                <Icon as={FiCheckCircle} boxSize={6} color="green.600" />
              </Flex>
            </HStack>
          </Stat>
        </Box>

        <Box
          bg="white"
          p={5}
          borderRadius="2xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Stat>
            <HStack justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontWeight="700">
                  Verified Users
                </StatLabel>

                <StatNumber color="blue.600">{verifiedUsers}</StatNumber>
              </Box>

              <Flex
                w="50px"
                h="50px"
                borderRadius="xl"
                bg="blue.100"
                justify="center"
                align="center"
              >
                <Icon as={FiShield} boxSize={6} color="blue.600" />
              </Flex>
            </HStack>
          </Stat>
        </Box>

        <Box
          bg="white"
          p={5}
          borderRadius="2xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Stat>
            <HStack justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontWeight="700">
                  Completed Profiles
                </StatLabel>

                <StatNumber color="purple.600">{completedProfiles}</StatNumber>
              </Box>

              <Flex
                w="50px"
                h="50px"
                borderRadius="xl"
                bg="purple.100"
                justify="center"
                align="center"
              >
                <Icon as={FiUser} boxSize={6} color="purple.600" />
              </Flex>
            </HStack>
          </Stat>
        </Box>

        <Box
          bg="white"
          p={5}
          borderRadius="2xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Stat>
            <HStack justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontWeight="700">
                  Incomplete Profiles
                </StatLabel>

                <StatNumber color="orange.500">{incompleteProfiles}</StatNumber>
              </Box>

              <Flex
                w="50px"
                h="50px"
                borderRadius="xl"
                bg="orange.100"
                justify="center"
                align="center"
              >
                <Icon as={FiXCircle} boxSize={6} color="orange.500" />
              </Flex>
            </HStack>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* USERS GRID */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {users.map((u) => {
          const profilePercent = u.profile_completed ? 100 : 45;

          return (
            <GridItem key={u.id}>
              <Box
                bg="white"
                borderRadius="3xl"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.200"
                shadow="sm"
                transition="0.3s"
                _hover={{
                  transform: "translateY(-5px)",
                  shadow: "xl",
                }}
              >
                {/* TOP */}
                <Box
                  bgGradient="linear(to-r, purple.600, blue.500)"
                  p={6}
                  color="white"
                >
                  <Flex justify="space-between" align="start">
                    <HStack spacing={4} align="start">
                      <Avatar
                        size="lg"
                        border="3px solid white"
                        src={
                          u.profile_picture
                            ? `${BASE_URL}${u.profile_picture}`
                            : ""
                        }
                        name={`${u.first_name} ${u.last_name}`}
                      />

                      <Box>
                        <Text fontWeight="800" fontSize="xl" color="white">
                          {u.first_name || "No"} {u.last_name || "Name"}
                        </Text>

                        <Text
                          color="whiteAlpha.900"
                          fontSize="sm"
                          wordBreak="break-word"
                        >
                          User ID :- {u.id}
                        </Text>

                        <Text
                          color="whiteAlpha.900"
                          fontSize="sm"
                          wordBreak="break-word"
                        >
                          {u.email}
                        </Text>
                      </Box>
                    </HStack>

                    <Badge
                      px={3}
                      py={1}
                      borderRadius="full"
                      colorScheme={u.is_active ? "green" : "red"}
                      fontSize="0.75rem"
                    >
                      {u.is_active ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </Flex>
                </Box>

                {/* BODY */}
                <Box p={6}>
                  <VStack spacing={5} align="stretch">
                    {/* USER INFO */}
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="700"
                        color="gray.700"
                        mb={3}
                      >
                        USER INFORMATION
                      </Text>

                      <VStack spacing={3} align="stretch">
                        <Flex
                          justify="space-between"
                          bg="gray.50"
                          p={3}
                          borderRadius="xl"
                        >
                          <HStack>
                            <Icon as={FiPhone} color="green.500" />

                            <Text fontWeight="600" color="gray.700">
                              Phone
                            </Text>
                          </HStack>

                          <Text color="gray.800" fontWeight="700">
                            {u.phone_number || "N/A"}
                          </Text>
                        </Flex>

                        <Flex
                          justify="space-between"
                          bg="gray.50"
                          p={3}
                          borderRadius="xl"
                        >
                          <HStack>
                            <Icon as={FiMail} color="blue.500" />

                            <Text fontWeight="600" color="gray.700">
                              OTP Status
                            </Text>
                          </HStack>

                          <Badge
                            colorScheme={u.is_otp_verified ? "green" : "red"}
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {u.is_otp_verified ? "Verified" : "Not Verified"}
                          </Badge>
                        </Flex>
                      </VStack>
                    </Box>

                    {/* PROFILE COMPLETION */}
                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text fontWeight="700" color="gray.700">
                          Profile Completion
                        </Text>

                        <Text
                          fontWeight="800"
                          color={
                            u.profile_completed ? "green.600" : "orange.500"
                          }
                        >
                          {profilePercent}%
                        </Text>
                      </Flex>

                      <Progress
                        value={profilePercent}
                        colorScheme={u.profile_completed ? "green" : "orange"}
                        borderRadius="full"
                        h="10px"
                        bg="gray.100"
                      />
                    </Box>

                    {/* BADGES */}
                    <Flex wrap="wrap" gap={3}>
                      <Badge
                        colorScheme={u.profile_completed ? "purple" : "orange"}
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontSize="0.8rem"
                      >
                        {u.profile_completed
                          ? "Profile Complete"
                          : "Incomplete Profile"}
                      </Badge>

                      <Badge
                        colorScheme={u.is_staff ? "purple" : "gray"}
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontSize="0.8rem"
                      >
                        {u.is_staff ? "Staff User" : "Normal User"}
                      </Badge>

                      <Badge
                        colorScheme={u.is_superuser ? "red" : "blue"}
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontSize="0.8rem"
                      >
                        {u.is_superuser ? "Super Admin" : "User"}
                      </Badge>
                    </Flex>

                    {/* FOOTER */}
                    <Box pt={4} borderTop="1px solid" borderColor="gray.200">
                      <Text fontSize="sm" color="gray.500" fontWeight="600">
                        Joined On
                      </Text>

                      <Text fontWeight="700" color="gray.800" mt={1}>
                        {new Date(u.created_at).toLocaleString()}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
