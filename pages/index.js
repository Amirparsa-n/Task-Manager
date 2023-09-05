import { getSession } from "next-auth/react";

export default function Home({ user }) {
    return <div>yo yo</div>;
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
