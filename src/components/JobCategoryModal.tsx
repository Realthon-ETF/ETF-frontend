import { useState, useEffect } from "react";
import styled from "styled-components";
import { jobCategories } from "../data/jobCategories";

interface JobCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelected: string[];
  onConfirm: (selected: string[]) => void;
}

const makeKey = (p: string, s: string, t: string) => `${p}|${s}|${t}`;

export const JobCategoryModal = ({
  isOpen,
  onClose,
  initialSelected,
  onConfirm,
}: JobCategoryModalProps) => {
  const [activePrimary, setActivePrimary] = useState<string | null>(null);
  const [activeSecondary, setActiveSecondary] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setSelected(new Set(initialSelected));
      setActivePrimary(null);
      setActiveSecondary(null);
    }
  }, [isOpen, initialSelected]);

  const primaryKeys = Object.keys(jobCategories);
  const secondaryKeys = activePrimary
    ? Object.keys(jobCategories[activePrimary])
    : [];
  const tertiaryItems =
    activePrimary && activeSecondary
      ? (jobCategories[activePrimary]?.[activeSecondary] ?? [])
      : [];

  const hasPrimarySelection = (p: string) =>
    Array.from(selected).some((key) => key.startsWith(`${p}|`));

  const hasSecondarySelection = (p: string, s: string) =>
    Array.from(selected).some((key) => key.startsWith(`${p}|${s}|`));

  const toggleItem = (t: string) => {
    if (!activePrimary || !activeSecondary) return;
    const key = makeKey(activePrimary, activeSecondary, t);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handlePrimaryClick = (p: string) => {
    setActivePrimary(p);
    setActiveSecondary(null);
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selected));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>관심 직무 선택</h2>
          <CloseBtn type="button" onClick={onClose}>
            &times;
          </CloseBtn>
        </Header>

        <Body>
          {/* 1차 직무 */}
          <Column>
            <ColumnTitle>1차 직무</ColumnTitle>
            <ColumnList>
              {primaryKeys.map((p) => (
                <ListItem
                  key={p}
                  $active={activePrimary === p}
                  onClick={() => handlePrimaryClick(p)}
                >
                  <Checkbox $checked={hasPrimarySelection(p)} />
                  <ItemText>{p}</ItemText>
                  <Arrow>&rsaquo;</Arrow>
                </ListItem>
              ))}
            </ColumnList>
          </Column>

          {/* 2차 직무 */}
          <Column>
            <ColumnTitle>2차 직무</ColumnTitle>
            <ColumnList>
              {secondaryKeys.map((s) => (
                <ListItem
                  key={s}
                  $active={activeSecondary === s}
                  onClick={() => setActiveSecondary(s)}
                >
                  <Checkbox
                    $checked={hasSecondarySelection(activePrimary!, s)}
                  />
                  <ItemText>{s}</ItemText>
                  <Arrow>&rsaquo;</Arrow>
                </ListItem>
              ))}
            </ColumnList>
          </Column>

          {/* 3차 직무 */}
          <Column>
            <ColumnTitle>3차 직무</ColumnTitle>
            <ChipContainer>
              {tertiaryItems.map((t) => {
                const isSelected =
                  activePrimary && activeSecondary
                    ? selected.has(makeKey(activePrimary, activeSecondary, t))
                    : false;
                return (
                  <Chip
                    key={t}
                    $selected={isSelected}
                    onClick={() => toggleItem(t)}
                  >
                    {t}
                  </Chip>
                );
              })}
            </ChipContainer>
          </Column>
        </Body>

        {selected.size > 0 && (
          <SelectedArea>
            <SelectedLabel>선택된 직무 ({selected.size})</SelectedLabel>
            <SelectedChips>
              {Array.from(selected).map((key) => {
                const fullPath = key.split("|").join(" - ");
                return (
                  <SelectedChip key={key}>
                    {fullPath}
                    <RemoveBtn
                      type="button"
                      onClick={() =>
                        setSelected((prev) => {
                          const next = new Set(prev);
                          next.delete(key);
                          return next;
                        })
                      }
                    >
                      &times;
                    </RemoveBtn>
                  </SelectedChip>
                );
              })}
            </SelectedChips>
          </SelectedArea>
        )}

        <Footer>
          <CancelBtn type="button" onClick={onClose}>
            취소
          </CancelBtn>
          <ConfirmBtn type="button" onClick={handleConfirm}>
            확인
          </ConfirmBtn>
        </Footer>
      </Modal>
    </Overlay>
  );
};

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 1rem;
  width: 100%;
  max-width: 52rem;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eaebec;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #141618;
    margin: 0;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #878a93;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #141618;
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-right: 1px solid #eaebec;

  &:last-child {
    border-right: none;
  }
`;

const ColumnTitle = styled.div`
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #878a93;
  border-bottom: 1px solid #eaebec;
`;

const ColumnList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ListItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#f0f6ff" : "transparent")};
  transition: background 0.15s;

  &:hover {
    background: ${({ $active }) => ($active ? "#f0f6ff" : "#f7f8fa")};
  }
`;

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 0.1875rem;
  border: 1.5px solid ${({ $checked }) => ($checked ? "#007bff" : "#c2c4c8")};
  background: ${({ $checked }) => ($checked ? "#007bff" : "#fff")};
  flex-shrink: 0;
  position: relative;

  &::after {
    content: "";
    display: ${({ $checked }) => ($checked ? "block" : "none")};
    position: absolute;
    top: 1px;
    left: 4px;
    width: 4px;
    height: 7px;
    border: solid #fff;
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);
  }
`;

const ItemText = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: #141618;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Arrow = styled.span`
  color: #c2c4c8;
  font-size: 1.25rem;
  flex-shrink: 0;
  line-height: 1;
`;

const ChipContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: flex-start;
`;

const Chip = styled.button<{ $selected: boolean }>`
  padding: 0.375rem 0.875rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ $selected }) => ($selected ? "#007bff" : "#e1e2e4")};
  background: ${({ $selected }) => ($selected ? "#f0f6ff" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#007bff" : "#46474c")};
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    border-color: #007bff;
    color: #007bff;
  }
`;

const SelectedArea = styled.div`
  padding: 0.75rem 1.5rem;
  border-top: 1px solid #eaebec;
`;

const SelectedLabel = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #878a93;
  margin: 0 0 0.5rem;
`;

const SelectedChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const SelectedChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 1rem;
  background: #f0f6ff;
  color: #007bff;
  font-size: 0.75rem;
  font-weight: 500;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #eaebec;
`;

const CancelBtn = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #e1e2e4;
  background: #fff;
  color: #5a5c63;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #f7f8fa;
  }
`;

const ConfirmBtn = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  background: #007bff;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #0056d2;
  }
`;
