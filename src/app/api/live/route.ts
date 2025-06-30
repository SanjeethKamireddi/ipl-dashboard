import { NextRequest, NextResponse } from "next/server";
import liveMatchFallback from "@/data/liveMatch.json";
import puppeteer from "puppeteer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://www.iplt20.com/", {
      waitUntil: "networkidle2",
      timeout: 0,
    });
    await page.waitForFunction(
      () => {
        const card = document.querySelector(".match-card__container");
        return (
          card && card.querySelectorAll(".match-card__team-name").length >= 2
        );
      },
      { timeout: 15000 }
    );

    const data = await page.evaluate(() => {
      const matchCard = document.querySelector(".match-card__container");
      if (!matchCard) return null;

      const teams = Array.from(
        matchCard.querySelectorAll(".match-card__team-name")
      ).map((el) => el.textContent?.trim());

      const venue =
        matchCard.querySelector(".match-card__venue")?.textContent?.trim() ||
        "";

      const matchTime =
        matchCard.querySelector(".match-card__datetime")?.textContent?.trim() ||
        "";

      const status =
        matchCard.querySelector(".match-card__status")?.textContent?.trim() ||
        "UPCOMING";

      return {
        status,
        teams,
        venue,
        matchTime,
        score: {
          [teams?.[0] || "Team A"]: "N/A",
          [teams?.[1] || "Team B"]: "N/A",
        },
        currentInning: "Data not available",
      };
    });

    await browser.close();

    if (!data || !data.teams?.length) {
      return NextResponse.json({ match: liveMatchFallback, fallback: true });
    }

    return NextResponse.json({ match: data });
  } 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) {
    return NextResponse.json(
      { match: liveMatchFallback, fallback: true },
      { status: 200 }
    );
  }
}
