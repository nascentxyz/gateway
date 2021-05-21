
## Integration Tests

Integration tests that run the real deal and make sure every component works together. The goal of these tests are to show that end-to-end flows are correctly working. Specifically, we will run ganache, deploy Cash Token, Starport, etc, run a simplified Gateway test-net and then interact with ganache and Gateway to say mint some Cash or extract collateral from Gateway. These are fully automated and run in CI.

## Running

You can run the tests with Gateway compiled in release or debug profile. The default profile is **debug**.

First, you'll need to compile Gateway. You can use the `--release` flag if you want to.

```sh
gateway> cargo +nightly build
```

Note: if you require deeper debugging, you may want to enable the `integration` feature, via:

```sh
gateway> WASM_BUILD_RUSTFLAGS='--cfg feature=\"integration\"' cargo build --release --features integration
```

This will remove `wasm-stripped` messages at the cost of a larger wasm runtime blob. This should not be used for production builds.

Now, compile Ethereum, you'll need solc 0.8.1 installed. In the `ethereum` directory, run:

```sh
gateway/ethereum> yarn install && yarn compile
```

Next, install integration test dependencies in this directory:

```sh
gateway/integration> yarn install
```

Running the entire test suite doesn't really work right now so run one test at a time by using `only:true` on the test you want to run as follows

```
buildScenarios('...', scen_info, [
  {
    name: '...',
    only: true,
    scenario: async ({ ashley, usdc, chain, ... }) => {
        .
        .
        .
    }
  },
  .
  .
  .
]);
```

If you built with the `--release` flag, then run the test using: 

```sh
yarn test __tests__/<my-test>.js
```

If you did NOT build with the `--release` flag, then run the test using:


```sh
yarn jest __tests__/<my-test>.js
```
