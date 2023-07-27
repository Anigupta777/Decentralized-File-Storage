import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    console.log("Shared");
  };

  const removing = async () => {
    const address = document.querySelector(".address").value;
    await contract.disallow(address);
    console.log("Removed");
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.sharedAccessList();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let elem = document.createElement("option");
        elem.textContent = opt;
        elem.value = opt;
        select.appendChild(elem);
      }
    };
    contract && accessList();
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share with</div>
        <div className="body">
          <input type="text" className="address" placeholder="Enter Address" />
        </div>
        <form id="myForm">
          <select id="selectNumber">
            <option className="address">People With Access</option>
          </select>
        </form>
        <div className="footer">
          <button onClick={() => setModalOpen(false)} id="cancelBtn">
            Close
          </button>
          <button onClick={() => sharing()}>Share</button>
          <button onClick={() => removing()}>Remove</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
