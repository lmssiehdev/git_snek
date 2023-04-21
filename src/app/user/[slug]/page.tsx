import Image from "next/image";
import CalendarWrapper from "./CalendarWrapper";

export type Week = {
  contributionDays: ContributionDay[];
};

type ContributionDay = {
  color: string;
  contributionCount: number;
  date: string;
};

type ApiResponse = {
  data: {
    user: {
      avatarUrl: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Week[];
        };
      };
    };
  };
};

const TOKEN = process.env.GITHUB_TOKEN;
const query = `
query($userName:String!) {
  user(login: $userName){
    avatarUrl
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
async function retrieveContributionData(
  userName: string
): Promise<ApiResponse> {
  const variables = `
  {
    "userName": "${userName}"
  }
`;
  const body = {
    query,
    variables,
  };
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default async function UserPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: username } = params;

  if (!username) return <div>Please provide a username</div>;

  const data = await retrieveContributionData(username);

  // TODO: fix me
  if (data?.user === null) return <div>Please provide a username</div>;
  console.log(data.user);
  const {
    data: {
      user: {
        avatarUrl,
        contributionsCollection: {
          contributionCalendar: { totalContributions, weeks },
        },
      },
    },
  } = data;

  const item = [];

  const formattedWeeks = weeks
    .map(({ contributionDays }) => ({ ...contributionDays }))
    .map((arr) => {
      const value = Object.values(arr).map((value) => ({
        ...value,
      }));
      item.push(...value);
    });

  return (
    <div className="min-h-screen max-w-md">
      <div>
        <Image height={80} width="80" src={avatarUrl} alt="avatar" />
        Username: @{username}
      </div>
      <CalendarWrapper weeks={weeks} />
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
}
