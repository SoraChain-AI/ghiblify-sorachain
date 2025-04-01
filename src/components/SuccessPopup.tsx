import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Award } from "lucide-react";
interface SuccessPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const SuccessPopup = ({
  open,
  onOpenChange
}: SuccessPopupProps) => {
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-lg border-4 border-ghibli-green border-opacity-50 max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-ghibli-green bg-opacity-20 rounded-full flex items-center justify-center mb-2">
            <Award className="h-6 w-6 text-ghibli-dark-green" />
          </div>
          <DialogTitle className="text-xl font-bold text-ghibli-dark">
            Success!
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-ghibli-dark">You've helped make Ghibli Global Model smarter by 0.47%! 🎉</DialogDescription>
        </DialogHeader>
        
        <div className="p-4 bg-gradient-to-r from-ghibli-blue/10 to-ghibli-purple/10 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Your contribution has been recorded on the blockchain and you've earned $SORA as a reward!</p>
        </div>
      </DialogContent>
    </Dialog>;
};
export default SuccessPopup;