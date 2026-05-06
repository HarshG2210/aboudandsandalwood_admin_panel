import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import ProductImageManager from "./ProductImageManager";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function ProductImageList({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Separate products by category
  const agarwoodProducts = products
    .filter((p) => p.category === "AGARWOOD")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const sandalwoodProducts = products
    .filter((p) => p.category === "SANDALWOOD")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderProductCard = (p) => {
    const img = p.images?.[0]?.image || null;
    const hasImages = p.images && p.images.length > 0;
    const prices = p.variants?.map((v) => Number(v.price)) || [];
    const minPrice = prices.length ? Math.min(...prices) : 0;

    return (
      <Box
        key={p.id}
        bg="white"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="md"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-6px)",
          boxShadow: "xl",
        }}
      >
        {/* Image */}
        {hasImages && (
          <Box position="relative">
            <Image
              src={img}
              alt={p.name}
              w="100%"
              h="180px"
              objectFit="cover"
            />
            <Badge
              position="absolute"
              top={3}
              right={3}
              colorScheme="green"
              px={3}
              py={0.5}
              borderRadius="full"
              fontSize="xs"
            >
              {p.images.length} Photos
            </Badge>
          </Box>
        )}

        {/* Content */}
        <VStack align="stretch" p={5} spacing={4}>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="gray.800"
              noOfLines={2}
              lineHeight="tight"
            >
              {p.name}
            </Text>
            <Text color="gray.500" fontSize="sm" mt={1}>
              {p.category} • {p.subcategory || "—"}
            </Text>
          </Box>

          {/* Rating & Date */}
          <HStack justify="space-between" align="center">
            <HStack>
              <Flex align="center" gap={0.5}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    boxSize={3.5}
                    color={
                      i < Math.floor(p.rating || 0) ? "yellow.400" : "gray.300"
                    }
                  />
                ))}
              </Flex>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                {p.rating || "—"}
              </Text>
            </HStack>
            <Text fontSize="xs" color="gray.500" textAlign="right">
              {formatDateTime(p.created_at)}
            </Text>
          </HStack>

          {/* Key Info */}
          <SimpleGrid columns={2} spacing={4} fontSize="sm">
            <Box>
              <Text color="gray.500" fontSize="xs">
                Type
              </Text>
              <Text fontWeight="medium">{p.product_type}</Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="xs">
                Origin
              </Text>
              <Text fontWeight="medium">{p.origin}</Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="xs">
                Beads
              </Text>
              <Text fontWeight="medium">
                {p.bead_count ? `${p.bead_count} × ${p.bead_size}mm` : "—"}
              </Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="xs">
                Starts at
              </Text>
              <Text fontWeight="bold" color="green.600">
                ₹{minPrice}
              </Text>
            </Box>
          </SimpleGrid>

          {/* Variants & Stock */}
          <HStack justify="space-between" fontSize="xs" pt={1}>
            <Badge colorScheme="blue" variant="subtle" px={3} py={1}>
              {p.variants?.length || 0} Variants
            </Badge>
            <Text
              color={
                p.variants?.some((v) => v.stock <= (v.low_stock_threshold || 0))
                  ? "red.500"
                  : "green.500"
              }
              fontWeight="medium"
            >
              {p.variants?.some((v) => v.stock <= (v.low_stock_threshold || 0))
                ? "Low Stock"
                : "In Stock"}
            </Text>
          </HStack>

          {/* Action Button */}
          <Button
            colorScheme={hasImages ? "blue" : "green"}
            onClick={() => {
              setSelectedProduct(p);
              setIsOpen(true);
            }}
          >
            {hasImages ? "Manage Images" : "Add Images"}
          </Button>
        </VStack>
      </Box>
    );
  };

  return (
    <Box p={{ base: 6, lg: 8 }} bg="gray.50" minH="100vh">
      <Flex justify="space-between" align="center" mb={8}>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="gray.800"
        >
          Product Images Management
        </Text>
        <Text color="gray.500" fontSize="sm">
          Total {products.length} Products
        </Text>
      </Flex>

      {/* ================= AGARWOOD SECTION ================= */}
      <Box mb={12}>
        <Heading size="lg" mb={6} color="teal.700">
          Agarwood Products ({agarwoodProducts.length})
        </Heading>
        {agarwoodProducts.length === 0 ? (
          <Text color="gray.500">No Agarwood products found.</Text>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
            gap={6}
          >
            {agarwoodProducts.map(renderProductCard)}
          </Grid>
        )}
      </Box>

      {/* ================= SANDALWOOD SECTION ================= */}
      <Box>
        <Heading size="lg" mb={6} color="orange.700">
          Sandalwood Products ({sandalwoodProducts.length})
        </Heading>
        {sandalwoodProducts.length === 0 ? (
          <Text color="gray.500">No Sandalwood products found.</Text>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
            gap={6}
          >
            {sandalwoodProducts.map(renderProductCard)}
          </Grid>
        )}
      </Box>

      {/* Image Manager Modal */}
      {selectedProduct && (
        <ProductImageManager
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          product={selectedProduct}
        />
      )}
    </Box>
  );
}
