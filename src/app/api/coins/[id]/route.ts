import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Coin id is required" }, { status: 400 });
  }

  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json(
      { error: "Failed to fetch coin data" },
      { status: response.status }
    );
  }
};
