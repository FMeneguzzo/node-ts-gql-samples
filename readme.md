# Node / Typescript / GraphQL code samples

The project is meant to provide some code samples to be reused for basic use cases of the combined tech stack.

Specifically:
- Generic entities definition;
- Runtime dynamic resolvers;
- Standardized data loading where possible;
- Code first GraphQL approach.

## Installation

Developed with Node 13.10.1, at least the latest LTS is suggested; `npm` version higher than 5.7.0 is required as the installation command was added in that relaese.

In the root folder of the project run this command:

```bash
npm ci
```

## Usage

To run the code for development, run this command
```bash
npm run dev
```

Once the project is running, you can visit the GraphQL playground at http://localhost:3000/graphql.
Port can be changed in file `src/index.ts`.

If you remove and add back any code for exercise purposes, to check for differences between the generated schema and the target schema run this command:
```bash
npm diff
```
If the schema is different, the added code is incomplete or not compatible with the required solution.

## Further developments

This project contains some of the current state of my knowledge on the subject, and is likely to not see active development other than possibly some "batch" update.

Furthermore, the goal is to provide code samples for specific application logic. **In no way this code is meant to run in production as-is, as some key topics (e.g. security) are out of scope for this project and samples are not included.**

## Build
Not included in this version.

## License
[MIT](https://choosealicense.com/licenses/mit/)
