// import styled from "styled-components";

// interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   id: string;
//   duplicateCheck?: boolean;
//   onCheckDuplicate?: (value: string) => Promise<void>;
// }

// export const InputGroup = ({
//   label,
//   id,
//   duplicateCheck,
//   onCheckDuplicate,
//   ...props
// }: InputGroupProps) => {
//   const handleBtnClick = (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent form submission
//     if (onCheckDuplicate && props.value) {
//       onCheckDuplicate(props.value as string);
//     }
//   };

//   return (
//     <Container>
//       <label htmlFor={id}>
//         {label}
//         {props.required ? <span style={{ color: "red" }}> *</span> : null}
//       </label>
//       <input id={id} {...props} />
//       {duplicateCheck ? (
//         <DuplicateCheckBtn
//           type="button"
//           $isFilled={props.value !== ""}
//           onClick={handleBtnClick}
//         >
//           중복 확인
//         </DuplicateCheckBtn>
//       ) : null}
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

// const DuplicateCheckBtn = styled.button<{ $isFilled: boolean }>`
//   display: flex;
//   padding: 0.5rem 0.875rem;
//   align-items: center;
//   gap: 0.625rem;
//   border-radius: 1.25rem;
//   border: none;
//   background: ${(props) => (props.$isFilled ? "#06F" : "#e1e2e4")};
//   color: ${(props) => (props.$isFilled ? "#F7F7F8" : "#70737C")};
//   text-align: center;
//   font-size: 0.875rem;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 130%;
//   letter-spacing: -0.0175rem;
// `;
import styled from "styled-components";

// Define strict types for the status
export type ValidationStatus = "default" | "valid" | "invalid";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  duplicateCheck?: boolean;
  onCheckDuplicate?: (value: string) => Promise<void>;
  // New props for validation
  validationStatus?: ValidationStatus;
  validationMessage?: string;
}

export const InputGroup = ({
  label,
  id,
  duplicateCheck,
  onCheckDuplicate,
  validationStatus = "default",
  validationMessage,
  ...props
}: InputGroupProps) => {
  const handleBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCheckDuplicate && props.value) {
      onCheckDuplicate(props.value as string);
    }
  };

  return (
    <OuterWrapper>
      <InputRow>
        <label htmlFor={id}>
          {label}
          {props.required ? <span style={{ color: "red" }}> *</span> : null}
        </label>
        <StyledInput id={id} $status={validationStatus} {...props} />
        {duplicateCheck ? (
          <DuplicateCheckBtn
            type="button"
            $isFilled={props.value !== ""}
            onClick={handleBtnClick}
          >
            중복 확인
          </DuplicateCheckBtn>
        ) : null}
      </InputRow>

      {/* Conditionally render the message underneath */}
      {validationMessage && (
        <Message $status={validationStatus}>{validationMessage}</Message>
      )}
    </OuterWrapper>
  );
};

// --- Styled Components ---

const OuterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  label {
    color: #141618;
    font-size: 1rem;
    font-weight: 500;
    min-width: 5rem;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    label {
      font-size: 0.9rem;
    }
  }
`;

// Separate Input styled component to handle dynamic border
const StyledInput = styled.input<{ $status: ValidationStatus }>`
  flex: 1;
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 1.25rem;

  /* Logic: Red border if invalid, otherwise default gray */
  border: 1px solid
    ${({ $status }) => ($status === "invalid" ? "#FF4242" : "#c2c4c8")};

  transition: border-color 0.2s;

  &:focus {
    outline: none;
    /* Maintain error color on focus if invalid, otherwise brand color */
    border-color: ${({ $status }) =>
      $status === "invalid" ? "#FF4242" : "#2e3847"};
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
  }
`;

const DuplicateCheckBtn = styled.button<{ $isFilled: boolean }>`
  display: flex;
  padding: 0.5rem 0.875rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  border: none;
  background: ${(props) => (props.$isFilled ? "#06F" : "#e1e2e4")};
  color: ${(props) => (props.$isFilled ? "#F7F7F8" : "#70737C")};
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${(props) => (props.$isFilled ? "pointer" : "default")};
  white-space: nowrap;
`;

const Message = styled.p<{ $status: ValidationStatus }>`
  /* Align message with input: Label (5rem) + Gap (1rem) = 6rem */
  padding-left: 6rem;
  margin: 0;
  font-size: 0.85rem;

  /* Red for invalid, Blue for valid (success) */
  color: ${({ $status }) => ($status === "invalid" ? "#FF4242" : "#06F")};

  @media (max-width: 480px) {
    padding-left: 0;
  }
`;
