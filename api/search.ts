import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.API_KEY;
  const cx = process.env.CX;
  const query = "how to center a div";
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}&searchType=image`;

  const { data, success, message } = await getData(url);

  if (!success) return res.json(message);

  return res.json(data);
}

const getData = async (
  url: string
): Promise<{ data: any; success: boolean; message: string }> => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return { data: data, success: true, message: "success" };
    })
    .catch((error) => {
      return {
        data: undefined,
        success: true,
        message: `Error fetching search results:, ${error}`,
      };
    });

  return {
    data: undefined,
    success: true,
    message: `Error fetching search results`,
  };
};
