import { Name, Voting, N } from '../src/contracts/voting'
import { bsv, TestWallet, DefaultProvider, toByteString, FixedArray } from 'scrypt-ts'

import * as dotenv from 'dotenv'

dotenv.config()

const privateKey = bsv.PrivateKey.fromWIF(process.env.PRIVATE_KEY || '')


const signer = new TestWallet(privateKey, new DefaultProvider({
    network: bsv.Networks.testnet
}))

async function main() {
    await Voting.compile()

    const candidateNames: FixedArray<Name, typeof N> = [
        toByteString('Math', true),
        toByteString('Physics', true)
    ]

    const instance = new Voting(
        candidateNames
    )

    await instance.connect(signer)

    const amount = 1
    const deployTx = await instance.deploy(amount)
    console.log('Voting contract deployed: ', deployTx.id)
}

main()
