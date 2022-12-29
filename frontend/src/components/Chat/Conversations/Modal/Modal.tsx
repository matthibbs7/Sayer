import { useLazyQuery, useQuery } from '@apollo/client';
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import UserOperations from '../../../../graphql/operations/user';
import { SearchedUser, SearchUsersData, SearchUsersInput } from '../../../../utils/types';
import UserSearchList from './UserSearchList';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
};

const ConversationModal:React.FC<ModalProps> = ({ isOpen, onClose }) => {
    
    const [username, setUsername] = useState("")
    const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
    
    // normal query calls every time component renders so we use lazy
    const [searchUsers, { data, error, loading }] = useLazyQuery<SearchUsersData, SearchUsersInput>(UserOperations.Queries.searchUsers);

    console.log("here is search data", data)

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        searchUsers({ variables: { username }});
    }

    const addParticipant = (user: SearchedUser) => {
        setParticipants(prev => [...prev, user])
        setUsername('');
    }

    const removeParticipant = (userId: string) => {
        setParticipants(prev => prev.filter(p => p.id !== userId));
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#2d2d2d" pb={4}>
                    <ModalHeader>Create a Conversation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={onSearch}>
                            <Stack spacing={4}>
                                <Input placeholder="Enter a username" value={username} onChange={event => setUsername(event.target.value)} />
                                <Button isLoading={loading} type="submit" disabled={!username}>
                                    Search
                                </Button>
                            </Stack>
                        </form>
                        {data?.searchUsers && <UserSearchList users={data?.searchUsers} addParticipant={addParticipant} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ConversationModal;