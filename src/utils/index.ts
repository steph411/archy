export enum Status {
  PRESENT = "présent",
  INVALIDE = "invalide",
  EMPRUNTE = "emprunté"

}


export const Colors =  {
  "présent" : window.getComputedStyle(document.documentElement).getPropertyValue("--green"),
  "invalide" : window.getComputedStyle(document.documentElement).getPropertyValue("--red"),
  "emprunté" : window.getComputedStyle(document.documentElement).getPropertyValue("--yellow"),

}


export interface IArchiveElement {
  name: string;
  status: Status; 
  date: string;
}