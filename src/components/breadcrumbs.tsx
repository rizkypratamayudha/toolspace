import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm font-bold text-[#9CA3AF] dark:text-[#9CA3AF]">
      <Link href="/" className="clay-sm flex h-8 w-8 items-center justify-center text-[#62CDFF] hover:scale-110 transition-transform">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3" />
          {item.href ? (
            <Link href={item.href} className="clay-sm px-3 py-1 text-[#2D3557] dark:text-[#F0F4FF] hover:scale-105 transition-transform">
              {item.label}
            </Link>
          ) : (
            <span className="clay-sm px-3 py-1 text-[#62CDFF]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
