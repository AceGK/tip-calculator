import styles from "./styles.module.scss";
import { ChangeEvent, FC } from "react";

interface InputFieldProps {
  type: "text" | "password" | "email" | "number";
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
  required?: boolean;
  autoComplete?: string;
  align?: "left" | "right";
  prefix?: string;
}

const InputField: FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholderText,
  required = false,
  autoComplete = "off",
  align,
  prefix,
}) => {
  return (
    <div className={styles.inputContainer}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-labelledby={name}
        required={required}
        autoComplete={autoComplete}
        className={`${align === "right" ? styles.alignRight : styles.alignLeft} ${
          value ? styles.hasValue : ""
        } ${prefix ? styles.hasPrefix : ""}`}
        inputMode="decimal"
        pattern="^\d+(\.\d{0,2})?$"
      />
      <label className={styles.placeholderText} htmlFor={name} id={name}>
        <div className={styles.text}>{placeholderText}</div>
      </label>
    </div>
  );
};

export default InputField;
