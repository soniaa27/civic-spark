import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { HomeView } from '@/views/HomeView';
import { MapView } from '@/views/MapView';
import { ReportView } from '@/views/ReportView';
import { LeaderboardView } from '@/views/LeaderboardView';
import { ProfileView } from '@/views/ProfileView';

type Tab = 'home' | 'map' | 'report' | 'leaderboard' | 'profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={setActiveTab} />;
      case 'map':
        return <MapView />;
      case 'report':
        return <ReportView onBack={() => setActiveTab('home')} />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-background min-h-screen relative">
      {renderView()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
