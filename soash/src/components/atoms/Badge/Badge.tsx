import { forwardRef } from 'react'
import { Badge as ShadcnBadge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { BadgeProps as ShadcnBadgeProps } from '@/components/ui/badge'

interface BadgeProps extends Omit<ShadcnBadgeProps, 'variant'> {
  /**
   * Badge variant following prototype design patterns
   * - content: Blue badge for content insights
   * - timing: Green badge for timing insights  
   * - strategy: Purple badge for strategy insights
   * - performance: Dynamic badge based on performance level
   * - default: Standard shadcn badge
   */
  variant?: 'content' | 'timing' | 'strategy' | 'performance' | 'default' | 'secondary' | 'destructive' | 'outline'
  /**
   * Performance level for performance variant
   */
  performance?: 'high' | 'medium' | 'low'
  /**
   * Size variants
   */
  size?: 'sm' | 'default' | 'lg'
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', performance, size = 'default', children, ...props }, ref) => {
    // Determine the actual variant based on performance level
    let actualVariant: ShadcnBadgeProps['variant'] = 'default'
    let prototypeStyling = ''

    // Apply prototype-specific styling
    switch (variant) {
      case 'content':
        prototypeStyling = 'bg-blue-50 text-blue-700 border-blue-200'
        actualVariant = 'outline'
        break
      case 'timing':
        prototypeStyling = 'bg-green-50 text-green-700 border-green-200'
        actualVariant = 'outline'
        break
      case 'strategy':
        prototypeStyling = 'bg-purple-50 text-purple-700 border-purple-200'
        actualVariant = 'outline'
        break
      case 'performance':
        if (performance === 'high') {
          prototypeStyling = 'bg-green-50 text-green-700 border-green-200'
        } else if (performance === 'medium') {
          prototypeStyling = 'bg-yellow-50 text-yellow-700 border-yellow-200'
        } else if (performance === 'low') {
          prototypeStyling = 'bg-red-50 text-red-700 border-red-200'
        }
        actualVariant = 'outline'
        break
      default:
        actualVariant = variant as ShadcnBadgeProps['variant']
    }

    // Size styling
    const sizeClasses = {
      sm: 'text-xs px-2 py-0.5',
      default: 'text-sm px-2.5 py-1',
      lg: 'text-sm px-3 py-1.5',
    }

    return (
      <ShadcnBadge
        ref={ref}
        variant={actualVariant}
        className={cn(
          // Base styling
          'font-medium',
          
          // Size styling
          sizeClasses[size],
          
          // Prototype-specific styling
          prototypeStyling,
          
          // Transition for hover effects
          'transition-colors duration-200',
          
          className
        )}
        {...props}
      >
        {children}
      </ShadcnBadge>
    )
  }
)

Badge.displayName = 'Badge'