import { Activity, Radio, Brain, ShieldAlert } from 'lucide-react';

interface StatsRowProps {
  packetsSniffed: number;
  threatsBlocked: number;
}

const StatsRow = ({ packetsSniffed, threatsBlocked }: StatsRowProps) => {
  const cards = [
    {
      label: 'Packets Sniffed',
      value: packetsSniffed.toLocaleString(),
      icon: Activity,
      glow: 'glow-green',
      color: 'text-primary',
    },
    {
      label: 'Honey Port Status',
      value: 'Port 1337: LISTENING',
      icon: Radio,
      glow: 'glow-green',
      color: 'text-primary',
      badge: true,
    },
    {
      label: 'AI Model',
      value: 'TensorFlow Lite: ARMED',
      icon: Brain,
      glow: 'glow-blue',
      color: 'text-secondary',
    },
    {
      label: 'Threats Blocked',
      value: threatsBlocked.toString(),
      icon: ShieldAlert,
      glow: 'glow-red',
      color: 'text-destructive',
      large: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.glow} rounded border border-primary/20 bg-card p-4`}
        >
          <div className="mb-2 flex items-center gap-2">
            <card.icon className={`h-4 w-4 ${card.color}`} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {card.label}
            </span>
          </div>
          <div className={`font-bold ${card.color} ${card.large ? 'text-3xl' : 'text-sm'}`}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
