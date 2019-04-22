export const USER_FRAGMENT = `
  id
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