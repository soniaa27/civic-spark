import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Layers, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockIssues } from '@/data/mockData';
import { CATEGORIES, STATUS_CONFIG } from '@/types/civic';
import { cn } from '@/lib/utils';

export function MapView() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  
  const issue = selectedIssue ? mockIssues.find(i => i.id === selectedIssue) : null;

  return (
    <div className="relative min-h-screen bg-muted pb-20">
      {/* Map Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-card rounded-xl shadow-card px-4 py-3 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="Search location..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <Button variant="default" size="icon" className="shadow-card">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Category chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Badge 
              key={cat.id} 
              variant="secondary"
              className="bg-card shadow-sm text-xs px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </Badge>
          ))}
        </div>
      </header>

      {/* Map placeholder with markers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/10">
        {/* Simulated map background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Issue markers */}
        {mockIssues.map((issue, index) => {
          const statusConfig = STATUS_CONFIG[issue.status];
          const category = CATEGORIES.find(c => c.id === issue.category);
          const isSelected = selectedIssue === issue.id;
          
          // Simulated positions
          const positions = [
            { top: '35%', left: '30%' },
            { top: '45%', left: '55%' },
            { top: '55%', left: '40%' },
            { top: '40%', left: '70%' },
            { top: '60%', left: '25%' },
          ];
          
          return (
            <motion.button
              key={issue.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              onClick={() => setSelectedIssue(isSelected ? null : issue.id)}
              className={cn(
                "absolute z-10 transition-all duration-200",
                isSelected && "z-20"
              )}
              style={positions[index]}
            >
              <div className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200",
                issue.status === 'critical' && "bg-status-critical animate-pulse",
                issue.status === 'acknowledged' && "bg-status-acknowledged",
                issue.status === 'in-progress' && "bg-status-in-progress",
                issue.status === 'resolved' && "bg-status-resolved",
                isSelected && "scale-125 ring-4 ring-white/50"
              )}>
                <span className="text-lg">{category?.icon}</span>
                {issue.upvotes > 30 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    🔥
                  </div>
                )}
              </div>
              {/* Marker tail */}
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent",
                issue.status === 'critical' && "border-t-status-critical",
                issue.status === 'acknowledged' && "border-t-status-acknowledged",
                issue.status === 'in-progress' && "border-t-status-in-progress",
                issue.status === 'resolved' && "border-t-status-resolved",
              )} />
            </motion.button>
          );
        })}

        {/* Map text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground/40">
          <MapPin className="w-16 h-16 mx-auto mb-2" />
          <p className="text-sm font-medium">Interactive Map</p>
          <p className="text-xs">Tap markers to view issues</p>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <Button variant="secondary" size="icon" className="shadow-card bg-card">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="shadow-card bg-card">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="shadow-card bg-card">
          <Layers className="w-4 h-4" />
        </Button>
        <Button variant="hero" size="icon" className="shadow-glow-primary">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Selected issue card */}
      {issue && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="absolute bottom-24 left-4 right-4 z-30"
        >
          <Card className="shadow-elevated">
            <CardContent className="p-4">
              <div className="flex gap-3">
                {issue.imageUrl && (
                  <img
                    src={issue.imageUrl}
                    alt={issue.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={STATUS_CONFIG[issue.status].color as any} className="text-xs">
                      {STATUS_CONFIG[issue.status].label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {issue.upvotes} upvotes
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{issue.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {issue.location.address}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 h-9">Upvote</Button>
                    <Button size="sm" variant="outline" className="flex-1 h-9">Track</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-24 left-4 z-20">
        <Card className="shadow-card">
          <CardContent className="p-3">
            <p className="text-xs font-medium mb-2">Status Legend</p>
            <div className="space-y-1.5">
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    key === 'critical' && "bg-status-critical",
                    key === 'acknowledged' && "bg-status-acknowledged",
                    key === 'in-progress' && "bg-status-in-progress",
                    key === 'resolved' && "bg-status-resolved",
                  )} />
                  <span className="text-xs text-muted-foreground">{config.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
