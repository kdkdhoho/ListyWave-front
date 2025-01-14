export interface TrendingListType {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  backgroundColor: string;
  itemImageUrl: string;
}

export interface UsersRecommendationItemType {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface LabelType {
  id: number;
  name: string;
}

export interface ListItemType {
  id?: number;
  rank?: number;
  title?: string;
  imageUrl?: string;
}

export interface ListRecommendationType {
  id: number;
  category: string;
  backgroundColor: string;
  listUrl: string;
  ownerId: number;
  ownerNickname: string;
  ownerProfileImage: string;
  labels: LabelType[];
  title: string;
  description: string;
  items: ListItemType[];
}
