import { Box, Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

type ChatProps = {
    
};

const Chat:React.FC<ChatProps> = (props) => {
    
    return (
        <Box>
            Chat
            <Button onClick={() => signOut()}>Logout</Button>
        </Box>
    )
}
export default Chat;