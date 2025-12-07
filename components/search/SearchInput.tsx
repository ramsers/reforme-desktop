import React, { useEffect, useState } from 'react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string
    delay?: number
    onDebouncedChange: (value: string) => void
    onImmediateChange?: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder,
    delay = 300,
    onDebouncedChange,
    onImmediateChange,
    className = '',
    value: controlledValue,
    ...props
}) => {
    const [value, setValue] = useState(controlledValue?.toString() ?? '')
    const debouncedChangeRef = React.useRef(onDebouncedChange)

    useEffect(() => {
        if (controlledValue !== undefined && controlledValue !== value) {
            setValue(controlledValue.toString())
        }
    }, [controlledValue, value])

    useEffect(() => {
        debouncedChangeRef.current = onDebouncedChange
    }, [onDebouncedChange])

    useEffect(() => {
        const handler = setTimeout(() => {
            debouncedChangeRef.current(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setValue(newValue)
        onImmediateChange?.(newValue)
    }

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full rounded-lg border bg-white p-2 text-sm ${className}`}
            {...props}
        />
    )
}

export default SearchInput
