import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		},
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			wave: {
  				'gray-100': 'hsl(var(--wave-gray-100))',
  				'gray-200': 'hsl(var(--wave-gray-200))',
  				'gray-300': 'hsl(var(--wave-gray-300))',
  				'neon-green-bright': 'hsl(150, 100%, 60%)',
  				'neon-green-pure': 'hsl(140, 100%, 50%)',
  				'neon-green-dark': 'hsl(160, 100%, 45%)',
  				'neon-green-lime': 'hsl(130, 100%, 55%)',
  				'neon-green-teal': 'hsl(170, 100%, 40%)',
  				'blue-deep': 'hsl(var(--wave-blue-deep))',
  				'blue-electric': 'hsl(var(--wave-blue-electric))',
  				'blue-bright': 'hsl(var(--wave-blue-bright))',
  				'purple-deep': 'hsl(var(--wave-purple-deep))',
  				'purple-rich': 'hsl(var(--wave-purple-rich))',
  				'purple-bright': 'hsl(var(--wave-purple-bright))',
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			smokeFlow: {
  				'0%': {
  					transform: 'translateY(0) scale(1)',
  					opacity: '0',
  				},
  				'50%': {
  					opacity: '0.5',
  				},
  				'100%': {
  					transform: 'translateY(-50px) scale(1.5)',
  					opacity: '0',
  				},
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'smoke-flow': 'smokeFlow 15s infinite',
  		},
  		backgroundImage: {
  			'orange-glow-radial': 'radial-gradient(var(--orange-glow) 40%, transparent 60%)',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
