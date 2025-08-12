I am looking to extend this Recurly NestJS API wrapper to include Account > Note

API documentation: https://recurly.com/developers/api/v2021-02-25/index.html#tag/account_acquisition

Before starting the work you should create a branch `account_acquisition` and ensure all development happens on that feature branch.

You should use `src/v3/accounts/*` as a template

1. Create a new folder `src/v3/accounts/acquisition` for the new files
2. Create the `src/v3/accounts/acquisition/acquisition.types.ts` using the response entities from the API documentation. All type names should start with Recurly to help differentiate them in the clients applications. 
4. Create the `src/v3/accounts/acquisition/acquisition.dtos.ts` using the API request Query/Body data from the API documentation. All DTOs names should start with Recurly to help differentiate them in the clients applications. 
5. Create the `src/v3/accounts/acquisition/acquisition.service.ts` creating the actions for each endpoint in the API documentation,using the types, dtos etc, each endpoint should have a corresponding function, also accept API key as a param if clients want to pass at runtime.
6. Create the `src/v3/accounts/acquisition/acquisition.module.ts` for bringing everything together.
7. Create the `src/v3/accounts/acquisition/acquisition.test.spec.ts` creating tests for each of the functions in the service file, ensure the tests pass successfully. Test should be created in the following CRUD order (create, read, update, delete) to ensure each service has data to pass to the others. Updates & Deletes should also read to ensure the change happened.
8. Include the new module in the main `src/v3/accounts/accounts.module.ts` file as an import
9. Add the new service, types and DTOs as exports to the main `src/index.ts` file
10. Run lint and fix any linting issues (`npm run lint`)
11. Run prettier (`npm run format`)
12. Run build and make sure the application builds (`npm run build`)
13. Run the test suite to ensure tests still pass (`npm run test`)
14. Commit the code with a good commit message
14. Create a PR for this new module from your feature branch to main using the Github CLI.