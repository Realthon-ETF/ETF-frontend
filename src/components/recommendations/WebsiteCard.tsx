import styled from "styled-components";
import { Mixpanel } from "../../utils/mixpanel";

export interface WebsiteItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

export function WebsiteCard({
  item,
  onAdd,
  tabName,
  rank,
}: {
  item: WebsiteItem;
  onAdd: (url: string, title: string) => void;
  tabName?: string;
  rank?: number;
}) {
  const handleCheckClick = () => {
    Mixpanel.track("click_recommend_item", {
      tab_name: tabName,
      button_type: "확인하기",
      item_name: item.title,
      rank,
    });
  };

  const handleAddClick = () => {
    Mixpanel.track("click_recommend_item", {
      tab_name: tabName,
      button_type: "추가하기",
      item_name: item.title,
      rank,
    });
    Mixpanel.track("click_add_button");
    onAdd(item.url, item.title);
  };

  return (
    <Card>
      <CardContent>
        <CardFavicon src={getFaviconUrl(item.url)} alt="" />
        <CardTitle>{item.title}</CardTitle>
        <CardDesc>{item.description}</CardDesc>
      </CardContent>
      <ButtonRow>
        <OutlineButton
          as="a"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCheckClick}
        >
          확인하기
        </OutlineButton>
        <FilledButton type="button" onClick={handleAddClick}>
          추가하기
        </FilledButton>
      </ButtonRow>
    </Card>
  );
}

const Card = styled.div`
  flex-shrink: 0;
  width: 15.625rem;
  height: 11.25rem;
  min-width: 15.625rem;
  padding: 1.5rem;
  border: 1px solid #eaebec;
  border-radius: 1.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const CardFavicon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.125rem;
  object-fit: contain;
  margin-bottom: 0.375rem;
`;

const CardTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  color: #141618;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #141618;
  opacity: 0.6;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const buttonBase = `
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
  border-radius: 1.25rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.2s;
  font-family: inherit;

  &:hover {
    opacity: 0.85;
  }
`;

const OutlineButton = styled.button`
  ${buttonBase}
  background: #fff;
  border: 1px solid #06f;
  color: #06f;
`;

const FilledButton = styled.button`
  ${buttonBase}
  background: #06f;
  border: 1px solid #06f;
  color: #fff;
`;
