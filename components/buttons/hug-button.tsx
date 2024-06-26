import { useState } from "react";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { cn } from "@/lib/strings";
import { HeartIcon } from "@/components/icons/heart-icon";
import { Button } from "@/components/ui/button";

type Huggable = { num_hugs: number; id: number };

function HugButton({
  id,
  mutationFn,
  queryKey,
  className,
}: {
  id: number;
  mutationFn: MutationFunction<Huggable, number>;
  queryKey: [string, { id: number }];
  className?: string;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (data: Huggable) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  const handleClick = () => {
    setIsClicked(true);
    mutate(id);
    setTimeout(() => setIsClicked(false), 1000);
  };

  const { num_hugs } = queryClient.getQueryData<Huggable>(queryKey) ?? {
    num_hugs: undefined,
  };
  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className={cn(
        "flex items-center space-x-2 transition-all",
        isClicked && "animate-sunburst",
        className,
      )}
    >
      <HeartIcon
        className={cn(
          "size-4 transition-all duration-300",
          isClicked && "animate-bounce-fade-in fill-red-500",
        )}
      />
      <span>{num_hugs} Hugs</span>
    </Button>
  );
}

export { HugButton };
