// reusable button component with default styling
// accepts all standard button props plus custom classes
const Button = ({
  children, // content inside the button
  type = "button", // default to regular button type
  className = "", // allow for additional styling
  ...props // catch any other props passed in
}) => {
  return (
    <button
      type={type} // set button type (button/submit/reset)
      // base styling + any custom classes passed in
      className={`px-4 py-2 rounded-md font-medium ${className}`}
      {...props} // spread any additional props
    >
      {children} {/* render button content */}
    </button>
  );
};

export default Button;
