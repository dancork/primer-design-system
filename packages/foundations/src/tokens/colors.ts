export enum ColorEnum {
  Gray300 = 'gray300',
  Gray500 = 'gray500',
  Gray900 = 'gray900',
  White = 'white',
  Blue300 = 'blue300',
  Yellow300 = 'yellow300',
  Red300 = 'red300',
}

export const colors: Record<ColorEnum, string> = {
  [ColorEnum.Gray300]: '#e0e0e0',
  [ColorEnum.Gray500]: '#9e9e9e',
  [ColorEnum.Gray900]: '#212121',
  [ColorEnum.White]: '#ffffff',
  [ColorEnum.Blue300]: '#399dff',
  [ColorEnum.Yellow300]: '#f9d147',
  [ColorEnum.Red300]: '#D43E4D',
}
