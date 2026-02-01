import styled from "styled-components";

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
  align-items: stretch;
  gap: 1rem;
  min-height: 2.125rem;

  label {
    color: #141618;
    font-size: 1rem;
    font-weight: 500;
    min-width: 5rem; /* Ensure label alignment */
    white-space: nowrap;
    display: flex;
    align-items: center;
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

const StyledInput = styled.input<{ $status: ValidationStatus }>`
  flex: 1;
  width: 100%;
  // padding: 0.8rem 1rem;
  padding: 0rem 1rem;
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
