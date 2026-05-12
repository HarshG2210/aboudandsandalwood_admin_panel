// src/pages/admin/AdminPendingUsers.jsx

import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  SimpleGrid,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { EmailIcon, SearchIcon, TimeIcon, WarningIcon } from "@chakra-ui/icons";
import {
  fetchPendingUsers,
  selectPendingCount,
  selectPendingLoading,
  selectPendingUsers,
} from "../../store/slices/pendingUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { MdPendingActions } from "react-icons/md";

export default function AdminPendingUsers() {
  const dispatch = useDispatch();

  const users = useSelector(selectPendingUsers);
  const loading = useSelector(selectPendingLoading);
  const count = useSelector(selectPendingCount);

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  // STATS
  const stats = useMemo(() => {
    const suspicious = users.filter((u) => u.otp_resend_count >= 4).length;

    const highResend = users.filter((u) => u.otp_resend_count >= 2).length;

    const totalResends = users.reduce((acc, u) => acc + u.otp_resend_count, 0);

    return {
      suspicious,
      highResend,
      totalResends,
    };
  }, [users]);

  if (loading) {
    return (
      <Flex
        justify="center"
        align="center"
        h="80vh"
        direction="column"
        gap={4}
        bg="#f4f7fc"
      >
        <Spinner size="xl" thickness="4px" color="blue.500" />

        <Text color="gray.700" fontSize="lg" fontWeight="600">
          Loading Pending Users...
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="#f4f7fc"
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
              base: "3xl",
              md: "4xl",
            }}
            fontWeight="bold"
            color="gray.800"
          >
            Pending User Verification
          </Text>

          <Text color="gray.600" mt={2} fontSize="md">
            Manage all users waiting for OTP verification
          </Text>
        </Box>

        <Badge
          px={5}
          py={3}
          borderRadius="full"
          colorScheme="purple"
          fontSize="15px"
        >
          {count} Pending Users
        </Badge>
      </Flex>

      {/* SEARCH */}
      <Box mb={8}>
        <InputGroup maxW="400px">
          <InputLeftElement>
            <SearchIcon color="gray.400" />
          </InputLeftElement>

          <Input
            placeholder="Search pending users..."
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            color="gray.800"
            _placeholder={{
              color: "gray.400",
            }}
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px #3182ce",
            }}
          />
        </InputGroup>
      </Box>

      {/* STATS */}
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 4,
        }}
        spacing={6}
        mb={10}
      >
        {/* TOTAL */}
        <Box
          bg="white"
          p={6}
          borderRadius="24px"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
        >
          <Stat>
            <Flex justify="space-between">
              <Box>
                <StatLabel color="gray.500" fontWeight="600">
                  Total Pending
                </StatLabel>

                <StatNumber color="blue.600" fontSize="3xl">
                  {count}
                </StatNumber>
              </Box>

              <Flex
                h="55px"
                w="55px"
                bg="blue.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <Icon as={MdPendingActions} boxSize={7} color="blue.600" />
              </Flex>
            </Flex>
          </Stat>
        </Box>

        {/* SUSPICIOUS */}
        <Box
          bg="white"
          p={6}
          borderRadius="24px"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
        >
          <Stat>
            <Flex justify="space-between">
              <Box>
                <StatLabel color="gray.500" fontWeight="600">
                  Suspicious Users
                </StatLabel>

                <StatNumber color="red.500" fontSize="3xl">
                  {stats.suspicious}
                </StatNumber>
              </Box>

              <Flex
                h="55px"
                w="55px"
                bg="red.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <WarningIcon boxSize={6} color="red.500" />
              </Flex>
            </Flex>
          </Stat>
        </Box>

        {/* HIGH RESEND */}
        <Box
          bg="white"
          p={6}
          borderRadius="24px"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
        >
          <Stat>
            <Flex justify="space-between">
              <Box>
                <StatLabel color="gray.500" fontWeight="600">
                  High OTP Resend
                </StatLabel>

                <StatNumber color="orange.500" fontSize="3xl">
                  {stats.highResend}
                </StatNumber>
              </Box>

              <Flex
                h="55px"
                w="55px"
                bg="orange.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <TimeIcon boxSize={6} color="orange.500" />
              </Flex>
            </Flex>
          </Stat>
        </Box>

        {/* TOTAL RESENDS */}
        <Box
          bg="white"
          p={6}
          borderRadius="24px"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
        >
          <Stat>
            <Flex justify="space-between">
              <Box>
                <StatLabel color="gray.500" fontWeight="600">
                  Total OTP Resends
                </StatLabel>

                <StatNumber color="purple.600" fontSize="3xl">
                  {stats.totalResends}
                </StatNumber>
              </Box>

              <Flex
                h="55px"
                w="55px"
                bg="purple.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <EmailIcon boxSize={6} color="purple.600" />
              </Flex>
            </Flex>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* USER CARDS */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
        }}
        gap={6}
      >
        {users.map((u) => {
          const suspicious = u.otp_resend_count >= 4;

          return (
            <GridItem key={u.id}>
              <Box
                bg="white"
                borderRadius="28px"
                overflow="hidden"
                boxShadow="lg"
                border="1px solid"
                borderColor={suspicious ? "red.200" : "gray.100"}
                transition="0.3s"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                }}
              >
                {/* TOP BAR */}
                <Box h="10px" bg={suspicious ? "red.400" : "blue.400"} />

                <Box p={6}>
                  {/* USER HEADER */}
                  <Flex
                    justify="space-between"
                    align="start"
                    mb={5}
                    gap={4}
                    flexWrap="wrap"
                  >
                    <HStack spacing={4}>
                      <Avatar
                        name={u.email}
                        bg={suspicious ? "red.400" : "blue.500"}
                        color="white"
                      />

                      <Box>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="gray.800"
                          wordBreak="break-word"
                        >
                          {u.email}
                        </Text>

                        <Text color="gray.500" fontSize="sm" mt={1}>
                          User ID: #{u.id}
                        </Text>
                      </Box>
                    </HStack>

                    <VStack align="end" spacing={2}>
                      <Badge
                        colorScheme={suspicious ? "red" : "orange"}
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="12px"
                      >
                        OTP Resent: {u.otp_resend_count}
                      </Badge>

                      {suspicious && (
                        <Badge
                          colorScheme="red"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="12px"
                        >
                          Suspicious Activity
                        </Badge>
                      )}
                    </VStack>
                  </Flex>

                  <Divider mb={5} />

                  {/* DETAILS */}
                  <VStack align="stretch" spacing={4}>
                    {/* CREATED */}
                    <Flex justify="space-between" flexWrap="wrap" gap={2}>
                      <Text color="gray.500" fontWeight="600">
                        Account Created
                      </Text>

                      <Text color="gray.800" fontWeight="600">
                        {new Date(u.created_at).toLocaleString()}
                      </Text>
                    </Flex>

                    {/* OTP CREATED */}
                    <Flex justify="space-between" flexWrap="wrap" gap={2}>
                      <Text color="gray.500" fontWeight="600">
                        OTP Generated
                      </Text>

                      <Text color="gray.800" fontWeight="600">
                        {new Date(u.otp_created_at).toLocaleString()}
                      </Text>
                    </Flex>

                    {/* OTP LEVEL */}
                    <Box pt={2}>
                      <Flex justify="space-between" mb={2}>
                        <Text color="gray.600" fontWeight="600">
                          OTP Activity Level
                        </Text>

                        <Text
                          color={suspicious ? "red.500" : "orange.500"}
                          fontWeight="700"
                        >
                          {u.otp_resend_count}/5
                        </Text>
                      </Flex>

                      <Progress
                        value={(u.otp_resend_count / 5) * 100}
                        borderRadius="full"
                        colorScheme={suspicious ? "red" : "orange"}
                        bg="gray.100"
                        h="10px"
                      />
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
