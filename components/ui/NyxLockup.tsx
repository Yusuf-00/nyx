import Image from "next/image";

interface NyxLockupProps {
  showTagline?: boolean;
  compact?: boolean;
  /** Vertical centered layout for the login screen */
  centered?: boolean;
}

export default function NyxLockup({
  showTagline = false,
  compact = false,
  centered = false,
}: Readonly<NyxLockupProps>) {
  if (centered) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/favicon.svg"
          alt="nyx icon"
          width={64}
          height={64}
          priority
          className="rounded-lg"
        />
        <div className="text-center">
          <p className="font-mono text-3xl font-bold lowercase tracking-[-0.05em] text-accent">
            nyx
          </p>
          {showTagline ? (
            <p className="mt-1 text-sm lowercase text-text-muted">
              Crypto market watch dashboard.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/favicon.svg"
        alt="nyx icon"
        width={compact ? 24 : 28}
        height={compact ? 24 : 28}
        priority
        className="rounded"
      />
      <div className="min-w-0">
        <p className="font-mono text-sm font-bold lowercase tracking-[-0.05em] text-accent">
          nyx
        </p>
        {showTagline ? (
          <p className="text-xs lowercase text-text-muted"> Crypto market watch dashboard.</p>
        ) : null}
      </div>
    </div>
  );
}
