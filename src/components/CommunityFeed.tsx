import { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, Zap } from 'lucide-react';

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

interface CommunityFeedProps {
  stories: StoryData[];
  onStorySelect?: (story: StoryData) => void;
}

const CommunityFeed = ({ stories, onStorySelect }: CommunityFeedProps) => {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  const handleLike = (storyId: string) => {
    const newLiked = new Set(likedStories);
    if (newLiked.has(storyId)) {
      newLiked.delete(storyId);
    } else {
      newLiked.add(storyId);
    }
    setLikedStories(newLiked);
  };

  const mockStories: StoryData[] = [
    {
      id: '1',
      heroName: 'Captain Buzzwing',
      origin: 'A humble honeybee discovered mysterious quantum pollen that granted incredible powers!',
      powers: ['Interdimensional flight', 'Honey force fields', 'Swarm telepathy'],
      weakness: 'Cannot resist flower shops',
      nemesis: 'Dr. Pesticide, the evil entomologist',
      author: 'NatureLover42',
      likes: 247,
      comments: 18,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '2',
      heroName: 'The Mighty Mantis',
      origin: 'Struck by cosmic lightning while meditating, this praying mantis gained the power of precognition!',
      powers: ['Future sight', 'Lightning-fast reflexes', 'Zen meditation healing'],
      weakness: 'Gets distracted by moving objects',
      nemesis: 'Chaos Cricket, master of unpredictable mayhem',
      author: 'ZenMaster88',
      likes: 189,
      comments: 12,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5)
    },
    {
      id: '3',
      heroName: 'Lady Ladybug',
      origin: 'A fashionable ladybug inherited ancient armor from her grandmother, the legendary Polka-Dot Protector!',
      powers: ['Luck manipulation', 'Spot-teleportation', 'Good fortune aura'],
      weakness: 'Unlucky on Tuesdays',
      nemesis: 'Baron Aphid, the garden destroyer',
      author: 'GardenGuardian',
      likes: 203,
      comments: 25,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8)
    }
  ];

  const allStories = [...mockStories, ...stories];

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-bangers text-4xl text-comic-title flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          Community Heroes
        </h2>
        <p className="text-muted-foreground">
          Discover amazing insect superheroes created by fellow Critter Crusaders!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allStories.map((story) => (
          <div key={story.id} className="card-comic p-4 space-y-4 hover:shadow-hero transition-all duration-300 cursor-pointer group"
               onClick={() => onStorySelect?.(story)}>
            
            {/* Hero Header */}
            <div className="space-y-2">
              <h3 className="font-bangers text-xl text-secondary group-hover:text-secondary-glow transition-colors">
                {story.heroName}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>by {story.author}</span>
                <span>{story.timestamp.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Story Preview */}
            <div className="space-y-3">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {truncateText(story.origin, 80)}
              </p>
              
              {/* Powers Preview */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-hero-glow flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  POWERS
                </h4>
                <div className="flex flex-wrap gap-1">
                  {story.powers.slice(0, 2).map((power, index) => (
                    <span key={index} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {truncateText(power, 20)}
                    </span>
                  ))}
                  {story.powers.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{story.powers.length - 2} more</span>
                  )}
                </div>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(story.id);
                  }}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    likedStories.has(story.id)
                      ? 'text-hero-red'
                      : 'text-muted-foreground hover:text-hero-red'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                  <span>{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                </button>
                
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-3 h-3" />
                  <span>{story.comments}</span>
                </button>
                
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-secondary transition-colors">
                  <Share2 className="w-3 h-3" />
                </button>
              </div>
              
              <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View Full Story →
              </span>
            </div>
          </div>
        ))}
      </div>

      {allStories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🦸‍♀️</div>
          <h3 className="font-bangers text-2xl text-muted-foreground mb-2">
            No Heroes Yet!
          </h3>
          <p className="text-muted-foreground">
            Be the first to create an amazing insect superhero story!
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;