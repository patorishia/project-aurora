export type AwinVoucher = {
  code: string | null;
  exclusive: boolean;
  attributable: boolean;
};

export type AwinAdvertiser = {
  id: number;
  name: string;
  joined: boolean;
};

export type AwinRegion = {
  name: string;
  countryCode: string;
};

export type AwinPromotion = {
  promotionId: number;
  type: string;

  advertiser: AwinAdvertiser;

  title: string;
  description?: string;
  terms?: string;

  startDate?: string;
  endDate?: string;

  url: string;
  urlTracking: string;

  regions?: {
    all: boolean;
    list: AwinRegion[];
  };

  voucher?: AwinVoucher;
};

export type AwinPromotionsResponse = {
  promotions: AwinPromotion[];
};