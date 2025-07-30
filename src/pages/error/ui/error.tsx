import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import { SquaresExclude } from "lucide-react";

export const ErrorPage = () => {
  const reloadPage = () => {
    location.reload();
  };
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div className="max-w-md space-y-6 text-center">
        <Alert variant="destructive">
          <SquaresExclude className="h-5 w-5" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription className="text-sm">
            An unexpected error occurred in this part of the application.
          </AlertDescription>
        </Alert>
        <Button onClick={reloadPage}>Try Again</Button>
      </div>
    </div>
  );
};
