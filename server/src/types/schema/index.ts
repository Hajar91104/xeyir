export type Campaign = {
  _id: string;
  title: string;
  description: string;
  author: string;
  goalAmount: number;
  createdAt: string;
  currency: string;
  images: string[];
  // showInRecommendation: boolean;
};
