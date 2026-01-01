/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Category } from "@/types/category.type";

export const fetchAllCategories = async (): Promise<{
  success: boolean;
  data: Category[];
  message?: string;
}> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "GET",
      next: { tags: ["categories"] },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch categories",
    };
  }
};
    