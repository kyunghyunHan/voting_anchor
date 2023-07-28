import { FC, useEffect, useMemo, useCallback } from "react";
import { notify } from "../utils/notifications";
import { PublicKey } from "@solana/web3.js";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import { TransactionInstruction } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import idl from "../../../target/idl/onchain_voting.json";
import { OnchainVoting } from "../../../target/types/onchain_voting";

let voteBank = anchor.web3.Keypair.generate();
const VOTE_BANK_ADDRESS = voteBank.publicKey;
export const VoteButton: FC = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  let a = JSON.stringify(idl);
  let b = JSON.parse(a);
  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(
        b,
        new PublicKey("FMXhCUbZYKGPFFV4ff8ipp61FUXdXJvRqm7L3tAvpUak"),
        provider
      );
    }
  }, [connection, anchorWallet]);

  const onClick = useCallback(async () => {
    const tx = await program.methods
      .initVoteBank()
      .accounts({
        voteAccount: voteBank.publicKey,
      })
      .signers([voteBank])
      .rpc();
    console.log("TxHash ::", tx);
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
