export enum UserRole {
  Rider = "rider",
  Hospital = "hospital",
  Police = "police",
  Admin = "admin",
}

export interface LocationInterface {
  latitude: number,
  longitude: number
}

export interface UserLocationInterface {
  static: LocationInterface,
  dynamic: LocationInterface
}

export interface UserMetaInterface {
  photo?: string,
  phoneNumber?: string,
  location?: UserLocationInterface
}

export interface UserInterface {
  id?: string;
  name: string;
  username: string;
  email: string;
  google?: string;
  password: string;
  meta?: UserMetaInterface;
  role?: UserRole;
  fcmToken: string;
  createdAt?: Date;
}

export default class User implements UserInterface {
  public id?: string;
  public name: string;
  public username: string;
  public email: string;
  public google?: string;
  public password: string;
  public meta?: UserMetaInterface
  public role: UserRole;
  public createdAt: Date;
  public fcmToken: string;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.google = user.google;
    this.password = user.password;
    this.meta = user.meta;
    this.role = user.role ? user.role : UserRole.Rider;
    this.createdAt = user.createdAt ? user.createdAt : new Date();
    this.fcmToken = user.fcmToken;
  }

  public toString() {
    return `{
        id: ${this.id},
        name: ${this.name},
        username: ${this.username},
        email: ${this.email},
        role: ${this.role},
        id: ${this.id},
    }`;
  }
}
