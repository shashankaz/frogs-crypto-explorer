import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const vsCurrency = searchParams.get("vs_currency") || "usd";
  const order = searchParams.get("order") || "market_cap_desc";
  const perPage = searchParams.get("per_page") || "50";
  const page = searchParams.get("page") || "1";
  const ids = searchParams.get("ids");
  const sparkline = searchParams.get("sparkline") || "false";

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=${order}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&ids=${ids}`
  );
  if (response.ok) {
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ data });
    }
  } else {
    return NextResponse.json(
      { error: "Failed to fetch coin data" },
      { status: response.status }
    );
  }
};
