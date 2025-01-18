import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  // Note: not-found.tsx is rendered when Next.js can't find a requested route
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl text-muted-foreground mb-4">
        ページが見つかりませんでした / Page not found
      </h2>
      <p className="text-center text-muted-foreground max-w-[500px] mb-8">
        申し訳ありませんが、お探しのページは存在しないか、移動した可能性があります。
        <br />
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">ホームに戻る / Return Home</Link>
      </Button>
    </div>
  );
}
