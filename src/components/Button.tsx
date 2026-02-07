// import styled from "styled-components";

// export const Button = styled.button`
//   display: inline-flex;
//   align-items: center;
//   border-width: 0;
//   color: #eaebec;
//   text-align: center;
// `;

import styled from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0.5rem;

  padding: 0.625rem 1.25rem;

  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
  background-color: #06f;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0056d2;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #c2c4c8;
    opacity: 0.8;
    transform: none !important;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;
