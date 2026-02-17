import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  margin-bottom: 3rem;

  /* Fade in animation for tab switching */
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h2 {
      color: #141618;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    button {
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
    }
  }

  .input-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #eaebec;
  background: ${(props) => (props.disabled ? "#f7f8fa" : "#fff")};
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  resize: none;
  overflow: hidden;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2e3847;
  }
`;
