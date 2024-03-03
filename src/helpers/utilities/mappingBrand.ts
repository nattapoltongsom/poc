enum BrandNameSap {
    I_M_MEME = `I’M MEME`,
    HOME = `HOME`,
    LA_BRUKET = `LA BRUKET`,
}

enum BrandNameImport {
    I_M_MEME = `I'M MEME`,
    HOME = `@HOME`,
    LA_BRUKET = `L:A BRUKET`,
}

export const mappingBrandToImport = (name: string): string => {
    switch (name) {
        case `${BrandNameSap.I_M_MEME}`:
            return BrandNameImport.I_M_MEME
        case `${BrandNameSap.HOME}`:
            return BrandNameImport.HOME
        case `${BrandNameSap.LA_BRUKET}`:
            return BrandNameImport.LA_BRUKET

        default:
            return name
    }
}
