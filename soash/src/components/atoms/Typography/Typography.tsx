import { forwardRef, createElement } from 'react'
import { cn } from '@/lib/utils'

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML element to render
   */
  as?: TypographyElement
  /**
   * Typography variant following prototype design patterns
   */
  variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' | 'label'
  /**
   * Text color variants
   */
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'default'
  /**
   * Font weight override
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right'
}

const variantStyles = {
  heading1: 'text-2xl font-bold text-gray-900',
  heading2: 'text-xl font-semibold text-gray-900', 
  heading3: 'text-lg font-medium text-gray-900',
  body: 'text-sm text-gray-600',
  caption: 'text-xs text-gray-500',
  label: 'text-sm font-medium text-gray-700',
}

const colorStyles = {
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  muted: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  default: '', // Use variant's default color
}

const weightStyles = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const defaultElements: Record<NonNullable<TypographyProps['variant']>, TypographyElement> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  body: 'p',
  caption: 'span',
  label: 'label',
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ 
    as, 
    variant = 'body', 
    color = 'default', 
    weight, 
    align, 
    className, 
    children, 
    ...props 
  }, ref) => {
    const element = as || defaultElements[variant]
    
    return createElement(
      element,
      {
        ref,
        className: cn(
          // Base variant styling
          variantStyles[variant],
          
          // Color override
          color !== 'default' && colorStyles[color],
          
          // Weight override
          weight && weightStyles[weight],
          
          // Alignment
          align && alignStyles[align],
          
          // Custom className
          className
        ),
        ...props,
      },
      children
    )
  }
)

Typography.displayName = 'Typography'