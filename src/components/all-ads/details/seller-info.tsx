"use client";

import { Star, Shield, MapPin, Calendar } from "lucide-react";

type Seller = {
  id: string;
  name: string;
  avatar: string;
  memberSince: string;
  rating: number;
  totalAds: number;
  verified: boolean;
  phone: string;
  location: string;
};

type SellerInfoProps = {
  seller: Seller;
};

export default function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <div className="rounded-xl border border-border/40 bg-card">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold">Seller Information</h3>
      </div>
      <div className="px-6 pb-6 space-y-4">
        {/* Seller Profile */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-semibold">
              {seller.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{seller.name}</h3>
              {seller.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{seller.rating}</span>
              <span>•</span>
              <span>{seller.totalAds} ads</span>
            </div>
          </div>
        </div>

        {/* Seller Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Member since {seller.memberSince}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{seller.location}</span>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Seller Rating</span>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(seller.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium ml-1">{seller.rating}</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            Trusted Seller
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            Quick Response
          </span>
        </div>
      </div>
    </div>
  );
}
