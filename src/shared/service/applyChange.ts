import { AppConfig } from "@/app/config";

export const applyChange = async (formData: string) => {
  try {
    const res = await fetch(AppConfig.API_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};
