/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getData = async () => {
    let dataArray;
    const typedAddress = document.querySelector(".address").value;

    try {
      if (typedAddress) {
        dataArray = await contract.display(typedAddress);
        // console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
      const isEmpty = Object.keys(dataArray).length === 0;

      if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");
        // console.log(str);
        // console.log(str_array);
        const images = str_array.map((item, i) => {
          return (
            <a href={item} key={i} target="_blank">
              <img
                src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                alt="pic"
                className="image-list"
                width="100px"
              />
            </a>
          );
        });
        setData(images);
      } else {
        alert("No Image to display.");
      }
    } catch(e) {
      alert("You don't have access!");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input type="text" placeholder="Enter Address" className="address" />
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};
export default Display;
