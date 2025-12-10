"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SponsorForm } from "./sponsor-form";
import { Building2 } from "lucide-react";

export function SponsorFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          Become a Sponsor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Sponsor Inquiry
          </DialogTitle>
        </DialogHeader>
        <SponsorForm />
      </DialogContent>
    </Dialog>
  );
} 