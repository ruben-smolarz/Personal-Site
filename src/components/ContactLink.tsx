import { LucideIcon } from 'lucide-react';
interface ContactLinkProps {
  href: string;
  Icon: LucideIcon;
  label: string;
}

export default function ContactLink({ href, Icon, label }: ContactLinkProps) {
  return (
    <a
      href={href}
      className="group relative"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="absolute -inset-2 bg-purple-500 rounded-lg opacity-0 group-hover:opacity-25 transition-opacity duration-300 blur" />
      <Icon className="relative text-gray-400 group-hover:text-purple-400 transform group-hover:scale-110 transition-all duration-300" />
    </a>
  );
}