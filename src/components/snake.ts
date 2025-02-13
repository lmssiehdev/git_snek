import { createComputed, createSignal } from "solid-js";
import dayjs, { Dayjs } from "dayjs";
import { type ApiResonseSchmea } from "../utils/fetch-user";
import { createMemo } from "solid-js";

export type Direction = "right" | "left" | "up" | "down";
export const visitedDates = new Set<string>();
export const [score, setScore] = createSignal(0);
export const [weeks, setWeeks] = createSignal<string[][]>([]);
export const [snake, setSnake] = createSignal<{
  dates: string[];
  direction: Direction;
  actionInProgress: boolean;
}>({
  dates: [],
  direction: "right",
  actionInProgress: false,
});

export function setSankeDirection(newDirection: Direction) {
  const oldDirection = snake().direction;
  const isOpposite =
    (oldDirection === "left" && newDirection === "right") ||
    (oldDirection === "right" && newDirection === "left") ||
    (oldDirection === "up" && newDirection === "down") ||
    (oldDirection === "down" && newDirection === "up");

  if (oldDirection === newDirection || isOpposite || snake().actionInProgress)
    return;
  setSnake((c) => ({ ...c, direction: newDirection }));
  setSnake((c) => ({ ...c, actionInProgress: true }));
}

export function setInitialSnake(weeks: ApiResonseSchmea["weeks"]) {
  if (snake().dates.length > 0) return;
  setSnake((c) => ({
    ...c,
    dates: [weeks[0][1].date, weeks[0][2].date, weeks[0][3].date],
  }));
}

const surrondingWeeks = createMemo(() => {
  const weeksValue = weeks();
  const len = weeksValue.length;
  return {
    first: weeksValue[0],
    last: weeksValue[len - 1],
    beforeLast: weeksValue[len - 2],
  };
});
export function updateSnake() {
  if (weeks().length === 0) return;
  setSnake((c) => ({ ...c, actionInProgress: false }));

  const snakeValue = snake().dates;
  const newBody = [...snakeValue];

  // Update score if head position is new
  if (!visitedDates.has(snakeValue[0])) {
    visitedDates.add(snakeValue[0]);
    setScore((prev) => prev + 1);
  }

  const newHead = getNextDate(snakeValue[0], snake().direction).format(
    "YYYY-MM-DD",
  );

  for (let i = newBody.length - 1; i > 0; i--) {
    newBody[i] = newBody[i - 1];
  }
  newBody[0] = newHead;

  setSnake((prev) => ({
    ...prev,
    dates: newBody,
  }));
}

function getNextDate(date: string, direction: Direction) {
  const { first, last, beforeLast } = surrondingWeeks();

  const dayIdx = dayjs(date).day();

  switch (snake().direction) {
    case "right":
      return (!last[dayIdx] && beforeLast.includes(date)) || last.includes(date)
        ? dayjs(first[dayIdx])
        : dayjs(date).add(1, "week");
    case "left":
      return first.includes(date)
        ? last[dayIdx]
          ? dayjs(last[dayIdx])
          : dayjs(beforeLast[dayIdx])
        : dayjs(date).subtract(1, "week");
      break;
    case "up": {
      const newDay = dayjs(date).subtract(1, "day");
      return newDay.day() === 6 ? dayjs(newDay).add(1, "week") : newDay;
    }
    case "down": {
      const newDay = dayjs(date).add(1, "day");
      if (newDay.isAfter(dayjs(last[last.length - 1])))
        return dayjs(newDay).startOf("week");
      return newDay.day() === 0 ? dayjs(newDay).subtract(1, "week") : newDay;
    }
  }
}
