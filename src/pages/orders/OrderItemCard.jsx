import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function OrderItemCard({ item }) {
  const product = item.product;

  return (
    <Box
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      overflow="hidden"
      _hover={{
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      }}
      transition="0.3s"
    >
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        spacing={0}
      >
        <Box
          w={{
            base: "100%",
            md: "240px",
          }}
          h={{
            base: "240px",
            md: "220px",
          }}
          bg="gray.100"
        >
          <Image
            src={product?.images?.[0]?.image}
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>

        <Box flex={1} p={6}>
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "1fr auto",
            }}
            gap={6}
          >
            <VStack align="start" spacing={4}>
              <Box>
                <Text fontSize="2xl" fontWeight="800" color="gray.800">
                  {product?.name}
                </Text>

                <Text mt={2} color="gray.500" lineHeight="1.8">
                  {product?.short_description}
                </Text>
              </Box>

              <HStack flexWrap="wrap" gap={2}>
                <Badge colorScheme="purple">
                  {item?.variant_detail?.label}
                </Badge>

                <Badge colorScheme="green">{product?.grade}</Badge>

                <Badge colorScheme="orange">{product?.origin}</Badge>

                <Badge colorScheme="blue">{product?.category}</Badge>

                <Badge colorScheme="pink">{product?.product_type}</Badge>
              </HStack>

              <SimpleGrid
                columns={{
                  base: 1,
                  md: 2,
                }}
                spacing={4}
                w="full"
              >
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Scent
                  </Text>

                  <Text fontWeight="600" color="gray.800">
                    {product?.scent}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Purpose
                  </Text>

                  <Text fontWeight="600" color="gray.800">
                    {product?.purpose}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Sustainability
                  </Text>

                  <Text fontWeight="600" color="gray.800">
                    {product?.sustainability}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Rating
                  </Text>

                  <Text fontWeight="600" color="gray.800">
                    ⭐ {product?.rating}
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>

            <VStack
              align={{
                base: "start",
                lg: "end",
              }}
              spacing={4}
            >
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Unit Price
                </Text>

                <Text fontSize="xl" fontWeight="700" color="gray.800">
                  ₹{Number(item.price).toLocaleString()}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  Variants
                </Text>

                <Text fontSize="xl" fontWeight="700" color="gray.800">
                  {item?.variant_detail?.label}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  Quantity
                </Text>

                <Text fontSize="xl" fontWeight="700" color="gray.800">
                  {item.quantity}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  Total
                </Text>

                <Text fontSize="3xl" fontWeight="800" color="orange.500">
                  ₹
                  {(
                    Number(item.price) * Number(item.quantity)
                  ).toLocaleString()}
                </Text>
              </Box>

              <Button size="sm" colorScheme="orange" borderRadius="xl">
                View Product
              </Button>
            </VStack>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
