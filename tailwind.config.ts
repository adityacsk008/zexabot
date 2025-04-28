
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
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
				// Custom colors for Prompt Minds Chat
				promptminds: {
					background: '#0B0C10',
					primary: '#66FCF1',
					secondary: '#45A29E',
					text: '#C5C6C7'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'subtle-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px 1px rgba(102, 252, 241, 0.2), 0 0 8px 0 rgba(102, 252, 241, 0.1)' 
					},
					'50%': { 
						boxShadow: '0 0 8px 2px rgba(102, 252, 241, 0.3), 0 0 12px 0 rgba(102, 252, 241, 0.2)' 
					}
				},
				'text-glow': {
					'0%, 100%': { 
						textShadow: '0 0 5px rgba(102, 252, 241, 0.3), 0 0 10px rgba(102, 252, 241, 0.2)' 
					},
					'50%': { 
						textShadow: '0 0 8px rgba(102, 252, 241, 0.5), 0 0 15px rgba(102, 252, 241, 0.3)' 
					}
				},
				'border-glow': {
					'0%, 100%': { 
						borderColor: 'rgba(102, 252, 241, 0.5)',
						boxShadow: '0 0 5px rgba(102, 252, 241, 0.3)'
					},
					'50%': { 
						borderColor: 'rgba(102, 252, 241, 0.8)',
						boxShadow: '0 0 10px rgba(102, 252, 241, 0.5)'
					}
				},
				'typing': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '0.8',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.05)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'subtle-glow': 'subtle-glow 2s ease-in-out infinite',
				'text-glow': 'text-glow 2s ease-in-out infinite',
				'border-glow': 'border-glow 2s ease-in-out infinite',
				'typing': 'typing 1.5s steps(30, end)',
				'blink': 'blink 0.7s step-end infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
