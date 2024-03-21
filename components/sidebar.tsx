import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchIcon } from "./icons/search-icon";
import { PencilIcon } from "./icons/pencil-icon";

export function Sidebar() {
  return (
    <div className="w-full my-[15px] lg:max-w-sm mx-auto lg:sticky lg:my-0 lg:top-[96px] lg:w-72 z-0">
      <div className="flex focus-within:ring-2 items-center rounded-full bg-white p-2 shadow-md">
        <Input
          className="flex-1 border-none text-base focus-visible:ring-offset-0 focus-visible:ring-transparent"
          placeholder="Search for posts"
          type="search"
        />
        <SearchIcon className="h-6 w-6 rounded-full m-2 inline-block [transition:_fill_200ms_cubic-bezier(0.4,_0,_0.2,_1)_0ms] fill-current shrink-0 select-none text-gray-400" />
      </div>
      <div className="mt-4 h-[200px] lg:h-[300px] flex flex-col justify-center items-center rounded-2xl bg-gradient-to-b from-purple-400 to-blue-500 p-6 text-center shadow-lg">
        <h6 className=" text-lg tracking-tight leading-6 font-medium text-white/90 italic">
          Chat with our AI now and get an assessment of your symptoms!
        </h6>
        <Button className="mt-4 rounded-full w-fit bg-background/30 hover:bg-background/50 px-8 py-2 text-lg font-semibold text-white shadow-sm">
          TRY NOW
        </Button>
      </div>
      <div className="mt-4 flex items-center rounded-lg justify-center bg-white p-3 shadow-md">
        <PencilIcon className=" size-5 inline-block [transition:_fill_200ms_cubic-bezier(0.4,_0,_0.2,_1)_0ms] fill-current shrink-0 select-none text-gray-400" />
        <Link
          className="ml-2 text-sm font-medium text-gray-400 italic"
          href="#"
        >
          Share your feedback
        </Link>
      </div>
    </div>
  );
}
