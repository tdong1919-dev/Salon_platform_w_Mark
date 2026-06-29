/** POST /api/store/product — add a retail product to the Products tab. */
import { NextRequest, NextResponse } from "next/server";
import { appendSheetRow } from "@/lib/sheets";

const HEADERS = ["Added", "Salon", "Name", "Price", "Description", "Image", "Active"];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const salon = (body.salon ?? "").trim();
  const name = (body.name ?? "").trim();
  const price = Number(body.price) || 0;
  const description = (body.description ?? "").trim();
  const image = (body.image ?? "").trim();

  if (!salon || !name || price <= 0) {
    return NextResponse.json({ error: "Salon, product name, and a price are required." }, { status: 400 });
  }

  const sheet = await appendSheetRow("Products", HEADERS, [
    new Date().toISOString(), salon, name, price.toFixed(2), description, image, "yes",
  ]);
  if (!sheet.ok) {
    return NextResponse.json({ error: "Couldn't save the product — try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
