import { useState, useRef, useCallback } from 'react';
import { Camera, Zap, RotateCcw } from 'lucide-react';
interface CritterCameraProps {
  onCapture: (imageData: string) => void;
  isLoading?: boolean;
}
const CritterCamera = ({
  onCapture,
  isLoading = false
}: CritterCameraProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setHasPermission(false);
    }
  }, []);
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);
  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    onCapture(imageData);
    stopCamera();
  }, [onCapture, stopCamera]);
  const resetCamera = useCallback(() => {
    stopCamera();
    startCamera();
  }, [stopCamera, startCamera]);
  return <div className="w-full max-w-md mx-auto">
      <div className="card-hero p-6 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-bangers text-2xl text-comic-title">
            Capture Your Critter!
          </h3>
          <p className="text-muted-foreground">
            {!isActive ? "Ready to discover your insect's superpowers?" : "Point your camera at an insect and capture!"}
          </p>
        </div>

        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-primary/30">
          {!isActive ? <div className="flex items-center justify-center h-full bg-gradient-cosmic">
              <div className="text-center space-y-4">
                <Camera className="w-16 h-16 mx-auto text-foreground/50" />
                <div className="space-y-2">
                  {hasPermission === false ? <>
                      <p className="text-destructive font-semibold">Camera access denied</p>
                      <p className="text-sm text-muted-foreground">
                        Please enable camera permissions
                      </p>
                    </> : <p className="text-foreground/70">Camera inactive</p>}
                </div>
              </div>
            </div> : <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />}
        </div>

        <div className="flex gap-3 justify-center">
          {!isActive ? <button onClick={startCamera} disabled={isLoading} className="btn-comic px-6 py-3 font-bangers text-lg flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Start Camera
            </button> : <>
              <button onClick={captureImage} disabled={isLoading} className="btn-hero px-8 py-3 font-bangers text-xl flex items-center gap-2 animate-pulse-glow">
                <Zap className="w-5 h-5" />
                Unleash Hero!
              </button>
              <button onClick={resetCamera} disabled={isLoading} className="btn-comic px-4 py-3 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
              </button>
            </>}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>;
};
export default CritterCamera;