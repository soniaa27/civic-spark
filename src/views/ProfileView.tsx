import { motion } from 'framer-motion';
import { Settings, ChevronRight, LogOut, Bell, Shield, HelpCircle, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BadgeGrid } from '@/components/BadgeGrid';
import { mockUser, mockBadges } from '@/data/mockData';
import { LEVELS } from '@/types/civic';
import { cn } from '@/lib/utils';

export function ProfileView() {
  const currentLevel = LEVELS.find(l => l.level === mockUser.level);
  const nextLevel = LEVELS.find(l => l.level === mockUser.level + 1);
  const progressToNext = nextLevel 
    ? ((mockUser.xp - (currentLevel?.minXP || 0)) / ((nextLevel?.minXP || mockUser.xp) - (currentLevel?.minXP || 0))) * 100
    : 100;

  const menuItems = [
    { icon: Bell, label: 'Notifications', badge: '3' },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile Header */}
      <div className="gradient-hero text-primary-foreground">
        <div className="px-4 py-6 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Profile</h1>
            <Button variant="ghost" size="iconSm" className="text-primary-foreground hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-20 h-20 rounded-2xl border-4 border-white/30 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full gradient-gamification flex items-center justify-center text-sm font-bold text-white shadow-lg">
                {mockUser.level}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-primary-foreground/80">{mockUser.levelName}</p>
              <div className="flex items-center gap-2 mt-1">
                <Flame className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-medium">{mockUser.streak} day streak!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="px-4 -mt-10 relative z-10">
        <Card className="shadow-elevated">
          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{mockUser.issuesReported}</div>
                <div className="text-xs text-muted-foreground">Reported</div>
              </div>
              <div className="border-x border-border">
                <div className="text-2xl font-bold text-secondary">{mockUser.issuesResolved}</div>
                <div className="text-xs text-muted-foreground">Resolved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">#{mockUser.rank}</div>
                <div className="text-xs text-muted-foreground">Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* XP Progress */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">Experience Points</h3>
                <p className="text-sm text-muted-foreground">{mockUser.xp} / {nextLevel?.minXP || '∞'} XP</p>
              </div>
              <Badge variant="level" className="text-sm px-3 py-1">
                Level {mockUser.level}
              </Badge>
            </div>
            <Progress value={progressToNext} variant="xp" className="h-4" />
            {nextLevel && (
              <p className="text-xs text-muted-foreground mt-2">
                {nextLevel.minXP - mockUser.xp} XP to {nextLevel.name}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Badges</CardTitle>
              <Badge variant="outline" className="text-xs">
                {mockBadges.filter(b => b.isEarned).length}/{mockBadges.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <BadgeGrid badges={mockBadges} />
          </CardContent>
        </Card>

        {/* Menu */}
        <Card>
          <CardContent className="p-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors",
                  index < menuItems.length - 1 && "border-b border-border"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="text-[10px] mr-2">{item.badge}</Badge>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
