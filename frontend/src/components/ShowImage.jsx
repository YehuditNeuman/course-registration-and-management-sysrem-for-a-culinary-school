import React, { useState, useEffect } from "react";

import { getImageFromServer } from "../api/courseService";


const ShowImage = ({ url }) => {

  const [image, setImage] = useState("");
  useEffect(() => {
    console.log("course.url:", url);
    const getImages = async () => {
      try {
        let res = await getImageFromServer(url);
        console.log("Image URL:", res.data);

        setImage(URL.createObjectURL(res.data));
      } catch (err) {
        console.log({ Title: "Can't get image", message: err.message });
      }
    };
    console.log("Image URL:", image);
    getImages();
  }, [url]);

  return (
    <>
      {image && (
        <img
          src={image}
          alt={url}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
      )}
    </>

  );
}

export default ShowImage;