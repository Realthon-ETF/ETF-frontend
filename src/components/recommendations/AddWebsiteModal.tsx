import styled from "styled-components";

interface AddWebsiteModalProps {
  onClose: () => void;
  onGoToProfile: () => void;
}

export function AddWebsiteModal({ onClose, onGoToProfile }: AddWebsiteModalProps) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>해당 사이트를 내 웹사이트에 등록했어요</ModalTitle>
        <ModalButtons>
          <ModalSecondaryBtn type="button" onClick={onClose}>
            계속 탐색하기
          </ModalSecondaryBtn>
          <ModalPrimaryBtn type="button" onClick={onGoToProfile}>
            내 웹사이트로 가기
          </ModalPrimaryBtn>
        </ModalButtons>
      </ModalBox>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2.5rem 2rem 2rem;
  width: 90%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
`;

const ModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #141618;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;

const ModalSecondaryBtn = styled.button`
  flex: 1;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e1e2e4;
  background: #fff;
  color: #141618;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f7f8fa;
  }
`;

const ModalPrimaryBtn = styled.button`
  flex: 1;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: none;
  background: #06f;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056d2;
  }
`;
