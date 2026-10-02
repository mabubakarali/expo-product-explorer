import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  badge?: string;
  icon: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isCartItem?: boolean;
}

export function ProductCard({ product, onAddToCart, isCartItem }: ProductCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <ThemedText style={styles.icon}>{product.icon}</ThemedText>
        </View>
        <View style={styles.headerInfo}>
          <ThemedText type="subtitle" style={styles.title}>
            {product.name}
          </ThemedText>
          <ThemedText type="small" style={styles.category}>
            {product.category} • ⭐ {product.rating.toFixed(1)}
          </ThemedText>
        </View>
        {product.badge ? (
          <View style={styles.badge}>
            <ThemedText type="small" style={styles.badgeText}>
              {product.badge}
            </ThemedText>
          </View>
        ) : null}
      </View>

      <ThemedText type="default" style={styles.description}>
        {product.description}
      </ThemedText>

      <View style={styles.footerRow}>
        <ThemedText type="title" style={styles.price}>
          ${product.price.toFixed(2)}
        </ThemedText>

        <TouchableOpacity
          style={[styles.button, isCartItem ? styles.buttonActive : null]}
          onPress={() => onAddToCart(product)}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>
            {isCartItem ? '✓ Added to Cart' : '+ Add to Cart'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#007AFF15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  category: {
    opacity: 0.7,
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#34C75920',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#34C759',
    fontWeight: '600',
    fontSize: 11,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.85,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#00000015',
  },
  price: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
