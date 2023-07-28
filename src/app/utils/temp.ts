export function temp(temp: number | undefined) {
    return Math.round(Number(temp) - 273.15)
}