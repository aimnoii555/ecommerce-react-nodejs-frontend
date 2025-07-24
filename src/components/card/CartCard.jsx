import { Trash2 } from "lucide-react";
import useBearProvider from "../../providers/Provider";
import { Link } from "react-router-dom";
import { NumberFormat } from "../../utils/NumberFormat";

const CartCard = () => {
  const useStore = useBearProvider((state) => state);

  return (
    <div>
      <h3 className="font-bold text-2sm">Cart Product</h3>
      {useStore.carts.map((item, index) => (
        <div key={index} className="border p-2">
          <div className="bg-white p-2 shadow-md rounded-sm">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                {item.images.length > 0 ? (
                  <img
                    className="w-16 h-16 bg-gray-200 rounded"
                    src={item.images[0].url}
                    alt=""
                  />
                ) : (
                  <div className="bg-gray-200 p-5 text-center">No Image</div>
                )}

                <div className="">
                  <p className="font-bold line-clamp-1">{item?.title}</p>
                  <p className="text-sm line-clamp-2">{item?.description}</p>
                </div>
              </div>

              <div>
                <Trash2
                  onClick={() => useStore.deleteCartProduct(item.id)}
                  className="bg-red-500 p-1 mt-1 text-white rounded-md text-sm shadow-md hover:bg-red-300"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="border rounded-md">
                <button
                  onClick={() => useStore.updateQty(item.id, item.count - 1)}
                  className="px-3 bg-gray-200"
                >
                  -
                </button>
                <span className="px-4">{item.count}</span>
                <button
                  onClick={() => useStore.updateQty(item.id, item.count + 1)}
                  className="px-3 bg-gray-200"
                >
                  +
                </button>
              </div>
              <div className="font-bold text-blue-400">
                {NumberFormat(item.price * item.count)}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between px-3">
        <span>Total</span>
        <span>{NumberFormat(useStore.calculateTotalPrice())}</span>
      </div>
      <div className="bg-green-400 p-1 text-center mt-4 w-full border rounded-sm text-white hover:bg-green-300">
        <Link to="/cart">Payment</Link>
      </div>
    </div>
  );
};

export default CartCard;
