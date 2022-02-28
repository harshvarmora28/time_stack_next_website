import React from "react";

const ModalSetting = () => {
  return (
    <>
      <div className="absolute h-full w-full left-0 top-0 bg-black bg-opacity-30"></div>
      <div className="max-w-xl bg-white absolute sm:w-96 w-11/12 left-1/2 top-1/2 p-5 rounded-md" style={{
          transform: "translate(-50%, -50%)"
      }}>
        <h1>Time setting</h1>
      </div>
    </>
  );
};

export default ModalSetting;
