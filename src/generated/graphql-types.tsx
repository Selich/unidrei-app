import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Document = {
  __typename?: 'Document';
  _id: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  isHidden: Scalars['Boolean'];
  isMinted: Scalars['Boolean'];
  name: Scalars['String'];
  ownerIdentifier: Scalars['ID'];
  typeIri: Scalars['String'];
};

export type Erc721Attributes = {
  __typename?: 'ERC721Attributes';
  display_type?: Maybe<Scalars['String']>;
  trait_type: Scalars['String'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  fileUpload: Scalars['String'];
};


export type MutationFileUploadArgs = {
  input: PrivateDocumentInput;
};

export type PrivateDocumentInput = {
  description: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  link: Scalars['String'];
  name: Scalars['String'];
};

export type PrivateTwinComposedAttributesOutput = {
  __typename?: 'PrivateTwinComposedAttributesOutput';
  propertyIri: Scalars['String'];
  subProperties: Array<PrivateTwinSubAttributesOutput>;
};

export type PrivateTwinFlatAttributesOutput = {
  __typename?: 'PrivateTwinFlatAttributesOutput';
  propertyIri: Scalars['String'];
  propertyValue: Scalars['String'];
};

export type PrivateTwinSubAttributesOutput = {
  __typename?: 'PrivateTwinSubAttributesOutput';
  propertyIri: Scalars['String'];
  propertyValue: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type FileUploadMutationVariables = Exact<{
  input: PrivateDocumentInput;
}>;


export type FileUploadMutation = { __typename?: 'Mutation', fileUpload: string };


export const FileUploadDocument = gql`
    mutation fileUpload($input: PrivateDocumentInput!) {
  fileUpload(input: $input)
}
    `;
export type FileUploadMutationFn = Apollo.MutationFunction<FileUploadMutation, FileUploadMutationVariables>;

/**
 * __useFileUploadMutation__
 *
 * To run a mutation, you first call `useFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fileUploadMutation, { data, loading, error }] = useFileUploadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFileUploadMutation(baseOptions?: Apollo.MutationHookOptions<FileUploadMutation, FileUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FileUploadMutation, FileUploadMutationVariables>(FileUploadDocument, options);
      }
export type FileUploadMutationHookResult = ReturnType<typeof useFileUploadMutation>;
export type FileUploadMutationResult = Apollo.MutationResult<FileUploadMutation>;
export type FileUploadMutationOptions = Apollo.BaseMutationOptions<FileUploadMutation, FileUploadMutationVariables>;