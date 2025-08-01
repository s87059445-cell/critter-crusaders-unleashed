import { Zap, Sparkles } from 'lucide-react';

const LoadingHero = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-hero p-8 text-center space-y-6">
        
        {/* Animated Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-2 border-4 border-secondary rounded-full animate-spin border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-8 h-8 text-secondary animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="font-bangers text-2xl text-comic-title">
            Forging Your Hero's Legend!
          </h3>
          <p className="text-muted-foreground">
            Our AI is crafting an epic superhero story...
          </p>
        </div>

        {/* Loading Messages */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-foreground/80">Analyzing your critter's powers...</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span className="text-foreground/80">Creating origin story...</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-hero-red animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-foreground/80">Designing nemesis...</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-hero animate-pulse"></div>
        </div>

        <p className="text-xs text-muted-foreground">
          This usually takes a few seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingHero;