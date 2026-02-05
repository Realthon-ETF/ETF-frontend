import React from "react";
import { Section, SelectRow } from "../profile/Profile.style";
import { InputGroup } from "../input-group";
import { EditButton } from "../EditButton";
import type { ProfileFormData } from "../../types/auth";

interface Props {
  data: ProfileFormData;
  isEditable: boolean;
  isLoading: boolean;
  onEditToggle: () => void;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export const BasicInfoSection = ({
  data,
  isEditable,
  isLoading,
  onEditToggle,
  onChange,
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
      <InputGroup
        label="관심 직무"
        id="user-interest"
        name="interest"
        placeholder="예) UI/UX 디자인"
        value={data.interest}
        onChange={onChange}
        disabled={!isEditable}
      />

      {/* Custom Selects */}
      <SelectRow>
        <label htmlFor="alarm-period">알림 주기</label>
        <div className="select-wrapper">
          <select
            id="alarm-period"
            name="alarmPeriod"
            value={data.alarmPeriod}
            onChange={onChange}
            disabled={!isEditable}
          >
            <option value="">선택</option>
            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <span>일마다 한 번씩</span>
        </div>
      </SelectRow>

      <SelectRow>
        <label htmlFor="alarm-time">알림 시간</label>
        <div className="select-wrapper">
          <select
            id="alarm-time"
            name="alarmTime"
            value={data.alarmTime}
            onChange={onChange}
            disabled={!isEditable}
          >
            <option value="">선택</option>
            {Array.from({ length: 24 }).map((_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}:00
              </option>
            ))}
          </select>
          <span>시에 알람을 받아요</span>
        </div>
      </SelectRow>
    </div>
  </Section>
);
