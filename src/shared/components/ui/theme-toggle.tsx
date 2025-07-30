import { Moon, Sun } from 'lucide-react';
import { cn } from '@/shared/lib/utils/utils';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from './button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className='cursor-pointer'
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-transform duration-300',
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-transform duration-300 dark:text-white',
          theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};