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
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  FiCalendar,
  FiClock,
  FiGlobe,
  FiMail,
  FiMessageSquare,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { fetchAdminContacts } from "../../store/slices/adminContactSlice";

// ======================================================
// COUNTRY OPTIONS
// ======================================================

const COUNTRY_OPTIONS = [
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AS", label: "American Samoa" },
  { value: "AD", label: "Andorra" },
  { value: "AO", label: "Angola" },
  { value: "AR", label: "Argentina" },
  { value: "AM", label: "Armenia" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BY", label: "Belarus" },
  { value: "BE", label: "Belgium" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Benin" },
  { value: "BT", label: "Bhutan" },
  { value: "BO", label: "Bolivia" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BW", label: "Botswana" },
  { value: "BR", label: "Brazil" },
  { value: "BN", label: "Brunei Darussalam" },
  { value: "BG", label: "Bulgaria" },
  { value: "KH", label: "Cambodia" },
  { value: "CM", label: "Cameroon" },
  { value: "CA", label: "Canada" },
  { value: "TD", label: "Chad" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CO", label: "Colombia" },
  { value: "CR", label: "Costa Rica" },
  { value: "HR", label: "Croatia" },
  { value: "CU", label: "Cuba" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "DO", label: "Dominican Republic" },
  { value: "EC", label: "Ecuador" },
  { value: "EG", label: "Egypt" },
  { value: "SV", label: "El Salvador" },
  { value: "EE", label: "Estonia" },
  { value: "ET", label: "Ethiopia" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "GE", label: "Georgia" },
  { value: "DE", label: "Germany" },
  { value: "GH", label: "Ghana" },
  { value: "GR", label: "Greece" },
  { value: "HK", label: "Hong Kong" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "JO", label: "Jordan" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KE", label: "Kenya" },
  { value: "KW", label: "Kuwait" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "LB", label: "Lebanon" },
  { value: "LY", label: "Libya" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "MT", label: "Malta" },
  { value: "MX", label: "Mexico" },
  { value: "MC", label: "Monaco" },
  { value: "MN", label: "Mongolia" },
  { value: "MA", label: "Morocco" },
  { value: "MM", label: "Myanmar" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NZ", label: "New Zealand" },
  { value: "NG", label: "Nigeria" },
  { value: "NO", label: "Norway" },
  { value: "OM", label: "Oman" },
  { value: "PK", label: "Pakistan" },
  { value: "PA", label: "Panama" },
  { value: "PE", label: "Peru" },
  { value: "PH", label: "Philippines" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "QA", label: "Qatar" },
  { value: "RO", label: "Romania" },
  { value: "RU", label: "Russia" },
  { value: "RW", label: "Rwanda" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SG", label: "Singapore" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "ZA", label: "South Africa" },
  { value: "KR", label: "South Korea" },
  { value: "ES", label: "Spain" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "SY", label: "Syrian Arab Republic" },
  { value: "TW", label: "Taiwan" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TZ", label: "Tanzania" },
  { value: "TH", label: "Thailand" },
  { value: "TN", label: "Tunisia" },
  { value: "TR", label: "Turkey" },
  { value: "UG", label: "Uganda" },
  { value: "UA", label: "Ukraine" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "UY", label: "Uruguay" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VE", label: "Venezuela" },
  { value: "VN", label: "Vietnam" },
  { value: "YE", label: "Yemen" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" },
];

// ======================================================
// SUBJECT OPTIONS
// ======================================================

const SUBJECT_OPTIONS = [
  {
    value: "product_enquiry",
    label: "Product Enquiry",
    color: "purple",
  },
  {
    value: "bulk_order",
    label: "Bulk Order",
    color: "orange",
  },
  {
    value: "custom_gifting",
    label: "Custom Gifting",
    color: "pink",
  },
  {
    value: "shipping_query",
    label: "Shipping Query",
    color: "blue",
  },
  {
    value: "authentication",
    label: "Authentication",
    color: "green",
  },
  {
    value: "partnership",
    label: "Partnership",
    color: "cyan",
  },
  {
    value: "other",
    label: "Other",
    color: "gray",
  },
];

// ======================================================
// MAPS
// ======================================================

const COUNTRY_MAP = Object.fromEntries(
  COUNTRY_OPTIONS.map((c) => [c.value, c.label])
);

const SUBJECT_MAP = Object.fromEntries(
  SUBJECT_OPTIONS.map((s) => [s.value, s.label])
);

const SUBJECT_COLOR_MAP = Object.fromEntries(
  SUBJECT_OPTIONS.map((s) => [s.value, s.color])
);

// ======================================================
// COMPONENT
// ======================================================

export default function AdminContacts() {
  const dispatch = useDispatch();

  const { contacts, loading } = useSelector((state) => state.adminContacts);

  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAdminContacts());
  }, [dispatch]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      const q = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q) ||
        (SUBJECT_MAP[item.subject] || item.subject).toLowerCase().includes(q) ||
        (COUNTRY_MAP[item.country] || item.country).toLowerCase().includes(q);

      const matchesSubject = subjectFilter
        ? item.subject === subjectFilter
        : true;

      const matchesCountry = countryFilter
        ? item.country === countryFilter
        : true;

      return matchesSearch && matchesSubject && matchesCountry;
    });
  }, [contacts, search, subjectFilter, countryFilter]);

  return (
    <Box>
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <Flex
        justify="space-between"
        align={{ base: "start", xl: "center" }}
        direction={{ base: "column", xl: "row" }}
        gap={5}
        mb={8}
      >
        <Box>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="800"
            color="gray.800"
          >
            Contact Enquiries
          </Text>

          <Text color="gray.500" mt={1}>
            Manage customer messages, bulk orders and enquiries
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={3}
          w={{ base: "full", xl: "auto" }}
        >
          <InputGroup bg="white" borderRadius="xl">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="#A0AEC0" />
            </InputLeftElement>

            <Input
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="xl"
              borderColor="gray.200"
              _focus={{
                borderColor: "purple.400",
                boxShadow: "0 0 0 1px #805AD5",
              }}
            />
          </InputGroup>

          <Select
            bg="white"
            color="gray.800"
            borderRadius="xl"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
            }}
          >
            <option value="" style={{ color: "#1A202C" }}>
              All Subjects
            </option>

            {SUBJECT_OPTIONS.map((item) => (
              <option
                key={item.value}
                value={item.value}
                style={{ color: "#1A202C", backgroundColor: "white" }}
              >
                {item.label}
              </option>
            ))}
          </Select>

          <Select
            bg="white"
            color="gray.800"
            borderRadius="xl"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
            }}
          >
            <option value="" style={{ color: "#1A202C" }}>
              All Countries
            </option>

            {COUNTRY_OPTIONS.map((item) => (
              <option
                key={item.value}
                value={item.value}
                style={{ color: "#1A202C", backgroundColor: "white" }}
              >
                {item.label}
              </option>
            ))}
          </Select>
        </SimpleGrid>
      </Flex>

      {/* ========================================= */}
      {/* STATS */}
      {/* ========================================= */}

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={8}>
        <StatCard
          title="Total Enquiries"
          value={contacts.length}
          color="purple.500"
        />

        <StatCard
          title="Filtered Results"
          value={filteredContacts.length}
          color="blue.500"
        />

        <StatCard
          title="Bulk Orders"
          value={contacts.filter((i) => i.subject === "bulk_order").length}
          color="orange.500"
        />
      </SimpleGrid>

      {/* ========================================= */}
      {/* LOADING */}
      {/* ========================================= */}

      {loading ? (
        <Grid
          templateColumns={{
            base: "1fr",
            xl: "repeat(2, 1fr)",
          }}
          gap={6}
        >
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      ) : filteredContacts.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          h="300px"
          bg="white"
          borderRadius="3xl"
          border="1px solid"
          borderColor="gray.100"
        >
          <VStack spacing={3}>
            <Icon as={FiMessageSquare} boxSize={10} color="gray.300" />

            <Text fontWeight="600" color="gray.500">
              No contact enquiries found
            </Text>
          </VStack>
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            "2xl": "repeat(2, 1fr)",
          }}
          gap={6}
        >
          {filteredContacts.map((contact) => (
            <GridItem key={contact.id}>
              <ContactCard contact={contact} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
}

// ======================================================
// CONTACT CARD
// ======================================================

function ContactCard({ contact }) {
  return (
    <Box
      bg="white"
      borderRadius="3xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "xl",
      }}
    >
      {/* TOP BAR */}
      <Box h="6px" bgGradient="linear(to-r, purple.400, pink.400)" />

      <Box p={6}>
        {/* HEADER */}
        <Flex justify="space-between" gap={4} mb={5}>
          <HStack align="start" spacing={4}>
            <Avatar name={contact.name} bg="purple.500" color="white" />

            <Box>
              <Text fontWeight="700" fontSize="lg" color="gray.800">
                {contact.name}
              </Text>

              <HStack spacing={2} mt={1}>
                <Icon as={FiMail} color="gray.400" />

                <Text fontSize="sm" color="gray.500" wordBreak="break-word">
                  {contact.email}
                </Text>
              </HStack>
            </Box>
          </HStack>

          <Badge
            px={3}
            py={1}
            borderRadius="full"
            colorScheme={SUBJECT_COLOR_MAP[contact.subject] || "gray"}
            h="fit-content"
            fontSize="0.75rem"
          >
            {SUBJECT_MAP[contact.subject] || contact.subject}
          </Badge>
        </Flex>

        <Divider mb={5} />

        {/* META */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={5}>
          <InfoBox
            icon={FiGlobe}
            label="Country"
            value={COUNTRY_MAP[contact.country] || contact.country}
          />

          <InfoBox
            icon={FiCalendar}
            label="Date"
            value={new Date(contact.created_at).toLocaleDateString()}
          />

          <InfoBox
            icon={FiClock}
            label="Time"
            value={new Date(contact.created_at).toLocaleTimeString()}
          />

          <InfoBox icon={FiUser} label="Enquiry ID" value={`#${contact.id}`} />
        </SimpleGrid>

        {/* MESSAGE */}
        <Box
          bg="gray.50"
          borderRadius="2xl"
          p={5}
          border="1px solid"
          borderColor="gray.100"
        >
          <Text
            fontSize="xs"
            fontWeight="700"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="0.08em"
            mb={3}
          >
            Customer Message
          </Text>

          <Textarea
            value={contact.message}
            readOnly
            resize="none"
            minH="140px"
            bg="white"
            border="none"
            fontSize="sm"
            color="gray.700"
            _focus={{
              boxShadow: "none",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ======================================================
// INFO BOX
// ======================================================

function InfoBox({ icon, label, value }) {
  return (
    <HStack spacing={3} bg="gray.50" p={4} borderRadius="2xl" align="start">
      <Flex
        w="40px"
        h="40px"
        borderRadius="xl"
        bg="purple.100"
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Icon as={icon} color="purple.500" />
      </Flex>

      <Box>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="gray.500"
          fontWeight="700"
        >
          {label}
        </Text>

        <Text fontSize="sm" fontWeight="600" color="gray.700" mt={1}>
          {value}
        </Text>
      </Box>
    </HStack>
  );
}

// ======================================================
// STATS CARD
// ======================================================

function StatCard({ title, value, color }) {
  return (
    <Box
      bg="white"
      borderRadius="3xl"
      p={6}
      border="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
    >
      <Text fontSize="sm" color="gray.500" fontWeight="600">
        {title}
      </Text>

      <Text fontSize="3xl" fontWeight="800" mt={2} color={color}>
        {value}
      </Text>
    </Box>
  );
}

// ======================================================
// SKELETON CARD
// ======================================================

function SkeletonCard() {
  return (
    <Box
      bg="white"
      borderRadius="3xl"
      p={6}
      border="1px solid"
      borderColor="gray.100"
    >
      <Stack spacing={4}>
        <Skeleton h="20px" />
        <Skeleton h="16px" />
        <Skeleton h="100px" borderRadius="xl" />
      </Stack>
    </Box>
  );
}
