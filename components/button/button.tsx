import React from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'default' | 'dashboard' | 'neutral' | 'danger' | 'text'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    text?: string
    icon?: React.ReactNode
    isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    text,
    icon,
    className,
    isLoading = false,
    children,
    ...props
}) => {
    const baseStyles =
        'group inline-flex items-center justify-center font-semibold transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm'

    const variants: Record<ButtonVariant, string> = {
        default: 'bg-brown-default text-main hover:bg-gray-10 hover:text-brown-default rounded-lg px-3 py-2',
        dashboard: 'bg-dashboard-action text-main hover:bg-white hover:text-dashboard-action rounded-lg px-3 py-2',
        neutral: 'bg-gray-10 text-brown-default hover:bg-dashboard-action hover:text-white rounded-lg px-3 py-2',
        danger: 'bg-red-700 text-white hover:bg-red-500 rounded-lg px-3 py-2',
        text: 'bg-transparent text-blue-600 hover:text-black!  px-1 py-1',
    }

    return (
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className={twMerge(baseStyles, variants[variant], className)}
        >
            {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
                <>
                    <div className={`${icon && 'flex flex-row gap-0.5'}`}>
                        {icon && <span className="hidden h-4 w-4 md:block">{icon}</span>}
                        {text && <span>{text}</span>}
                    </div>

                    {children}
                </>
            )}
        </button>
    )
}

export default Button
