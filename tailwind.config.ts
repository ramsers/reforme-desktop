import plugin from 'tailwindcss/plugin'

const capitalizeFirst = plugin(function ({ addUtilities }) {
    const newUtilities = {
        '.capitalize-first:first-letter': {
            textTransform: 'uppercase',
        },
    }
    addUtilities(newUtilities, ['responsive', 'hover'])
})

const childSelector = plugin(function ({ addVariant }) {
    addVariant('child', '& > *')
    addVariant('child-hover', '& > *:hover')
})

const textShadow = plugin(function ({ addUtilities }) {
    const newUtilities = {
        '.text-shadow': {
            textShadow: '0.5px 0.5px black',
        },
    }
    addUtilities(newUtilities, ['responsive', 'hover'])
})

const animationDelay = plugin(
    function ({ addUtilities, theme }) {
        const values = theme('animationDelay') as Record<string, string>
        const utilities = Object.entries(values).map(([key, value]) => {
            return {
                [`.animation-delay-${key}`]: { animationDelay: `${value}` },
            }
        })
        addUtilities(utilities)
    },
    {
        theme: {
            animationDelay: {
                none: '0s',
                75: '75ms',
                100: '100ms',
                150: '150ms',
                200: '200ms',
                300: '300ms',
                400: '400ms',
                500: '500ms',
                600: '600ms',
                700: '700ms',
                800: '800ms',
                900: '900ms',
                1000: '1000ms',
            },
        },
    }
)

const config = {
    content: [
        './src/app/pages/**/*.{js,ts,jsx,tsx}',
        './design/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './features/**/*.{js,ts,jsx,tsx}',
        './common/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        {
            pattern: /col-span-(1|2|3|4|5|6|12|24)/, // whichever you use
        },
    ],
    theme: {
        extend: {
            screens: {
                mobile: { max: '640px' },
                tablet: { max: '1024px' },
            },
            fontFamily: {
                signature: ['"Oooh Baby"', 'cursive'],
            },
            fontSize: {
                '4xl': '2rem',
            },
            animation: {
                fade: 'fadeOut 1s ease-in-out',
                'coin-spin': 'coinSpin infinite 4s linear',
                'row-appear': 'tableRowAppear 1s ease-in-out',
                'fade-in-up': 'fadeInUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.2s ease-in',
            },
            boxShadow: {
                top: '0px 0px 10px rgba(25, 31, 47, 0.18)',
            },
            keyframes: {
                fadeOut: {
                    '0%': { opacity: '0%' },
                    '100%': { opacity: '100%' },
                },
                tableRowAppear: {
                    '0%': { backgroundColor: '#E5EEFC' },
                    '100%': { backgroundColor: 'white' },
                },
                coinSpin: {
                    '0%': { transform: 'rotateY(90deg)' },
                    '25%': { transform: 'rotateY(180deg)' },
                    '50%': { transform: 'rotateY(270deg)' },
                    '75%': { transform: 'rotateY(360deg)' },
                    '75.01%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(90deg)' },
                },
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(100%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                fadeIn: {
                    '0%': { opacity: '0%' },
                    '100%': { opacity: '100%' },
                },
            },
            gridTemplateColumns: {
                24: 'repeat(24, minmax(0, 1fr))',
            },
            gridColumn: {
                'span-24': 'span 24 / span 24',
                'span-16': 'span 16 / span 16',
                'span-19': 'span 19 / span 19',
            },
            colors: {
                'bob-dark': {
                    DEFAULT: '#0B1724',
                    slate: '#162B39',
                },
                'bob-blue': {
                    dark: '#293842',
                    hover: '#0F49C5',
                    DEFAULT: '#246AFD',
                    light: '#E9F0FF',
                    dm: '#7CC4F8',
                    'light-dm': '#142341',
                    'shadow-dm': '#728CD7',
                },
                'bob-blue-grey': {
                    DEFAULT: '#8B9BBB',
                },
                'bob-grey': {
                    stroke: '#EBEBEB',
                    dark: '#D3DAE8',
                    DEFAULT: '#F3F3F3',
                    darker: '#8B9BBB',
                    'stroke-dm': '#293842',
                    dm: '#8B9BBB',
                },
                'bob-orange': {
                    DEFAULT: '#EF9449',
                    light: '#F9EDC6',
                    dm: '#5B5130',
                },
                'noble-black': {
                    DEFAULT: '#292926',
                },
                primary: {
                    DEFAULT: '#4959E4',
                    dark: '#333D8D',
                    soft: '#E5EEFC',
                },
                secondary: {
                    DEFAULT: '#191F2F',
                },
                main: {
                    DEFAULT: '#eff2f5',
                    dm: '#181A1E',
                },
                'modal-main': {
                    DEFAULT: '#111213',
                    dm: '#1D232B',
                },
                'neutral-0': {
                    DEFAULT: '#FFFFFF',
                    dm: '#28282D',
                },
                'neutral-10': {
                    DEFAULT: '#F7F9FC',
                    dm: '#181A1E',
                },
                'neutral-15': {
                    DEFAULT: '#EEF1F9',
                },
                'neutral-20': {
                    DEFAULT: '#DFE3EA',
                    dm: '#3D424A',
                },
                'neutral-30': {
                    DEFAULT: '#CDD4E0',
                },
                'neutral-50': {
                    DEFAULT: '#B0B5BD',
                    dm: '#525B6A',
                },
                'neutral-70': {
                    DEFAULT: '#868E9B',
                    dm: '#89929F',
                },
                'neutral-100': {
                    DEFAULT: '#545D6B',
                    dm: '#B1BAC7',
                },
                success: {
                    DEFAULT: '#2E957C',
                    light: '#DDF3EF',
                    dm: '#2EA388',
                },
                danger: {
                    DEFAULT: '#E35050',
                    dm: '#E76666',
                },
                warning: {
                    DEFAULT: '#E37612',
                    dm: '#ED8421',
                },
                'success-10': {
                    DEFAULT: '#DDF3EF',
                    dm: '#1D423A',
                },
                'danger-10': {
                    DEFAULT: '#FCEDED',
                    dm: '#4D2A2A',
                },
                'warning-10': {
                    DEFAULT: '#FCF1E7',
                    dm: '#463111',
                },
                progress: {
                    DEFAULT: '#CDD1ED',
                },
                yellow: {
                    DEFAULT: '#FDD676',
                    light: '#FFF7E1',
                },
                'brown-10': {
                    DEFAULT: '#A38D78',
                },
            },
        },
    },
    plugins: [capitalizeFirst, childSelector, textShadow, animationDelay],
}

export default config
