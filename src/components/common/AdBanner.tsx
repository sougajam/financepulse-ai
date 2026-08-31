import { useEffect } from "react";

interface AdBannerProps {
  dataAdSlot: string;
}

export function AdBanner({ dataAdSlot }: AdBannerProps) {
  useEffect(() => {
    try {
      // Push the ad request to Google's script
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []); // The empty array ensures this only runs once when the ad mounts

  return (
    <div className="w-full overflow-hidden text-center my-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest">
        Advertisement
      </span>
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-5333524513056782"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
