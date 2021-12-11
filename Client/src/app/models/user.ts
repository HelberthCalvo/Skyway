export class User {
    _id?: number;
    username: string;
    password: string;
    role: string;
    name: string;
    lastname: string;
    email: string;
    birthday: Date;
    address: string; //la dirección deberá ser mediante en señalamiento de un punto en un mapa utilizando el API de google Maps
    workphone: string;
    mobile: string;
}
