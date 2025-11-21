export interface User {
           userId: string;
        userStateCode: string;
        userRoleCode: string;
        secuencial: number;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        province: string;
        identification: string;
        phoneNumber: string;
        email: string;
        sendNotices: boolean;
        createdAt: string;
        updateAt: string;
        token: string;
        loginAt: string;
}

// DTO para Login
export interface LoginDto {
    email: string;
    password: string;
}

// Respuesta del Login
export interface LoginResponse {
    success: boolean;
    message: string;
    data?: {
        userId: string;
        userStateCode: string;
        userRoleCode: string;
        secuencial: number;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        province: string;
        identification: string;
        phoneNumber: string;
        email: string;
        sendNotices: boolean;
        createdAt: string;
        updateAt: string;
        token: string;
        loginAt: string;
    };
    errors?: string[];
}




export interface RegisterUserDto {
    userStateCode: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    province: string;
    identification: string;
    phoneNumber: string;
    email: string;
    password: string;
    sendNotices: boolean;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: {
        userId: string;
        userStateCode: string;
        userRoleCode: string;
        secuencial: number;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        province: string;
        identification: string;
        phoneNumber: string;
        email: string;
        sendNotices: boolean;
        createdAt: string;
        updateAt: string;
        userStateName: string;
         token: string;
        roleName: string;
    };
    errors?: string[];
}

export interface getAllUsersResponse {
  userId: string;
  userStateCode: string;
  userRoleCode: string;
  secuencial: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  identification: string;
  phoneNumber: string;
  email: string;
  sendNotices: boolean;
  createdAt: string; // o Date si lo parseas
  updateAt: string;  // o Date si lo parseas
  userStateName: string | null;
  roleName: string | null;
}
