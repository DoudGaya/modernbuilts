"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/actions/wishlist";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface WishlistButtonProps {
  listingId: string;
  initialState?: boolean; // Whether the item is already in the wishlist
  onWishlistChange?: (inWishlist: boolean) => void;
  size?: "default" | "sm" | "icon";
  className?: string;
  showText?: boolean;
  requireAuth?: boolean;
}

export function WishlistButton({
  listingId,
  initialState = false,
  onWishlistChange,
  size = "icon",
  className,
  showText = false,
  requireAuth = true,
}: WishlistButtonProps) {
  const [isInWishlistState, setIsInWishlistState] = useState<boolean>(initialState);
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  
  // Check wishlist status on client-side mount if not provided
  useState(() => {
    if (initialState === undefined) {
      checkWishlistStatus();
    }
  });

  async function checkWishlistStatus() {
    try {
      const result = await isInWishlist(listingId);
      if (!result.error) {
        setIsInWishlistState(result.inWishlist);
        if (onWishlistChange) {
          onWishlistChange(result.inWishlist);
        }
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  }

  async function handleToggleWishlist() {
    try {
      setIsPending(true);
      
      if (requireAuth) {
        // We have to check in the client because the server action will fail with Unauthorized
        const currentState = await isInWishlist(listingId);
        if (currentState.error && currentState.error === "Unauthorized") {
          toast({
            title: "Sign in required",
            description: "Please sign in to add items to your wishlist",
            variant: "destructive",
          });
          router.push("/login");
          return;
        }
      }
      
      if (isInWishlistState) {
        // Remove from wishlist
        const result = await removeFromWishlist(listingId);
        if (result.success) {
          setIsInWishlistState(false);
          if (onWishlistChange) {
            onWishlistChange(false);
          }
          toast({
            title: "Removed from wishlist",
            description: "The property has been removed from your wishlist",
          });
        } else if (result.error) {
          toast({
            title: "Failed to remove",
            description: result.error,
            variant: "destructive",
          });
        }
      } else {
        // Add to wishlist
        const result = await addToWishlist(listingId);
        if (result.success) {
          setIsInWishlistState(true);
          if (onWishlistChange) {
            onWishlistChange(true);
          }
          toast({
            title: "Added to wishlist",
            description: "The property has been added to your wishlist",
          });
        } else if (result.error) {
          toast({
            title: "Failed to add",
            description: result.error,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size={size}
            className={cn(
              isInWishlistState ? "bg-rose-100 text-rose-500 hover:bg-rose-200 hover:text-rose-600" : "",
              className
            )}
            onClick={handleToggleWishlist}
            disabled={isPending}
          >
            <Heart
              className={cn(
                "w-4 h-4",
                isInWishlistState ? "fill-rose-500" : "fill-none"
              )}
            />
            {showText && <span className="ml-2">{isInWishlistState ? "Saved" : "Save"}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
