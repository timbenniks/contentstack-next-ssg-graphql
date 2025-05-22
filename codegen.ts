import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!;
const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!;
const region = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION!;
const accessToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!;
const baseURL = region === 'EU'
  ? 'eu-graphql.contentstack.com'
  : 'graphql.contentstack.com';

const config: CodegenConfig = {
  schema: {
    [`https://${baseURL}/stacks/${apiKey}?environment=${environment}`]: {
      headers: { access_token: accessToken },
    },
  },

  documents: ['./**/*.{ts,tsx}', '!./gql/**/*'],

  generates: {
    './gql/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        skipTypename: false,
      },
    },

    './gql/': {
      preset: 'client',
      presetConfig: {
        withHooks: true,
        fetcher: 'graphql-request',
      },
      plugins: [],
    },
  },
};

export default config;