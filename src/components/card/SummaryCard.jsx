import { useEffect, useState } from "react";
import useBearProvider from "../../providers/Provider";
import { getUserCart, saveAddress } from "../../services/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../utils/NumberFormat";

const SummaryCard = () => {
  const navigate = useNavigate();

  const useStore = useBearProvider((state) => state);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [isSaveAddress, setIsSaveAddress] = useState(false);

  useEffect(() => {
    handleGetUserCart();
  }, []);

  const handleGetUserCart = () => {
    getUserCart(useStore.token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cart_total);
      })
      .catch((err) => console.log(err));
  };

  const handleSaveAddress = () => {
    if (!address) {
      return toast.warn("Please Enter Your Address");
    }
    saveAddress(useStore.token, address)
      .then((res) => {
        toast.success(res.data.message);
        setIsSaveAddress(true);
      })
      .catch((err) => {
        toast.warn(err);
      });
  };

  const handleValidate = () => {
    if (!isSaveAddress) {
      return toast.warn("Please Input Your Address");
    }
    navigate("/user/payment");
  };

  return (
    <div className="mx-auto">
      <div className="flex gap-2">
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-2">
            <h1 className="font-bold text-lg">Address</h1>
            <textarea
              name=""
              required
              placeholder="Enter Your Address"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-2 rounded-md"
              id=""
            ></textarea>
            <button
              onClick={handleSaveAddress}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800 hover:scale-105 hover:translate-x-1 hover:duration-200"
            >
              Save
            </button>
          </div>
        </div>
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
            <h1 className="text-lg font-bold">Your Orders</h1>

            {products.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold">{item.products.title}</p>
                      <p className="text-sm">
                        Amount: {item.count} x{" "}
                        {NumberFormat(item.products.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-400 font-bold">
                        {NumberFormat(item.count * item.products.price)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>0</p>
              </div>
              <div className="flex justify-between">
                <p>Discount:</p>
                <p>0</p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="font-bold">Net Price:</p>
              <p className="text-red-500 font-bold text-lg">
                {NumberFormat(cartTotal)}
              </p>
            </div>
            <div>
              <button
                onClick={handleValidate}
                className="bg-green-500 px-4 py-2 w-full rounded-md shadow-md text-white hover:bg-green-400"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
