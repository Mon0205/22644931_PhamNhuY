import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCart, updateQty } from "../src/db/cart.repo";
import { CartItem } from "../src/models/types";

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  async function loadCart() {
    const data = await getCart();
    setCart(data);
  }

  useEffect(() => {
    loadCart();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  // Tính tổng tiền giỏ hàng
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Giỏ hàng của bạn</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có sản phẩm nào trong giỏ.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>
                  {item.price.toLocaleString()}₫ x {item.qty}
                </Text>
                <Text style={styles.stock}>Tồn kho: {item.stock}</Text>
              </View>

              <View style={styles.qtyBox}>
                {/* Giảm số lượng */}
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={async () => {
                    if (item.qty > 1) {
                      await updateQty(item.id, item.qty - 1);
                      loadCart();
                    } else {
                      Alert.alert(" Xoá sản phẩm", "Bạn muốn xoá khỏi giỏ?", [
                        { text: "Hủy", style: "cancel" },
                        {
                          text: "Xoá",
                          onPress: async () => {
                            await updateQty(item.id, 0);
                            loadCart();
                          },
                          style: "destructive",
                        },
                      ]);
                    }
                  }}
                >
                  <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyCount}>{item.qty}</Text>

                {/* Tăng số lượng */}
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={async () => {
                    if (item.qty >= item.stock) {
                      Alert.alert(
                        " Hết hàng",
                        "Bạn đã đạt đến số lượng tối đa trong kho!"
                      );
                      return;
                    }
                    await updateQty(item.id, item.qty + 1);
                    loadCart();
                  }}
                >
                  <Text style={styles.qtyText}>＋</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Tổng tiền + Nút xem hóa đơn */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Tổng cộng:{" "}
          <Text style={styles.totalValue}>{total.toLocaleString()}₫</Text>
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push("/invoice")}
        >
          <Text style={styles.checkoutText}>Xem hoá đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
    marginTop: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  price: {
    fontSize: 15,
    color: "#DC2626",
    marginTop: 4,
  },
  stock: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
  },
  qtyButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "600",
  },
  qtyCount: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 8,
    color: "#111827",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  totalText: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "500",
    marginBottom: 12,
  },
  totalValue: {
    color: "#DC2626",
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
