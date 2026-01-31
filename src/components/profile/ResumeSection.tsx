import React from "react";
import editicon from "../../assets/images/edit-icon.svg";
import { Section, StyledTextArea } from "../profile/Profile.style";

interface ResumeSectionProps {
  summary: string;
  isEditable: boolean;
  isLoading: boolean;
  onEditToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ResumeSection = ({
  summary,
  isEditable,
  isLoading,
  onEditToggle,
  onChange,
}: ResumeSectionProps) => {
  return (
    <Section>
      <div className="section-header">
        <h2>이력서 요약 정보</h2>
        <button type="button" onClick={onEditToggle} disabled={isLoading}>
          {isEditable ? "완료" : "수정"}
          <img src={editicon} alt="edit" />
        </button>
      </div>

      <StyledTextArea
        name="summary"
        value={summary}
        onChange={onChange}
        disabled={!isEditable}
        placeholder="이력서 요약을 입력해주세요."
        spellCheck={false}
      />
    </Section>
  );
};
