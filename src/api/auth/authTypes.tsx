export interface LoginRequestV1 {
    username: string,
    password: string
}

export interface LoginResponseV1 {
    token?: string,
    success: boolean
}