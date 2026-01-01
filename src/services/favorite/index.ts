"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { revalidatePath } from "next/cache";
import { FavoriteResponse } from "@/types/favorite.type";

/**
 * 1. List My Favourites
 * Endpoint: GET /favourite/my
 */
export const fetchMyFavorites = async (page = 1, limit = 10): Promise<FavoriteResponse> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/favourite/my?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["favourites"] },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch favourites" };
  }
};

/**
 * 2. Add Favourite
 * Endpoint: POST /favourite/{adId}
 */
export const addFavorite = async (adId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/favourite/${adId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/profile/favourites");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to add favourite" };
  }
};

/**
 * 3. Remove Favourite
 * Endpoint: DELETE /favourite/{adId}
 */
export const removeFavorite = async (adId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/favourite/${adId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/profile/favourites");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to remove favourite" };
  }
};
