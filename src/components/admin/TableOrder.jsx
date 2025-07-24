import { useEffect, useState } from "react";
import useBearProvider from "../../providers/Provider";
import { changeOrderStatus, getOrdersAdmin } from "../../services/admin";
import { NumberFormat } from "../../utils/NumberFormat";
import { dateTimeFormat } from "../../utils/DateTimeFormat";


const TableOrder = () => {
  const useStore = useBearProvider((state) => state);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrderAdmin();
  }, []);

  const handleGetOrderAdmin = () => {
    getOrdersAdmin(useStore.token)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeOrderStatus = (orderId, orderStatus) => {
    changeOrderStatus(useStore.token, orderId, orderStatus)
      .then((res) => handleGetOrderAdmin())
      .catch((err) => console.log(err));
  };

  const statusColor = (status) => {
    switch (status) {
      case "No Process":
        return "bg-gray-400";
      case "Processing":
        return "bg-blue-400";
      case "Complated":
        return "bg-green-400";
      case "Canceled":
        return "bg-red-400";
      default:
        break;
    }
  };

  return (
    <div className="bg-white mx-auto p-4 shadow-md">
      Orders Table
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                DateTime
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                User
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Product
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Total
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Manage
              </th>
            </tr>
          </thead>
          {orders?.map((o, key) => {
            return (
              <tbody key={key}>
                <tr className="hover:bg-gray-50 border">
                  <td className="px-4 py-3 text-sm text-gray-800">{key + 1}</td>
                  <td>
                     {dateTimeFormat(o.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <p>{o.user.email}</p>
                    <p>{o.user.address}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {o.products.map((p, key) => {
                      let product = p.product;
                      return (
                        <div key={key}>
                          <li>{product.title}</li>
                          <span>
                            {p.count} X {p.price}
                          </span>
                        </div>
                      );
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-semibold">
                    {NumberFormat(o.cartTotal)}
                  </td>
                  <td className="px-4 py-3 text-sm text-white ">
                    <span
                      className={`py-1 px-4 rounded-lg ${statusColor(
                        o.orderStatus
                      )}`}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <select
                      value={o.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(o.id, e.target.value)
                      }
                      name=""
                      id=""
                    >
                      <option disabled>Select Process</option>
                      <option>No Process</option>
                      <option>Processing</option>
                      <option>Complated</option>
                      <option>Canceled</option>
                    </select>
                  </td>
                </tr>
                {/* เพิ่ม rows เพิ่มเติมได้ตามต้องการ */}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default TableOrder;
