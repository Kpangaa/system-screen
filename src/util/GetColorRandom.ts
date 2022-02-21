export const getColorRandom = (): string => {
    let hexadecimal: string[] = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
    let colorRandom: string = "#";
    for (let i = 0; i < 6; i++) {
        let posArray: number = Math.floor(Math.random() * hexadecimal.length);
        colorRandom += hexadecimal[posArray]
    }
    return colorRandom;
}