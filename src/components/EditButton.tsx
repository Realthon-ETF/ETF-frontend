import styled from "styled-components";
import editicon from "../assets/images/edit-icon.svg";

interface EditButtonProps {
  isEditable: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export const EditButton = ({
  isEditable,
  isLoading,
  onClick,
}: EditButtonProps) => {
  return (
    <StyledButton type="button" onClick={onClick} disabled={isLoading}>
      {isEditable ? "수정 완료" : "수정"}
      <img src={editicon} alt="edit" />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  padding: 0.25rem 0.5rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid #eaebec;
  background: #fff;
  color: #5a5c63;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f7f8fa;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background: #f0f0f0;
  }

  img {
    width: 1rem;
    height: 1rem;
  }
`;
