import { forwardRef } from 'react'
import { Button as ShadcnButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ButtonProps as ShadcnButtonProps } from '@/components/ui/button'

interface ButtonProps extends ShadcnButtonProps {
  /**
   * Button variant following prototype design patterns
   * - primary: Gradient CTA button from prototype
   * - secondary: Outline button from prototype
   * - default: Standard shadcn button
   */
  variant?: 'primary' | 'secondary' | 'default' | 'destructive' | 'outline' | 'ghost' | 'link'
  /**
   * Size variants
   */
  size?: 'default' | 'sm' | 'lg' | 'icon'
  /**
   * Enable gradient styling for primary variant
   */
  gradient?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', gradient = false, ...props }, ref) => {
    // Apply prototype-specific styling for primary gradient button
    const isGradientPrimary = variant === 'primary' || gradient
    
    return (
      <ShadcnButton
        ref={ref}
        variant={isGradientPrimary ? 'default' : variant}
        size={size}
        className={cn(
          // Base transition for all buttons
          'transition-all duration-200 ease-in-out',
          
          // Prototype gradient primary button styling
          isGradientPrimary && [
            'bg-gradient-to-r from-blue-500 to-purple-600',
            'hover:from-blue-600 hover:to-purple-700',
            'text-white font-medium',
            'shadow-md hover:shadow-lg',
            'transform hover:-translate-y-0.5 active:translate-y-0',
          ],
          
          // Secondary button prototype styling
          variant === 'secondary' && [
            'bg-white border border-gray-200 text-gray-900',
            'hover:bg-gray-50 hover:border-gray-300',
            'font-medium',
          ],
          
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'