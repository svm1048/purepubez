import { Shield } from 'lucide-react';

interface HeaderProps {
  isBreaching: boolean;
}

const Header = ({ isBreaching }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-primary/20 px-6 py-3">
      <div className="flex items-center gap-4">
        <Shield className="h-8 w-8 text-primary" />
        <h1
          className="glitch text-2xl font-extrabold tracking-widest text-primary"
          data-text="THE WATCHMAN"
        >
          THE WATCHMAN
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              isBreaching
                ? 'bg-destructive pulse-red'
                : 'bg-primary pulse-green'
            }`}
          />
          <span
            className={`text-xs font-bold tracking-wider ${
              isBreaching ? 'text-destructive' : 'text-primary'
            }`}
          >
            {isBreaching ? 'BREACH DETECTED' : 'SYSTEM ACTIVE'}
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          Interface: lo0 | Port: 1337
        </span>
      </div>
    </header>
  );
};

export default Header;
