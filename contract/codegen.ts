import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "../web/**/!(*.d).{ts,tsx}",
  generates: {
    "../server/gql/schema.ts": {
      plugins: [
        {
          typescript: {
            enumsAsConst: true,
          },
        },
        "typescript-resolvers",
      ],
    },
    "./client/": {
      preset: "client",
      config: {
        enumsAsTypes: true,
      },
    },
  },
}

export default config