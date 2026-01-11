import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Sparkles } from 'lucide-react';
import { UserStatsCard } from '@/components/UserStatsCard';
import { IssueCard } from '@/components/IssueCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { QuickStats } from '@/components/QuickStats';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUser, mockIssues } from '@/data/mockData';
import { IssueCategory, Issue } from '@/types/civic';

interface HomeViewProps {
  onNavigate: (tab: 'map' | 'report' | 'leaderboard' | 'profile') => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | 'all'>('all');
  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  const filteredIssues = selectedCategory === 'all' 
    ? issues 
    : issues.filter(i => i.category === selectedCategory);

  const handleUpvote = (id: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return {
          ...issue,
          hasUpvoted: !issue.hasUpvoted,
          upvotes: issue.hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1
        };
      }
      return issue;
    }));
  };

  const stats = {
    totalIssues: issues.length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    critical: issues.filter(i => i.status === 'critical').length,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <div className="flex items-center gap-2">
              <motion.span 
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-2xl"
              >
                🏙️
              </motion.span>
              <h1 className="text-xl font-bold text-foreground">Civilians</h1>
            </div>
            <p className="text-xs text-muted-foreground">Namma Bengaluru</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="iconSm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-status-critical text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="iconSm">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-5">
        {/* Daily Challenge Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl gradient-gamification p-4 shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">Daily Challenge</span>
                <Badge className="bg-white/20 text-white text-[10px] border-white/30">+50 XP</Badge>
              </div>
              <p className="text-white/80 text-xs mt-0.5">Report 3 issues in your locality</p>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-lg">1/3</div>
              <div className="text-white/70 text-xs">Complete</div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white w-1/3 transition-all duration-500" />
          </div>
        </motion.div>

        {/* User Stats */}
        <UserStatsCard user={mockUser} onViewProfile={() => onNavigate('profile')} />

        {/* Quick Stats */}
        <QuickStats stats={stats} />

        {/* Category Filter */}
        <div>
          <h2 className="text-sm font-semibold mb-3">Filter by Category</h2>
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Issues List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Recent Issues</h2>
            <Button variant="link" className="text-xs h-auto p-0" onClick={() => onNavigate('map')}>
              View Map →
            </Button>
          </div>
          <div className="space-y-3">
            {filteredIssues.map((issue) => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onUpvote={handleUpvote}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
