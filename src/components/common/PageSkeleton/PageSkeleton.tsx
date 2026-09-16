export default function PageSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <div className="h-7 w-2/5 mb-4 bg-[#e6e6e6] rounded-lg animate-pulse" />
      <div className="h-3.5 w-3/5 mb-2.5 bg-[#e6e6e6] rounded-lg animate-pulse" />
      <div className="h-3.5 w-3/5 mb-2.5 bg-[#e6e6e6] rounded-lg animate-pulse" />
      <div className="grid grid-cols-3 gap-3 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[120px] bg-[#e6e6e6] rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
