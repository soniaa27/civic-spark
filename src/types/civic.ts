export type IssueStatus = 'critical' | 'acknowledged' | 'in-progress' | 'resolved';
export type IssueCategory = 'pothole' | 'streetlight' | 'garbage' | 'water' | 'traffic' | 'other';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl?: string;
  upvotes: number;
  reportedBy: string;
  reportedAt: Date;
  resolvedAt?: Date;
  hasUpvoted?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  levelName: string;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  badges: Badge[];
  rank: number;
  issuesReported: number;
  issuesResolved: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  isEarned: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  change?: number;
}

// Points system
export const POINTS = {
  REPORT_ISSUE: 20,
  UPVOTE_RECEIVED: 2,
  ADD_EVIDENCE: 10,
  VERIFY_RESOLUTION: 15,
  DAILY_LOGIN: 5,
  WEEKLY_CHALLENGE: 50,
} as const;

// Level thresholds
export const LEVELS = [
  { level: 1, name: 'Citizen', minXP: 0, maxXP: 100 },
  { level: 2, name: 'Active Reporter', minXP: 100, maxXP: 300 },
  { level: 3, name: 'City Helper', minXP: 300, maxXP: 700 },
  { level: 4, name: 'Community Leader', minXP: 700, maxXP: 1500 },
  { level: 5, name: 'City Champion', minXP: 1500, maxXP: Infinity },
] as const;

export const CATEGORIES: { id: IssueCategory; label: string; icon: string }[] = [
  { id: 'pothole', label: 'Pothole', icon: '🛣️' },
  { id: 'streetlight', label: 'Streetlight', icon: '💡' },
  { id: 'garbage', label: 'Garbage', icon: '🗑️' },
  { id: 'water', label: 'Water Leakage', icon: '💧' },
  { id: 'traffic', label: 'Traffic', icon: '🚦' },
  { id: 'other', label: 'Other', icon: '📋' },
];

export const STATUS_CONFIG: Record<IssueStatus, { label: string; color: string }> = {
  'critical': { label: 'Critical', color: 'critical' },
  'acknowledged': { label: 'Acknowledged', color: 'acknowledged' },
  'in-progress': { label: 'In Progress', color: 'inProgress' },
  'resolved': { label: 'Resolved', color: 'resolved' },
};
