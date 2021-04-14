const {
  buildScenarios
} = require('../util/scenario');
const { decodeCall, getEventData } = require('../util/substrate');
const { bytes32 } = require('../util/util');

let scen_info = {
  tokens: [
    { token: "zrx", balances: { ashley: 1000 } }
  ],
};

buildScenarios('Upgrade to m3', scen_info, [
  {
    name: "Upgrade from m2 to m3 with Live Events",
    info: {
      versions: ['m2', 'm3'],
      genesis_version: 'm2',
      eth_opts: {
        version: 'm2',
      },
      validators: {
        alice: {
          version: 'm2',
        }
      },
    },
    scenario: async ({ ctx, ashley, zrx, chain, starport, m3 }) => {
      // First, lock an asset in the Starport and check it
      let { tx, event } = await ashley.lock(100, zrx);
      expect(tx).toHaveEthEvent('Lock', {
        asset: zrx.ethAddress(),
        sender: ashley.ethAddress(),
        recipient: ashley.ethAddress(),
        amount: 100e18.toString()
      });
      expect(await ashley.chainBalance(zrx)).toEqual(100);

      // Then, upgrade the chain
      await chain.upgradeTo(m3);

      // Next, lock another asset in the Starport (Lock Old) and make sure it works
      ({ tx, event } = await ashley.lock(200, zrx));
      expect(tx).toHaveEthEvent('Lock', {
        asset: zrx.ethAddress(),
        sender: ashley.ethAddress(),
        sender: ashley.ethAddress(),
        recipient: ashley.ethAddress(),
        amount: 200e18.toString()
      });
      expect(await ashley.chainBalance(zrx)).toEqual(300);
    }
  }
]);
