import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.API_KEY;
  const cx = process.env.CX;
  const query = "how to center a div";
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

  const { data, success, message } = await getData(url);

  if (!success) return res.json({ error: message });

  return res.json(data);
}

const getData = async (
  url: string
): Promise<{ data: any; success: boolean; message: string }> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res);
    }
    const data = await response.json();
    return { success: true, data, message: "Data fetched successfully" };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message || "Error fetching data",
    };
  }
};
