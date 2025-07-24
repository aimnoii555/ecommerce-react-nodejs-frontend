import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { categoryList } from "../services/category";
import { getProduct, searchFilters } from "../services/product";
import _ from "lodash";

const provider = (set, get) => ({
  isChangePage: true,
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      carts: [],
      user: null,
      token: null,
    });
  },
  changePage: (state) => {
    set({ isChangePage: state });
  },
  actionLogin: async (form) => {
    const res = await axios.post(
      "https://ecommerce-react-nodejs.vercel.app/api/login",
      form
    );

    set({
      user: res.data.payload,
      token: res.data.token,
    });

    return res;
  },
  getCategory: async () => {
    try {
      const res = await categoryList();

      set({ categories: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await getProduct(count);

      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  searchFilter: async (args) => {
    try {
      const res = await searchFilters(args);
      set({
        products: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addToCart: (productAddToCart) => {
    const carts = get().carts;
    const updatedCart = [
      ...carts,
      {
        ...productAddToCart,
        count: 1,
      },
    ];
    const unique = _.unionWith(updatedCart, _.isEqual);

    set({
      carts: unique,
    });
  },
  updateQty: (productId, qty) => {
    // console.log(productId,qty)
    set((state) => ({
      carts: state.carts.map((e) =>
        e.id === productId ? { ...e, count: Math.max(1, qty) } : e
      ),
    }));
  },

  deleteCartProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  calculateTotalPrice: () => {
    return get().carts.reduce(
      (total, curentTotal) => total + curentTotal.price * curentTotal.count,
      0
    );
  },

  clearCartUser: () => {
    set({
      carts: [],
    });
  },
});

const usePersist = {
  name: "auth-store",
  storage: createJSONStorage(() => localStorage),
};

const useBearProvider = create(persist(provider, usePersist));

export default useBearProvider;
