import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { limit, page } = req.query;

  const limitT = parseInt(limit[0]) || 1;
  const pageT = parseInt(page[0]) || 1;

  const apiKey = process.env.API_KEY;
  const cx = process.env.CX;
  const query = "how to center a div";
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&limit=${limitT}&start=${
    pageT * limitT
  }&key=${apiKey}&cx=${cx}`;

  const { data, success, message } = await getData(url);

  if (!success) return res.status(404).json({ error: message });

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
