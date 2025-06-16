// reusable input field with optional label
// handles text, email, password and other input types
const Input = ({ label, id, type = "text", className = "", ...props }) => {
  return (
    // container with bottom margin for spacing
    <div className="mb-4">
      {/* only show label if provided */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-1" // label styling
        >
          {label}
        </label>
      )}

      {/* the actual input element */}
      <input
        id={id} // connects to label
        type={type} // input type
        className={`w-full px-3 py-2 border rounded-md ${className}`} // base + custom styles
        {...props} // pass through all other props
      />
    </div>
  );
};

export default Input;
