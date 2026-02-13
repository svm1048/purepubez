import { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import type { LogEntry } from '@/hooks/useWatchman';

interface TrafficFeedProps {
  logs: LogEntry[];
}

const TrafficFeed = ({ logs }: TrafficFeedProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs.length]);

  return (
    <div className="flex h-full flex-col rounded border border-primary/20 bg-card glow-green">
      <div className="flex items-center gap-2 border-b border-primary/20 px-4 py-2">
        <Terminal className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Live Traffic Feed
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 text-xs leading-relaxed">
        {logs.map((log) => (
          <div
            key={log.id}
            className={
              log.level === 'CRITICAL'
                ? 'text-destructive font-bold'
                : 'text-primary/80'
            }
          >
            <span className="text-muted-foreground">[{log.level}]</span>{' '}
            <span className="text-primary/50">{log.timestamp}</span> —{' '}
            {log.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TrafficFeed;
