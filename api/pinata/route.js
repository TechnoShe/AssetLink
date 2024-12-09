import pinataSDK from "@pinata/sdk";

const pinata = pinataSDK(
  process.env.NEXT_PUBLIC_APIKEY,
  process.env.NEXT_PUBLIC_API_SECRET
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { isFile, data } = req.body;

    let result;
    if (isFile) {
      result = await pinata.pinFileToIPFS(data);
    } else {
      result = await pinata.pinJSONToIPFS(data);
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
