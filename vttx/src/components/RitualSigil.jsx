import React, { useEffect, useState } from "react";

export default function RitualSigil({ entropy }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (entropy) {
      setImgSrc(`/api/icon/${encodeURIComponent(entropy)}`);
    }
  }, [entropy]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[96px] h-[96px] rounded-full overflow-hidden shadow-lg border-2 border-orange-500 bg-black">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="Ritual Sigil"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-sm text-orange-200 font-jura">loading...</div>
        )}
      </div>
      <div className="text-xs uppercase mt-2 font-jura tracking-widest text-orange-300">
        your sigil
      </div>
    </div>
  );
}
