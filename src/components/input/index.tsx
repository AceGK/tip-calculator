import styles from './styles.module.scss';
import { useState, ChangeEvent, FC } from 'react';

interface InputFieldProps {
  type: 'text' | 'password' | 'email' | 'number';
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
  required?: boolean;
  autoComplete?: string;
  align?: 'left' | 'right';
}

const InputField: FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholderText,
  required = false,
  autoComplete = 'off',
  align,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type={getInputType()}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-labelledby={name}
        required={required}
        autoComplete={autoComplete}
        className={align === 'right' ? styles.alignRight : styles.alignLeft}
      />
      <label className={styles.placeholderText} htmlFor={name} id={name}>
        <div className={styles.text}>{placeholderText}</div>
      </label>
    </div>
  );
};

export default InputField;