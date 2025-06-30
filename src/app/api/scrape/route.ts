import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import pointsTableFallback from "@/data/pointsTable.json";
import { getCache, setCache } from "../../../../lib/cache";

export async function GET(req: NextRequest) {
  const cacheKey = "pointsTable";
  const cached = getCache(cacheKey);

  if (cached) {
    return NextResponse.json({ pointsTable: cached, cached: true });
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://www.iplt20.com/points-table/men/2025", {
      waitUntil: "networkidle2",
      timeout: 0,
    });

    await page.waitForSelector("#pointsdata", { timeout: 15000 });
    await page.waitForFunction(
      () => document.querySelectorAll("#pointsdata > tr").length > 0,
      { timeout: 10000 }
    );

    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("#pointsdata > tr"));
      return rows.map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          pos: cells[0]?.textContent?.trim(),
          team: cells[2]?.textContent?.trim(),
          played: cells[3]?.textContent?.trim(),
          won: cells[4]?.textContent?.trim(),
          lost: cells[5]?.textContent?.trim(),
          nr: cells[6]?.textContent?.trim(),
          nrr: cells[7]?.textContent?.trim(),
          for: cells[8]?.textContent?.trim(),
          against: cells[9]?.textContent?.trim(),
          points: cells[10]?.textContent?.trim(),
        };
      });
    });

    await browser.close();

    if (!data || data.length === 0) {
      return NextResponse.json({
        pointsTable: pointsTableFallback,
        fallback: true,
      });
    }

    setCache(cacheKey, data);
    return NextResponse.json({ pointsTable: data });
  } catch (error) {
    return NextResponse.json(
      { pointsTable: pointsTableFallback, fallback: true },
      { status: 200 }
    );
  }
}
