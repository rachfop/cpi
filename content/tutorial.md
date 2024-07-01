---
title: Tutorial on Cross-Program Invocation
sidebar: 📚 CPI Tutorial
toc: 2
---

In this guide, you will learn how to implement Cross-Program Invocations (CPI) in Solana using Anchor.
Cross-Program Invocations allow one Solana program to call another, which is crucial for building modular and reusable components.
By the end of this tutorial, you'll be able to set up and use CPIs in your Solana projects.

In this example, we'll create two Solana programs:

- a `puppet` program that manages a simple counter
- a `puppet-master` program that increments this counter

The `puppet` program will initialize and increment a counter, while the `puppet-master` program will use CPI to call the increment function of the `puppet` program.
This demonstrates how CPIs can be used to interact with and manipulate data across different Solana programs, promoting modularity and code reuse.

Using CPIs provides several advantages:

- **Modularity**: Programs can be developed independently and interact with each other through well-defined interfaces.
- **Reusability**: Common functionalities can be encapsulated in separate programs and reused across multiple projects.
- **Separation of Concerns**: Different functionalities can be isolated into distinct programs, making the codebase easier to manage and maintain.

By leveraging CPIs, you can build more flexible and maintainable Solana applications.

For the completed code, see the [CPI code](https://github.com/rachfop/cpi-code) repository.

## Prerequisites

Before we begin, ensure you have the necessary tools and environment set up.
This includes installing Rust and Yarn, and setting up the Solana CLI.
Additionally, having some familiarity with Solana and useful resources from the Anchor documentation will be beneficial.

- A local development environment for Rust.
  Follow the official Rust installation instructions [here](https://www.rust-lang.org/tools/install).
- Yarn installed on your machine.
  Follow the Yarn installation guide [here](https://yarnpkg.com/getting-started/install).
- [Solana CLI](#installing-solana) installed.
- [Anchor CLI](#installing-anchor) Installed.

Follow the steps below to install and verify it.

### Installing Solana

First, let's install Solana using the curl command.
This will download and set up the Solana CLI tools on your machine.

```command
sh -c "$(curl -sSfL https://release.solana.com/v1.18.17/install)"
```

Next, add Solana to your `PATH` to ensure the CLI tools are accessible from your terminal.

```command
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
```

Finally, verify the installation by checking the Solana version:

```bash
solana --version
```

With Solana installed, let's move on to setting up Anchor, a framework for Solana programs.

### Installing Anchor

Anchor provides a suite of tools for writing Solana programs.
First, install Anchor using Cargo, Rust's package manager:

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

After installing Anchor, set up the Anchor CLI with the following commands:

```bash
avm install latest
avm use latest
```

Verify the Anchor installation:

```bash
anchor --version
```

Now that we have the necessary tools installed, let's create a new Solana project.

## Starting a New Project

We'll start by creating a new workspace with Anchor.
This workspace will hold our Solana programs, allowing us to build and test our projects efficiently.

```command
anchor init puppet && cd puppet
```

Next, copy the following code into the `puppet/programs/puppet/src/lib.rs` file to define our puppet program.
This program will serve as a basic example to demonstrate the fundamentals of Anchor programs.

```rust
use anchor_lang::prelude::*;

declare_id!("<replace with your actual id>");

#[program]
pub mod puppet {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.value = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.value += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[account]
pub struct Counter {
    pub value: u64,
}
```

This Solana program using the Anchor framework, which includes two main functions: `initialize` to set up a new `Counter` account with an initial value of 0, and `increment` to increase the counter value by 1.
The `Initialize` and `Increment` structs specify the accounts required for each operation, ensuring the correct accounts are used and managed.
The `Counter` struct represents the on-chain account that stores the counter value as a 64-bit unsigned integer.

With our `puppet` program set up, let's create a new program that will interact with it using CPIs.

## Creating a CPI Program

Create a new program inside the workspace with the following command.
This program, `puppet-master`, will demonstrate how to perform CPIs.

```command
anchor new puppet-master
```

Add the following code to `puppet/programs/puppet-master/src/lib.rs` to define the puppet-master program.
This program will call the puppet program, showcasing the interaction between different Solana programs.

```rust
use anchor_lang::prelude::*;
use puppet::cpi::accounts::Increment;
use puppet::program::Puppet;
use puppet::{self, Counter};

declare_id!("<replace with your actual id>");

#[program]
mod puppet_master {
    use super::*;
    pub fn control_puppet(ctx: Context<ControlPuppet>) -> Result<()> {
        puppet::cpi::increment(ctx.accounts.increment_ctx())
    }
}

#[derive(Accounts)]
pub struct ControlPuppet<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
    pub puppet_program: Program<'info, Puppet>,
}

impl<'info> ControlPuppet<'info> {
    pub fn increment_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Increment<'info>> {
        let cpi_program = self.puppet_program.to_account_info();
        let cpi_accounts = Increment {
            counter: self.counter.to_account_info(),
        };
        CpiContext::new(cpi_program, cpi_accounts)
    }
}
```

This file defines a Solana program called `puppet-master` using the Anchor framework, which interacts with another program, `puppet`, through Cross-Program Invocation (CPI).
The `control_puppet` function in the `puppet-master` program calls the `increment` function in the `puppet` program to increase the value of a shared `Counter` account.
The `ControlPuppet` struct specifies the necessary accounts for this operation, and the `increment_ctx` method constructs the context required for the CPI call.

To link the `puppet-master` program with the puppet program, update the `puppet/programs/Cargo.toml` file as follows.
This ensures that the `puppet-master` can access the `puppet` program's types and CPI functions.

```toml
puppet = { path = "../puppet", features = ["cpi"] }
```

Now, let's move on to writing tests to ensure our programs work correctly and the CPIs function as expected.

## Writing Tests

In the `puppet/tests/` directory, create a new test file called `puppet.ts` and paste the following code.
This test will verify that our CPI setup works as expected, ensuring the interaction between the `puppet` and `puppet-master` programs is correct.

```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import { expect } from "chai";
import { Puppet } from "../target/types/puppet";
import { PuppetMaster } from "../target/types/puppet_master";

describe("puppet", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const puppetProgram = anchor.workspace.Puppet as Program<Puppet>;
  const puppetMasterProgram = anchor.workspace
    .PuppetMaster as Program<PuppetMaster>;

  const puppetKeypair = Keypair.generate();

  it("Does CPI!", async () => {
    await puppetProgram.methods
      .initialize()
      .accounts({
        puppet: puppetKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([puppetKeypair])
      .rpc();

    await puppetMasterProgram.methods
      .pullStrings(new anchor.BN(42))
      .accounts({
        puppetProgram: puppetProgram.programId,
        puppet: puppetKeypair.publicKey,
      })
      .rpc();

    expect(
      (
        await puppetProgram.account.data.fetch(puppetKeypair.publicKey)
      ).data.toNumber(),
    ).to.equal(42);
  });
});
```

To run the tests and ensure everything is working properly, use the following command:

```command
anchor test
```

### Conclusion

In this article, you learned how to set up and use Cross-Program Invocations (CPI) in Solana using Anchor.
We started by installing the necessary tools and setting up a local development environment.
Then, we created and linked two Solana programs: the `puppet` program, which manages a counter, and the `puppet-master` program, which interacts with the `puppet` program through CPI to increment the counter.
Finally, we wrote tests to verify the functionality of our programs and ensure that the CPI interactions worked as expected.

By understanding and implementing CPIs, you can now build more modular and reusable components in your Solana projects.
This approach promotes better separation of concerns, code reuse, and maintainability, enabling you to develop more sophisticated and efficient Solana applications.
As you continue to explore and implement CPIs, you'll find new ways to leverage this powerful feature to enhance your projects.

## Related Links

- For an overview of CPIs, see the [Overview of CPI](overview.md).
- For comparisons with other programming paradigms, see [Comparisons](comparisons.md).
- For a detailed guide on implementing CPIs using Anchor, see [Cross-Program Invocations in Solana Using Anchor](tutorial.md).
- For information on how CPIs work, see [How Does CPI Work?](how-does-it-work.md).
- For key features of CPIs, see [Key Features](key-features.md).
- For reasons to use CPIs in your projects, see [Why Use Cross-Program Invocation](why.md).
- For practical examples and use cases of CPIs, see [Examples of CPI](examples-of-cpi.md).
