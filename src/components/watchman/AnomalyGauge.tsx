import { Radar } from 'lucide-react';
import type { FlaggedIP } from '@/hooks/useWatchman';

interface AnomalyGaugeProps {
  score: number;
  flaggedIPs: FlaggedIP[];
}

const AnomalyGauge = ({ score, flaggedIPs }: AnomalyGaugeProps) => {
  const radius = 70;
  const circumference = Math.PI * radius; // semi-circle
  const progress = (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return 'hsl(var(--watchman-red))';
    if (score >= 50) return 'hsl(60, 100%, 50%)';
    return 'hsl(var(--watchman-green))';
  };

  const getTextClass = () => {
    if (score >= 80) return 'text-destructive';
    if (score >= 50) return 'text-yellow-400';
    return 'text-primary';
  };

  return (
    <div className="flex h-full flex-col rounded border border-secondary/20 bg-card glow-blue">
      <div className="flex items-center gap-2 border-b border-secondary/20 px-4 py-2">
        <Radar className="h-4 w-4 text-secondary" />
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          AI Analysis
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center p-4">
        {/* Gauge */}
        <div className="relative mb-2">
          <svg width="180" height="100" viewBox="0 0 180 100">
            <path
              d="M 10 90 A 70 70 0 0 1 170 90"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 10 90 A 70 70 0 0 1 170 90"
              fill="none"
              stroke={getColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              style={{ transition: 'stroke-dasharray 0.5s ease, stroke 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-end justify-center pb-1">
            <span className={`text-3xl font-extrabold ${getTextClass()}`}>
              {Math.round(score)}%
            </span>
          </div>
        </div>
        <span className="mb-4 text-[10px] uppercase tracking-widest text-muted-foreground">
          Anomaly Confidence Score
        </span>

        {/* Flagged IPs */}
        <div className="w-full flex-1 overflow-y-auto">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-destructive">
            Flagged IPs ({flaggedIPs.length})
          </div>
          {flaggedIPs.length === 0 && (
            <div className="text-xs text-muted-foreground">No flagged IPs</div>
          )}
          {flaggedIPs.map((ip, i) => (
            <div
              key={`${ip.ip}-${i}`}
              className="mb-1 flex items-center justify-between rounded bg-destructive/10 px-2 py-1 text-xs"
            >
              <span className="font-bold text-destructive">{ip.ip}</span>
              <span className="text-[10px] text-muted-foreground">{ip.threat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnomalyGauge;
