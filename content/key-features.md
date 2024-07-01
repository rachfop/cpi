---
title: Key features
sidebar: 🌟 Key Features
toc: 6
---

Cross-Program Invocations (CPI) in Solana help build strong and secure apps by connecting different programs together.
The Solana system makes sure these connections happen safely and fairly.
It checks that each program runs correctly and sends the right results back, making it possible to create trustworthy and decentralized apps on the Solana blockchain.

## Composability

**Definition**: Composability is the ability to combine different programs to create unique functionalities.

**Explanation**:

- **Building Blocks**: In a composable system, programs act as building blocks that can be combined and recombined in various ways to create new and innovative functionalities. This is simmilar to using Lego bricks to build complex structures from simple components.
- **Efficiency**: Composability promotes efficiency by allowing developers to reuse existing code. This not only speeds up development but also ensures that the code has been tested and optimized, reducing the likelihood of errors.

**Example**:
Imagine a financial application that requires functionalities such as token transfers, lending, and staking.
Instead of developing these features from scratch, the application can leverage existing programs that handle each functionality, composing them into a seamless user experience.

## Extended Privileges

**Definition**: Extended privileges refer to the capability where signer privileges from the caller program can be extended to the callee program, enabling seamless and secure interactions.

**Explanation**:

- **Delegated Authority**: When a program invokes another program via CPI, it can delegate its signer privileges to the callee program.
  This means that the callee program can perform actions on behalf of the caller program, maintaining a secure and trusted environment.
- **Secure Interactions**: By extending privileges securely, CPIs ensure that only authorized interactions take place. This is crucial for maintaining the integrity and security of blockchain applications, where unauthorized actions can lead to significant security breaches.
- **Program Derived Addresses (PDA)**: CPIs allow programs to sign transactions on behalf of PDAs, further enhancing the security and flexibility of interactions. PDAs are deterministic addresses that derive from a program and a seed, providing a secure way to manage accounts.

**Example**:
Consider a scenario where a decentralized exchange (DEX) program needs to perform token swaps. By using CPI, the DEX program can call a token program to transfer tokens, extending its signer privileges to ensure the transfer is authorized and secure.

## Modularity

**Definition**: Modularity refers to the design principle where programs can be developed independently and still interact with each other through CPIs, promoting modularity and code reuse.

**Explanation**:

- **Independent Development**: Modularity allows different teams to work on separate programs independently. Each program can be developed, tested, and deployed without needing to coordinate closely with other programs.
- **Interoperability**: Despite being developed independently, modular programs can interact seamlessly through CPIs. This interoperability is key to building complex applications where multiple programs need to work together.
- **Code Reuse**: Modularity promotes code reuse by enabling programs to serve as reusable components. This reduces duplication of effort and ensures that best practices and optimizations are consistently applied across different projects.

**Example**:
A supply chain management system may consist of several independent programs, such as inventory tracking, shipment tracking, and payment processing.
Each of these programs can be developed separately and interact with each other through CPIs to create a cohesive system.

## Related Links

- For an overview of CPIs, see the [Overview of CPI](overview.md).
- For comparisons with other programming paradigms, see [Comparisons](comparisons.md).
- For a detailed guide on implementing CPIs using Anchor, see [Cross-Program Invocations in Solana Using Anchor](tutorial.md).
- For information on how CPIs work, see [How Does CPI Work?](how-does-it-work.md).
- For reasons to use CPIs in your projects, see [Why Use Cross-Program Invocation](why.md).
- For practical examples and use cases of CPIs, see [Examples of CPI](examples-of-cpi.md).
- For a step-by-step tutorial on implementing CPIs, see the [Tutorial on Cross-Program Invocation](tutorial.md).
