import { SaveIcon } from "@/components/icons/save-icon";
import { Button } from "@/components/ui/button";

function SaveButton() {
  return (
    <Button
      variant="ghost"
      className="hover:decoration-none flex items-center space-x-2 p-2"
    >
      <SaveIcon className="size-4" />
      Save
    </Button>
  );
}

export default SaveButton;
