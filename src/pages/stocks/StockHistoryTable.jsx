import { Badge, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function StockHistoryTable({ data }) {
  return (
    <Table variant="simple" bg="white" borderRadius="xl">
      <Thead>
        <Tr>
          <Th>Variant</Th>
          <Th>Price</Th>
          <Th>Change</Th>
          <Th>Prev</Th>
          <Th>New</Th>
          <Th>Reason</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>

      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>
              {item.variant.label} ({item.variant.size})
            </Td>

            <Td>₹{item.variant.price}</Td>

            <Td>
              <Badge colorScheme={item.change > 0 ? "green" : "red"}>
                {item.change > 0 ? "+" : ""}
                {item.change}
              </Badge>
            </Td>

            <Td>{item.previous_stock}</Td>
            <Td>{item.new_stock}</Td>

            <Td>{item.reason}</Td>

            <Td>{new Date(item.created_at).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
