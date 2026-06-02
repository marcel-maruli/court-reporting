import { LoadingSpinner } from "./LoadingSpinner";

export default function ModalSpinner() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <LoadingSpinner isOpen={true} />
        </div>
      </div>
    </div>
  );
}
