import { Loader2 } from "lucide-react"; // Make sure to install lucide-react

export const LoadingSpinner = ({ isOpen }: { isOpen: boolean }) => {
  if (isOpen) {
    return <Loader2 className="animate-spin h-8 w-8 text-blue-500" />;
  }
  return;
};
