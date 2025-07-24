import { ListCheck } from "lucide-react";
import React from "react";
import useBearProvider from "../../providers/Provider";
import { Link, Links, useNavigate } from "react-router-dom";
import { createUserCart } from "../../services/user";
import { toast } from "react-toastify";

const ListCartCard = () => {
  const useStore = useBearProvider((state) => state);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(useStore.token, { cart: useStore.carts })
      .then((res) => {
        toast.success(res.data);
        navigate("/checkout");
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
  };

  return (
    <div className="bg-gray-100 rounded-sm p-4">
      <div className="flex gap-2">
        <ListCheck size={34} />
        <p className="text-2xl">
          Product list {useStore.carts.length}{" "}
          {useStore.carts.length > 1 ? "items" : "item"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          {useStore.carts.map((item, index) => (
            <div key={index} className="p-2">
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
                      <div className="bg-gray-200 p-5 text-center">
                        No Image
                      </div>
                    )}

                    <div className="">
                      <p className="font-bold line-clamp-1">{item?.title}</p>
                      <p className="text-sm">
                        {item?.price} X {item.count}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-400">
                      {item.price * item.count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-2 px-3 m-2 shadow-md space-y-4">
          <p className="text-2xl">Total Price</p>
          <div className="flex justify-between">
            <span className="">Net Price</span>
            <span className="">{useStore.calculateTotalPrice()}</span>
          </div>

          {useStore.user ? (
            <Link>
              <button
                disabled={useStore.carts.length < 1}
                onClick={handleSaveCart}
                className="w-full bg-red-500 py-2 text-white  hover:bg-red-400"
              >
                Confirm
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="w-full bg-green-500 py-2 text-white  hover:bg-green-400">
                Login
              </button>
            </Link>
          )}

          <Link to="/shop">
            <button className="w-full mt-3 py-2 border text-gray-500 shadow-sm">
              Edit Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCartCard;
