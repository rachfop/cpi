---
title: Comparisons
---

Cross-Program Invocations (CPI) in Solana offer a unique and powerful way to enable interaction between programs on the blockchain.
To fully appreciate the advantages of CPIs, it's helpful to compare them to other programming paradigms:

## Domain-Specific Languages (DSL)

- **Composability**: Domain-Specific Languages (DSLs) often provide composability, allowing developers to build complex functionality from smaller, reusable components. However, DSLs are tailored to specific problem domains and may lack the flexibility to address broader use cases.
- **Flexibility**: CPIs offer greater flexibility compared to DSLs. While DSLs are constrained by their domain-specific syntax and semantics, CPIs leverage the full power of the Solana blockchain and the Rust programming language, allowing for more generalized and versatile interactions between programs.

## Application Programming Interfaces (API)

- **Targeted Instructions**: CPIs in Solana are similar to API calls in traditional software development. Both mechanisms allow one component to invoke specific functionality in another component. In the case of CPIs, programs on the blockchain can invoke instructions in other programs, facilitating targeted and efficient interactions.
- **Internal API Calls**: Unlike traditional APIs that operate over the network, CPIs function as internal API calls within the blockchain environment. This internal nature reduces latency and increases security, as all interactions are contained within the Solana blockchain.

## Workflows

- **Complex Interactions**: CPIs enable the creation of complex workflows by allowing programs to call and build upon each other. This capability is essential for developing sophisticated decentralized applications (dApps) that require interactions between multiple smart contracts or programs.
- **Layered Invocations**: CPIs support layered invocations, where one program can invoke another, which in turn can invoke additional programs, up to a maximum depth of 4 CPIs. This multi-layered approach facilitates the development of modular and interconnected systems.

### Why Use CPI?

Using Cross-Program Invocations allows your Solana programs to interact with each other efficiently. This interaction promotes modularity, reusability, and composability, enabling you to build more sophisticated and interconnected applications on the Solana blockchain. By leveraging CPIs, you can create programs that are both powerful and flexible, capable of performing complex operations through coordinated programmatic interactions.

## Related Links

- For an overview of CPIs, see the [Overview of CPI](overview.md).
- For a detailed guide on implementing CPIs using Anchor, see [Cross-Program Invocations in Solana Using Anchor](index.md).
- For information on how CPIs work, see [How Does CPI Work?](how-does-it-work.md).
- For key features of CPIs, see [Key Features](key-features.md).
- For reasons to use CPIs in your projects, see [Why Use Cross-Program Invocation](why.md).
- For practical examples and use cases of CPIs, see [Examples of CPI](examples-of-cpi.md).
- For a step-by-step tutorial on implementing CPIs, see the [Tutorial on Cross-Program Invocation](tutorial.md).
