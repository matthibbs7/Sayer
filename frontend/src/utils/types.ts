export interface CreateUsernameData {
    createUsername: {
        success: boolean;
        error: string;
    }
}

export interface CreateUsernameVariables {
    username: string;
}

// input and data types for searchUsers query
export interface SearchUsersInput {
    username: string;
}

export interface SearchUsersData {
    //searchUsers: Array<{ id: string; username: string }>;
    searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
    id: string;
    username: string;
}