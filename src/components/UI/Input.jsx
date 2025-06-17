/**
 * Reusable input field component with optional label.
 * Supports various input types such as text, email, password, etc.
 *
 * @param {object} props - Component props.
 * @param {string} [props.label] - Optional label text.
 * @param {string} props.id - Unique ID for the input and label association.
 * @param {string} [props.type="text"] - Input type attribute.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @returns JSX.Element
 */
const Input = ({ label, id, type = "text", className = "", ...props }) => {
  return (
    <div className="mb-4"> {/* container with bottom margin for spacing */}
      {label && (
        <label
          htmlFor={id} // links label to input
          className="block text-sm font-medium mb-1" // label styling
        >
          {label}
        </label>
      )}

      <input
        id={id} // connects to label
        type={type} // input type attribute
        className={`w-full px-3 py-2 border rounded-md ${className}`} // base + custom styles
        {...props} // spread remaining props
      />
    </div>
  );
};

export default Input;
