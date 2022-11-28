import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import UserOperations from '../../graphql/operations/user'
import { useMutation } from "@apollo/client";

type AuthProps = {
    session: Session | null;
    reloadSession: () => void;
};

interface CreateUsernameData {
    createUsername: {
        success: boolean;
        error: string;
    }
}

interface CreateUsernameVariables {
    username: string;
}

const Auth:React.FC<AuthProps> = ({
    session,
    reloadSession,
}) => {
    
    const [username, setUsername] = useState("")
    const [createUsername, {loading, error}] = useMutation<CreateUsernameData, CreateUsernameVariables>(UserOperations.Mutations.createUsername)

    const onSubmit = async () => {
        // graphql mutation
        if (!username) return
        try {
            // call createUsername mutation to send our username to the GraphQL API
            const { data } = await createUsername({ variables: { username }})
        
            if (!data?.createUsername) {
                throw new Error();
            }

            if (data.createUsername.error) {
                const { createUsername: { error }} = data;
                throw new Error(error)
            }

            // reload session to obtain new username
            reloadSession()

        } catch (error) {
            console.log('onSubmit error', error);
        }
    }

    return (
        <Center height='100vh'>
            <Stack spacing={8} align='center'>
                {session ? (
                    <>
                        <Text fontSize="3xl">Create a Username</Text>
                        <Input placeholder="Enter a username" value={username} onChange={(event) => setUsername(event.target.value)} />  
                        <Button w="100%" onClick={onSubmit}>Save</Button>
                    </>  
                ) : (
                    <>
                        <Text fontSize='3xl'>MessengerQL</Text>
                        <Button onClick={() => signIn('google')} leftIcon={<Image height='20px' src='google.png' />}>Continue with Google</Button>
                    </>
                )}
            </Stack>
        </Center>
    )
}
export default Auth;