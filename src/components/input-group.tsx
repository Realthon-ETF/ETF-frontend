// rendering old version of component
// import styled from "styled-components";

// interface InputGroupProps {
//   label: string;
//   id: string;
//   type?: string;
//   placeholder?: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   required?: boolean;
//   disabled?: boolean;
// }

// export const InputGroup = ({
//   label,
//   id,
//   type = "text",
//   placeholder,
//   name,
//   value,
//   onChange,
//   required,
//   disabled,
// }: InputGroupProps) => {
//   return (
//     <InputGroupWrapper disabled={disabled}>
//       <label htmlFor={id}>{label}</label>
//       <input
//         id={id}
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         disabled={disabled}
//       />
//     </InputGroupWrapper>
//   );
// };

// const InputGroupWrapper = styled.div<{ disabled?: boolean }>`
//   display: flex;
//   width: 27.8125rem;
//   justify-content: space-between;
//   align-items: center;

//   label {
//     color: #141618;
//     font-size: 1rem;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 130%;
//   }

//   input {
//     display: flex;
//     width: 21.625rem;
//     padding: 0.5rem 1rem;
//     align-items: center;
//     gap: 0.625rem;
//     flex-shrink: 0;
//     border-radius: 1.25rem;
//     border: 1px solid #c2c4c8;

//     // background-color: ${(props) =>
//       props.disabled ? "transparent" : "#ffffff"};

//     // &:focus {
//     //   outline: none;
//     //   border-color: #2e3847;
//     // }

//     &:disabled {
//       border: 1px solid #fff;
//       outline: none;
//       background-color: transparent;
//     }
//   }
// `;

import styled from "styled-components";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const InputGroup = ({ label, id, ...props }: InputGroupProps) => {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%; /* Take full width of parent */
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  label {
    color: #141618;
    font-size: 1rem;
    font-weight: 500;
    min-width: 5rem; /* Ensure label alignment */
    white-space: nowrap;
  }

  input {
    flex: 1; /* Input takes remaining space */
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 1.25rem;
    border: 1px solid #c2c4c8;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #2e3847;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
    }
  }

  /* Mobile: Stack label on top of input */
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    label {
      font-size: 0.9rem;
    }
  }
`;

// 두 버전 이전의 input-group.tsx 코드
// import styled from "styled-components";

// interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   id: string;
// }

// export const InputGroup = ({ label, id, ...props }: InputGroupProps) => {
//   return (
//     <Container>
//       <label htmlFor={id}>{label}</label>
//       <input id={id} {...props} />
//     </Container>
//   );
// };

// const Container = styled.div`
//   display: flex;
//   width: 100%; /* Take full width of parent */
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;

//   label {
//     color: #141618;
//     font-size: 1rem;
//     font-weight: 500;
//     min-width: 5rem; /* Ensure label alignment */
//     white-space: nowrap;
//   }

//   input {
//     flex: 1; /* Input takes remaining space */
//     width: 100%;
//     padding: 0.8rem 1rem;
//     border-radius: 1.25rem;
//     border: 1px solid #c2c4c8;
//     transition: border-color 0.2s;

//     &:focus {
//       outline: none;
//       border-color: #2e3847;
//     }

//     &:disabled {
//       background-color: #f5f5f5;
//       color: #999;
//     }
//   }

//   /* Mobile: Stack label on top of input */
//   @media (max-width: 480px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 0.5rem;

//     label {
//       font-size: 0.9rem;
//     }
//   }
// `;
