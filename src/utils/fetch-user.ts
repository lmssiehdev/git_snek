import { z } from "zod";

export const TOKEN = import.meta.env.GITHUB_TOKEN;

const apiResponseSchema = z
  .object({
    data: z.object({
      user: z.object({
        avatarUrl: z.string(),
        bio: z.string().or(z.null()),
        contributionsCollection: z.object({
          contributionCalendar: z.object({
            totalContributions: z.number(),
            weeks: z.array(
              z.object({
                contributionDays: z.array(
                  z.object({
                    color: z.string(),
                    contributionCount: z.number(),
                    date: z.string(),
                  }),
                ),
              }),
            ),
          }),
        }),
      }),
    }),
  })
  .transform((input) => {
    const {
      avatarUrl,
      bio,
      contributionsCollection: {
        contributionCalendar: { weeks, totalContributions },
      },
    } = input.data.user;
    return {
      avatarUrl,
      bio,
      weeks: weeks.map(({ contributionDays }) => contributionDays),
      totalContributions,
    };
  });

export type ApiResonseSchmea = z.infer<typeof apiResponseSchema>;

const query = `
query($userName:String!) {
  user(login: $userName){
    avatarUrl
    bio
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

const cachedResponse = {
  result: {
    avatarUrl:
      "https://avatars.githubusercontent.com/u/122186255?u=868b8fa00be6b954335a023d241b3c8763c53b36&v=4",
    bio: "TS/Vue/React â¤",
    weeks: [
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-12" },
        { color: "#30a14e", contributionCount: 12, date: "2024-02-13" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-14" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-15" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-16" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-17" },
      ],
      [
        { color: "#30a14e", contributionCount: 14, date: "2024-02-18" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-19" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-20" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-02-21" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-22" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-02-23" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-02-24" },
      ],
      [
        { color: "#9be9a8", contributionCount: 2, date: "2024-02-25" },
        { color: "#40c463", contributionCount: 11, date: "2024-02-26" },
        { color: "#40c463", contributionCount: 10, date: "2024-02-27" },
        { color: "#30a14e", contributionCount: 15, date: "2024-02-28" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-02-29" },
        { color: "#30a14e", contributionCount: 12, date: "2024-03-01" },
        { color: "#40c463", contributionCount: 6, date: "2024-03-02" },
      ],
      [
        { color: "#40c463", contributionCount: 9, date: "2024-03-03" },
        { color: "#9be9a8", contributionCount: 4, date: "2024-03-04" },
        { color: "#30a14e", contributionCount: 16, date: "2024-03-05" },
        { color: "#216e39", contributionCount: 19, date: "2024-03-06" },
        { color: "#216e39", contributionCount: 20, date: "2024-03-07" },
        { color: "#40c463", contributionCount: 6, date: "2024-03-08" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-09" },
      ],
      [
        { color: "#30a14e", contributionCount: 12, date: "2024-03-10" },
        { color: "#216e39", contributionCount: 19, date: "2024-03-11" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-03-12" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-13" },
        { color: "#9be9a8", contributionCount: 5, date: "2024-03-14" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-15" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-16" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-17" },
        { color: "#40c463", contributionCount: 8, date: "2024-03-18" },
        { color: "#216e39", contributionCount: 23, date: "2024-03-19" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-20" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-21" },
        { color: "#9be9a8", contributionCount: 4, date: "2024-03-22" },
        { color: "#30a14e", contributionCount: 17, date: "2024-03-23" },
      ],
      [
        { color: "#216e39", contributionCount: 19, date: "2024-03-24" },
        { color: "#40c463", contributionCount: 9, date: "2024-03-25" },
        { color: "#216e39", contributionCount: 19, date: "2024-03-26" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-03-27" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-03-28" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-03-29" },
        { color: "#216e39", contributionCount: 23, date: "2024-03-30" },
      ],
      [
        { color: "#9be9a8", contributionCount: 4, date: "2024-03-31" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-01" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-04-02" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-04" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-05" },
        { color: "#40c463", contributionCount: 11, date: "2024-04-06" },
      ],
      [
        { color: "#40c463", contributionCount: 6, date: "2024-04-07" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-04-08" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-04-09" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-12" },
        { color: "#40c463", contributionCount: 11, date: "2024-04-13" },
      ],
      [
        { color: "#9be9a8", contributionCount: 4, date: "2024-04-14" },
        { color: "#30a14e", contributionCount: 12, date: "2024-04-15" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-16" },
        { color: "#216e39", contributionCount: 28, date: "2024-04-17" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-04-18" },
        { color: "#40c463", contributionCount: 8, date: "2024-04-19" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-20" },
      ],
      [
        { color: "#9be9a8", contributionCount: 3, date: "2024-04-21" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-22" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-23" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-24" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-25" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-26" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-27" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-28" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-29" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-04-30" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-01" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-02" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-04" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-05" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-07" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-08" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-09" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-11" },
      ],
      [
        { color: "#9be9a8", contributionCount: 3, date: "2024-05-12" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-13" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-14" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-05-15" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-16" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-17" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-18" },
      ],
      [
        { color: "#9be9a8", contributionCount: 1, date: "2024-05-19" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-20" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-21" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-22" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-23" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-24" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-25" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-26" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-27" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-05-28" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-05-29" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-30" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-05-31" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-01" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-02" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-06-03" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-06-04" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-05" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-07" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-08" },
      ],
      [
        { color: "#40c463", contributionCount: 11, date: "2024-06-09" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-11" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-06-12" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-13" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-14" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-15" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-16" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-17" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-18" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-19" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-20" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-21" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-22" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-23" },
        { color: "#30a14e", contributionCount: 13, date: "2024-06-24" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-06-25" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-26" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-06-27" },
        { color: "#216e39", contributionCount: 46, date: "2024-06-28" },
        { color: "#40c463", contributionCount: 9, date: "2024-06-29" },
      ],
      [
        { color: "#216e39", contributionCount: 29, date: "2024-06-30" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-01" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-02" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-07-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-04" },
        { color: "#9be9a8", contributionCount: 4, date: "2024-07-05" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-06" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-07" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-08" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-09" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-07-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-11" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-07-12" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-07-13" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-14" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-07-15" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-16" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-07-17" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-07-18" },
        { color: "#40c463", contributionCount: 8, date: "2024-07-19" },
        { color: "#30a14e", contributionCount: 13, date: "2024-07-20" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-21" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-07-22" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-07-23" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-24" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-25" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-26" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-27" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-28" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-29" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-07-30" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-07-31" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-01" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-02" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-03" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-04" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-05" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-07" },
        { color: "#40c463", contributionCount: 8, date: "2024-08-08" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-09" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-10" },
      ],
      [
        { color: "#9be9a8", contributionCount: 3, date: "2024-08-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-12" },
        { color: "#30a14e", contributionCount: 12, date: "2024-08-13" },
        { color: "#40c463", contributionCount: 8, date: "2024-08-14" },
        { color: "#40c463", contributionCount: 7, date: "2024-08-15" },
        { color: "#30a14e", contributionCount: 17, date: "2024-08-16" },
        { color: "#40c463", contributionCount: 6, date: "2024-08-17" },
      ],
      [
        { color: "#30a14e", contributionCount: 14, date: "2024-08-18" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-08-19" },
        { color: "#40c463", contributionCount: 6, date: "2024-08-20" },
        { color: "#30a14e", contributionCount: 17, date: "2024-08-21" },
        { color: "#30a14e", contributionCount: 15, date: "2024-08-22" },
        { color: "#40c463", contributionCount: 9, date: "2024-08-23" },
        { color: "#40c463", contributionCount: 10, date: "2024-08-24" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-25" },
        { color: "#30a14e", contributionCount: 12, date: "2024-08-26" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-08-27" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-08-28" },
        { color: "#9be9a8", contributionCount: 5, date: "2024-08-29" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-08-30" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-08-31" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-01" },
        { color: "#9be9a8", contributionCount: 4, date: "2024-09-02" },
        { color: "#40c463", contributionCount: 8, date: "2024-09-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-04" },
        { color: "#40c463", contributionCount: 9, date: "2024-09-05" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-07" },
      ],
      [
        { color: "#40c463", contributionCount: 10, date: "2024-09-08" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-09-09" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-12" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-13" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-14" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-15" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-16" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-17" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-18" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-19" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-09-20" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-21" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-22" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-23" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-24" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-25" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-26" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-27" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-28" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-29" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-09-30" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-01" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-02" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-04" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-05" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-07" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-08" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-09" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-12" },
      ],
      [
        { color: "#9be9a8", contributionCount: 2, date: "2024-10-13" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-10-14" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-15" },
        { color: "#40c463", contributionCount: 6, date: "2024-10-16" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-17" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-10-18" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-19" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-20" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-21" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-22" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-10-23" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-10-24" },
        { color: "#40c463", contributionCount: 7, date: "2024-10-25" },
        { color: "#40c463", contributionCount: 9, date: "2024-10-26" },
      ],
      [
        { color: "#9be9a8", contributionCount: 5, date: "2024-10-27" },
        { color: "#40c463", contributionCount: 10, date: "2024-10-28" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-10-29" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-10-30" },
        { color: "#40c463", contributionCount: 7, date: "2024-10-31" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-11-01" },
        { color: "#40c463", contributionCount: 6, date: "2024-11-02" },
      ],
      [
        { color: "#9be9a8", contributionCount: 1, date: "2024-11-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-04" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-05" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-11-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-07" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-08" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-11-09" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-12" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-13" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-14" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-15" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-16" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-17" },
        { color: "#9be9a8", contributionCount: 2, date: "2024-11-18" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-19" },
        { color: "#40c463", contributionCount: 7, date: "2024-11-20" },
        { color: "#40c463", contributionCount: 6, date: "2024-11-21" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-22" },
        { color: "#9be9a8", contributionCount: 5, date: "2024-11-23" },
      ],
      [
        { color: "#40c463", contributionCount: 7, date: "2024-11-24" },
        { color: "#40c463", contributionCount: 9, date: "2024-11-25" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-26" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-27" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-28" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-11-29" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-11-30" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-01" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-12-02" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-12-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-04" },
        { color: "#9be9a8", contributionCount: 3, date: "2024-12-05" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-07" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-08" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-09" },
        { color: "#9be9a8", contributionCount: 5, date: "2024-12-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-12" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-13" },
        { color: "#9be9a8", contributionCount: 4, date: "2024-12-14" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-15" },
        { color: "#30a14e", contributionCount: 15, date: "2024-12-16" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-12-17" },
        { color: "#9be9a8", contributionCount: 4, date: "2024-12-18" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-19" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-20" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-21" },
      ],
      [
        { color: "#9be9a8", contributionCount: 3, date: "2024-12-22" },
        { color: "#40c463", contributionCount: 10, date: "2024-12-23" },
        { color: "#40c463", contributionCount: 8, date: "2024-12-24" },
        { color: "#40c463", contributionCount: 8, date: "2024-12-25" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-12-26" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-27" },
        { color: "#9be9a8", contributionCount: 1, date: "2024-12-28" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-29" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-30" },
        { color: "#ebedf0", contributionCount: 0, date: "2024-12-31" },
        { color: "#40c463", contributionCount: 9, date: "2025-01-01" },
        { color: "#9be9a8", contributionCount: 5, date: "2025-01-02" },
        { color: "#216e39", contributionCount: 18, date: "2025-01-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-01-04" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2025-01-05" },
        { color: "#9be9a8", contributionCount: 3, date: "2025-01-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-01-07" },
        { color: "#40c463", contributionCount: 8, date: "2025-01-08" },
        { color: "#216e39", contributionCount: 23, date: "2025-01-09" },
        { color: "#40c463", contributionCount: 7, date: "2025-01-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-01-11" },
      ],
      [
        { color: "#216e39", contributionCount: 18, date: "2025-01-12" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-01-13" },
        { color: "#9be9a8", contributionCount: 1, date: "2025-01-14" },
        { color: "#9be9a8", contributionCount: 2, date: "2025-01-15" },
        { color: "#9be9a8", contributionCount: 2, date: "2025-01-16" },
        { color: "#40c463", contributionCount: 10, date: "2025-01-17" },
        { color: "#9be9a8", contributionCount: 3, date: "2025-01-18" },
      ],
      [
        { color: "#9be9a8", contributionCount: 4, date: "2025-01-19" },
        { color: "#9be9a8", contributionCount: 1, date: "2025-01-20" },
        { color: "#30a14e", contributionCount: 14, date: "2025-01-21" },
        { color: "#40c463", contributionCount: 6, date: "2025-01-22" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-01-23" },
        { color: "#40c463", contributionCount: 8, date: "2025-01-24" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-01-25" },
      ],
      [
        { color: "#30a14e", contributionCount: 12, date: "2025-01-26" },
        { color: "#9be9a8", contributionCount: 5, date: "2025-01-27" },
        { color: "#9be9a8", contributionCount: 2, date: "2025-01-28" },
        { color: "#40c463", contributionCount: 10, date: "2025-01-29" },
        { color: "#9be9a8", contributionCount: 3, date: "2025-01-30" },
        { color: "#9be9a8", contributionCount: 5, date: "2025-01-31" },
        { color: "#9be9a8", contributionCount: 2, date: "2025-02-01" },
      ],
      [
        { color: "#9be9a8", contributionCount: 5, date: "2025-02-02" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-03" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-04" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-05" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-06" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-07" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-08" },
      ],
      [
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-09" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-10" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-11" },
        { color: "#ebedf0", contributionCount: 0, date: "2025-02-12" },
      ],
    ],
    totalContributions: 1138,
  },
};

/**
 * Fetches GitHub user data using GraphQL API
 */
export async function fetchUser(userName: string): Promise<
  Readonly<
    | {
        error: undefined;
        result: ApiResonseSchmea;
      }
    | {
        error: string;
        result: undefined;
      }
  >
> {
  // if (!TOKEN) {
  //   throw new Error(
  //     "GitHub token not configured. Set GITHUB_TOKEN environment variable",
  //   );
  // }
  return cachedResponse;
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { userName } }),
    });

    if (!response.ok) {
      const status = response.status;
      return {
        error: `GitHub API request failed with status ${status}`,
        result: undefined,
      };
    }

    const data = await response.json();
    const parsedData = apiResponseSchema.safeParse(data);

    if (!parsedData.success) {
      console.error(
        "[fetchUser] Failed to parse GitHub response:",
        parsedData.error.message,
      );
      return {
        error: `Failed to parse GitHub response`,
        result: undefined,
      };
    }

    return {
      error: undefined,
      result: parsedData.data,
    };
  } catch (error) {
    console.error("[fetchUser] Failed to fetch GitHub user data:", error);
    return {
      error: "Failed to fetch user data from GitHub",
      result: undefined,
    };
  }
}
