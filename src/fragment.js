export const USER_FRAGMENT = `
  id
  avatar
  username
  createdAt
  updatedAt
`;

export const COMMENT_FRAGMENT = `
  id
  text
  createdAt
  updatedAt
  user {
    ${USER_FRAGMENT}
  }
`;

export const FILE_FRAGMENT = `
  id
  url
  createdAt
  updatedAt
`;

export const FULL_POST_FRAGMENT = `
  fragment PostParts on Post{
    id
    location
    caption
    createdAt
    updatedAt
    files {
      ${FILE_FRAGMENT}
    }
    comments {
      ${COMMENT_FRAGMENT}
    }
    user {
      ${USER_FRAGMENT}
    }
  }
`;

export const MESSAGE_FRAGMENT = `
  id
  text
  to {
    ${USER_FRAGMENT}
  }
  from {
    ${USER_FRAGMENT}
  }
`;

export const ROOM_FRAGMENT = `
  fragment RoomParts on Room {
    id
    participants {
      ${USER_FRAGMENT}
    }
    messages {
      ${MESSAGE_FRAGMENT}
    }
  }
`;
