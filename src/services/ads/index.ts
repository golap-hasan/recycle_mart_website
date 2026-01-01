"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { revalidatePath } from "next/cache";
import { AdResponse } from "@/types/ad.type";

/**
 * 1. Get All Ads
 * Endpoint: GET /ad
 */
export const fetchAllAds = async (query: Record<string, any> = {}): Promise<AdResponse> => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad?${params.toString()}`, {
      method: "GET",
      next: { tags: ["ads"] },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch ads" };
  }
};

/**
 * 1.1 Get Ad By ID
 * Endpoint: GET /ad/{adId}
 */
export const fetchAdById = async (adId: string): Promise<AdResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}`, {
      method: "GET",
      next: { tags: [`ad-${adId}`] },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: [] as any, message: error.message || "Failed to fetch ad details" };
  }
};

/**
 * 2. Get My Ads
 * Endpoint: GET /ad/my
 */
export const fetchMyAds = async (query: Record<string, any> = {}): Promise<AdResponse> => {
  const accessToken = await getValidAccessTokenForServerActions();
  const params = new URLSearchParams(query);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/my?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["my-ads"] },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch my ads" };
  }
};

/**
 * 3. Create Ad
 * Endpoint: POST /ad (multipart/form-data)
 */
export const createAd = async (formData: FormData): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/profile/my-ads");
      revalidatePath("/ads");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create ad" };
  }
};

/**
 * 4. Update Ad
 * Endpoint: PATCH /ad/{adId}
 */
export const updateAd = async (adId: string, data: any): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/profile/my-ads");
      revalidatePath(`/ads/${adId}`);
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update ad" };
  }
};

/**
 * 5. Delete Ad
 * Endpoint: DELETE /ad/{adId}
 */
export const deleteAd = async (adId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/profile/my-ads");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete ad" };
  }
};

/**
 * 6. Boost Ad
 * Endpoint: POST /ad/{adId}/boost
 */
export const boostAd = async (adId: string, data: { packageId: string; days: number }): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}/boost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/profile/my-ads");
      revalidatePath("/ads");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to boost ad" };
  }
};

/**
 * 7. Report Ad
 * Endpoint: POST /ad/{adId}/report
 */
export const reportAd = async (adId: string, data: { reason: string; details?: string }): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}/report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to report ad" };
  }
};

/**
 * 8. Track Ad View
 * Endpoint: POST /ad/{adId}/view
 */
export const trackAdView = async (adId: string): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}/view`, {
      method: "POST",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to track ad view" };
  }
};
