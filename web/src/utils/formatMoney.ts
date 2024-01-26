export const formatMoney = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        maximumFractionDigits: 2,       
        compactDisplay: 'short',
        currency: 'BRL',
    }).format(value);
}