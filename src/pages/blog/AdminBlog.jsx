import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiImage,
  FiPlayCircle,
  FiUploadCloud,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { createBlog } from "../../store/slices/blogSlice";
import { useState } from "react";

export default function AdminBlog() {
  const dispatch = useDispatch();

  const { loading } = useSelector((s) => s.blog);

  const [title, setTitle] = useState("");

  const [paragraphs, setParagraphs] = useState(
    Array.from({ length: 20 }, () => "")
  );

  const [images, setImages] = useState(Array.from({ length: 5 }, () => null));

  const [previews, setPreviews] = useState(
    Array.from({ length: 5 }, () => null)
  );

  const [video, setVideo] = useState("");

  // ==========================================
  // COLORS
  // ==========================================

  const bg = useColorModeValue("#f6f2ea", "#0f0f0f");

  const cardBg = useColorModeValue("#ffffff", "#181818");

  const borderColor = useColorModeValue("#e8dfd1", "#2a2a2a");

  const textColor = useColorModeValue("#2d2218", "#f3f3f3");

  const muted = useColorModeValue("#7d7268", "#9f9f9f");

  const inputBg = useColorModeValue("#faf8f4", "#111111");

  // ==========================================
  // PARAGRAPH
  // ==========================================

  const handlePara = (i, value) => {
    const updated = [...paragraphs];

    updated[i] = value;

    setParagraphs(updated);
  };

  // ==========================================
  // IMAGES
  // ==========================================

  const handleImage = (i, file) => {
    const updated = [...images];

    updated[i] = file;

    const preview = URL.createObjectURL(file);

    const p = [...previews];

    p[i] = preview;

    setImages(updated);

    setPreviews(p);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);

    // PARAGRAPHS
    paragraphs.forEach((p, i) => {
      if (p?.trim()) {
        formData.append(`paragraph${i + 1}`, p);
      }
    });

    // IMAGES
    images.forEach((img, i) => {
      if (img) {
        formData.append(`image${i + 1}`, img);
      }
    });

    // VIDEO
    if (video?.trim()) {
      formData.append("video_link", video);
    }

    try {
      const res = await dispatch(createBlog(formData)).unwrap();

      console.log("✅ BLOG CREATED", res);

      // ==========================================
      // CLEAR FORM AFTER SUCCESS
      // ==========================================

      setTitle("");

      setParagraphs(Array.from({ length: 20 }, () => ""));

      setImages(Array.from({ length: 5 }, () => null));

      setPreviews(Array.from({ length: 5 }, () => null));

      setVideo("");
    } catch (err) {
      console.log("❌ ERROR", err);
    }
  };

  return (
    <Box minH="100vh" bg={bg} px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
      {/* HEADER */}

      <Box mb={12}>
        <Badge
          px={4}
          py={2}
          borderRadius="full"
          bg="purple.100"
          color="purple.700"
          fontSize="12px"
          mb={4}
        >
          CONTENT MANAGEMENT
        </Badge>

        <Text
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="300"
          lineHeight="1"
          color={textColor}
          fontFamily="'Cormorant Garamond', serif"
        >
          Create New
          <Text as="span" color="purple.500">
            {" "}
            Blog
          </Text>
        </Text>

        <Text mt={5} maxW="700px" color={muted} fontSize="md" lineHeight="1.9">
          Publish premium storytelling content with rich imagery, detailed
          descriptions and engaging media to elevate your brand experience.
        </Text>
      </Box>

      {/* MAIN GRID */}

      <Grid
        templateColumns={{
          base: "1fr",
          xl: "1.4fr 0.8fr",
        }}
        gap={8}
      >
        {/* LEFT SIDE */}

        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="3xl"
          p={{ base: 6, md: 10 }}
        >
          <VStack spacing={8} align="stretch">
            {/* TITLE */}

            <Box>
              <HStack mb={3}>
                <Icon as={FiFileText} color="purple.400" />

                <Text
                  fontWeight="700"
                  color={textColor}
                  letterSpacing="0.04em"
                  fontSize="sm"
                >
                  BLOG TITLE
                </Text>
              </HStack>

              <Input
                h="64px"
                borderRadius="2xl"
                bg={inputBg}
                border="1px solid"
                borderColor={borderColor}
                color={textColor}
                placeholder="Enter your blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                _placeholder={{
                  color: muted,
                }}
                _focus={{
                  borderColor: "purple.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
                }}
              />
            </Box>

            {/* PARAGRAPHS */}

            <VStack spacing={6} align="stretch">
              {paragraphs.map((p, i) => (
                <Box key={i}>
                  <Text
                    mb={3}
                    fontWeight="700"
                    color={textColor}
                    fontSize="sm"
                    letterSpacing="0.04em"
                  >
                    PARAGRAPH {i + 1}
                  </Text>

                  <Textarea
                    minH="180px"
                    resize="none"
                    borderRadius="2xl"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={borderColor}
                    color={textColor}
                    placeholder={`Write paragraph ${i + 1}...`}
                    value={p}
                    onChange={(e) => handlePara(i, e.target.value)}
                    _placeholder={{
                      color: muted,
                    }}
                    _focus={{
                      borderColor: "purple.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
                    }}
                  />
                </Box>
              ))}
            </VStack>

            {/* VIDEO */}

            <Box>
              <HStack mb={3}>
                <Icon as={FiPlayCircle} color="purple.400" />

                <Text
                  fontWeight="700"
                  color={textColor}
                  letterSpacing="0.04em"
                  fontSize="sm"
                >
                  YOUTUBE VIDEO LINK
                </Text>
              </HStack>

              <Input
                h="64px"
                borderRadius="2xl"
                bg={inputBg}
                border="1px solid"
                borderColor={borderColor}
                color={textColor}
                placeholder="Paste YouTube URL..."
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                _placeholder={{
                  color: muted,
                }}
                _focus={{
                  borderColor: "purple.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
                }}
              />
            </Box>
          </VStack>
        </Box>

        {/* RIGHT SIDE */}

        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="3xl"
          p={{ base: 6, md: 8 }}
        >
          <VStack spacing={8} align="stretch">
            {/* HEADER */}

            <Box>
              <Text fontSize="2xl" color={textColor} fontWeight="700">
                Blog Media
              </Text>

              <Text color={muted} mt={2} lineHeight="1.8">
                Upload up to 3 premium visuals for your blog article.
              </Text>
            </Box>

            {/* IMAGES */}

            <SimpleGrid columns={1} spacing={6}>
              {images.map((_, i) => (
                <Box key={i}>
                  <Text
                    mb={3}
                    fontWeight="700"
                    color={textColor}
                    fontSize="sm"
                    letterSpacing="0.04em"
                  >
                    IMAGE {i + 1}
                  </Text>

                  <Box
                    as="label"
                    htmlFor={`blog-image-${i}`}
                    cursor="pointer"
                    borderRadius="2xl"
                    overflow="hidden"
                    border="2px dashed"
                    borderColor={previews[i] ? "purple.300" : borderColor}
                    bg={inputBg}
                    h="220px"
                    transition="0.3s"
                    _hover={{
                      borderColor: "purple.400",
                    }}
                  >
                    <Input
                      id={`blog-image-${i}`}
                      type="file"
                      accept="image/*"
                      display="none"
                      onChange={(e) => handleImage(i, e.target.files[0])}
                    />

                    {previews[i] ? (
                      <Image
                        src={previews[i]}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    ) : (
                      <VStack h="100%" justify="center" spacing={5}>
                        <Box
                          w="72px"
                          h="72px"
                          borderRadius="full"
                          bg="purple.100"
                          color="purple.600"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiUploadCloud} boxSize={8} />
                        </Box>

                        <Box textAlign="center">
                          <Text
                            fontWeight="700"
                            color={textColor}
                            fontSize="lg"
                          >
                            Upload Image
                          </Text>

                          <Text color={muted} mt={1} fontSize="sm">
                            Click to browse image
                          </Text>
                        </Box>
                      </VStack>
                    )}
                  </Box>
                </Box>
              ))}
            </SimpleGrid>

            {/* INFO CARD */}

            <Box
              bg={useColorModeValue("purple.50", "whiteAlpha.50")}
              borderRadius="2xl"
              p={5}
            >
              <HStack align="start" spacing={4}>
                <Icon as={FiImage} color="purple.400" mt={1} />

                <Box>
                  <Text color={textColor} fontWeight="700">
                    Content Tips
                  </Text>

                  <Text mt={2} color={muted} lineHeight="1.8" fontSize="sm">
                    Use high quality imagery and compelling storytelling to
                    improve engagement and premium brand perception.
                  </Text>
                </Box>
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Grid>

      {/* SUBMIT */}

      <HStack justify="center" mt={12}>
        <Button
          onClick={handleSubmit}
          isLoading={loading}
          h="66px"
          px={14}
          borderRadius="full"
          bg="purple.500"
          color="white"
          fontSize="md"
          fontWeight="700"
          _hover={{
            bg: "purple.600",
            transform: "translateY(-2px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          }}
          transition="0.3s"
        >
          Publish Blog
        </Button>
      </HStack>
    </Box>
  );
}
