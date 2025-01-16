import React from 'react';
import { Button } from "@/components/ui/button";
import { List, ListOrdered } from 'lucide-react';

interface ListControlsProps {
  onListOperation: (type: 'ordered' | 'unordered') => void;
}

export const ListControls = ({ onListOperation }: ListControlsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onListOperation('unordered')}
        title="Lista con viñetas"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onListOperation('ordered')}
        title="Lista numerada"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </>
  );
};