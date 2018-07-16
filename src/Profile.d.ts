export interface Accessory {
    type: string;
    desc: string;
}

export interface  ContactInfo {
    postalAddress?: string;
    postalCode?: string;
    postalDistrict?: string;
    address2?: string;
    country?: string;
    mobilephone?: string;
    email?: string;
}

export interface  Profile {
    profileId: number;
    firstName: string;
    lastName: string;
    initials?: string;
    nickName?: string;
    yearOfBirth?: number;
    work?: string;
    description?: string;
    dreamBirds?: string;
    accessories?: Array<Accessory>;
    contatInfo?: ContactInfo;
}