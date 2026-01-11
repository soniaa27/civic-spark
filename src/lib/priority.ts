import { Issue, User } from '@/types/civic';

/**
 * Calculate priority score for an issue based on upvotes, user trust, and time decay
 * 
 * Priority Score = (Upvotes × User Trust Score) + Time Decay Factor + Category Urgency Weight
 */
export function calculateIssuePriority(
  issue: Issue,
  reporterLevel: number,
  daysSinceReported: number
): number {
  // User Trust Score based on level (1-5)
  const trustScore = Math.min(reporterLevel / 5, 1) + 0.5; // Range: 0.5 - 1.5
  
  // Base score from upvotes with trust multiplier
  const upvoteScore = issue.upvotes * trustScore;
  
  // Time decay factor (issues lose priority over time if not updated)
  // Critical issues decay slower
  const decayRate = issue.status === 'critical' ? 0.95 : 0.92;
  const timeDecay = Math.pow(decayRate, daysSinceReported) * 100;
  
  // Category urgency weights
  const categoryWeights: Record<string, number> = {
    'critical': 50,
    'traffic': 40,
    'water': 35,
    'streetlight': 30,
    'pothole': 25,
    'garbage': 20,
    'other': 15,
  };
  const categoryWeight = categoryWeights[issue.category] || 15;
  
  // Status bonus
  const statusBonus = issue.status === 'critical' ? 30 : 0;
  
  const priorityScore = upvoteScore + timeDecay + categoryWeight + statusBonus;
  
  return Math.round(priorityScore);
}

/**
 * Calculate trust score for a user based on their level and reputation
 */
export function calculateUserTrustScore(user: User): number {
  const baseScore = user.level * 0.2; // 0.2 to 1.0 from level 1-5
  const streakBonus = Math.min(user.streak / 100, 0.2); // Max 0.2 bonus for streaks
  const resolutionBonus = Math.min(user.issuesResolved / 50, 0.3); // Max 0.3 bonus
  
  return Math.min(baseScore + streakBonus + resolutionBonus, 1.5);
}

/**
 * Calculate voting weight for a user
 */
export function calculateVotingWeight(user: User): number {
  const baseWeight = 1;
  const levelMultiplier = 1 + (user.level - 1) * 0.2; // 1x to 1.8x based on level
  const trustBonus = calculateUserTrustScore(user) * 0.5;
  
  return baseWeight * levelMultiplier + trustBonus;
}

/**
 * Determine if an issue should be escalated based on priority and time
 */
export function shouldEscalateIssue(issue: Issue, daysSinceReported: number): boolean {
  if (issue.status === 'resolved') return false;
  
  const highPriority = issue.upvotes > 50 || issue.status === 'critical';
  const longPending = daysSinceReported > 7 && issue.status === 'critical';
  const veryLongPending = daysSinceReported > 14;
  
  return highPriority && (longPending || veryLongPending);
}
