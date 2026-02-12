import { NextRequest, NextResponse } from "next/server";
import staysData from "@/data/stays.json";
import type { Stay } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stays: Stay[] = staysData.stays as Stay[];
    const stay = stays.find((s) => s.id === id);

    if (!stay) {
      return NextResponse.json(
        { error: "Stay not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(stay);
  } catch (error) {
    console.error("Error fetching stay:", error);
    return NextResponse.json(
      { error: "Failed to fetch stay" },
      { status: 500 }
    );
  }
}
