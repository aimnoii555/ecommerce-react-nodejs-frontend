import React, { useEffect, useState } from "react";
import { getMyOrders } from "../../services/user";
import useBearProvider from "../../providers/Provider";
import { NumberFormat } from "../../utils/NumberFormat";
import { dateTimeFormat } from "../../utils/DateTimeFormat";

const HistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const useStore = useBearProvider((state) => state);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await getMyOrders(useStore.token);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Order History</h1>
      {orders?.map((item, key) => {
        // console.log(item);
        return (
          <div key={key} className="bg-white p-6 rounded-lg shadow-md my-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-semibold text-gray-800">
                  {dateTimeFormat(item.updatedAt)}
                </p>
              </div>
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                  {item.orderStatus}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Total
                    </th>
                  </tr>
                </thead>
                {item.products?.map((p, key) => {
                  return (
                    <tbody key={key}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {p.product.title}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {NumberFormat(p.product.price)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {p.count}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 font-semibold">
                          {NumberFormat(p.count * p.product.price)}
                        </td>
                      </tr>
                      {/* เพิ่ม rows เพิ่มเติมได้ตามต้องการ */}
                    </tbody>
                  );
                })}
              </table>
            </div>

            <div className="mt-4 text-right text-sm text-gray-800">
              <p>Net Price</p>
              <p>{NumberFormat(item.cartTotal)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryCard;
