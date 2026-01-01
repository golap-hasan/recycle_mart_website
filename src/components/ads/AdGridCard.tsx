import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Ad } from '@/types/ad.type';
import { timeAgo } from '@/lib/utils';

interface AdGridCardProps {
  ad: Ad;
}

export const AdGridCard = ({ ad }: AdGridCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border/40 bg-background/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/ads/${ad.id}`} className="flex h-full flex-col">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={ad.coverImage || "/placeholder-image.png"}
            alt={ad.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            {ad.isFeatured ? (
              <Badge className="rounded-full bg-amber-500 text-white border-none">
                Featured
              </Badge>
            ) : null}
            {ad.isUrgent ? (
              <Badge className="rounded-full bg-red-500 text-white border-none">
                Urgent
              </Badge>
            ) : null}
          </div>
          <button
            type="button"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/80 text-muted-foreground shadow-sm transition hover:text-primary z-10"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-base font-semibold text-foreground">
              {ad.title}
            </h3>
            <p className="text-sm font-bold text-primary">
              ৳ {ad.price.toLocaleString()}
            </p>
          </div>
          <div className="mt-auto space-y-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
              {ad.location}
            </p>
            <p className="text-muted-foreground/80">
              Posted {timeAgo(ad.postedAt)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};
