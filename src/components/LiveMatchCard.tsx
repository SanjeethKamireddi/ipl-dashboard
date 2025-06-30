"use client";

import { useEffect, useRef, useState } from "react";

const LiveMatchCard = () => {
  const [match, setMatch] = useState<LiveMatch | null>(null);
  const prevScoreRef = useRef<string>("");

  const fetchLiveMatch = async () => {
    try {
      const res = await fetch("/api/live");
      const data = await res.json();

      const newScore = JSON.stringify(data.match?.score);
      const oldScore = prevScoreRef.current;

      if (oldScore && newScore !== oldScore) {
        const scoreSummary = Object.entries(data.match.score)
          .map(([team, score]) => `${team}: ${score}`)
          .join(" | ");

        if (Notification.permission === "granted") {
          new Notification("Score Update", {
            body: scoreSummary,
            icon: "/ipl-icon.png",
          });
        }
      }

      prevScoreRef.current = newScore;
      setMatch(data.match);
    } catch (err) {
      console.error("Failed to load live match:", err);
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    fetchLiveMatch();
    const interval = setInterval(fetchLiveMatch, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!match) return <p className="text-center mt-8">Loading live match...</p>;

  return (
    <>
      <div className="points-table-wrapper w-full bg-[#001033]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-white font-bold text-xl px-6 py-3 w-fit">
            LIVE MATCH
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="p-4 max-w-2xl mx-auto border border-gray-300 shadow-md rounded-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-center text-red-600">
            {match.status === "LIVE" ? "Live Match" : "Upcoming Match"}
          </h2>
          <div className="text-center mb-4 font-medium text-lg">
            {match.teams[0]} vs {match.teams[1]}
          </div>
          <p className="text-sm text-center mb-1 text-gray-600">
            {match.venue}
          </p>
          <p className="text-sm text-center mb-4 text-gray-600">
            {match.matchTime}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-4">
            {Object.entries(match.score).map(([team, score]) => (
              <div key={team} className="border p-2 rounded">
                <p className="font-semibold">{team}</p>
                <p className="text-sm text-gray-700">{score}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-blue-600 font-medium">
            {match.currentInning}
          </p>
        </div>
      </div>
    </>
  );
};

export default LiveMatchCard;
