import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Globe, ChevronDown } from 'lucide-react';
import { LeaderboardList } from '@/components/LeaderboardList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockLeaderboard, mockUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

type LeaderboardScope = 'global' | 'local' | 'friends';

export function LeaderboardView() {
  const [scope, setScope] = useState<LeaderboardScope>('global');

  const scopes: { id: LeaderboardScope; label: string; icon: typeof Globe }[] = [
    { id: 'global', label: 'Global', icon: Globe },
    { id: 'local', label: 'Local', icon: Users },
    { id: 'friends', label: 'Friends', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground">
        <div className="px-4 py-6 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="text-primary-foreground/80 text-sm">Top civic heroes of Bengaluru this week</p>
            </div>
          </div>

          {/* Scope selector */}
          <div className="flex gap-2 mt-4">
            {scopes.map((s) => (
              <Button
                key={s.id}
                variant={scope === s.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setScope(s.id)}
                className={cn(
                  "flex-1",
                  scope === s.id 
                    ? "bg-white/20 text-white hover:bg-white/30" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <s.icon className="w-4 h-4 mr-1.5" />
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Your rank card */}
        <div className="px-4 -mb-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-elevated p-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl gradient-gamification flex items-center justify-center text-2xl font-bold text-accent-foreground shadow-glow-accent">
                  #{mockUser.rank}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Your Ranking</span>
                  <Badge variant="level" className="text-xs">{mockUser.levelName}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {mockUser.xp.toLocaleString()} XP • {100 - mockUser.rank * 10} points to next rank
                </p>
              </div>
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
            </div>
          </motion.div>
        </div>
      </header>

      <div className="px-4 py-4 pt-12 space-y-4">
        {/* Time filter */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Rankings</h2>
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            This Week
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>

        {/* Podium for top 3 */}
        <div className="flex items-end justify-center gap-4 py-6">
          {/* 2nd place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <img
              src={mockLeaderboard[1].user.avatar}
              alt={mockLeaderboard[1].user.name}
              className="w-14 h-14 rounded-full border-3 border-gray-300 mb-2"
            />
            <span className="text-xs font-medium text-center truncate max-w-[70px]">
              {mockLeaderboard[1].user.name.split(' ')[0]}
            </span>
            <Badge className="mt-1 bg-gray-400 text-white text-[10px]">🥈 {mockLeaderboard[1].points}</Badge>
            <div className="w-20 h-16 gradient-success/30 bg-gray-200 rounded-t-lg mt-2 flex items-end justify-center pb-2">
              <span className="text-2xl font-bold text-gray-600">2</span>
            </div>
          </motion.div>

          {/* 1st place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <img
                src={mockLeaderboard[0].user.avatar}
                alt={mockLeaderboard[0].user.name}
                className="w-18 h-18 rounded-full border-4 border-amber-400 mb-2 w-[72px] h-[72px]"
              />
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">👑</span>
            </div>
            <span className="text-sm font-bold text-center truncate max-w-[80px]">
              {mockLeaderboard[0].user.name.split(' ')[0]}
            </span>
            <Badge variant="xp" className="mt-1 text-[10px]">🥇 {mockLeaderboard[0].points}</Badge>
            <div className="w-24 h-24 gradient-gamification rounded-t-lg mt-2 flex items-end justify-center pb-3">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
          </motion.div>

          {/* 3rd place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <img
              src={mockLeaderboard[2].user.avatar}
              alt={mockLeaderboard[2].user.name}
              className="w-14 h-14 rounded-full border-3 border-amber-700 mb-2"
            />
            <span className="text-xs font-medium text-center truncate max-w-[70px]">
              {mockLeaderboard[2].user.name.split(' ')[0]}
            </span>
            <Badge className="mt-1 bg-amber-700 text-white text-[10px]">🥉 {mockLeaderboard[2].points}</Badge>
            <div className="w-20 h-12 bg-amber-100 rounded-t-lg mt-2 flex items-end justify-center pb-1.5">
              <span className="text-xl font-bold text-amber-700">3</span>
            </div>
          </motion.div>
        </div>

        {/* Full leaderboard */}
        <LeaderboardList entries={mockLeaderboard} currentUserId={mockUser.id} />
      </div>
    </div>
  );
}
