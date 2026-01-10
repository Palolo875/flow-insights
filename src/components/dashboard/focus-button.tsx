import { Button } from '@/components/ui/button';
import { Focus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FocusButtonProps {
  taskId: string;
}

export function FocusButton({ taskId }: FocusButtonProps) {
  return (
    <Link to={`/dashboard/focus/${encodeURIComponent(taskId)}`}>
      <Button 
        variant="outline" 
        size="sm"
        className="flex items-center gap-2"
      >
        <Focus className="h-4 w-4" />
        <span>Focus</span>
      </Button>
    </Link>
  );
}
