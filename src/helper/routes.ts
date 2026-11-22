export const PAYMENT_SUCCESS_ROUTE = "/paymentsuccess";
export const PAYMENT_FAILED_ROUTE = "/paymentfailed";
export const ADD_TICKETS_ROUTE = "/addtickets";
export const BLOG_DETAILS_ROUTE = "/blogdetails/:id";
export const BLOG_ROUTE = "/blog";
export const CONTACT_US_ROUTE = "/contactus";
export const CHECKOUT_ROUTE = "/checkout";
export const FAQ_ROUTE = "/faq";
export const FORGOT_PASSWORD_ROUTE = "/forgetpassword";
export const HOW_IT_WORK_ROUTE = "/howitwork";
export const HOME_ROUTE = "/";
export const NOT_FOUND_ROUTE = "*";
export const OTP_VERIFICATION_ROUTE = "/otpverification";
export const PROFILE_SETTING_ROUTE = "/profilesetting";
export const PREFERENCE_ROUTE = "/preference/:id";
export const PREFERENCE_ROUTE_NOID = "/preference";
export const PREFERENCE_ROUTE_LEGACY = "/preferance/:id";
export const PRICING_ROUTE = "/pricing";
export const PAYMENT_LOG_ROUTE = "/paymentlog";
export const LOGIN_ROUTE = "/login";
export const SET_NEW_PASSWORD_ROUTE = "/setnewpassword";
export const USER_DASHBOARD_ROUTE = "/userdashboard";
export const REGISTER_ROUTE = "/register";
export const SUPPORT_TICKETS_ROUTE = "/supporttickets";
export const WEBSITE_TYPE_ROUTE = "/websitetype";
export const WEB_PREVIEW_ROUTE = "/webpreview/:id";
export const WEB_PREVIEW_EXTRA_ROUTE = "/webpreviewextra/:id";
export const WEB_IFRAME_PREVIEW_ROUTE = "/webiframepreview/:id/:page";
export const WEBSITE_HISTORY_ROUTE = "/webhistory";
export const PRIVACY_POLICY_ROUTE = "/privacypolicy";
export const REFUND_POLICY_ROUTE = "/refundpolicy";
export const SECURITY_POLICY_ROUTE = "/securitypolicy";
export const TERMS_OF_SERVICE_ROUTE = "/termsofservice";
export const PORTFOLIO_ROUTE = "/portfolio";
export const PUBLISH_WEBSITE = "/publish";
export const AUTH_CALLBACK = "/auth/calback";
export const LOGIN_AS_USER = "/impersonate-login";

const USER_AREA_PATHS = [
  "paymentsuccess",
  "paymentfailed",
  "addtickets",
  "checkout",
  "profilesetting",
  "preference",
  "preferance",
  "paymentlog",
  "userdashboard",
  "supporttickets",
  "websitetype",
  "webpreview",
  "webpreviewextra",
  "webiframepreview",
  "webhistory",
  "auth/calback",
  "impersonate-login",
];

export function isUserAreaPath(pathname: string) {
  const path = pathname.toLowerCase().replace(/^\/+/, "");
  return USER_AREA_PATHS.some((route) => path === route || path.startsWith(`${route}/`));
}
