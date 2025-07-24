import { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../services/product";
import useBearProvider from "../../providers/Provider";
import Loading from "../../../public/Loading_icon.gif";

const UploadFile = ({ form, setForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRemoveImg, setIsLoadingRemoveImg] = useState({
    index: false,
  });

  const token = useBearProvider((state) => state.token);

  const handleDeleteImg = (publicId, index) => {
    const images = form.img;
    setIsLoadingRemoveImg((prev) => ({
      ...prev,
      [index]: true,
    }));
    removeFiles(token, publicId)
      .then((result) => {
        const filterImages = images.filter((item) => {
          return item.public_id !== publicId;
        });

        // console.log("result", result);

        setForm({
          ...form,
          img: filterImages,
        });

        setIsLoadingRemoveImg((prev) => ({
          ...prev,
          [index]: false,
        }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.img;

      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        if (!files[i].type.startsWith("image/")) {
          toast.error("Please Upload File type image " + files[i].name);
          continue;
        }

        // image resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            uploadFiles(token, uri)
              .then((result) => {
                allFiles.push(result.data);

                setForm({
                  ...form,
                  img: allFiles,
                });
                setIsLoading(false);
                toast.success("Upload Image Success");
              })
              .catch((err) => {
                console.log("err", err);
              });
          },
          "base64"
        );
      }
    }
  };

  return (
    <div>
      <div>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
          className="border mt-5"
        />
      </div>
      <div className="mt-4 flex gap-3">
        {isLoading && <img src={Loading} alt="" className="w-32" />}
        {form.img.map((item, index) => {
          return (
            <div key={index} className="relative">
              <img
                className="w-40 h-36 bg-color object-cover"
                src={item.url}
                alt=""
              />

              <div className="absolute flex top-0 cursor-pointer right-0 w-6 justify-center bg-gray-200 hover:scale-105 hover:ring-2 to-white">
                {isLoadingRemoveImg[index] ? (
                  <img src={Loading} alt="" />
                ) : (
                  <span onClick={() => handleDeleteImg(item.public_id, index)}>
                    X
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadFile;
