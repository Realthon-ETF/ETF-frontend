import React from "react";
import styled from "styled-components";
import { Section } from "../profile/Profile.style";
import { InputGroup } from "../common/InputGroup";
import { EditButton } from "../common/EditButton";
import type { ProfileFormData } from "../../types/auth";

interface Props {
  data: ProfileFormData;
  isEditable: boolean;
  isLoading: boolean;
  onEditToggle: () => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  onOpenInterestModal?: () => void;
  onRemoveInterest?: (index: number) => void;
}

export const BasicInfoSection = ({
  data,
  isEditable,
  isLoading,
  onEditToggle,
  onChange,
  onOpenInterestModal,
  onRemoveInterest,
}: Props) => (
  <Section>
    <div className="section-header">
      <h2>기본 정보</h2>
      <EditButton
        isEditable={isEditable}
        isLoading={isLoading}
        onClick={onEditToggle}
      />
    </div>
    <div className="input-list">
      <InputGroup
        label="이름"
        id="user-name"
        type="string"
        name="name"
        placeholder="성함을 입력하세요"
        value={data.name}
        onChange={onChange}
        disabled={!isEditable}
      />
      <InputGroup
        label="전화번호"
        id="user-phone"
        type="tel"
        name="phone"
        placeholder="전화번호를 입력하세요"
        value={data.phone}
        onChange={onChange}
        disabled={!isEditable}
      />
      <InputGroup
        label="이메일"
        id="user-email"
        type="email"
        name="email"
        placeholder="이메일을 입력하세요"
        value={data.email}
        onChange={onChange}
        disabled={!isEditable}
      />
      <InputGroup
        label="학교"
        id="user-school"
        name="school"
        placeholder="예) 한국대학교"
        value={data.school}
        onChange={onChange}
        disabled={!isEditable}
      />
      <InputGroup
        label="학과"
        id="user-department"
        name="major"
        placeholder="예) 경영학과"
        value={data.major}
        onChange={onChange}
        disabled={!isEditable}
      />

      <InterestFieldRow>
        <InterestLabel>관심 직무</InterestLabel>
        <InterestContent>
          {isEditable && (
            <SelectButton
              type="button"
              onClick={onOpenInterestModal}
              disabled={isLoading}
            >
              직무 선택
            </SelectButton>
          )}
          {data.interestFields.length > 0 ? (
            <ChipList>
              {data.interestFields.map((field, idx) => (
                <Chip key={field + idx}>
                  <span>{field}</span>
                  {isEditable && onRemoveInterest && (
                    <ChipRemoveBtn
                      type="button"
                      onClick={() => onRemoveInterest(idx)}
                      aria-label={`${field} 삭제`}
                    >
                      &times;
                    </ChipRemoveBtn>
                  )}
                </Chip>
              ))}
            </ChipList>
          ) : (
            <EmptyText>선택된 관심 직무가 없습니다</EmptyText>
          )}
        </InterestContent>
      </InterestFieldRow>

      <InputGroup
        label="알림 주기"
        id="alarm-period"
        name="alarmPeriod"
        value={data.alarmPeriod}
        onChange={onChange}
        disabled={!isEditable}
        options={[
          { value: "", label: "선택" },
          ...[1, 2, 3, 4, 5, 6, 7].map((v) => ({
            value: v,
            label: String(v),
          })),
        ]}
        suffix="일마다 한 번씩"
      />

      <InputGroup
        label="알림 시간"
        id="alarm-time"
        name="alarmTime"
        value={data.alarmTime}
        onChange={onChange}
        disabled={!isEditable}
        options={[
          { value: "", label: "선택" },
          ...Array.from({ length: 24 }, (_, i) => ({
            value: i.toString().padStart(2, "0"),
            label: `${i.toString().padStart(2, "0")}:00`,
          })),
        ]}
        suffix="시에 알람을 받아요"
      />
    </div>
  </Section>
);

const InterestFieldRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  min-height: 2.125rem;

  @media (min-width: 769px) {
    gap: 1rem;
  }
`;

const InterestLabel = styled.label`
  color: #141618;
  font-size: 0.875rem;
  font-weight: 500;
  flex: 0 0 4.5rem;
  white-space: nowrap;
  padding-top: 0.5rem;

  @media (min-width: 769px) {
    font-size: 1rem;
    flex: 0 0 6rem;
  }
`;

const InterestContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  border: 1px solid #c2c4c8;
  background: #fff;
  color: #5a5c63;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #2e3847;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 1rem;
  background: #eef3ff;
  color: #3b6de0;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4;
`;

const ChipRemoveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #3b6de0;
  font-size: 0.9375rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const EmptyText = styled.span`
  color: #878a93;
  font-size: 0.875rem;
  padding-top: 0.5rem;
`;
