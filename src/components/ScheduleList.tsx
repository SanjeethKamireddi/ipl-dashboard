"use client";

import { MatchSchedule } from "@/types/match";
import { useEffect, useState } from "react";

const ScheduleList = () => {
  const [schedule, setSchedule] = useState<MatchSchedule[]>([]);

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((res) => setSchedule(res.schedule || []))
      .catch((err) => console.error("Failed to load schedule:", err));
  }, []);

  if (!schedule.length) {
    return <p className="text-center mt-8">Loading match schedule...</p>;
  }

  return (
    <>
      <div className="points-table-wrapper w-full bg-[#001033]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-white font-bold text-xl px-6 py-3 w-fit">
            MATCH SCHEDULE
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <ul className="space-y-4">
          {schedule.map((match, index) => (
            <li
              key={index}
              className="p-4 border rounded-md shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-gray-500">{match.date}</div>
              <div className="text-lg font-medium mb-1">
                {match.teams[0]} vs {match.teams[1]}
              </div>
              <div className="text-sm text-gray-700">{match.venue}</div>
              <div className="text-sm text-gray-700">{match.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ScheduleList;
