import React, { useState } from 'react';
import {
  AsciiThemeProvider,
  AsciiCard,
  AsciiButton,
  AsciiSpinner,
  AsciiAnimatedProgressBar,
  AsciiTypewriter,
  AsciiTypewriterMulti,
  AsciiMatrixRain,
  AsciiFadeTransition,
  AsciiSlideTransition,
  AsciiGlitchTransition,
  AsciiMatrixTransition,
  spinnerFrames
} from 'react-ascii-ui';

const AnimationDemo: React.FC = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  const [typewriterKey, setTypewriterKey] = useState(0);

  React.useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgressValue(prev => {
        const next = prev + Math.random() * 10;
        return next > 100 ? 0 : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const typewriterTexts = [
    "Welcome to ASCII Animations...",
    "Experience the power of terminal aesthetics.",
    "Built with React and TypeScript.",
    "Customize themes and effects!",
    "Matrix rain is falling..."
  ];

  const multiLineCode = [
    "function initializeMatrix() {",
    "  const columns = createColumns();",
    "  startAnimation();",
    "  return digitalRain();",
    "}"
  ];

  return (
    <div className="space-y-8">
      {/* Spinner Showcase */}
      <AsciiCard title="Loading Spinners">
        <div className="space-y-4">
          <div>
            <h4 className="mb-3 font-bold text-sm">Spinner Variants</h4>
            <div className="flex flex-wrap gap-8 items-center">
              {Object.keys(spinnerFrames).map((variant) => (
                <div key={variant} className="text-center">
                  <AsciiSpinner variant={variant as keyof typeof spinnerFrames} size="md" />
                  <div className="mt-2 text-xs opacity-60">{variant}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="mb-3 font-bold text-sm">Different Sizes</h4>
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <AsciiSpinner variant="dots" size="sm" />
                <div className="mt-1 text-xs opacity-60">Small</div>
              </div>
              <div className="text-center">
                <AsciiSpinner variant="dots" size="md" />
                <div className="mt-1 text-xs opacity-60">Medium</div>
              </div>
              <div className="text-center">
                <AsciiSpinner variant="dots" size="lg" />
                <div className="mt-1 text-xs opacity-60">Large</div>
              </div>
            </div>
          </div>
        </div>
      </AsciiCard>

      {/* Progress Bars */}
      <AsciiCard title="Progress Animations">
        <div className="space-y-6">
          <div>
            <AsciiAnimatedProgressBar 
              value={progressValue} 
              animated 
              label="Dynamic Progress"
              width={40}
            />
          </div>
          
          <div>
            <AsciiAnimatedProgressBar 
              value={75} 
              variant="pulse" 
              label="Pulsing Effect"
              width={40}
            />
          </div>
          
          <div>
            <AsciiAnimatedProgressBar 
              value={90} 
              variant="gradient" 
              label="Gradient Fill"
              width={40}
            />
          </div>
        </div>
      </AsciiCard>

      {/* Typewriter Effects */}
      <AsciiCard title="Typewriter Effects">
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 font-bold text-sm">Single Line Typewriter</h4>
            <AsciiTypewriter 
              key={typewriterKey}
              text={typewriterTexts}
              config={{ 
                speed: 60, 
                deleteSpeed: 30, 
                pauseAfterComplete: 1500,
                repeat: true 
              }}
            />
          </div>

          <div>
            <h4 className="mb-3 font-bold text-sm">Multi-line Code Animation</h4>
            <AsciiTypewriterMulti
              lines={multiLineCode}
              lineDelay={300}
              config={{
                speed: 40,
                showCursor: false
              }}
            />
          </div>

          <div className="flex gap-4">
            <AsciiButton 
              onClick={() => setTypewriterKey(prev => prev + 1)}
            >
              Restart Typewriter
            </AsciiButton>
          </div>
        </div>
      </AsciiCard>

      {/* Matrix Rain */}
      <AsciiCard title="Matrix Rain Animation">
        <div className="space-y-4">
          <div>
            <h4 className="mb-3 font-bold text-sm">Digital Rain Effect</h4>
            <div className="border border-current p-4 overflow-hidden">
              <AsciiMatrixRain
                width={60}
                height={15}
                config={{
                  density: 0.08,
                  speed: 120,
                  fadeEffect: true
                }}
              />
            </div>
          </div>
          
          <p className="text-sm opacity-75">
            Matrix-style character rain with customizable density, speed, and fade effects.
          </p>
        </div>
      </AsciiCard>

      {/* Transition Effects */}
      <AsciiCard title="Transition Effects">
        <div className="space-y-6">
          <div className="flex gap-4 mb-4">
            <AsciiButton 
              onClick={() => setShowTransition(!showTransition)}
            >
              Toggle Transitions
            </AsciiButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3 font-bold text-sm">Fade Transition</h4>
              <div className="border border-current p-4 h-20 flex items-center justify-center">
                <AsciiFadeTransition show={showTransition} duration={500}>
                  <div className="text-center">
                    ┌─ FADE EFFECT ─┐<br/>
                    │  Smooth fade  │<br/>
                    └───────────────┘
                  </div>
                </AsciiFadeTransition>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-bold text-sm">Slide Transition</h4>
              <div className="border border-current p-4 h-20 flex items-center justify-center overflow-hidden">
                <AsciiSlideTransition show={showTransition} duration={400}>
                  <div className="text-center">
                    ┌─ SLIDE EFFECT ─┐<br/>
                    │  Smooth slide  │<br/>
                    └────────────────┘
                  </div>
                </AsciiSlideTransition>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-bold text-sm">Glitch Transition</h4>
              <div className="border border-current p-4 h-20 flex items-center justify-center">
                <AsciiGlitchTransition show={showTransition} duration={600} intensity={0.5}>
                  <div className="text-center">
                    ┌─ GLITCH EFFECT ─┐<br/>
                    │ Random chaos!! │<br/>
                    └─────────────────┘
                  </div>
                </AsciiGlitchTransition>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-bold text-sm">Matrix Transition</h4>
              <div className="border border-current p-4 h-20 flex items-center justify-center">
                <AsciiMatrixTransition show={showTransition} duration={800}>
                  <div className="text-center">
                    ┌─ MATRIX EFFECT ─┐<br/>
                    │  Binary reveal  │<br/>
                    └─────────────────┘
                  </div>
                </AsciiMatrixTransition>
              </div>
            </div>
          </div>
        </div>
      </AsciiCard>

      {/* Performance Info */}
      <AsciiCard title="Animation System Features">
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-400 mb-2">🎬 Loading Animations</h4>
              <ul className="space-y-1 opacity-80">
                <li>• Multiple spinner variants (dots, arrows, binary)</li>
                <li>• Animated progress bars with effects</li>
                <li>• Customizable speeds and sizes</li>
                <li>• Theme-aware colors</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-cyan-400 mb-2">⌨️ Typewriter Effects</h4>
              <ul className="space-y-1 opacity-80">
                <li>• Single and multi-line animations</li>
                <li>• Configurable typing speeds</li>
                <li>• Auto-delete and repeat modes</li>
                <li>• Custom cursor characters</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-yellow-400 mb-2">🌧️ Matrix Rain</h4>
              <ul className="space-y-1 opacity-80">
                <li>• Fullscreen and contained modes</li>
                <li>• Customizable character sets</li>
                <li>• Fade trails and density control</li>
                <li>• Performance optimized</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-purple-400 mb-2">🔄 Transitions</h4>
              <ul className="space-y-1 opacity-80">
                <li>• Fade, slide, glitch, matrix effects</li>
                <li>• Configurable duration and easing</li>
                <li>• State-based triggering</li>
                <li>• ASCII-themed transformations</li>
              </ul>
            </div>
          </div>
        </div>
      </AsciiCard>
    </div>
  );
};

export default function AnimationsPage() {
  return (
    <AsciiThemeProvider initialTheme="matrix">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ASCII Animation System</h1>
          <p className="text-lg opacity-80">
            Bring your ASCII interfaces to life with smooth animations, typewriter effects, 
            Matrix rain, and seamless transitions. All optimized for terminal aesthetics.
          </p>
        </div>
        
        <AnimationDemo />
      </div>
    </AsciiThemeProvider>
  );
}