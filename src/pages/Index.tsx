import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Users, Zap } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CritterCamera from '@/components/CritterCamera';
import StoryDisplay from '@/components/StoryDisplay';
import CommunityFeed from '@/components/CommunityFeed';
import LoadingHero from '@/components/LoadingHero';
import heroInsect from '@/assets/hero-insect.jpg';

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

const Index = () => {
  const [currentStory, setCurrentStory] = useState<StoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userStories, setUserStories] = useState<StoryData[]>([]);
  const [activeTab, setActiveTab] = useState('capture');

  const generateStory = async (imageData: string) => {
    setIsLoading(true);
    setActiveTab('story');
    
    try {
      // Simulate AI story generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated story
      const newStory: StoryData = {
        id: Date.now().toString(),
        heroName: 'Captain Antennae',
        origin: 'Once an ordinary garden ant, this tiny hero was transformed when struck by a cosmic ray while carrying a breadcrumb! Now blessed with incredible powers, they protect the miniature world from evil forces.',
        powers: [
          'Super strength (can lift 50 times their body weight!)',
          'Colony coordination telepathy',
          'Size manipulation abilities'
        ],
        weakness: 'Gets completely distracted by picnic crumbs',
        nemesis: 'The Magnifying Glass Menace - a villainous scientist who threatens to expose the secret insect world!',
        author: 'You',
        likes: 0,
        comments: 0,
        timestamp: new Date()
      };
      
      setCurrentStory(newStory);
      setUserStories(prev => [newStory, ...prev]);
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetStory = () => {
    setCurrentStory(null);
    setActiveTab('capture');
  };

  const handleStorySelect = (story: StoryData) => {
    setCurrentStory(story);
    setActiveTab('story');
  };

  const handleShare = (story: StoryData) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${story.heroName}!`,
        text: story.origin,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Hero Header */}
        <header className="text-center py-8 px-4">
          <div className="relative inline-block">
            <img 
              src={heroInsect} 
              alt="Hero Insect" 
              className="absolute -top-4 -left-16 w-12 h-12 opacity-80 animate-float hidden md:block"
            />
            <h1 className="font-bangers text-5xl md:text-7xl text-comic-title tracking-wider">
              Critter Crusaders
            </h1>
            <img 
              src={heroInsect} 
              alt="Hero Insect" 
              className="absolute -top-4 -right-16 w-12 h-12 opacity-80 animate-bounce-gentle hidden md:block"
            />
          </div>
          <p className="text-xl md:text-2xl text-hero-glow font-semibold mt-2">
            Where Every Bug Becomes a Legend!
          </p>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Capture insects with your camera and watch as AI transforms them into epic superheroes. 
            Share stories and connect with fellow Critter Crusaders!
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="capture" className="flex items-center gap-2 font-bangers">
                <Camera className="w-4 h-4" />
                Capture
              </TabsTrigger>
              <TabsTrigger value="story" className="flex items-center gap-2 font-bangers">
                <Zap className="w-4 h-4" />
                Hero
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2 font-bangers">
                <Users className="w-4 h-4" />
                Community
              </TabsTrigger>
            </TabsList>

            <TabsContent value="capture" className="space-y-6">
              <CritterCamera onCapture={generateStory} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="story" className="space-y-6">
              {isLoading ? (
                <LoadingHero />
              ) : (
                <StoryDisplay 
                  story={currentStory} 
                  onReset={resetStory}
                  onShare={handleShare}
                />
              )}
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <CommunityFeed 
                stories={userStories} 
                onStorySelect={handleStorySelect}
              />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-muted-foreground">
          <p className="text-sm">
            Made with ❤️ for insect enthusiasts and superhero fans
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
