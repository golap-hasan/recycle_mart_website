import { PackageOpen } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function NoAdsComponent() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[400px]">
            <div className="rounded-full bg-muted p-6 mb-6">
                <PackageOpen className="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No Ads Found</h3>
            <p className="text-muted-foreground max-w-md mb-8">
                We couldn't find any ads matching your criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    variant="outline"
                    onClick={() => window.location.href = '/ads'}
                    className="rounded-full"
                >
                    Clear All Filters
                </Button>
                <Link href="/ads/create">
                    <Button className="rounded-full bg-primary px-8 text-base font-bold shadow-lg">
                        Post Your Ad
                    </Button>
                </Link>
            </div>
        </div>
    )
}
