import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiBox,
  FiClock,
  FiShoppingBag,
  FiTrendingUp,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../store/slices/ordersSlice";
import { fetchPendingUsers } from "../store/slices/pendingUserSlice";
import { fetchProducts } from "../store/slices/productSlice";
import { fetchRegisteredUsers } from "../store/slices/registeredUserSlice";
import { useEffect } from "react";

// COLORS
const COLORS = ["#7C3AED", "#2563EB", "#059669", "#DC2626", "#F59E0B"];

export default function AdminHome() {
  const dispatch = useDispatch();
  // ================= STORE DATA =================
  const products = useSelector((s) => s.product.products || []);
  const orders = useSelector((s) => s.orders?.orders || []);
  const users = useSelector((s) => s.registeredUsers?.users || []);
  const pendingUsers = useSelector((s) => s.pendingUsers?.users || []);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchRegisteredUsers());
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  // ================= SUMMARY =================
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalPending = pendingUsers.length;

  // ================= ORDER STATUS =================
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;

  // ================= DUMMY REVENUE =================
  const revenueData = [
    { day: "Mon", revenue: 4000 },
    { day: "Tue", revenue: 5200 },
    { day: "Wed", revenue: 3900 },
    { day: "Thu", revenue: 6500 },
    { day: "Fri", revenue: 7200 },
    { day: "Sat", revenue: 8300 },
    { day: "Sun", revenue: 6900 },
  ];

  // ================= PIE DATA =================
  const orderStatusData = [
    {
      name: "Pending",
      value: pendingOrders,
    },
    {
      name: "Completed",
      value: completedOrders,
    },
  ];

  const userStatusData = [
    {
      name: "Registered",
      value: totalUsers,
    },
    {
      name: "Pending",
      value: totalPending,
    },
  ];

  // ================= RECENT USERS =================
  const latestUsers = [...users]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <Box minH="100vh" bg="#f4f7fb" p={{ base: 4, md: 8 }}>
      {/* ================= HERO ================= */}
      <Box
        bgGradient="linear(to-r, #4F46E5, #7C3AED)"
        borderRadius="3xl"
        p={{ base: 6, md: 10 }}
        color="white"
        mb={8}
        position="relative"
        overflow="hidden"
      >
        <Flex
          justify="space-between"
          align={{ base: "start", lg: "center" }}
          direction={{ base: "column", lg: "row" }}
          gap={8}
        >
          <Box>
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              lineHeight="1.1"
            >
              Admin Dashboard
            </Text>

            <Text mt={3} fontSize="lg" color="whiteAlpha.900" maxW="600px">
              Monitor products, users, orders and platform analytics in one
              beautiful dashboard.
            </Text>

            <HStack mt={6} spacing={4} flexWrap="wrap">
              <Badge
                px={4}
                py={2}
                borderRadius="full"
                bg="whiteAlpha.300"
                color="white"
                fontSize="0.9rem"
              >
                🚀 Live Analytics
              </Badge>

              <Badge
                px={4}
                py={2}
                borderRadius="full"
                bg="whiteAlpha.300"
                color="white"
                fontSize="0.9rem"
              >
                📦 Inventory Tracking
              </Badge>

              <Badge
                px={4}
                py={2}
                borderRadius="full"
                bg="whiteAlpha.300"
                color="white"
                fontSize="0.9rem"
              >
                👥 User Management
              </Badge>
            </HStack>
          </Box>

          <Flex
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
            p={6}
            borderRadius="2xl"
            minW="250px"
            justify="center"
            align="center"
            direction="column"
          >
            <Icon as={FiTrendingUp} boxSize={14} mb={4} color="white" />

            <Text fontSize="lg" fontWeight="700">
              Platform Growth
            </Text>

            <Text fontSize="5xl" fontWeight="900" mt={2}>
              +24%
            </Text>

            <Text color="whiteAlpha.900">Compared to last month</Text>
          </Flex>
        </Flex>
      </Box>

      {/* ================= STATS ================= */}
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={6} mb={8}>
        <DashboardCard
          title="Total Products"
          value={totalProducts}
          help="Inventory items"
          icon={FiBox}
          color="purple"
        />

        <DashboardCard
          title="Total Orders"
          value={totalOrders}
          help="All customer orders"
          icon={FiShoppingBag}
          color="blue"
        />

        <DashboardCard
          title="Registered Users"
          value={totalUsers}
          help="Platform users"
          icon={FiUsers}
          color="green"
        />

        <DashboardCard
          title="Pending Users"
          value={totalPending}
          help="Need verification"
          icon={FiClock}
          color="orange"
        />
      </SimpleGrid>

      {/* ================= MAIN GRID ================= */}
      <Grid
        templateColumns={{
          base: "1fr",
          xl: "2fr 1fr",
        }}
        gap={8}
        mb={8}
      >
        {/* REVENUE CHART */}
        <GridItem>
          <Box
            bg="white"
            borderRadius="3xl"
            p={6}
            shadow="sm"
            border="1px solid"
            borderColor="gray.200"
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Text fontSize="2xl" fontWeight="800" color="gray.800">
                  Revenue Analytics
                </Text>

                <Text color="gray.500">Weekly business performance</Text>
              </Box>

              <Badge colorScheme="green" px={4} py={2} borderRadius="full">
                +18.2%
              </Badge>
            </Flex>

            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7C3AED"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </GridItem>

        {/* ORDER STATUS */}
        <GridItem>
          <Box
            bg="white"
            borderRadius="3xl"
            p={6}
            shadow="sm"
            border="1px solid"
            borderColor="gray.200"
            h="100%"
          >
            <Text fontSize="2xl" fontWeight="800" color="gray.800" mb={1}>
              Orders Status
            </Text>

            <Text color="gray.500" mb={6}>
              Pending vs completed orders
            </Text>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  outerRadius={90}
                  innerRadius={55}
                  paddingAngle={5}
                  label
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <VStack spacing={4} mt={4}>
              <ProgressCard
                title="Completed Orders"
                value={completedOrders}
                total={totalOrders}
                color="green"
              />

              <ProgressCard
                title="Pending Orders"
                value={pendingOrders}
                total={totalOrders}
                color="orange"
              />
            </VStack>
          </Box>
        </GridItem>
      </Grid>

      {/* ================= BOTTOM GRID ================= */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr",
        }}
        gap={8}
      >
        {/* USERS CHART */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={6}
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Text fontSize="2xl" fontWeight="800" color="gray.800" mb={1}>
            User Analytics
          </Text>

          <Text color="gray.500" mb={6}>
            Registered vs pending users
          </Text>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={userStatusData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {userStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index + 1]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* RECENT USERS */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={6}
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Text fontSize="2xl" fontWeight="800" color="gray.800">
                Recent Users
              </Text>

              <Text color="gray.500">Latest registered accounts</Text>
            </Box>

            <Badge colorScheme="purple" px={4} py={2} borderRadius="full">
              {latestUsers.length} New
            </Badge>
          </Flex>

          <VStack spacing={4} align="stretch">
            {latestUsers.map((user) => (
              <Flex
                key={user.id}
                justify="space-between"
                align="center"
                p={4}
                bg="gray.50"
                borderRadius="2xl"
                transition="0.3s"
                _hover={{
                  bg: "purple.50",
                  transform: "translateY(-2px)",
                }}
              >
                <HStack spacing={4}>
                  <Flex
                    w="50px"
                    h="50px"
                    borderRadius="full"
                    bg="purple.100"
                    justify="center"
                    align="center"
                  >
                    <Icon as={FiUser} boxSize={6} color="purple.600" />
                  </Flex>

                  <Box>
                    <Text fontWeight="700" color="gray.800">
                      {user.first_name || "New"} {user.last_name || "User"}
                    </Text>

                    <Text fontSize="sm" color="gray.500">
                      {user.email}
                    </Text>
                  </Box>
                </HStack>

                <Badge
                  colorScheme={user.profile_completed ? "green" : "orange"}
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {user.profile_completed ? "Completed" : "Incomplete"}
                </Badge>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}

// ================= DASHBOARD CARD =================
function DashboardCard({ title, value, help, icon, color }) {
  return (
    <Box
      bg="white"
      borderRadius="3xl"
      p={6}
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      transition="0.3s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
    >
      <Flex justify="space-between" align="start">
        <Stat>
          <StatLabel color="gray.500" fontWeight="700" fontSize="md">
            {title}
          </StatLabel>

          <StatNumber fontSize="4xl" fontWeight="900" color="gray.800" mt={2}>
            {value}
          </StatNumber>

          <StatHelpText color="gray.500" fontSize="sm">
            {help}
          </StatHelpText>
        </Stat>

        <Flex
          w="65px"
          h="65px"
          borderRadius="2xl"
          bg={`${color}.100`}
          justify="center"
          align="center"
        >
          <Icon as={icon} boxSize={8} color={`${color}.600`} />
        </Flex>
      </Flex>
    </Box>
  );
}

// ================= PROGRESS CARD =================
function ProgressCard({ title, value, total, color }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <Box w="100%" bg="gray.50" p={4} borderRadius="2xl">
      <Flex justify="space-between" mb={2}>
        <Text fontWeight="700" color="gray.700">
          {title}
        </Text>

        <Text fontWeight="800" color={`${color}.600`}>
          {value}
        </Text>
      </Flex>

      <Progress
        value={percentage}
        colorScheme={color}
        borderRadius="full"
        h="10px"
      />
    </Box>
  );
}
