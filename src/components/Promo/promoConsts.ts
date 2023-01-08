export const promoConsts: TPromoCode[] = [
    {
        code: 'EPM',
        discount: 0.1,
        description: 'EPAM Systems',
    },
    {
        code: 'RS',
        discount: 0.1,
        description: 'Rolling Scopes School',
    }
]

export type TPromoCode = {
    code: string;
    discount: number;
    description: string;
};