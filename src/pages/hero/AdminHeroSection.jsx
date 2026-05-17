import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  Spinner,
  Switch,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCheckCircle, FiImage, FiSave, FiUploadCloud } from "react-icons/fi";
import { editHero, fetchHeroSections } from "../../store/slices/heroSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const types = ["BRACELET", "OIL", "MALA", "CHIPS", "POWDER"];

const createInitialItems = (data) =>
  Array.from({ length: 10 }, (_, i) => {
    const index = i + 1;

    return {
      image: null,
      preview: data?.[`image${index}`] || "",
      product_type: data?.[`product_type${index}`] || "",
      is_active: data?.[`is_active${index}`] || false,
    };
  });

export default function AdminHeroSection() {
  const dispatch = useDispatch();

  const { loading, updating, data } = useSelector((s) => s.hero);

  // ==========================================
  // COLORS
  // ==========================================

  const bg = useColorModeValue("#f6f7fb", "#0f1117");

  const cardBg = useColorModeValue("white", "#161a22");

  const borderColor = useColorModeValue("#e9edf5", "#2a2f3a");

  const textColor = useColorModeValue("#111827", "white");

  const muted = useColorModeValue("#6b7280", "#a1a1aa");

  const selectBg = useColorModeValue("white", "#1b2028");

  // ==========================================
  // STATE
  // ==========================================

  const [items, setItems] = useState(createInitialItems());

  // ==========================================
  // FETCH HERO
  // ==========================================

  useEffect(() => {
    dispatch(fetchHeroSections());
  }, [dispatch]);

  // ==========================================
  // SYNC API DATA
  // ==========================================

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line
      setItems(createInitialItems(data));
    }
  }, [data]);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        // IMAGE
        if (field === "image") {
          return {
            ...item,
            image: value,
            preview: URL.createObjectURL(value),
          };
        }

        // OTHER
        return {
          ...item,
          [field]: value,
        };
      })
    );
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async () => {
    const formData = new FormData();

    items.forEach((item, i) => {
      const index = i + 1;

      // IMAGE
      if (item.image instanceof File) {
        formData.append(`image${index}`, item.image);
      }

      // PRODUCT TYPE
      formData.append(`product_type${index}`, item.product_type || "");

      // ACTIVE
      formData.append(`is_active${index}`, item.is_active ? "true" : "false");
    });

    try {
      await dispatch(editHero(formData)).unwrap();

      dispatch(fetchHeroSections());
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // LOADER
  // ==========================================

  if (loading) {
    return (
      <Flex h="80vh" align="center" justify="center">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Box bg={bg} minH="100vh" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
      {/* ==========================================
          HEADER
      ========================================== */}

      <Flex
        mb={10}
        justify="space-between"
        align={{ base: "start", xl: "center" }}
        direction={{ base: "column", xl: "row" }}
        gap={5}
      >
        <Box>
          <Badge
            px={4}
            py={2}
            borderRadius="full"
            bg="purple.100"
            color="purple.700"
            mb={4}
            fontSize="12px"
          >
            HERO MANAGEMENT
          </Badge>

          <Text
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="800"
            lineHeight="1"
            color={textColor}
          >
            Homepage Hero Banners
          </Text>

          <Text mt={3} color={muted} maxW="700px">
            Manage all homepage hero banners, upload new images, control
            activation and update product categories.
          </Text>
        </Box>

        <Button
          leftIcon={<FiSave />}
          size="lg"
          h="60px"
          px={10}
          borderRadius="full"
          bg="purple.500"
          color="white"
          isLoading={updating}
          loadingText="Saving"
          onClick={handleSubmit}
          _hover={{
            bg: "purple.600",
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          transition="0.25s"
        >
          Save Changes
        </Button>
      </Flex>

      {/* ==========================================
          GRID
      ========================================== */}

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2,1fr)",
          "2xl": "repeat(3,1fr)",
        }}
        gap={7}
      >
        {items.map((item, i) => (
          <Box
            key={i}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="3xl"
            overflow="hidden"
            transition="0.3s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            }}
          >
            {/* ==========================================
                TOP
            ========================================== */}

            <Flex
              justify="space-between"
              align="center"
              px={5}
              py={5}
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <HStack spacing={4}>
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="2xl"
                  bg="purple.500"
                  align="center"
                  justify="center"
                  color="white"
                >
                  <Icon as={FiImage} boxSize={5} />
                </Flex>

                <Box>
                  <Text fontWeight="800" color={textColor} fontSize="lg">
                    Banner {i + 1}
                  </Text>

                  <Text fontSize="sm" color={muted}>
                    Homepage Hero Section
                  </Text>
                </Box>
              </HStack>

              {item.is_active && (
                <Icon as={FiCheckCircle} color="green.400" boxSize={6} />
              )}
            </Flex>

            {/* ==========================================
                BODY
            ========================================== */}

            <VStack p={5} spacing={5} align="stretch">
              {/* IMAGE */}

              <Box>
                <Text mb={3} fontWeight="700" color={textColor} fontSize="sm">
                  HERO IMAGE
                </Text>

                <Box
                  as="label"
                  cursor="pointer"
                  borderRadius="2xl"
                  overflow="hidden"
                  border="2px dashed"
                  borderColor="purple.200"
                  h="250px"
                  display="block"
                  position="relative"
                  transition="0.3s"
                  _hover={{
                    borderColor: "purple.400",
                  }}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    display="none"
                    onChange={(e) =>
                      handleChange(i, "image", e.target.files?.[0])
                    }
                  />

                  {item.preview ? (
                    <Image
                      src={item.preview}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  ) : (
                    <Flex
                      h="100%"
                      direction="column"
                      align="center"
                      justify="center"
                    >
                      <Icon
                        as={FiUploadCloud}
                        boxSize={12}
                        color="purple.400"
                      />

                      <Text mt={4} color={muted}>
                        Upload Hero Banner
                      </Text>
                    </Flex>
                  )}
                </Box>
              </Box>

              {/* TYPE */}

              <Box>
                <Text mb={3} fontWeight="700" color={textColor} fontSize="sm">
                  PRODUCT TYPE
                </Text>

                <Select
                  h="56px"
                  borderRadius="xl"
                  bg={selectBg}
                  color={textColor}
                  borderColor={borderColor}
                  value={item.product_type}
                  onChange={(e) =>
                    handleChange(i, "product_type", e.target.value)
                  }
                  _focus={{
                    borderColor: "purple.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
                  }}
                >
                  <option
                    value=""
                    style={{
                      color: "black",
                    }}
                  >
                    Select Product Type
                  </option>

                  {types.map((type) => (
                    <option
                      key={type}
                      value={type}
                      style={{
                        color: "black",
                      }}
                    >
                      {type}
                    </option>
                  ))}
                </Select>
              </Box>

              {/* ACTIVE */}

              <Flex
                justify="space-between"
                align="center"
                p={4}
                borderRadius="2xl"
                bg="purple.50"
              >
                <Box>
                  <Text fontWeight="700" color="purple.700">
                    Active Banner
                  </Text>

                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Show this banner on homepage
                  </Text>
                </Box>

                <Switch
                  size="lg"
                  colorScheme="purple"
                  isChecked={item.is_active}
                  onChange={(e) =>
                    handleChange(i, "is_active", e.target.checked)
                  }
                />
              </Flex>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
