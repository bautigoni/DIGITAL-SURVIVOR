import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          900: '#06030f',
          800: '#0a0518',
          700: '#120a2a',
          600: '#1a0f3d',
        },
        neon: {
          pink: '#ff2e88',
          cyan: '#22e3ff',
          yellow: '#fde047',
          purple: '#a855f7',
          green: '#34d399',
          orange: '#fb923c',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 46, 136, 0.45)',
        'glow-cyan': '0 0 30px rgba(34, 227, 255, 0.45)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.45)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floaty: 'floaty 3.5s ease-in-out infinite',
        pop: 'pop 250ms ease-out',
        glitch: 'glitch 220ms steps(2) infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at top, rgba(255,46,136,0.18), transparent 60%)',
        'spider-grid':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'spider-grid': '40px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
