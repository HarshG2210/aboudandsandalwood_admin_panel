import { Box, Grid, GridItem } from "@chakra-ui/react";

import CustomerInfo from "./CustomerInfo";
import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";
import ShippingInfo from "./ShippingInfo";

export default function OrderCard({ order }) {
  const totalItems = order.items.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <Box
      bg="white"
      borderRadius="3xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="0 10px 30px rgba(0,0,0,0.04)"
    >
      <OrderHeader order={order} totalItems={totalItems} />

      <Box p={{ base: 5, md: 8 }}>
        <Grid
          templateColumns={{
            base: "1fr",
            xl: "340px 1fr",
          }}
          gap={8}
        >
          <GridItem>
            <CustomerInfo user={order.user_detail} />

            <ShippingInfo address={order.shipping_address_detail} />

            <OrderSummary
              totalItems={totalItems}
              itemsLength={order.items.length}
              totalAmount={order.total_amount}
            />
          </GridItem>

          <GridItem>
            <OrderItems items={order.items} totalItems={totalItems} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
