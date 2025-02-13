import { ApiResonseSchmea } from "../utils/fetch-user";
import CalendarWrapper from "./calendar";
import { Keyboard } from "./keyboard";

export function Wrapper({ weeks }: { weeks: ApiResonseSchmea["weeks"] }) {
  return (
    <>
      <CalendarWrapper weeks={weeks} />
      <Keyboard />
    </>
  );
}
