"use client";
import type { ApiResonseSchmea } from "../utils/fetch-user";
import { createEffect, createSignal, onCleanup } from "solid-js";
import {
  score,
  setInitialSnake,
  setWeeks,
  snake,
  updateSnake,
  visitedDates,
} from "./snake";

export default function CalendarWrapper({
  weeks,
}: {
  weeks: ApiResonseSchmea["weeks"];
}) {
  setInitialSnake(weeks);
  setWeeks(weeks.map((week) => week.map(({ date }) => date)));
  const timer = setInterval(() => {
    console.log("10");
    updateSnake();
  }, 1000 / 10);

  onCleanup(() => clearInterval(timer));

  const getCellColor = (date: string, color: string) => {
    if (snake().dates.includes(date)) return "purple";
    if (visitedDates.has(date)) return "rgb(235, 237, 240)";

    return color;
  };
  return (
    <>
      {score}
      <div class="flex gap-[0.2rem]">
        {weeks.map((week, index) => {
          return (
            <div class="flex flex-col gap-[0.2rem]">
              {week.map(({ date, color }) => {
                return (
                  <>
                    <span
                      title={date}
                      class="h-3 w-3 inline-block rounded-sm  "
                      style={{
                        background: getCellColor(date, color),
                      }}
                    ></span>
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
