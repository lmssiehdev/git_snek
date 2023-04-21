"use client";
import dayjs from "dayjs";
import { useEffect, useReducer, useState } from "react";
import { type Week } from "./page";

function reducerFunction(state, action) {
  state.lastSkipped = false;

  const head = state.snake[0];

  let currentWeek = 0;
  let currentDay = 0;

  for (let i = 0; i < state.weeks.length; i++) {
    const index = state.weeks[i].contributionDays
      .map((obj) => obj.date)
      .find((day, index) => {
        if (day === head) {
          currentDay = index;
          currentWeek = i;
          return true;
        }
      });
    if (currentDay) break;
  }

  console.log(currentWeek, currentDay);
  if (currentWeek === 0) {
    const nextWeek = state.weeks.length - 1;
    currentWeek = nextWeek;
    state.snake[0] =
      state.weeks[currentWeek].contributionDays[currentDay]?.date;
  }

  console.log(action.direction);
  if (currentDay === 1 && action.direction === "up") {
    console.log("called");
    state.snake[1] = state.weeks[currentWeek].contributionDays[6]?.date;
    return {
      ...state,
    };
  } else if (currentDay === 5 && action.direction === "down") {
    state.snake[1] = state.weeks[currentWeek].contributionDays[0]?.date;
    return {
      ...state,
    };
  }

  // console.log(state.snake[0], weeks);

  switch (action.type) {
    case "left": {
      const snake = [...state.snake];
      const day = snake[0];
      const newDay = dayjs(day).subtract(7, "day").format("YYYY-MM-DD");
      snake.unshift(newDay);
      snake.length = 3;
      return {
        ...state,
        snake: [...snake],
      };
    }
    case "right": {
      const snake = [...state.snake];
      const day = snake[0];
      const newDay = dayjs(day).add(7, "day").format("YYYY-MM-DD");
      snake.unshift(newDay);
      snake.length = 3;
      return {
        ...state,
        snake: [...snake],
      };
    }
    case "up": {
      const snake = [...state.snake];
      const day = snake[0];
      const newDay = dayjs(day).subtract(1, "day").format("YYYY-MM-DD");
      snake.unshift(newDay);
      snake.length = 3;
      return {
        ...state,
        snake: [...snake],
      };
    }
    case "down": {
      const snake = [...state.snake];
      const day = snake[0];
      const newDay = dayjs(day).add(1, "day").format("YYYY-MM-DD");
      snake.unshift(newDay);
      snake.length = 3;
      return {
        ...state,
        snake: [...snake],
      };
    }
    default: {
      return state;
    }
  }
}

export default function CalendarWrapper({ weeks }: { weeks: Week[] }) {
  const [direction, setDirection] = useState("left");
  const [state, dispatch] = useReducer(reducerFunction, {
    snake: ["2022-04-27", "2022-04-28", "2022-04-29"],
    weeks,
    lastSkipped: false,
  });

  function handleLeft() {
    dispatch({
      type: "left",
    });
  }

  useEffect(() => {
    // const firstWeek = weeks[weeks.length - 1]
    // const lastWeek = weeks[0];

    const timeout = setTimeout(() => {
      dispatch({
        type: direction,
        direction: direction,
      });
    }, 1000 / 2);

    return () => clearTimeout(timeout);
  });

  function handleSetDirection(newDirection: string) {
    if (direction === "left" && newDirection === "right") return;
    if (direction === "right" && newDirection === "left") return;
    if (direction === "up" && newDirection === "down") return;
    if (direction === "down" && newDirection === "up") return;

    setDirection(newDirection);
  }

  return (
    <>
      <div>
        <button onClick={() => handleSetDirection("left")}>Left</button>
        <button onClick={() => handleSetDirection("up")}>up</button>
        <button onClick={() => handleSetDirection("down")}>down</button>
        <button onClick={() => handleSetDirection("right")}>right</button>
      </div>
      {JSON.stringify(state.snake)}
      <div className="flex gap-[0.2rem]">
        {weeks.map(({ contributionDays }, index) => {
          return (
            <div key={index} className="flex flex-col gap-[0.2rem]">
              {contributionDays.map(({ date, color }) => {
                return (
                  <>
                    <span
                      key={date}
                      title={date}
                      className="h-3 w-3 inline-block rounded-sm  "
                      style={{
                        background: state.snake.includes(date)
                          ? "purple"
                          : color,
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
