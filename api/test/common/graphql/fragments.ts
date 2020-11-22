import gql from 'graphql-tag';

export const nodeFields = gql`
	fragment nodeFields on Node {
		id
	}
`;

export const timeStampFields = gql`
	fragment timeStampFields on Timestamp {
		createdAt
		deletedAt
		updatedAt
	}
`;

export const errorResponseFields = gql`
	fragment errorResponseFields on ErrorResponse {
		code
		error
		message
	}
`;
