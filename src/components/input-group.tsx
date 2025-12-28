import styled from "styled-components";

interface InputGroupProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export const InputGroup = ({
  label,
  id,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required,
  disabled,
}: InputGroupProps) => {
  return (
    <InputGroupWrapper>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </InputGroupWrapper>
  );
};

const InputGroupWrapper = styled.div`
  display: flex;
  width: 27.8125rem;
  justify-content: space-between;
  align-items: center;

  label {
    color: #141618;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
  }

  input {
    display: flex;
    width: 21.625rem;
    padding: 0.5rem 1rem;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    border: 1px solid #c2c4c8;

    &:focus {
      outline: none;
      border-color: #2e3847;
    }

    &:disabled {
      background-color: #f5f5f5;
    }
  }
`;
