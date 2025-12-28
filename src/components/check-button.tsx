// import styled from "styled-components";

// interface AgreementCheckProps {
//   // The specific type for button click events
//   onClick: React.MouseEventHandler<HTMLButtonElement>;
//   // Standard boolean for the disabled state
//   disabled: boolean;
//   // Your custom state for the UI toggle
//   isAgreed: boolean;
// }

// const CheckButton = ({ onClick, disabled }: AgreementCheckProps) => {
//   return (
//     <button onClick={onClick} disabled={disabled} type="button">
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <circle cx="12" cy="12" r="12" fill="none" />
//         <path
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M17.4458 8.61395C17.5614 8.72952 17.5614 8.9169 17.4458 9.03248L10.315 16.1633C10.1994 16.2789 10.012 16.2789 9.89643 16.1633L6.55445 12.8213C6.43888 12.7058 6.43888 12.5184 6.55445 12.4028L7.33172 11.6256C7.44729 11.51 7.63468 11.51 7.75025 11.6256L10.1057 13.981L16.25 7.83668C16.3656 7.72111 16.553 7.72111 16.6685 7.83668L17.4458 8.61395Z"
//           fill="white"
//         />
//       </svg>
//     </button>
//   );
// };

// styled(CheckButton)<{ $isAgreed: boolean }>`
//   width: 1.5rem;
//   height: 1.5rem;
//   flex-shrink: 0;
//   border-radius: 0.75rem;
//   align-items: center;
//   justify-content: center;
//   border: none;
//   padding: 0;
//   cursor: pointer;
//   transition: background-color 0.2s ease;
//   background-color: ${(props) => (props.$isAgreed ? "#06F" : "#C2C5C8")};
// `;

// export default CheckButton;

import styled from "styled-components";

interface AgreementCheckProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  $isAgreed: boolean; // Used for logic
  className?: string; // Required for styled(CheckButton) to work
}

const CheckButton = ({ onClick, disabled, className }: AgreementCheckProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={className} // Styled-components injects the styles here
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="none" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.4458 8.61395C17.5614 8.72952 17.5614 8.9169 17.4458 9.03248L10.315 16.1633C10.1994 16.2789 10.012 16.2789 9.89643 16.1633L6.55445 12.8213C6.43888 12.7058 6.43888 12.5184 6.55445 12.4028L7.33172 11.6256C7.44729 11.51 7.63468 11.51 7.75025 11.6256L10.1057 13.981L16.25 7.83668C16.3656 7.72111 16.553 7.72111 16.6685 7.83668L17.4458 8.61395Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

// Create the styled version
const StyledCheckButton = styled(CheckButton)<{ $isAgreed: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  display: flex; /* Added to center the SVG */
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.$isAgreed ? "#06F" : "#C2C5C8")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default StyledCheckButton;
