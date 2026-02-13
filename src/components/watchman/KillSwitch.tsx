import { Power } from 'lucide-react';

interface KillSwitchProps {
  onTerminate: () => void;
  isTerminated: boolean;
}

const KillSwitch = ({ onTerminate, isTerminated }: KillSwitchProps) => {
  return (
    <footer className="border-t border-primary/20 p-4">
      <button
        onClick={onTerminate}
        disabled={isTerminated}
        className="kill-switch mx-auto flex items-center gap-3 rounded border-2 border-destructive bg-destructive/10 px-8 py-3 font-bold uppercase tracking-widest text-destructive transition-all hover:bg-destructive/20 disabled:opacity-50"
      >
        <Power className="h-5 w-5" />
        {isTerminated ? 'CONNECTION TERMINATED' : 'TERMINATE CONNECTION'}
      </button>
    </footer>
  );
};

export default KillSwitch;
