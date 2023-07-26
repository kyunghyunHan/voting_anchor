use anchor_lang::prelude::*;

declare_id!("FMXhCUbZYKGPFFV4ff8ipp61FUXdXJvRqm7L3tAvpUak");

#[program]
pub mod onchain_voting {
    use super::*;

    pub fn init_vote_bank(ctx:Context<InitVote>)->Result<()> {
        let vote_bank =&mut ctx.accounts.vote_account;
        ctx.accounts.vote_account.is_open_to_vote =true;
        Ok(())
    }
    pub fn gib_vote(ctx:Context<GibVote>,vote_type:VoteType)->Result<()>{
        match vote_type {
            VoteType::GM=>{
                msg!("Voted for GM ");
                ctx.accounts.vote_account.gm +=1;
            },
            VoteType::GN=>{
                msg!("Voted for GM ");
                ctx.accounts.vote_account.gn +=1;
            }
        };
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