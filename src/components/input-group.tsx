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
  align-items: center;
  // gap: 1rem;
  gap: 0.75rem; /* Reduced slightly for mobile spacing */
  min-height: 2.125rem;

  label {
    color: #141618;
    font-size: 0.875rem;
    font-weight: 500;
    // min-width: fit-content;
    /* FIX: Set a consistent width for mobile */
    flex: 0 0 4.5rem; /* Grow: 0, Shrink: 0, Basis: 4.5rem */
    white-space: nowrap;
    // flex-shrink: 0;
  }

  @media (min-width: 769px) {
    gap: 1rem;

    label {
      font-size: 1rem;
      // min-width: 5rem;
      /* Adjust basis for larger screens if needed */
      flex: 0 0 6rem;
    }
  }
`;

const StyledInput = styled.input<{ $status: ValidationStatus }>`
  flex: 1;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  border: 1px solid
    ${({ $status }) => ($status === "invalid" ? "#FF4242" : "#c2c4c8")};
  transition: border-color 0.2s;
  color: #141618;
  font-family: inherit;

  &::placeholder {
    color: #5a5c63;
  }

  &:focus {
    outline: none;
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
  gap: 0.125rem;
  border-radius: 1.25rem;
  border: ${(props) =>
    props.$isFilled ? "1px solid #06F" : "1px solid transparent"};
  background: ${(props) => (props.$isFilled ? "#06F" : "#e1e2e4")};
  color: ${(props) => (props.$isFilled ? "#F7F7F8" : "#70737C")};
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: ${(props) => (props.$isFilled ? "pointer" : "default")};
  white-space: nowrap;
  flex-shrink: 0;
`;

const Message = styled.p<{ $status: ValidationStatus }>`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ $status }) => ($status === "invalid" ? "#FF4242" : "#06F")};
  /* Align with input on mobile: flex-start means label takes space */
  // margin-left: auto;
  // padding-right: 0.5rem;

  /* FIX: Match the flex-basis of the label + the gap of InputRow */
  /* Mobile: 4.5rem (label) + 0.75rem (gap) = 5.25rem */
  padding-left: 5.25rem;

  @media (min-width: 769px) {
    /* Align message with input: Label (5rem) + Gap (1rem) = 6rem */
    // padding-left: 6rem;
    /* Desktop: 6rem (label) + 1rem (gap) = 7rem */
    padding-left: 7rem;
    // margin-left: 0;
    padding-right: 0;
  }
`;
