import type { AwinPromotion } from "./types";

const AWIN_API_URL = "https://api.awin.com";

export async function fetchAwinPromotions(): Promise<AwinPromotion[]> {
  const token = process.env.AWIN_API_TOKEN;
  const publisherId = process.env.AWIN_PUBLISHER_ID;

  if (!token) {
    throw new Error("AWIN_API_TOKEN is not configured.");
  }

  if (!publisherId) {
    throw new Error("AWIN_PUBLISHER_ID is not configured.");
  }

  const response = await fetch(
    `${AWIN_API_URL}/publisher/${publisherId}/promotions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: {
          membership: "joined",
          regionCodes: ["PT"],
          status: "active",
          type: "all",
        },
        pagination: {
          page: 1,
          pageSize: 200,
        },
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Awin API request failed (${response.status}): ${errorText}`,
    );
  }

  const data: { promotions?: AwinPromotion[] } = await response.json();

  return data.promotions ?? [];
}