import { AppConfig } from "@/app/config";

export const fetchData = async () => {
  try {
    const res = await fetch(AppConfig.API_URL);
    if (res.ok) {
      const data = await res.json();
      return data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
