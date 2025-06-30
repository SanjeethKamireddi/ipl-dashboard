import { NextRequest, NextResponse } from "next/server";
import scheduleFallback from "@/data/matchSchedule.json";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://www.iplt20.com/matches/schedule/men", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector(".match-list__item", { timeout: 15000 });

    const data = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".match-list__item"));
      return cards.map((card) => {
        const date = card
          .querySelector(".match-list__date")
          ?.textContent?.trim();
        const teams = Array.from(
          card.querySelectorAll(".match-list__team-name")
        ).map((el) => el.textContent?.trim());
        const venue = card
          .querySelector(".match-list__venue")
          ?.textContent?.trim();
        const time = card
          .querySelector(".match-list__time")
          ?.textContent?.trim();

        return { date, teams, venue, time };
      });
    });

    await browser.close();

    if (!data || !data.length) {
      return NextResponse.json({ schedule: scheduleFallback, fallback: true });
    }

    return NextResponse.json({ schedule: data });
  } catch (error) {
    return NextResponse.json(
      { schedule: scheduleFallback, fallback: true },
      { status: 200 }
    );
  }
}
