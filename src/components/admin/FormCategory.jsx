import React, { useEffect, useState } from "react";
import useBearProvider from "../../providers/Provider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/category";
import { toast } from "react-toastify";

const FormCategory = () => {
  const MySwal = withReactContent(Swal);

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const token = useBearProvider((state) => state.token);
  // const [categories, setCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const categories = useBearProvider((state) => state.categories);
  const getCategory = useBearProvider((state) => state.getCategory);

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createCategory(token, { name: categoryName });
      console.log("res", res);
      toast.success(res.data);
      getCategory(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleted = async (id) => {
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
          deleteCategory(token, id)
            .then(() => {
              Swal.fire("Deleted Success");
              getCategory(token);
            })
            .catch((err) => Swal.fire("เกิดข้อผิดพลาด", err.message, "error"));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setDataUpdate = (name, id) => {
    setCategoryName(name);
    setCategoryId(id);
    setIsUpdate(true);
  };

  const handleUpdated = async () => {
    try {
      const res = await updateCategory(
        token,
        { name: categoryName },
        categoryId
      );
      toast.success("Updated Category successfully");
      getCategory(token);
      setCategoryName("");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleEdit = async (item, id) => {
  //   try {
  //     const res = await updateCategory(token, item, id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div className="container mx-auto p-4 bg-white shadow-md">
        <h1>Manage Category</h1>
      </div>

      <div className="container mt-5 mx-auto py-4 px-4 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            value={categoryName || ""}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="w-full px-4 py-2 border mt-1 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-lg"
          />
          <div>
            {!isUpdate ? (
              <button
                type="submit"
                className="mr-2 bg-gradient-to-r text-white py-1 rounded-lg  mt-2 px-4 from-blue-600 to-green-500"
              >
                Add
              </button>
            ) : (
              <div>
                <button
                  onClick={() => handleUpdated()}
                  type="button"
                  className="mr-2 bg-gradient-to-r text-white py-1 rounded-lg  mt-2 px-4 from-blue-600 to-green-500"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsUpdate(false);
                    setCategoryName("");
                  }}
                  className="mr-2 bg-gradient-to-r text-white py-1 rounded-lg  mt-2 px-4 from-red-600 to-red-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="container bg-white mt-5 py-4 px-4 shadow-md mx-auto">
        <ul>
          {categories.map((item, index) => (
            <li key={index} className="justify-between flex py-2">
              <span>{item.name}</span>{" "}
              <div>
                <button
                  onClick={() => setDataUpdate(item.name, item.id)}
                  className="bg-yellow-500 rounded-lg py-1 px-3 hover:bg-yellow-400 text-white mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleted(item.id)}
                  className="bg-red-600 rounded-lg py-1 px-3 hover:bg-red-400 text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormCategory;
