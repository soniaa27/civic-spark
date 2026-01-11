import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Send, ChevronLeft, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES, IssueCategory } from '@/types/civic';
import { cn } from '@/lib/utils';

interface ReportViewProps {
  onBack?: () => void;
}

export function ReportView({ onBack }: ReportViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | null>(null);
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [step, setStep] = useState(1);

  const canSubmit = selectedCategory && description.length > 10;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="iconSm" onClick={onBack}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">Report Issue</h1>
            <p className="text-xs text-muted-foreground">Help improve your community</p>
          </div>
          <Badge variant="xp" className="text-xs">+20 XP</Badge>
        </div>
        
        {/* Progress steps */}
        <div className="flex gap-1 px-4 pb-3">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={cn(
                "flex-1 h-1 rounded-full transition-all duration-300",
                s <= step ? "gradient-hero" : "bg-muted"
              )}
            />
          ))}
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Step 1: Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-sm font-semibold mb-3">What type of issue is this?</h2>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(category.id);
                  if (step === 1) setStep(2);
                }}
                className={cn(
                  "flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200",
                  selectedCategory === category.id
                    ? "border-primary bg-primary/5 shadow-card"
                    : "border-border hover:border-primary/50"
                )}
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-xs font-medium">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Step 2: Photo */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-sm font-semibold mb-3">Add a photo (optional)</h2>
            {!hasPhoto ? (
              <Card 
                className="border-2 border-dashed border-primary/30 bg-primary/5 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => {
                  setHasPhoto(true);
                  if (step === 2) setStep(3);
                }}
              >
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-primary">Take Photo</p>
                  <p className="text-xs text-muted-foreground mt-1">or upload from gallery</p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline" className="text-xs">📸 Camera</Badge>
                    <Badge variant="outline" className="text-xs">🖼️ Gallery</Badge>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="relative">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400" 
                    alt="Issue preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button 
                  variant="destructive" 
                  size="iconSm"
                  className="absolute top-2 right-2"
                  onClick={() => setHasPhoto(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Badge variant="resolved" className="absolute bottom-2 left-2 text-xs">
                  ✓ Photo added (+10 XP)
                </Badge>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: Description & Location */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-sm font-semibold mb-3">Describe the issue</h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the issue in detail. Include any relevant information that might help resolve it..."
                className="w-full h-32 p-4 rounded-2xl bg-muted border-2 border-border focus:border-primary focus:outline-none resize-none text-sm transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-1.5 text-right">
                {description.length}/500 characters
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-3">Location</h2>
              <Card className="border-2 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                    <p className="font-medium text-sm">Current Location</p>
                    <p className="text-xs text-muted-foreground">Bengaluru, Karnataka</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* XP Preview */}
        <Card className="border-2 border-accent/30 bg-accent/5">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2">XP You'll Earn</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Report issue</span>
                <Badge variant="xp" className="text-xs">+20 XP</Badge>
              </div>
              {hasPhoto && (
                <div className="flex items-center justify-between text-sm">
                  <span>Photo evidence</span>
                  <Badge variant="xp" className="text-xs">+10 XP</Badge>
                </div>
              )}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-accent">{hasPhoto ? 30 : 20} XP</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          variant="hero" 
          size="xl" 
          className="w-full"
          disabled={!canSubmit}
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Report
        </Button>
      </div>
    </div>
  );
}
