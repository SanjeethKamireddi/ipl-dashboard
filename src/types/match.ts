export interface LiveMatch {
  status: string;
  teams: string[];
  venue: string;
  matchTime: string;
  score: {
    [team: string]: string;
  };
  currentInning: string;
}

export interface TeamStats {
  pos: string;
  team: string;
  played: string;
  won: string;
  lost: string;
  nr: string;
  nrr: string;
  for: string;
  against: string;
  points: string;
}

export interface MatchSchedule {
  date: string;
  teams: string[];
  venue: string;
  time: string;
}
