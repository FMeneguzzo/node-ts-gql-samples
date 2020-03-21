import 'reflect-metadata';

import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import { Express, NextFunction, Request, Response } from 'express';
import * as express from 'express';

import { getContext, getSchema } from '@app/graphql';

console.log(`Node version: ${process.version}`);

async function init(): Promise<void> {
  const app: Express = express();
  app.use(bodyParser.json());

  try {
    const schema = await getSchema();
    const options: ApolloServerExpressConfig = {
      context: () => getContext(),
      schema: schema,
      tracing: false,
      playground: true,
      introspection: true,
      debug: true,
    };
  
    const gqlServer: ApolloServer = new ApolloServer(options);
    gqlServer.applyMiddleware({ app, path: '/graphql' });
  
    app.use((err: Error, _: Request, res: Response, next: NextFunction): void => {
      if (err) {
        if (err instanceof SyntaxError) {
          res.status(400).send('SyntaxError: malformed JSON payload.');
  
          return;
        }
        res.status(500).end();
  
        return;
      }
      next();
    });
  
    app.use('*', (_: Request, res: Response) => {
      res.status(404).end();
    });
  
  
    app.listen(3000, () => console.log(`Server ready`));
  } catch (e) {
    console.log(e);
  }

}

init();
