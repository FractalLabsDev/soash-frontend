import { forwardRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/atoms/Badge'
import { Typography } from '@/components/atoms/Typography'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display at the top of the card
   */
  icon?: LucideIcon
  /**
   * Main metric value
   */
  value: string | number
  /**
   * Metric label/description
   */
  label: string
  /**
   * Optional badge for performance indicator
   */
  badge?: {
    text: string
    variant?: 'content' | 'timing' | 'strategy' | 'performance'
    performance?: 'high' | 'medium' | 'low'
  }
  /**
   * Optional trend indicator
   */
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
  }
  /**
   * Card size variant
   */
  size?: 'sm' | 'default' | 'lg'
  /**
   * Enable hover effects
   */
  hoverable?: boolean
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ 
    icon: Icon, 
    value, 
    label, 
    badge, 
    trend, 
    size = 'default', 
    hoverable = true,
    className, 
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
    }

    const valueSizeClasses = {
      sm: 'text-lg',
      default: 'text-2xl',
      lg: 'text-3xl',
    }

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      default: 'w-6 h-6',
      lg: 'w-8 h-8',
    }

    const getTrendColor = (direction: string) => {
      switch (direction) {
        case 'up':
          return 'text-green-600'
        case 'down':
          return 'text-red-600'
        default:
          return 'text-gray-600'
      }
    }

    return (
      <Card
        ref={ref}
        className={cn(
          'transition-all duration-200',
          hoverable && 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer',
          className
        )}
        {...props}
      >
        <CardContent className={cn('text-center space-y-3', sizeClasses[size])}>
          {/* Icon */}
          {Icon && (
            <div className="flex justify-center">
              <Icon className={cn('text-gray-600', iconSizeClasses[size])} />
            </div>
          )}

          {/* Value */}
          <Typography
            variant="heading1"
            className={cn('font-bold text-gray-900', valueSizeClasses[size])}
          >
            {value}
          </Typography>

          {/* Label */}
          <Typography variant="body" className="text-gray-600">
            {label}
          </Typography>

          {/* Badge */}
          {badge && (
            <div className="flex justify-center">
              <Badge
                variant={badge.variant}
                performance={badge.performance}
                size="sm"
              >
                {badge.text}
              </Badge>
            </div>
          )}

          {/* Trend */}
          {trend && (
            <div className="flex justify-center items-center space-x-1">
              <Typography
                variant="caption"
                className={cn('font-semibold', getTrendColor(trend.direction))}
              >
                {trend.direction === 'up' && '↗'}
                {trend.direction === 'down' && '↘'}
                {trend.direction === 'neutral' && '→'}
                {trend.value}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                vs. last week
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

MetricCard.displayName = 'MetricCard'