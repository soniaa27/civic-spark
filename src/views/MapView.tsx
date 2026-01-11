import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Filter, Layers, Navigation, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockIssues } from '@/data/mockData';
import { CATEGORIES, STATUS_CONFIG } from '@/types/civic';
import { cn } from '@/lib/utils';
import { calculateIssuePriority } from '@/lib/priority';
import 'leaflet/dist/leaflet.css';

// Custom marker icon creator
function createCustomMarkerIcon(color: string, icon: string) {
  // Encode SVG to avoid issues with special characters
  const svg = `
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 24 16 40 16 40C16 40 32 24 32 16C32 7.163 24.837 0 16 0Z" fill="${color}"/>
      <foreignObject x="0" y="6" width="32" height="28">
        <div xmlns="http://www.w3.org/1999/xhtml" style="text-align: center; font-size: 18px; line-height: 28px;">
          ${icon}
        </div>
      </foreignObject>
    </svg>
  `.trim();
  
  return new Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
  });
}

// Map controls component
function MapControls({ map }: { map: any }) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-2">
      <Button 
        variant="secondary" 
        size="icon" 
        className="shadow-card bg-card"
        onClick={() => map?.zoomIn()}
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button 
        variant="secondary" 
        size="icon" 
        className="shadow-card bg-card"
        onClick={() => map?.zoomOut()}
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button 
        variant="secondary" 
        size="icon" 
        className="shadow-card bg-card"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              map?.flyTo([position.coords.latitude, position.coords.longitude], 15);
            });
          }
        }}
      >
        <Navigation className="w-4 h-4" />
      </Button>
    </div>
  );
}

// Component to access map instance
function MapController() {
  const map = useMap();
  return <MapControls map={map} />;
}

export function MapView() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [mapCenter] = useState<[number, number]>([12.9716, 77.5946]); // Bengaluru coordinates
  const [mapZoom] = useState(12);
  
  const issue = selectedIssue ? mockIssues.find(i => i.id === selectedIssue) : null;

  // Get status color for markers
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'critical': '#ef4444',
      'acknowledged': '#f97316',
      'in-progress': '#3b82f6',
      'resolved': '#22c55e',
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div className="relative min-h-screen bg-muted pb-20">
      {/* Map Header */}
      <header className="absolute top-0 left-0 right-0 z-[1000] p-4">
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

      {/* Leaflet Map */}
      <div className="absolute inset-0 w-full h-full z-0">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Issue markers */}
          {mockIssues.map((issue) => {
            const category = CATEGORIES.find(c => c.id === issue.category);
            const statusColor = getStatusColor(issue.status);
            const markerIcon = createCustomMarkerIcon(statusColor, category?.icon || '📍');
            const daysSinceReported = Math.floor(
              (Date.now() - issue.reportedAt.getTime()) / (1000 * 60 * 60 * 24)
            );
            const priority = calculateIssuePriority(issue, 3, daysSinceReported);
            
            return (
              <Marker
                key={issue.id}
                position={[issue.location.lat, issue.location.lng]}
                icon={markerIcon}
                eventHandlers={{
                  click: () => setSelectedIssue(issue.id),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={STATUS_CONFIG[issue.status].color as any} className="text-xs">
                        {STATUS_CONFIG[issue.status].label}
                      </Badge>
                      {issue.upvotes > 30 && <span className="text-xs">🔥</span>}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{issue.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{issue.location.address}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>👍 {issue.upvotes}</span>
                      <span>Priority: {priority}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          <MapController />
        </MapContainer>
      </div>

      {/* Selected issue card */}
      {issue && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="absolute bottom-24 left-4 right-4 z-[1001]"
        >
          <Card className="shadow-elevated">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedIssue(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
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
                  <p className="text-xs text-muted-foreground mb-2">{issue.description}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" />
                    {issue.location.address}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 h-9">
                      {issue.hasUpvoted ? 'Upvoted ✓' : 'Upvote'}
                    </Button>
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
