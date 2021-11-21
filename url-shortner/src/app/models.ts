import { Time } from "@angular/common";

export interface Links{
    link:string,
    fullink:string  
}

export class logs{
    device!: string;
    os!: string;
    browser!: string;
    deviceType!: string;
    city!:string;
    state!:string;
    country!:string;
    latitude!:number;
    longitude!:number;
    date: String =""
}