// src/components/UI/Input.jsx

const Input = ({ label, id, type = "text", className = "", ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full px-3 py-2 border rounded-md ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
