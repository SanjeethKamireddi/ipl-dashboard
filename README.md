## IPL Dashboard: Up-to-Date IPL Match Details

Using **Next.js**, **TypeScript**, and **Tailwind CSS**, this project is a responsive web application for an IPL dashboard. It shows the most recent IPL 2025 points table, the complete schedule, and live match details.

---

## Features Incorporated

- **Live Match View:** Shows the teams, venue, innings, scores, and status.  
- **Match Schedule View:** Provides a list of forthcoming matches along with the team names, date, time, and location.  
View of the Points Table: displays team rankings along with comprehensive statistics such as points, wins, losses, and NRR.  
All screens have a responsive design that prioritises mobile devices.  
In-memory storage is used as a **caching mechanism** to prevent unnecessary scraping calls.  
- **Real-time browser notifications** for simulated score changes or live match status updates.  

---

## 🛠 Taking Notes

**Target Website:** [iplt20.com](https://www.iplt20.com)
At first, an attempt was made to scrape:
  - Live match section with `.match-card__container`
  - Points table from `#pointsdata`
- **Problem:** `iplt20.com` dynamically renders important sections **after the page load** using Angular, and:
  Even after lengthy timeouts, Puppeteer was unable to identify the necessary DOM elements.
  - When using `headless: true` or `false`, the table and live match components were either empty or missing.
Stable content was not produced even after manual testing using `waitForFunction()`.
As a result of these rendering restrictions and possible bot detection:
  Real scraping was not possible in a deployable or dependable manner.

---

## Fallback Data Method

Structured JSON files were made to mimic real data:
  - `/data/liveMatch.json` - `/data/pointsTable.json` - `/data/matchSchedule.json`
These files were used in the user interface and replicate actual API response structures.
- `/api/live`, `/api/scrape`, and `/api/schedule` are examples of API routes that serve:
  If available, from the cache
  If scraping doesn't work, fallback JSON

---

## Caching Method

In `lib/cache.ts`, a basic in-memory `Map` was used.
The API first determines whether the data is in the cache before executing the actual scraping logic.
- mimics real-time backend behaviour and avoids repetitive work.

---

## Instant Alerts

The `LiveMatchCard` component now has browser notification logic implemented.
Every 30 seconds, it polls `/api/live`.
Sends a push notification (with consent) if the score or match status changes.
This mimics match update alerts in the real world.

---

## Summary

**Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** were used in its construction.
Three-view functional user interface: Points, Live, and Schedule
Included is the scraping logic (but fallback is used because of Angular rendering issues).
Bonus features are included. **notifications** and **caching**

---

## Author

**Sanjeeth Kamireddi**  
[GitHub](https://github.com/SanjeethKamireddi)

