import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export type ListingCardProps = {
  id: string;
  title: string;
  price: string;
  location: string;
  postedAt: string;
  imageUrl: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
};

const ListingCard = ({
  id,
  title,
  price,
  location,
  postedAt,
  imageUrl,
  isFeatured,
  isUrgent,
}: ListingCardProps) => {
  return (
    <Link
      href={`/ads/${id}`}
      className="group rounded-md border bg-card shadow-sm overflow-hidden"
    >
      <div className="aspect-square relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
        />
      </div>
      <div className="p-3">
        <div className="line-clamp-1 font-medium group-hover:text-primary transition-colors">
          {title}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{price}</div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {location}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
