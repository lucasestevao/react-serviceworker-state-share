const ProductAPI = class {
  static async getProducts() {
    const response = await fetch("../../public/products.json");

    return await response.json();
  }
};

export const fetchProducts = ProductAPI.getProducts;
