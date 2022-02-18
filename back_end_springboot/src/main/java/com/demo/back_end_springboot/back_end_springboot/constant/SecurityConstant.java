package com.demo.back_end_springboot.back_end_springboot.constant;

public class SecurityConstant {
    public static final String LOGIN_URL = "/api/user/login";
    public static final String REGISTER_URL = "/api/user/register/**";
    public static final String REFRESH_TOKEN_URL = "/api/user/refresh_token";

    public static final String VALID_SUCCESSFUL_MSG = "valid is successful";
    public static final String VALID_UNSUCCESSFUL_MSG = "valid is un successful";

    public static final String TOKEN_CAN_NOT_VERIFY =  "token can not be verify";

    public static final String SECRET = "[a-zA-z0-9._]^+$ljdljlwqjmlwdqwdqmslkwqms$";


}
