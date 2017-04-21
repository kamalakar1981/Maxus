export interface IMarker {
    lat: number;
    lng: number;
    label?: string;
    type?: string;
    icon?: string;
}

export interface ICable {
    points: IMarker[];
    label: string;
    type: string;
    color: string;
}
