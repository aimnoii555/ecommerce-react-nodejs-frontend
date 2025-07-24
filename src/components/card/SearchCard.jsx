import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import useBearProvider from "../../providers/Provider";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const storeState = useBearProvider((state) => state);
  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([10000, 30000]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    storeState.getCategory();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value) => {
      storeState.searchFilter({ query: value });
      if (!value.trim()) {
        storeState.getProduct();
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    debouncedSearch(value);
  };

  const handleCheckBox = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }

    setCategorySelected(inState);

    if (inState.length > 0) {
      storeState.searchFilter({
        category: inState,
      });
    } else {
      storeState.getProduct();
    }
  };

  useEffect(() => {
    storeState.searchFilter({ price });
  }, [status]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setStatus(!status);
    }, 300);
  };
  return (
    <div>
      <input
        onChange={handleChange}
        value={text}
        type="search"
        placeholder="Search for..."
        className="text-xl border w-full focus:ring-2 focus:outline-none rounded-sm px-2"
      />
      <hr className="mt-5" />
      <div>
        <h1 className="text-xl mb-4">Category</h1>
        {storeState.categories.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              id={`checkbox-${item.id}`}
              onChange={handleCheckBox}
              type="checkbox"
              value={item.id}
            />
            <label className="cursor-pointer" htmlFor={`checkbox-${item.id}`}>
              {item.name}
            </label>
          </div>
        ))}
      </div>
      <hr className="mt-5" />
      <div>
        <h1 className="mb-8">Search By Price</h1>
        <div>
          <div className="flex justify-between">
            <span className="text-sm">Min: {price[0]}</span>
            <span className="text-sm">Max: {price[1]}</span>
          </div>
          <Slider
            defaultValue={[5000, 30000]}
            range
            min={0}
            max={100000}
            onChange={handlePrice}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
