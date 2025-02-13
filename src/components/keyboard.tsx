import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import ChevronLeftIcon from "../assets/icons/ChevronLeftIcon";
import ChevronUpIcon from "../assets/icons/ChevronUpIcon";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon";
import { useMagicKeys } from "solidjs-use";
import { cn } from "../utils/mics";
import { setSankeDirection as setSnakeDirection } from "./snake";
import { onCleanup, onMount } from "solid-js";

export function Keyboard({}) {
  const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = useMagicKeys();

  const keysMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  const fn = (e) => {
    if (e.key in keysMap) {
      e.preventDefault();
      setSnakeDirection(keysMap[e.key]);
    }
    return;
  };
  document.addEventListener("keydown", fn);
  onCleanup(() => document.removeEventListener("keydown", fn));

  return (
    <div class="w-fit mx-auto mt-20">
      <div class="flex justify-center my-1">
        <button
          class={cn(
            "p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center",
            ArrowUp() ? "bg-purple-600/30" : "hover:bg-purple-600/10",
          )}
          onClick={() => setSnakeDirection("up")}
        >
          <ChevronUpIcon class="h-6 w-6 text-purple-900" />
        </button>
      </div>
      <div class="flex justify-center my-1 gap-1">
        <button
          class={cn(
            "p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center",
            ArrowLeft() ? "bg-purple-600/30" : "hover:bg-purple-600/10",
          )}
          onClick={() => setSnakeDirection("left")}
        >
          <ChevronLeftIcon class="h-6 w-6 text-purple-900" />
        </button>
        <button
          class={cn(
            "p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center",
            ArrowDown() ? "bg-purple-600/30" : "hover:bg-purple-600/10",
          )}
          onClick={() => setSnakeDirection("down")}
        >
          <ChevronDownIcon class="h-6 w-6 text-purple-900" />
        </button>
        <button
          class={cn(
            "p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center",
            ArrowRight() ? "bg-purple-600/30" : "hover:bg-purple-600/10",
          )}
          onClick={() => setSnakeDirection("right")}
        >
          <ChevronRightIcon class="h-6 w-6 text-purple-900" />
        </button>
      </div>
    </div>
  );
}
