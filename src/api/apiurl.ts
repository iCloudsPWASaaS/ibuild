const APIURL = {
    API_URL:import.meta.env.VITE_API_URL,
    FRONT_URL: import.meta.env.VITE_FRONTEND_URL,
    BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
    PREVIEW_PATH:"uploads/websites/exports",
    GET_BLOG: 'getblog',
    GET_HERO: 'getherodata',
    GET_TAGLINE: 'gettaglinedata',
    GET_PORTFOLIO_SECTION: 'getportfoliodata',
    GET_FEATURE_SECTION: 'getfeaturedata',
    GET_HOW_IT_WORK_SECTION: 'gethowitworkdata',
    GET_PRICING: 'getpricingdata',
    GET_REVIEWS: 'getreviews',
    GET_FAQ: 'getfaqdata',
    GET_CATEGORY: 'getcategorydata',
    GET_CTA: 'getctadata',
    GET_GENERAL_DATA: 'getgeneraldata',
    GET_LOGIN_UI_DATA: 'getloginuidata',
    GET_SIGNUP_UI_DATA: "getsignupuidata",
    GET_USER_DATA: 'getuserdata',
    GET_SUPPORT_TICKET: 'getsupportticket',
    GET_TICKET_RESPONSE: 'getticketresponse',
    GET_PAYMENTLOG: 'userpaymentlog',
    GET_BLOG_DETAILS: 'getblogdetails',
    GET_USERDASHBOARD: 'getuserdashboard',
    GET_USER_WEBSITE_ANALYTIC: 'websiteanalytic',
    GET_COUNTRY: 'countries',
    GET_STATE: 'states',
    GET_PAYMENT_GATEWAYS: 'paymentgateways',
    GET_WEBSITE_TYPES: 'websitetype',
    GET_SEO: 'Seo',
    GET_PAGE_DETAILS: 'getpagedetails',
    GET_WEB_HISTORY: 'getuserwebhistory',
    DELETE_WEB_HISTORY: 'webhistory',

    POST_LOGIN: 'postlogin',
    POST_SIGNUP: 'postsignup',
    POST_NEWSLETTER: 'postnewsletter',
    POST_CONTACTUS: 'postcontactus',
    POST_FORGET_PASSWORD: 'postforgetpassword',
    POST_OTP: 'postotp',
    POST_RESEND_OTP: 'resendcode',
    POST_SET_NEW_PASSWORD: 'postsetnewpassword',
    POST_CHANGE_PASSWORD: 'postchangepassword',
    POST_SUPPORT_TICKET: 'postsupportticket',
    POST_TICKET_REPLY: 'postticketreply',
    POST_CHECKOUT: 'checkout',
    POST_CANCEL_SUBSCRIPTION: 'cancelsubscription',
    //POST_PREFERENCE: 'preferance',
    POST_PREFERENCE: 'generate-app-opencode', //extra

    PUT_PROFILE_INFO: 'putprofileinfo',
    PUT_PROFILE_NOTIFICATION:'updatenotifications',
    PUT_PREFERENCE: "preference",
    POST_PREFERENCE_ATTACH: "preferenceattach",
    POST_PREFERENCE_REGENERATE: "preferenceregenerate",

    DELETE_ACCOUNT: 'deleteaccount',
    POST_PUBLISH:'publish',
    GET_PAGES: 'getpages',

    GET_LOGIN_GOOGLE: 'auth/google',
    GET_LOGIN_GITHUB: 'auth/github',
    GET_BRANTREE_TOKEN: 'braintreetoken',

    //extra
    APP_STATUS_PATH: "app-status",   // GET  /app-status/:preferenceId
    APP_ENV_PATH: "app-env",         // GET/PUT /app-env/:preferenceId
    APP_FILES_PATH: "app-files",     // GET/PUT /app-files/:preferenceId
    //FIX_APP_PATH: "app-fix",

}

export { APIURL }

