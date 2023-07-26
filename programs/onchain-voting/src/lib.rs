use anchor_lang::prelude::*;

declare_id!("FMXhCUbZYKGPFFV4ff8ipp61FUXdXJvRqm7L3tAvpUak");

#[program]
pub mod onchain_voting {
    use super::*;

    pub fn initialize(ctx: Context<InitVote>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitVote<'info> {
   #[account(
    init,
    payer = signer,
    space = 8+1+8+8,
   )]
   pub vote_account :Account<'info,VoteBank>,

   #[account(mut)]
   pub signer:Signer<'info>,

   pub system_program:Program<'info,System>
}



#[derive(Accounts)]

pub struct GibVote<'info> {

    #[account(mut)]
    pub vote_account:Account<'info,VoteBank>,
    pub signer:Signer<'info>

}

#[account]
#[derive(Default)]
pub struct VoteBank {
    is_open_to_vote:bool,
    gm:u64,
    gn:u64,
}

#[derive(AnchorSerialize,AnchorDeserialize)]
pub enum VoteType {
    GM,
    GN
}