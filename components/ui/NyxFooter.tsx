interface NyxFooterProps {
  className?: string;
}

export default function NyxFooter({ className }: Readonly<NyxFooterProps>) {
  return (
    <footer className={className}>
      <p className="text-center text-xs lowercase text-text-muted">
        © 2026 nyx. all rights reserved.
      </p>
    </footer>
  );
}
