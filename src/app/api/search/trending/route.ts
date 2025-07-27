import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending"
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
