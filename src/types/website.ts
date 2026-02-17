export interface TargetUrl {
  targetUrlId: number;
  targetUrl: string;
}

export interface TargetUrlsResponse {
  totalCount: number;
  targetUrls: TargetUrl[];
}
