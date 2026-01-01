import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Ad } from '@/types/ad.type';
import { timeAgo } from '@/lib/utils';

interface AdListCardProps {
  ad: Ad;
}

export const AdListCard = ({ ad }: AdListCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/ads/${ad.id}`} className="flex h-full">
        <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-l-2xl">
          <Image
            src={ad.coverImage || "/placeholder-image.png"}
            alt={ad.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="128px"
          />
          <div className="absolute left-2 top-2 flex gap-1">
            {ad.isFeatured ? (
              <Badge className="rounded-full bg-amber-500 text-white text-xs px-2 py-0.5 border-none">
                Featured
              </Badge>
            ) : null}
            {ad.isUrgent ? (
              <Badge className="rounded-full bg-red-500 text-white text-xs px-2 py-0.5 border-none">
                Urgent
              </Badge>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-base font-semibold text-foreground">
              {ad.title}
            </h3>
            <p className="text-lg font-bold text-primary">
              ৳ {ad.price.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
              {ad.location}
            </p>
            <p className="text-muted-foreground/80">
              Posted {timeAgo(ad.postedAt)}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background/80 text-muted-foreground shadow-sm transition hover:text-primary z-10"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>
    </article>
  );
};
