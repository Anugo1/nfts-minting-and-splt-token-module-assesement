import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

(async () => {
    // Step 1: Connect to cluster and generate two new Keypairs
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const fromsecretKeyut8 = new Uint8Array([26,108,118,152,183,71,225,76,190,111,195,85,170,42,181,52,89,101,127,203,11,183,151,160,7,212,200,215,245,232,136,231,33,105,81,175,205,140,132,137,245,29,217,217,65,207,126,139,136,44,49,252,190,194,16,150,75,216,67,225,206,109,0,94])

//create a keypair object from the secret key of the from wallet
const fromWalletkeypair = Keypair.fromSecretKey(fromsecretKeyut8)


const toSecretkeyut8 = new Uint8Array([64,141,150,224,132,159,191,14,225,53,48,242,3,237,107,90,182,149,163,120,49,77,254,224,33,27,38,170,156,226,157,6,64,28,93,226,205,81,12,13,1,135,76,247,233,110,26,29,249,225,100,4,61,20,220,121,229,186,59,103,0,36,75,0])
  //create a keypair object from the secret key of the from wallet
const toWalletkeypair = Keypair.fromSecretKey(toSecretkeyut8)

 // Step 2: Airdrop SOL into your from wallet
const fromAirdropSignature = await connection.requestAirdrop(fromWalletkeypair.publicKey, LAMPORTS_PER_SOL);
// Wait for airdrop confirmation
await connection.confirmTransaction(fromAirdropSignature, { commitment: "confirmed" });

    
    // Step 3: Create new token mint and get the token account of the fromWallet address
//If the token account does not exist, create it
const mint = await createMint(connection, fromWalletkeypair, fromWalletkeypair.publicKey, null, 9);
const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWalletkeypair,
        mint,
        fromWalletkeypair.publicKey
)
 
    //Step 4: Mint a new token to the from account
let signature = await mintTo(
	connection,
	fromWalletkeypair,
	mint,
	fromTokenAccount.address,
	fromWalletkeypair.publicKey,
	1000000000,
	[]
);
console.log('mint tx:', signature);

    

    //Step 5: Get the token account of the to-wallet address and if it does not exist, create it
const toTokenAccount = await getOrCreateAssociatedTokenAccount(
	connection,
	fromWalletkeypair,
	mint,
	toWalletkeypair.publicKey
);

    

    ///Step 6: Transfer the new token to the to-wallet's token account that was just created
// Transfer the new token to the "toTokenAccount" we just created
signature = await mintTo(
	connection,
	fromWalletkeypair,
	mint,
	toTokenAccount.address,
	fromWalletkeypair.publicKey,
	1000000000,
	[]
);
console.log('transfer tx:', signature);

 
})();
