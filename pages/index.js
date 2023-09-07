import TaskPage from "@/components/template/TaskPage";
import { getSession } from "next-auth/react";

export default function Home({ user }) {
    return <TaskPage />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
      return {
          redirect: {
              destination: "/signup",
              permanent: false,
          },
      };
  }

  return {
      props: { user: session.user },
  };
}
