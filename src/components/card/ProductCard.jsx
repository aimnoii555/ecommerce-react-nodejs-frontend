import { ShoppingCart } from "lucide-react";
import useBearProvider from "../../providers/Provider";
import { NumberFormat } from "../../utils/NumberFormat";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const useStore = useBearProvider((state) => state);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="border rounded-lg shadow-md py-2 px-4 w-48 flex flex-col justify-between ">
        <div>
          <div className="w-full h-24 bg-gray-100 border shadow rounded-sm flex items-center justify-center">
            {item.images?.length > 0 ? (
              <img
                className="object-cover w-48 h-24"
                src={item.images[0].url}
                alt=""
              />
            ) : (
              "No Image"
            )}
          </div>

          <div className="py-4">
            <p className="text-lg font-bold line-clamp-1">{item.title}</p>
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm font-bold">{NumberFormat(item.price)}</span>
          <button
            onClick={() => useStore.addToCart(item)}
            className="bg-blue-100 rounded p-2 hover:scale-110 hover:bg-blue-50 shadow-md"
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
