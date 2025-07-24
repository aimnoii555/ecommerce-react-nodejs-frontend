import FormProduct from "../../components/admin/FormProduct";
import ShowProducts from "../../components/admin/ShowProducts";
import useBearProvider from "../../providers/Provider";

const Product = () => {
  const isChangePage = useBearProvider((state) => state.isChangePage);
  const changePage = useBearProvider((state) => state.changePage);
  return (
    <div>
      <div>
        <button
          onClick={() => changePage(true)}
          className="border bg-green-400 px-5 py-1 rounded-md mt-3 text-white"
        >
          Add Product
        </button>
        <button
          onClick={() => changePage(false)}
          className="border bg-blue-400 px-5 py-1 rounded-md mt-3 text-white"
        >
          Show Product
        </button>
      </div>
      {isChangePage ? <FormProduct /> : <ShowProducts />}
    </div>
  );
};

export default Product;
