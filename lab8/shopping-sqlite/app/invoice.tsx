import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getCart } from "../src/db/cart.repo";
import { CartItem } from "../src/models/types";

export default function InvoiceScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCart();
      setCart(data);
    })();
  }, []);

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  const vat = total * 0.1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hóa đơn thanh toán</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                {item.qty} x {item.price.toLocaleString()}₫
              </Text>
            </View>
            <Text style={styles.itemTotal}>
              {(item.qty * item.price).toLocaleString()}₫
            </Text>
          </View>
        )}
      />

      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Tạm tính:</Text>
          <Text style={styles.value}>{total.toLocaleString()}₫</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>VAT (10%):</Text>
          <Text style={styles.value}>{vat.toLocaleString()}₫</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalValue}>
            {(total + vat).toLocaleString()}₫
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#0F172A",
  },
  list: {
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  itemPrice: {
    color: "#64748B",
    fontSize: 14,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0EA5E9",
  },
  summary: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#475569",
    fontSize: 15,
  },
  value: {
    color: "#475569",
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0EA5E9",
  },
});
