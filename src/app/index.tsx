const brokenVar: number = "intentionally broken";
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Product, ProductCard } from '@/components/ProductCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Audio',
    price: 199.99,
    rating: 4.8,
    description: 'Premium over-ear headphones with 35h battery life and active spatial sound.',
    badge: 'Popular',
    icon: '🎧',
  },
  {
    id: '2',
    name: 'Ultra-Slim Mechanical Keyboard',
    category: 'Accessories',
    price: 129.5,
    rating: 4.9,
    description: 'Hot-swappable low profile switches with RGB backlighting and Bluetooth 5.2.',
    badge: 'New',
    icon: '⌨️',
  },
  {
    id: '3',
    name: 'Smart 4K Touch Display 27"',
    category: 'Devices',
    price: 499.0,
    rating: 4.7,
    description: '4K IPS panel with 120Hz refresh rate, HDR400, and USB-C single cable setup.',
    icon: '🖥️',
  },
  {
    id: '4',
    name: 'Ergonomic Precision Mouse',
    category: 'Accessories',
    price: 79.99,
    rating: 4.6,
    description: 'Customizable weights, magnetic scroll wheel, and ergonomic palm support.',
    icon: '🖱️',
  },
  {
    id: '5',
    name: 'Ambient Studio LED Light Bar',
    category: 'Smart Home',
    price: 45.0,
    rating: 4.5,
    description: 'Auto-dimming screen bar light with customizable color temperatures.',
    icon: '💡',
  },
];

const CATEGORIES = ['All', 'Audio', 'Devices', 'Accessories', 'Smart Home'];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleToggleCart = (product: Product) => {
    setCart((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const cartTotal = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => cart.includes(p.id)).reduce(
      (sum, item) => sum + item.price,
      0
    );
  }, [cart]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Student Identification Banner */}
        <ThemedView type="backgroundElement" style={styles.studentBanner}>
          <View style={styles.badgeRow}>
            <View style={styles.liveIndicator} />
            <ThemedText style={styles.bannerTag}>EXPO PRODUCT EXPLORER</ThemedText>
          </View>
          <ThemedText type="title" style={styles.studentName}>
            Muhammad Abubakar Ali
          </ThemedText>
          <ThemedText style={styles.studentRoll}>Roll Number: 22i-2693</ThemedText>
          <ThemedText type="small" style={styles.courseSubtitle}>
            SMD Q3 • Expo + Git + GitHub Actions + Expo MCP
          </ThemedText>
        </ThemedView>

        {/* Search & Cart Summary Bar */}
        <View style={styles.controlsSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#8E8E93"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.cartSummary}>
            <ThemedText style={styles.cartText}>
              🛒 Cart: <ThemedText style={styles.cartBold}>{cart.length}</ThemedText> items
              ({cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : '$0.00'})
            </ThemedText>
          </View>
        </View>

        {/* Categories Bar */}
        <View style={styles.categoriesWrapper}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => {
              const isActive = selectedCategory === item;
              return (
                <TouchableOpacity
                  style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <ThemedText
                    style={[styles.categoryText, isActive && styles.categoryTextActive]}
                  >
                    {item}
                  </ThemedText>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Product List */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onAddToCart={handleToggleCart}
              isCartItem={cart.includes(item.id)}
            />
          )}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>
                No products found matching &ldquo;{searchQuery}&rdquo;
              </ThemedText>
            </View>
          }
        />

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  studentBanner: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#007AFF30',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
    marginRight: 6,
  },
  bannerTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007AFF',
    letterSpacing: 0.8,
  },
  studentName: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  studentRoll: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 2,
  },
  courseSubtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  controlsSection: {
    marginBottom: 10,
    gap: 8,
  },
  searchContainer: {
    backgroundColor: '#8E8E9315',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
  searchInput: {
    fontSize: 14,
    color: '#000000',
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
  },
  cartText: {
    fontSize: 13,
    opacity: 0.85,
  },
  cartBold: {
    fontWeight: '700',
    color: '#007AFF',
  },
  categoriesWrapper: {
    marginBottom: 8,
  },
  categoriesList: {
    gap: 8,
    paddingVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#8E8E9320',
  },
  categoryPillActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  productList: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
