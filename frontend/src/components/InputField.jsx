import React from "react";

const InputField = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      {...props}
    />
  </div>
);

export default InputField;
