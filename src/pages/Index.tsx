import { useWatchman } from '@/hooks/useWatchman';
import Header from '@/components/watchman/Header';
import StatsRow from '@/components/watchman/StatsRow';
import TrafficFeed from '@/components/watchman/TrafficFeed';
import AnomalyGauge from '@/components/watchman/AnomalyGauge';
import KillSwitch from '@/components/watchman/KillSwitch';

const Index = () => {
  const {
    logs,
    packetsSniffed,
    threatsBlocked,
    anomalyScore,
    isBreaching,
    isTerminated,
    flaggedIPs,
    terminate,
  } = useWatchman();

  return (
    <>
      <div className="crt-overlay" />

      {/* Terminated overlay */}
      {isTerminated && (
        <div className="terminated-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/95">
          <div className="text-center">
            <div className="glitch mb-4 text-4xl font-extrabold text-destructive" data-text="CONNECTION TERMINATED">
              CONNECTION TERMINATED
            </div>
            <div className="text-sm text-muted-foreground">Restoring connection...</div>
          </div>
        </div>
      )}

      <div
        className={`flex h-screen flex-col border-2 ${
          isBreaching ? 'breach-active border-destructive' : 'border-primary/10'
        }`}
      >
        <Header isBreaching={isBreaching} />
        <StatsRow packetsSniffed={packetsSniffed} threatsBlocked={threatsBlocked} />

        <div className="flex flex-1 gap-4 overflow-hidden px-4 pb-4">
          <div className="w-[60%]">
            <TrafficFeed logs={logs} />
          </div>
          <div className="w-[40%]">
            <AnomalyGauge score={anomalyScore} flaggedIPs={flaggedIPs} />
          </div>
        </div>

        <KillSwitch onTerminate={terminate} isTerminated={isTerminated} />
      </div>
    </>
  );
};

export default Index;
