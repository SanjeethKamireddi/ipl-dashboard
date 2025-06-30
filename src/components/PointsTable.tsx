"use client";

import { useEffect, useState } from "react";

const PointsTable = () => {
  const [data, setData] = useState<TeamStats[]>([]);

  useEffect(() => {
    fetch("/api/scrape")
      .then((res) => res.json())
      .then((res) => setData(res.pointsTable || []))
      .catch((err) => console.error("Failed to load points table:", err));
  }, []);

  if (!data.length) {
    return <p className="text-center mt-8">Loading points table...</p>;
  }

  return (
    <>
      <div className="points-table-wrapper w-full bg-[#001033]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-white font-bold text-xl px-6 py-3 w-fit">
            POINTS TABLE
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white shadow-xl rounded-lg overflow-x-auto border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f9fafb] sticky top-0 z-10 text-xs uppercase tracking-wider text-gray-700 border-b">
              <tr>
                <th className="px-4 py-3">Pos</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">P</th>
                <th className="px-4 py-3">W</th>
                <th className="px-4 py-3">L</th>
                <th className="px-4 py-3">NR</th>
                <th className="px-4 py-3">NRR</th>
                <th className="px-4 py-3">For</th>
                <th className="px-4 py-3">Against</th>
                <th className="px-4 py-3">Pts</th>
              </tr>
            </thead>
            <tbody>
              {data.map((team, index) => {
                const key = `${team.team}-${team.played}-${index}`;
                return (
                  <tr
                    key={key}
                    className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-2">{team.pos}</td>
                    <td className="px-4 py-2 font-medium">{team.team}</td>
                    <td className="px-4 py-2">{team.played}</td>
                    <td className="px-4 py-2 text-green-700 font-semibold">
                      {team.won}
                    </td>
                    <td className="px-4 py-2 text-red-600 font-semibold">
                      {team.lost}
                    </td>
                    <td className="px-4 py-2">{team.nr}</td>
                    <td className="px-4 py-2">{team.nrr}</td>
                    <td className="px-4 py-2">{team.for}</td>
                    <td className="px-4 py-2">{team.against}</td>
                    <td className="px-4 py-2 font-bold text-blue-800">
                      {team.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PointsTable;
