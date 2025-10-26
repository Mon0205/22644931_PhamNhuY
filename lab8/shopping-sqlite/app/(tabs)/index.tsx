import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { addToCart } from "../../src/db/cart.repo";
import { initDB, seedProducts } from "../../src/db/db";
import { findProductsByName, getAllProducts } from "../../src/db/product.repo";
import { Product } from "../../src/models/types";
export default function ProductScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"none" | "asc" | "desc">("none");
  const router = useRouter();

  async function loadData(keyword?: string, sortOrder?: "asc" | "desc" | "none") {
    let list =
      keyword && keyword.trim() !== ""
        ? await findProductsByName(keyword)
        : await getAllProducts();

    if (sortOrder === "asc") list.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") list.sort((a, b) => b.price - a.price);

    setProducts(list);
  }

  useEffect(() => {
    (async () => {
      // await resetDB();
      await initDB();
      await seedProducts();
      await loadData();

    })();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      loadData(search, filter);
    }, 300);
    return () => clearTimeout(delay);
  }, [search, filter]);

  // Hiệu ứng thu phóng khi nhấn nút
  const scaleAnim = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách sản phẩm</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/cart")}
        >
          <Text style={styles.cartButtonText}>🛒 Giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Search + Filter */}
      <View style={styles.searchFilterRow}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            placeholder="Tìm sản phẩm..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter((prev) =>
              prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"
            );
          }}
        >
          <Ionicons
            name={
              filter === "asc"
                ? "arrow-up-circle"
                : filter === "desc"
                  ? "arrow-down-circle"
                  : "filter"
            }
            size={22}
            color="#2563EB"
          />
          <Text style={styles.filterText}>
            {filter === "asc"
              ? "Giá ↑"
              : filter === "desc"
                ? "Giá ↓"
                : "Bộ lọc"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()}₫</Text>
              <Text style={styles.stock}>Tồn kho: {item.stock}</Text>
            </View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  item.stock === 0 && { backgroundColor: "#9CA3AF" },
                ]}
                disabled={item.stock === 0}
                onPress={async () => {
                  animateButton();

                  const success = await addToCart(item.product_id);

                  if (!success) {
                    Toast.show({
                      type: "error",
                      text1: "Hết hàng",
                      text2: item.stock <= 0 ? "Sản phẩm đã hết hàng" : "Vượt quá số lượng tồn kho",
                      position: "bottom",
                      visibilityTime: 2000,
                    });
                    return;
                  }

                  Toast.show({
                    type: "success",
                    text1: "Đã thêm vào giỏ 🎉",
                    text2: item.name,
                    position: "bottom",
                    visibilityTime: 1500,
                  });
                }}

              >
                <Text style={styles.addButtonText}>
                  {item.stock === 0 ? "Hết hàng" : "+ Thêm"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Toast container */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#111827" },
  cartButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cartButtonText: { color: "#FFF", fontWeight: "600" },
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  searchWrap: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 44,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  searchInput: { flex: 1, fontSize: 15 },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 44,
    backgroundColor: "#EFF6FF",
  },
  filterText: {
    color: "#2563EB",
    fontWeight: "600",
    marginLeft: 6,
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
  },
  productName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  price: { fontSize: 15, color: "#DC2626", fontWeight: "500", marginTop: 4 },
  stock: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  addButton: {
    backgroundColor: "#10B981",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: { color: "#FFF", fontWeight: "600" },
});
