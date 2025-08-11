I am looking to build this Recurly NestJS API wrapper, I need to integrate the first endpoint `account`

API documentation: https://recurly.com/developers/api/v2021-02-25/index.html#tag/account 

Before starting the work you should create a branch `accounts` and ensure all development happens on that feature branch.

You should use `src/v3/accounts/*` as a template (it's from another wrapper for GTM), but replace this code with the recurly endpoint code.

1. Create the `src/v3/accounts/accounts.types.ts` using the response entities from the API documentation. All type names should start with Recurly to help differentiate them in the clients applications. 
2. This will not be using mocks, we will use the actual API with a sandbox account, so remove the mock files.
3. Create the `src/v3/accounts/accounts.dtos.ts` using the API request Query/Body data from the API documentation. All type names should start with Recurly to help differentiate them in the clients applications. 
4. Create the `src/v3/accounts/accounts.service.ts` creating the actions for each endpoint in the API documentation, using the types, dtos etc, each endpoint should have a corresponding function
5. Create the `src/v3/accounts/accounts.module.ts` for bringing everything together.
6. Create the `src/v3/accounts/accounts.test.spec.ts` creating tests for each of the functions in the `accounts.service.ts file`, ensure the tests pass successfully. Test should be created in the following CRUD order (create, read, update, delete) to ensure each service has data to pass to the others. Updates & Deletes should also read to ensure the change happened.
7. Include the new `accounts.module` in the main `src/v3/v3.module.ts` file as an import
8. Add the new `accounts` service, types and DTOs as exports to the main `src/index.ts` file
9. Run lint and fix any linting issues
10. Run prettier 
11. Run build and make sure the application builds
12. Run the test suite to ensure tests still pass.
13. Create a PR for this new module from your feature branch to main.