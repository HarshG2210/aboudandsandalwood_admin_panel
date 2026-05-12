import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Hide,
  Icon,
  IconButton,
  Show,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiBox,
  FiClock,
  FiHome,
  FiMenu,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { memo, useMemo } from "react";

const menu = [
  { path: "/admin/dashboard", label: "Dashboard", icon: FiHome },
  { path: "/admin/users", label: "Users", icon: FiUsers },
  { path: "/admin/pending-users", label: "Pending Users", icon: FiClock },
  { path: "/admin/products", label: "Products", icon: FiBox },
  { path: "/admin/orders", label: "Orders", icon: FiShoppingCart },
  { path: "/admin/stock", label: "Stock", icon: FiTrendingUp },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // 🔥 memoized menu for smooth rendering
  const renderedMenu = useMemo(
    () =>
      menu.map((item) => (
        <SidebarItem
          key={item.path}
          item={item}
          isActive={location.pathname === item.path}
          navigate={navigate}
          onClose={onClose}
        />
      )),
    [location.pathname, navigate]
  );

  return (
    <Flex h="100vh" overflow="hidden" bg="#F4F7FE">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <Hide below="lg">
        <Box
          w="280px"
          bg="#111827"
          color="white"
          p={6}
          borderRight="1px solid"
          borderColor="gray.700"
          position="fixed"
          left="0"
          top="0"
          h="100vh"
          overflowY="auto"
        >
          <SidebarContent renderedMenu={renderedMenu} />
        </Box>
      </Hide>

      {/* ================= MOBILE HEADER ================= */}
      <Show below="lg">
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex="1000"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200"
          px={4}
          py={3}
        >
          <Flex align="center" justify="space-between">
            <HStack spacing={3}>
              <IconButton
                icon={<FiMenu />}
                onClick={onOpen}
                aria-label="menu"
                bg="#111827"
                color="white"
                _hover={{ bg: "#1F2937" }}
              />

              <Text fontSize="xl" fontWeight="bold" color="#111827">
                Admin Panel
              </Text>
            </HStack>

            <Avatar size="sm" name="Admin" />
          </Flex>
        </Box>

        {/* MOBILE DRAWER */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="#111827" color="white">
            <DrawerCloseButton />

            <DrawerHeader borderBottom="1px solid #2D3748">
              Admin Panel
            </DrawerHeader>

            <DrawerBody mt={4}>
              <VStack spacing={3} align="stretch">
                {renderedMenu}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        flex="1"
        ml={{ base: 0, lg: "280px" }}
        pt={{ base: "80px", lg: "0px" }}
        overflowY="auto"
        h="100vh"
        sx={{
          scrollBehavior: "smooth",
        }}
      >
        {/* PAGE CONTENT */}
        <Box
          p={{ base: 4, md: 8 }}
          minH="calc(100vh - 90px)"
          animation="fadeIn 0.2s ease"
        >
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

/* ================= SIDEBAR CONTENT ================= */

const SidebarContent = memo(({ renderedMenu }) => {
  return (
    <>
      <Flex align="center" mb={10}>
        <Box
          w="50px"
          h="50px"
          borderRadius="xl"
          bg="linear-gradient(135deg, #D4AF37, #F6E27A)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr={3}
        >
          <Text color="black" fontWeight="900" fontSize="lg">
            A
          </Text>
        </Box>

        <Box>
          <Text fontSize="2xl" fontWeight="800">
            Admin
          </Text>

          <Text fontSize="sm" color="gray.400">
            Dashboard Panel
          </Text>
        </Box>
      </Flex>

      <VStack align="stretch" spacing={2}>
        {renderedMenu}
      </VStack>
    </>
  );
});

/* ================= SIDEBAR ITEM ================= */

const SidebarItem = memo(({ item, isActive, navigate, onClose }) => {
  return (
    <HStack
      spacing={4}
      px={4}
      py={4}
      borderRadius="xl"
      cursor="pointer"
      transition="all 0.2s ease"
      bg={
        isActive ? "linear-gradient(135deg, #D4AF37, #F6E27A)" : "transparent"
      }
      color={isActive ? "black" : "gray.300"}
      _hover={{
        bg: isActive ? "linear-gradient(135deg, #D4AF37, #F6E27A)" : "#1F2937",
        color: "white",
        transform: "translateX(4px)",
      }}
      onClick={() => {
        navigate(item.path);
        onClose?.();
      }}
    >
      <Icon as={item.icon} boxSize={5} />

      <Text fontWeight={isActive ? "700" : "500"} fontSize="md">
        {item.label}
      </Text>
    </HStack>
  );
});
