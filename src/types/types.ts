type uuidV4 = string;
type TNote = '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|Do-Re';
interface Paragraphs {
  paragraph: string
}
export interface IParagraph2 {
  id: uuidV4;
  paragraph: string;
  chorusPos: [position: number, repeat?: number][];
}

interface Chorus {
  choir: string,
  chorus_position_ignore: number[],
}
export interface IChoir2 {
  id: uuidV4;
  choir: string,
}

export interface Songs {
  id: uuidV4,
  num_song: string,
  title_es: string,
  description_es: string,
  // musicalNote: TNote
  musicalNote: TNote,
  paragraphs: Paragraphs[],
  chorus: Chorus[],
}
export interface Song2 {
  id: uuidV4,
  code: string,
  title: string,
  musicalNote: TNote,
  paragraphs: IParagraph2[],
  chorus: IChoir2[],
}

export type INavigate = any;
export type IRoute = any;