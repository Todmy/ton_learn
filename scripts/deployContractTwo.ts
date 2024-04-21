import { toNano } from '@ton/core';
import { ContractTwo } from '../wrappers/ContractTwo';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contractTwo = provider.open(
        ContractTwo.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('ContractTwo')
        )
    );

    await contractTwo.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(contractTwo.address);

    console.log('ID', await contractTwo.getID());
}
