"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { updateTag } from "next/cache";

/**
 * 1. List My Favourites
 * Endpoint: GET /favourite/my
 */
export const fetchMyFavorites = async (page = 1, limit = 10): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/favourite/my?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["favourites"], revalidate: 300 },
    });

    const result = await res.json()
    return result;
  } catch (error: any) {
    return Error(error);
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
      updateTag("favourites");
    }
    return result;
  } catch (error: any) {
    return Error(error);
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
      updateTag("favourites");
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
