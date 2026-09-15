export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-magenta-200 border-t-magenta-600 mx-auto mb-4" />
        <p className="text-grafite-600">Carregando...</p>
      </div>
    </div>
  );
}
