import { useEffect, useState } from "react";
import useBearProvider from "../../providers/Provider";
import { createProduct } from "../../services/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";

const initialState = {
  title: "",
  price: "",
  description: "",
  categoryId: "",
  qty: "",
  img: [],
};

const FormProduct = () => {
  const token = useBearProvider((state) => state.token);
  const getCategory = useBearProvider((state) => state.getCategory);
  const categories = useBearProvider((state) => state.categories);

  const getProduct = useBearProvider((state) => state.getProduct);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createProduct(token, form);
      toast.success("Created Product success");
      getProduct();
      setForm(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-white mx-auto py-4 px-2 shadow-md mt-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            value={form.title}
            required
            className="border w-full py-2 px-1 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Product Name"
          />
          <textarea
            type="text"
            rows={6}
            name="description"
            onChange={handleOnChange}
            value={form.description}
            className="mt-4 border w-full py-2 px-1 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Description"
          />
          <input
            type="number"
            name="price"
            required
            onChange={handleOnChange}
            value={form.price}
            className="mt-4 border w-full py-2 px-1 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Price"
          />
          <input
            type="number"
            name="qty"
            required
            onChange={handleOnChange}
            value={form.qty}
            className="mt-4 border w-full py-2 px-1 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Quantity"
          />

          <select
            name="categoryId"
            required
            value={form.categoryId}
            id=""
            className="w-full border px-2 py-2 mt-5 rounded-lg"
            onChange={handleOnChange}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <UploadFile form={form} setForm={setForm} />

          <br />
          <button className="border bg-green-400 px-5 py-1 rounded-md mt-3 text-white">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormProduct;
