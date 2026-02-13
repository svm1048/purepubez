import { useState, useEffect, useCallback, useRef } from 'react';

export interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'CRITICAL';
  message: string;
}

export interface FlaggedIP {
  ip: string;
  timestamp: string;
  threat: string;
}

const RANDOM_IPS = [
  '192.168.1.5', '10.0.0.42', '172.16.0.8', '192.168.1.9',
  '10.0.0.101', '172.16.0.23', '192.168.2.14', '10.0.0.77',
  '8.8.8.8', '1.1.1.1', '203.0.113.42', '198.51.100.7',
];

const ATTACK_IPS = [
  '45.33.32.156', '185.220.101.1', '91.240.118.172', '194.26.29.113',
  '23.129.64.100', '171.25.193.20', '104.244.76.13', '62.210.105.116',
];

const PORTS = [80, 443, 22, 8080, 3306, 5432, 21, 25, 1337, 8443];
const PROTOCOLS = ['TCP', 'UDP', 'TCP', 'TCP']; // TCP weighted

const THREATS = [
  'Port Scan Detected', 'Brute Force Attempt', 'SQL Injection Probe',
  'Buffer Overflow Attempt', 'Reverse Shell Detected', 'Data Exfiltration',
];

function getTimestamp() {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function useWatchman() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [packetsSniffed, setPacketsSniffed] = useState(10420);
  const [threatsBlocked, setThreatsBlocked] = useState(0);
  const [anomalyScore, setAnomalyScore] = useState(23);
  const [isBreaching, setIsBreaching] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [flaggedIPs, setFlaggedIPs] = useState<FlaggedIP[]>([]);
  const logIdRef = useRef(0);

  const addLog = useCallback((level: 'INFO' | 'CRITICAL', message: string) => {
    logIdRef.current += 1;
    const entry: LogEntry = {
      id: logIdRef.current,
      timestamp: getTimestamp(),
      level,
      message,
    };
    setLogs(prev => [...prev.slice(-150), entry]);
  }, []);

  const triggerBreach = useCallback(() => {
    if (isTerminated) return;
    setIsBreaching(true);
    const attackIP = randomItem(ATTACK_IPS);
    const threat = randomItem(THREATS);
    addLog('CRITICAL', `ANOMALY DETECTED! Source: ${attackIP} -> Port 1337 | ${threat}`);
    setAnomalyScore(85 + Math.floor(Math.random() * 15));
    setThreatsBlocked(prev => prev + 1);
    setFlaggedIPs(prev => [
      { ip: attackIP, timestamp: getTimestamp(), threat },
      ...prev.slice(0, 9),
    ]);

    setTimeout(() => {
      setIsBreaching(false);
      setAnomalyScore(15 + Math.floor(Math.random() * 25));
    }, 5000);
  }, [addLog, isTerminated]);

  // Normal traffic generation
  useEffect(() => {
    if (isTerminated) return;
    const interval = setInterval(() => {
      const src = randomItem(RANDOM_IPS);
      const port = randomItem(PORTS);
      const proto = randomItem(PROTOCOLS);
      addLog('INFO', `Packet ${proto} ${src} -> ${port} (Normal)`);
      setPacketsSniffed(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, [addLog, isTerminated]);

  // Anomaly score drift
  useEffect(() => {
    if (isTerminated) return;
    const interval = setInterval(() => {
      if (!isBreaching) {
        setAnomalyScore(prev => {
          const drift = (Math.random() - 0.5) * 8;
          return Math.max(5, Math.min(45, prev + drift));
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isBreaching, isTerminated]);

  // Auto breach trigger
  useEffect(() => {
    if (isTerminated) return;
    const schedule = () => {
      const delay = 30000 + Math.random() * 15000;
      return setTimeout(() => {
        triggerBreach();
        timerId = schedule();
      }, delay);
    };
    let timerId = schedule();
    return () => clearTimeout(timerId);
  }, [triggerBreach, isTerminated]);

  const terminate = useCallback(() => {
    setIsTerminated(true);
    setTimeout(() => setIsTerminated(false), 4000);
  }, []);

  return {
    logs,
    packetsSniffed,
    threatsBlocked,
    anomalyScore,
    isBreaching,
    isTerminated,
    flaggedIPs,
    triggerBreach,
    terminate,
  };
}
