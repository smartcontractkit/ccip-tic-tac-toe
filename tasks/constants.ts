
export type AddressMap = { [blockchain: string]: string };
export type TokenAmounts = { token: string, amount: string }

export enum PayFeesIn {
    Native,
    LINK
}

export const supportedNetworks = [
    `ethereumSepolia`,
    `optimismSepolia`,
    `arbitrumSepolia`,
    `avalancheFuji`,
    `polygonAmoy`,
];

export const LINK_ADDRESSES: AddressMap = {
    [`ethereumSepolia`]: `0x779877A7B0D9E8603169DdbD7836e478b4624789`,
    [`polygonAmoy`]: `0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904`,
    [`optimismSepolia`]: `0xE4aB69C077896252FAFBD49EFD26B5D171A32410`,
    [`arbitrumSepolia`]: `0xb1D4538B4571d411F07960EF2838Ce337FE1E80E`,
    [`avalancheFuji`]: `0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846`
};

export const routerConfig = {
    ethereumSepolia: {
        address: `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59`,
        chainSelector: `16015286601757825753`,
        feeTokens: [LINK_ADDRESSES[`ethereumSepolia`], `0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534`]
    },
    optimismSepolia: {
        address: `0x114A20A10b43D4115e5aeef7345a1A71d2a60C57`,
        chainSelector: `5224473277236331295`,
        feeTokens: [LINK_ADDRESSES[`optimismSepolia`], `0x4200000000000000000000000000000000000006`]
    },
    avalancheFuji: {
        address: `0xF694E193200268f9a4868e4Aa017A0118C9a8177`,
        chainSelector: `14767482510784806043`,
        feeTokens: [LINK_ADDRESSES[`avalancheFuji`], `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`]
    },
    arbitrumSepolia: {
        address: `0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165`,
        chainSelector: `3478487238524512106`,
        feeTokens: [LINK_ADDRESSES[`arbitrumSepolia`], `0xE591bf0A0CF924A0674d7792db046B23CEbF5f34`]
    },
    polygonAmoy: {
        address: `0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2`,
        chainSelector: `16281711391670634445`,
        feeTokens: [LINK_ADDRESSES[`polygonAmoy`], `0x360ad4f9a9A8EFe9A8DCB5f461c4Cc1047E1Dcf9`]
    }
}