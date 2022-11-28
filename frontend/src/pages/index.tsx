import { Box } from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Auth from '../components/Auth/Auth';
import Chat from '../components/Chat/Chat';

const Home: NextPage = () => {
  const { data: session } = useSession();


  const reloadSession = () => {
    const event = new Event("visbilitychange")
    document.dispatchEvent(event)
  }

  console.log("here is data", session)
  return (
    <Box>
      {session?.user.username ? 
        <Chat /> 
        : 
        <Auth session={session} reloadSession={reloadSession} />
      }
    </Box>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  // passes server rendered session to use session hook
  return {
    props: {
      session,
    }
  }
} 

export default Home
