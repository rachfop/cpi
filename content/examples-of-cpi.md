---
title: Examples of Cross-Program Invocations
---

#### DeFi Platforms

**Description**: Decentralized Finance (DeFi) platforms leverage CPIs to create more integrated and feature-rich financial services by interacting with multiple protocols.

**Example**: A DeFi lending platform could use CPIs to interact with a decentralized exchange (DEX) for collateral swaps, a stablecoin protocol for issuing loans in stablecoins, and a yield farming protocol to generate returns on deposited assets. By using CPIs, the lending platform can offer a comprehensive suite of financial services without needing to implement each function internally.

**Benefits**:

- **Comprehensive Services**: Users can access a wide range of financial services from a single platform.
- **Efficiency**: The platform can utilize the specialized functionalities of other protocols, ensuring high performance and security.
- **Flexibility**: New services can be added by integrating additional protocols via CPIs, allowing the platform to adapt to market demands quickly.

#### Token Swaps

**Description**: Token swap programs enable users to exchange one type of cryptocurrency for another. These programs often use CPIs to interact with liquidity pools and other decentralized exchanges to find the best rates and execute trades efficiently.

**Example**: A token swap service might use a CPI to query multiple DEXs for the best swap rates. Once the best rate is found, the service can use another CPI to execute the swap transaction on the chosen DEX. This ensures users get the best possible deal with minimal slippage.

**Benefits**:

- **Best Rates**: Users benefit from optimal swap rates by querying multiple sources.
- **Seamless Execution**: Transactions are executed quickly and efficiently by leveraging the liquidity of multiple platforms.
- **User Experience**: Provides a smooth and integrated experience for users, who can conduct swaps without needing to manually check multiple DEXs.

#### NFT Marketplaces

**Description**: Non-Fungible Token (NFT) marketplaces use CPIs to interact with various minting and verification programs, ensuring the secure creation and sale of unique digital assets.

**Example**: An NFT marketplace could use CPIs to interact with a minting program when a user creates a new NFT. This interaction ensures that the NFT is securely minted and that all metadata is accurately recorded on the blockchain. Additionally, the marketplace could use CPIs to verify the authenticity of NFTs by cross-referencing with other programs.

**Benefits**:

- **Security**: Ensures that NFTs are minted securely and are tamper-proof.
- **Verification**: Enhances trust by verifying the authenticity and provenance of NFTs.
- **Integration**: Allows seamless interaction with various minting and verification services, enhancing the marketplace's functionality.

## Related Links

- For an overview of CPIs, see the [Overview of CPI](overview.md).
- For comparisons with other programming paradigms, see [Comparisons](comparisons.md).
- For a detailed guide on implementing CPIs using Anchor, see [Cross-Program Invocations in Solana Using Anchor](index.md).
- For information on how CPIs work, see [How Does CPI Work?](how-does-it-work.md).
- For key features of CPIs, see [Key Features](key-features.md).
- For reasons to use CPIs in your projects, see [Why Use Cross-Program Invocation](why.md).
- For a step-by-step tutorial on implementing CPIs, see the [Tutorial on Cross-Program Invocation](tutorial.md).
