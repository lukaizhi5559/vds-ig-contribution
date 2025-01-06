import { server } from "./mocks/browser";

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset any request handlers that are declared during the tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
