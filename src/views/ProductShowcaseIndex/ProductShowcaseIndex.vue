<template>
	<div class="grey lighten-5">
		<v-container>
			<v-row>
				<v-col
					class="d-flex flex-column"
					xs="12"
					sm="6"
					md="4"
					col="3"
					v-for="product in products"
					:key="product.id"
				>
					<v-card
						class="pa-2 flex d-flex flex-column"
						data-test-id="product-card"
						outlined
						tile
					>
						<v-card-title
							><div class="d-flex justify-center" style="width: 100%">
								{{ product.title }}
							</div></v-card-title
						>
						<v-img
							contain
							height="500"
							:src="require(`@/assets/products/${product.id}.jpg`)"
						></v-img>
						<v-card-text class="flex">
							<p class="my-4 subtitle-1">
								{{ product.description }}
							</p>
							<p>
								{{
									$t('products.dynamicPrice', {
										price: formatPrice(product.price),
									})
								}}
							</p>

							<p>
								{{ $t('products.dynamicCount', { count: product.count }) }}
							</p>
						</v-card-text>

						<v-card-actions>
							<v-add-product-to-cart
								isEditable
								@increment="handleProductIncrement(product)"
								@decrement="handleProductDecrement(product.id)"
								:maxCount="product.count"
							></v-add-product-to-cart>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import { VAddProductToCart } from '@/components/AddProductToCart';

import { Product } from '@/models/product';
import { productApi } from '@/api/products/product-api';
import { formatter as priceFormatter } from '@/libs/price';

export default Vue.extend({
	name: 'ProductShowcaseIndex',
	components: { VAddProductToCart },
	data() {
		return {
			isFetching: false,
			products: [] as Product[],
			error: null,
		};
	},
	created() {
		this.fetchProducts();
	},
	methods: {
		formatPrice(price: number) {
			return priceFormatter.number(price);
		},
		fetchProducts() {
			this.isFetching = true;

			productApi
				.fetchAvailableProducts()
				.then(products => {
					this.products = products;
				})
				.finally(() => {
					this.isFetching = false;
				});
		},

		handleProductIncrement(product: Product) {
			this.$store.dispatch('cart/addProductToCart', product);
		},

		handleProductDecrement(productId: string) {
			this.$store.dispatch('cart/removeProductFromCart', productId);
		},
	},
});
</script>
