import { Button } from "@/components/ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      await createCheckoutSession(courseId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to stripe checkout url
      } else {
        toast.error("Invalid response from server.");
      }
    }
  }, [data, isSuccess, isError]);
  return (
    <Button
      disabled={isLoading}
      className="w-full"
      onClick={purchaseCourseHandler}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
