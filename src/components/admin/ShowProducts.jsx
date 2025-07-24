import React from "react";
import useBearProvider from "../../providers/Provider";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { deletePrdouct } from "../../services/product";
import { NumberFormat } from "../../utils/NumberFormat";

const ShowProducts = () => {
  const MySwal = withReactContent(Swal);

  const products = useBearProvider((state) => state.products);
  const token = useBearProvider((state) => state.token);
  const getProduct = useBearProvider((state) => state.getProduct);

  const handleDelete = (id) => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "Are you sure to delete!",
        icon: "warning",
        confirmButtonColor: "red",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          deletePrdouct(token, id)
            .then(() => {
              Swal.fire({ title: "Deleted Success", icon: "success" });
              getProduct();
            })
            .catch((err) => Swal.fire("เกิดข้อผิดพลาด", err.message, "error"));
        }
      });
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="overflow-x-auto mt-6 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-medium">
          <tr>
            <th className="px-6 py-3 text-left">#</th>
            <th className="px-12 py-3 text-center">Image</th>
            <th className="px-6 py-3 text-left">Product Name</th>
            <th className="px-6 py-3 text-left">Detail</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Quantity</th>
            <th className="px-6 py-3 text-left">Sold</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Created</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((item, index) => {
            return (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4">
                  {item.images.length > 0 ? (
                    <img
                      className="w-30 h-24 object-cover"
                      src={item.images[0].url}
                      alt=""
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4 line-clamp-10">{item.description}</td>
                <td className="px-6 py-4">{NumberFormat(item.price)}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.sold}</td>
                <td className="px-6 py-4">{item.category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString("th-TH")}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      to={"/admin/product/" + item.id}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProducts;
