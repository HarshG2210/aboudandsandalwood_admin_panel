import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPackage, FiUpload } from "react-icons/fi";
import {
  createFakeReview,
  fetchAdminReviews,
} from "../../store/slices/adminReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AdminFakeReviews() {
  const dispatch = useDispatch();

  const {
    reviews = [],
    total = 0,
    verified = 0,
    fake = 0,
    creating,
    loading,
  } = useSelector((s) => s.adminReviews || {});

  const [productId, setProductId] = useState("");
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchAdminReviews());
  }, [dispatch]);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("user", user);
    formData.append("rating", rating);
    formData.append("title", title);
    formData.append("description", description);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await dispatch(
        createFakeReview({
          productId,
          data: formData,
        })
      ).unwrap();

      setProductId("");
      setUser("");
      setRating(5);
      setTitle("");
      setDescription("");
      setImages([]);

      dispatch(fetchAdminReviews());
    } catch (err) {
      console.log(err);
    }
  };

  const bg = useColorModeValue("#f7f7f5", "#111111");
  const cardBg = useColorModeValue("white", "#1A1A1A");

  const inputStyles = {
    color: "gray.800",
    bg: "white",
    borderColor: "gray.300",
    _placeholder: {
      color: "gray.400",
    },
    _focus: {
      borderColor: "purple.400",
      boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
    },
  };

  return (
    <Box bg={bg} minH="100vh" p={{ base: 4, md: 8 }} color="gray.800">
      {/* HEADER */}
      <Box mb={8}>
        <Text
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="black"
          bgGradient="linear(to-r, purple.500, pink.500)"
          bgClip="text"
        >
          Review Management
        </Text>

        <Text color="gray.500" mt={2}>
          Manage reviews beautifully from your admin panel.
        </Text>
      </Box>

      {/* STATS */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={8}>
        <Box
          bgGradient="linear(to-r, purple.500, purple.600)"
          color="white"
          p={6}
          borderRadius="2xl"
          boxShadow="xl"
        >
          <Text fontSize="sm" opacity={0.9}>
            Total Reviews
          </Text>

          <Text fontSize="4xl" fontWeight="black">
            {total}
          </Text>
        </Box>

        <Box
          bgGradient="linear(to-r, green.400, green.500)"
          color="white"
          p={6}
          borderRadius="2xl"
          boxShadow="xl"
        >
          <Text fontSize="sm" opacity={0.9}>
            Verified Reviews
          </Text>

          <Text fontSize="4xl" fontWeight="black">
            {verified}
          </Text>
        </Box>

        <Box
          bgGradient="linear(to-r, pink.500, red.500)"
          color="white"
          p={6}
          borderRadius="2xl"
          boxShadow="xl"
        >
          <Text fontSize="sm" opacity={0.9}>
            Fake Reviews
          </Text>

          <Text fontSize="4xl" fontWeight="black">
            {fake}
          </Text>
        </Box>
      </SimpleGrid>

      {/* TABS */}
      <Tabs variant="unstyled">
        <TabList mb={8} gap={4} flexWrap="wrap">
          <Tab
            px={8}
            py={3}
            borderRadius="full"
            bg="white"
            color="gray.700"
            fontWeight="bold"
            border="1px solid"
            borderColor="gray.200"
            _selected={{
              bg: "purple.500",
              color: "white",
              borderColor: "purple.500",
              boxShadow: "lg",
            }}
          >
            Create Review
          </Tab>

          <Tab
            px={8}
            py={3}
            borderRadius="full"
            bg="white"
            color="gray.700"
            fontWeight="bold"
            border="1px solid"
            borderColor="gray.200"
            _selected={{
              bg: "black",
              color: "white",
              borderColor: "black",
              boxShadow: "lg",
            }}
          >
            All Reviews
          </Tab>
        </TabList>

        <TabPanels>
          {/* ========================================= */}
          {/* CREATE TAB */}
          {/* ========================================= */}
          <TabPanel p={0}>
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
              {/* FORM */}
              <Box
                bg={cardBg}
                p={{ base: 5, md: 8 }}
                borderRadius="3xl"
                boxShadow="2xl"
                border="1px solid"
                borderColor="gray.100"
              >
                <VStack align="stretch" spacing={6}>
                  <Box>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color={useColorModeValue("gray.800", "white")}
                    >
                      Create Fake Review
                    </Text>

                    <Text color="gray.500" mt={1}>
                      Create beautiful custom reviews.
                    </Text>
                  </Box>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    <Box>
                      <Text
                        mb={2}
                        fontWeight="semibold"
                        color={useColorModeValue("gray.700", "gray.200")}
                      >
                        Product ID
                      </Text>

                      <Input
                        placeholder="Enter product id"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        size="lg"
                        borderRadius="xl"
                        {...inputStyles}
                      />
                    </Box>

                    <Box>
                      <Text
                        mb={2}
                        fontWeight="semibold"
                        color={useColorModeValue("gray.700", "gray.200")}
                      >
                        User ID
                      </Text>

                      <Input
                        placeholder="Enter user id"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        size="lg"
                        borderRadius="xl"
                        {...inputStyles}
                      />
                    </Box>
                  </SimpleGrid>

                  <Box>
                    <Text
                      mb={2}
                      fontWeight="semibold"
                      color={useColorModeValue("gray.700", "gray.200")}
                    >
                      Rating
                    </Text>

                    <Select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      size="lg"
                      borderRadius="xl"
                      {...inputStyles}
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r} Star
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <Text
                      mb={2}
                      fontWeight="semibold"
                      color={useColorModeValue("gray.700", "gray.200")}
                    >
                      Review Title
                    </Text>

                    <Input
                      placeholder="Amazing product..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      size="lg"
                      borderRadius="xl"
                      {...inputStyles}
                    />
                  </Box>

                  <Box>
                    <Text
                      mb={2}
                      fontWeight="semibold"
                      color={useColorModeValue("gray.700", "gray.200")}
                    >
                      Description
                    </Text>

                    <Textarea
                      rows={6}
                      placeholder="Write detailed review..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      borderRadius="xl"
                      {...inputStyles}
                    />
                  </Box>

                  {/* IMAGE INPUT */}
                  <Box>
                    <Text
                      mb={3}
                      fontWeight="semibold"
                      color={useColorModeValue("gray.700", "gray.200")}
                    >
                      Upload Images
                    </Text>

                    <Box
                      as="label"
                      htmlFor="review-images"
                      display="block"
                      border="2px dashed"
                      borderColor="purple.200"
                      borderRadius="2xl"
                      p={8}
                      textAlign="center"
                      bg={useColorModeValue("purple.50", "gray.800")}
                      position="relative"
                      cursor="pointer"
                      transition="0.2s"
                      _hover={{
                        borderColor: "purple.400",
                        bg: useColorModeValue("purple.100", "gray.700"),
                        transform: "translateY(-2px)",
                      }}
                    >
                      <Input
                        id="review-images"
                        type="file"
                        multiple
                        accept="image/*"
                        display="none"
                        onChange={(e) => setImages(Array.from(e.target.files))}
                      />

                      <VStack spacing={3} pointerEvents="none">
                        <Icon as={FiUpload} boxSize={10} color="purple.500" />

                        <Text
                          fontWeight="bold"
                          color={useColorModeValue("gray.700", "white")}
                        >
                          Click anywhere to upload images
                        </Text>

                        <Text
                          fontSize="sm"
                          color={useColorModeValue("gray.500", "gray.300")}
                        >
                          PNG, JPG, JPEG, WEBP
                        </Text>
                      </VStack>
                    </Box>

                    {/* PREVIEW */}
                    {images.length > 0 && (
                      <Wrap mt={4} spacing={4}>
                        {images.map((img, index) => (
                          <WrapItem key={index}>
                            <Box position="relative">
                              <Image
                                src={URL.createObjectURL(img)}
                                boxSize="90px"
                                objectFit="cover"
                                borderRadius="xl"
                                border="2px solid"
                                borderColor="whiteAlpha.400"
                                boxShadow="lg"
                              />
                            </Box>
                          </WrapItem>
                        ))}
                      </Wrap>
                    )}
                  </Box>

                  <Button
                    size="lg"
                    borderRadius="xl"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    color="white"
                    _hover={{
                      opacity: 0.9,
                      transform: "translateY(-2px)",
                    }}
                    onClick={handleSubmit}
                    isLoading={creating}
                  >
                    Submit Review
                  </Button>
                </VStack>
              </Box>

              {/* LIVE PREVIEW */}
              <Box
                bg={cardBg}
                borderRadius="3xl"
                p={8}
                boxShadow="2xl"
                border="1px solid"
                borderColor="gray.100"
              >
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={6}
                  color={useColorModeValue("gray.800", "white")}
                >
                  Live Preview
                </Text>

                <Box
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="2xl"
                  p={6}
                >
                  <HStack justify="space-between" align="start">
                    <HStack align="start">
                      <Avatar name={title || "User"} />

                      <Box>
                        <Text
                          fontWeight="bold"
                          color={useColorModeValue("gray.800", "white")}
                        >
                          User #{user || "0"}
                        </Text>

                        <Text fontSize="sm" color="gray.500">
                          Product #{productId || "0"}
                        </Text>
                      </Box>
                    </HStack>

                    <Badge
                      colorScheme="yellow"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      ⭐ {rating}
                    </Badge>
                  </HStack>

                  <Divider my={5} />

                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    color={useColorModeValue("gray.800", "white")}
                  >
                    {title || "Review title"}
                  </Text>

                  <Text mt={3} color="gray.600" lineHeight="1.8">
                    {description ||
                      "Review description preview will appear here..."}
                  </Text>

                  {images.length > 0 && (
                    <Wrap mt={5}>
                      {images.map((img, index) => (
                        <WrapItem key={index}>
                          <Image
                            src={URL.createObjectURL(img)}
                            boxSize="80px"
                            objectFit="cover"
                            borderRadius="lg"
                          />
                        </WrapItem>
                      ))}
                    </Wrap>
                  )}
                </Box>
              </Box>
            </Grid>
          </TabPanel>

          {/* ========================================= */}
          {/* REVIEWS TAB */}
          {/* ========================================= */}
          <TabPanel p={0}>
            <VStack spacing={5} align="stretch">
              {loading ? (
                <Text color="gray.600">Loading reviews...</Text>
              ) : (
                reviews.map((r) => (
                  <Box
                    key={r.id}
                    bg={cardBg}
                    p={{ base: 5, md: 7 }}
                    borderRadius="3xl"
                    boxShadow="xl"
                    border="1px solid"
                    borderColor="gray.100"
                    transition="0.3s"
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "2xl",
                    }}
                  >
                    {/* TOP */}
                    <HStack
                      justify="space-between"
                      align="start"
                      flexWrap="wrap"
                      gap={4}
                    >
                      <HStack align="start" spacing={4}>
                        <Avatar name={r.user_detail.username} size="md" />

                        <Box>
                          <Text
                            fontWeight="bold"
                            fontSize="lg"
                            color="gray.800"
                          >
                            {r.user_detail.username}
                          </Text>

                          <Text color="gray.500" fontSize="sm">
                            {r.user_detail.email}
                          </Text>

                          <HStack mt={2}>
                            <Badge
                              colorScheme={
                                r.is_admin_created ? "purple" : "green"
                              }
                              px={3}
                              py={1}
                              borderRadius="full"
                            >
                              {r.review_origin}
                            </Badge>

                            {r.is_verified_purchase && (
                              <Badge
                                colorScheme="green"
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                Verified
                              </Badge>
                            )}
                          </HStack>
                        </Box>
                      </HStack>

                      <Badge
                        colorScheme="yellow"
                        fontSize="md"
                        px={4}
                        py={2}
                        borderRadius="full"
                      >
                        ⭐ {r.rating}/5
                      </Badge>
                    </HStack>

                    <Divider my={5} />

                    {/* PRODUCT */}
                    <HStack mb={4}>
                      <Icon as={FiPackage} color="purple.500" />

                      <Text fontWeight="bold" color="purple.600">
                        {r.product_name}
                      </Text>
                    </HStack>

                    {/* TITLE */}
                    <Text fontSize="xl" fontWeight="bold" color="gray.800">
                      {r.title}
                    </Text>

                    {/* DESC */}
                    <Text mt={3} color="gray.800" lineHeight="1.9">
                      {r.description}
                    </Text>

                    {/* IMAGES */}
                    {r.images?.length > 0 && (
                      <Wrap mt={6}>
                        {r.images.map((img) => (
                          <WrapItem key={img.id}>
                            <Image
                              src={img.image}
                              boxSize={{
                                base: "90px",
                                md: "130px",
                              }}
                              objectFit="cover"
                              borderRadius="2xl"
                              border="1px solid #eee"
                            />
                          </WrapItem>
                        ))}
                      </Wrap>
                    )}

                    {/* FOOTER */}
                    <HStack mt={6} justify="space-between" flexWrap="wrap">
                      <Text fontSize="sm" color="gray.400">
                        Review ID: #{r.id}
                      </Text>

                      <Text fontSize="sm" color="gray.400">
                        {new Date(r.created_at).toLocaleString()}
                      </Text>
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
