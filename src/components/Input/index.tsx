type Props = {
  onChange?: (str: string) => void;
  placeholder?: string;
  name?: string;
  value?: string;
  props?: any;
};
function Input({ onChange, name, placeholder, value = "", ...props }: Props) {
  console.log(props, "+++++");

  return (
    <input
      onChange={(event) => onChange && onChange(event.target.value)}
      name={name}
      placeholder={placeholder}
      value={value}
      {...props.props}
    />
  );
}

export default Input;
