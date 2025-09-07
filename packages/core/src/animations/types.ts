export interface AnimationConfig {
  duration?: number;
  delay?: number;
  repeat?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate';
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface TypewriterConfig extends AnimationConfig {
  speed?: number;
  cursor?: string;
  showCursor?: boolean;
  deleteSpeed?: number;
  pauseAfterComplete?: number;
}

export interface MatrixRainConfig extends AnimationConfig {
  density?: number;
  speed?: number;
  characters?: string[];
  columns?: number;
  fadeEffect?: boolean;
}

export interface LoadingSpinnerConfig extends AnimationConfig {
  frames?: string[];
  size?: 'sm' | 'md' | 'lg';
}

export interface TransitionConfig extends AnimationConfig {
  type?: 'fade' | 'slide' | 'glitch' | 'matrix';
  intensity?: number;
}

export type AnimationState = 'idle' | 'running' | 'paused' | 'completed';