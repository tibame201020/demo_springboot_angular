package com.demo.back_end_springboot.back_end_springboot.constant;

public class SecurityConstant {
    public static final String LOGIN_URL = "/api/user/login";
    public static final String REGISTER_URL = "/api/user/register/**";
    public static final String REFRESH_TOKEN_URL = "/api/user/refresh_token";
    public static final String ENABLE_USER_URL = "/api/user/enableTheAccount";

    public static final String VALID_SUCCESSFUL_MSG = "the token is valid";
    public static final String VALID_UNSUCCESSFUL_EXPIRED_MSG = "the token has Expired";
    public static final String VALID_UNSUCCESSFUL_UN_VALID_MSG = "the token is un-valid";

    public static final String TOKEN_CAN_NOT_VERIFY =  "the token can not be verify";

    public static final String SECRET = "[a-zA-z0-9._]^+$ljdljlwqjmlwdqwdqmslkwqms$";

    public static final String[] PASS_URLS =
            new String[] { LOGIN_URL, REGISTER_URL, REFRESH_TOKEN_URL, ENABLE_USER_URL, "/api/user/test" };


}
