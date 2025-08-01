import { Share2, Heart, MessageCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface StoryData {
  id: string;
  heroName: string;
  origin: string;
  powers: string[];
  weakness: string;
  nemesis: string;
  imageUrl?: string;
  author: string;
  likes: number;
  comments: number;
  timestamp: Date;
}

interface StoryDisplayProps {
  story: StoryData | null;
  onReset: () => void;
  onShare?: (story: StoryData) => void;
}

const StoryDisplay = ({ story, onReset, onShare }: StoryDisplayProps) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!story) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="card-comic p-8">
          <div className="space-y-4">
            <div className="text-6xl">🦗</div>
            <h3 className="font-bangers text-2xl text-muted-foreground">
              No Hero Story Yet
            </h3>
            <p className="text-muted-foreground">
              Capture an insect to create their superhero legend!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (onShare) {
      onShare(story);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card-hero p-6 md:p-8 space-y-6">
        {/* Hero Title */}
        <div className="text-center space-y-2">
          <h2 className="font-bangers text-4xl md:text-5xl text-comic-title">
            {story.heroName}
          </h2>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Created by {story.author}</span>
            <span>•</span>
            <span>{story.timestamp.toLocaleDateString()}</span>
          </div>
        </div>

        {/* Story Content */}
        <div className="space-y-6">
          {/* Origin Story */}
          <div className="space-y-2">
            <h3 className="font-bangers text-2xl text-hero-glow">THE ORIGIN!</h3>
            <p className="text-foreground/90 leading-relaxed">
              {story.origin}
            </p>
          </div>

          {/* Superpowers */}
          <div className="space-y-2">
            <h3 className="font-bangers text-2xl text-hero-glow">AMAZING SUPERPOWERS!</h3>
            <ul className="space-y-2">
              {story.powers.map((power, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground/90">
                  <span className="text-secondary mt-1">⚡</span>
                  <span>{power}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weakness */}
          <div className="space-y-2">
            <h3 className="font-bangers text-2xl text-hero-glow">QUIRKY WEAKNESS!</h3>
            <p className="text-foreground/90 leading-relaxed">
              {story.weakness}
            </p>
          </div>

          {/* Nemesis */}
          <div className="space-y-2">
            <h3 className="font-bangers text-2xl text-hero-glow">ARCH-NEMESIS!</h3>
            <p className="text-foreground/90 leading-relaxed">
              {story.nemesis}
            </p>
          </div>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'text-hero-red bg-hero-red/10' 
                  : 'text-muted-foreground hover:text-hero-red hover:bg-hero-red/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{story.likes + (isLiked ? 1 : 0)}</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{story.comments}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          <button
            onClick={onReset}
            className="btn-comic px-4 py-2 font-bangers text-lg flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            New Hero
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;