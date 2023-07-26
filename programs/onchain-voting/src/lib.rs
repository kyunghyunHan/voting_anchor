use anchor_lang::prelude::*;

declare_id!("FMXhCUbZYKGPFFV4ff8ipp61FUXdXJvRqm7L3tAvpUak");

#[program]
pub mod onchain_voting {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
