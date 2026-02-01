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

  border-width: 0;
  border: none;

  text-align: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: #eaebec;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* Global Disabled/Loading State 
     This handles both strict 'disabled' and 'isLoading' if passed as disabled
  */
  &:disabled {
    cursor: not-allowed;
    background-color: #c2c4c8; /* Common grey used in your examples */
    opacity: 0.8;
    transform: none !important; /* Prevent hover lifts when disabled */
  }
`;
