// TODO: SignMessage
import { verify } from "@noble/ed25519";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";
import { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
let voteBank = anchor.web3.Keypair.generate();
const VOTE_BANK_ADDRESS = voteBank.publicKey;
export const VoteButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: "Wallet not connected" });
      console.log("error");
      return;
    }
    try {
      const instruction = new TransactionInstruction({
        key: [{ pubkey: VOTE_BANK_ADDRESS, isSigner: false, isWritable: true }],
        programId: new PublicKey(
          "FMXhCUbZYKGPFFV4ff8ipp61FUXdXJvRqm7L3tAvpUak"
        ),
        data: Buffer.from(Uint8Array.of(1)),
      });

      const transacion = new Transaction().add(instruction);
      const signature = await sendTransaction(transacion, connection);
      await connection.confirmTransaction(signature, "confirmed");

      console.log(signature);
      notify({
        type: "sucess",
        message: "Transaction successful!",
        txid: signature,
      });
    } catch (error: any) {
      notify({ type: "error", message: "22", description: error?.message });
      console.log("error", "Tran");
      return;
    }
  }, []);
  return (
    <div className="flex flex-row justify-center">
      <div className="relative group items-center">
        <div
          className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
        ></div>
        <button
          className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
          onClick={onClick}
          disabled={!publicKey}
        >
          <div className="hidden group-disabled:block">
            Wallet not connected
          </div>
          <span className="block group-disabled:hidden">init</span>
        </button>
      </div>
    </div>
  );
};
