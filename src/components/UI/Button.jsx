/**
 * Reusable button component with default styling.
 * Accepts all standard button props plus custom CSS classes.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Content inside the button.
 * @param {string} [props.type="button"] - Button type (button, submit, reset).
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @returns JSX.Element
 */
const Button = ({
  children, // content inside the button
  type = "button", // default button type
  className = "", // additional styling classes
  ...props // other props
}) => {
  return (
    <button
      type={type} // set button type
      className={`px-4 py-2 rounded-md font-medium ${className}`} // base + custom styles
      {...props} // spread extra props
    >
      {children} {/* button content */}
    </button>
  );
};

export default Button;
