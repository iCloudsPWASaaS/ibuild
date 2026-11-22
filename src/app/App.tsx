import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  AddTicketPage, BlogDetailPage, BlogsPage, CheckoutPage,
  ContactPage, FaqPage, ForgotPasswordPage, Howitwork, LandingPage,
  OtpVerificationPage, PaymentFailedPage, PaymentLogPage, PaymentSuccessPage, Preference, Pricing,
  PrivacyPolicyPage,
  ProfileSettingsPage, SecurityPolicyPage, SetNewPasswordPage, SignInPage, SignUpPage,
  TermsOfServicePage,
  UserDashboard, WebiframePreview, WebPreview, WebPreviewExtra, WebsiteHistoryPage, WebsiteTypePage
} from "./pages";
import SupportTicketsPage from "./pages/Supportticket/Supportticket";
import ScrollToTop from "../helper/scrolltotop";
import NotFoundPage from "./pages/404/404";
import QueryProvider from "../provider/QueryProvider";
import { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import {PAYMENT_SUCCESS_ROUTE, PAYMENT_FAILED_ROUTE, ADD_TICKETS_ROUTE,
  BLOG_DETAILS_ROUTE, BLOG_ROUTE, CONTACT_US_ROUTE, CHECKOUT_ROUTE, FAQ_ROUTE,
  FORGOT_PASSWORD_ROUTE, HOW_IT_WORK_ROUTE, HOME_ROUTE, NOT_FOUND_ROUTE,
  OTP_VERIFICATION_ROUTE, PROFILE_SETTING_ROUTE, PREFERENCE_ROUTE, PRICING_ROUTE,
  PAYMENT_LOG_ROUTE, LOGIN_ROUTE, SET_NEW_PASSWORD_ROUTE, USER_DASHBOARD_ROUTE,
  REGISTER_ROUTE, SUPPORT_TICKETS_ROUTE, WEBSITE_TYPE_ROUTE, WEB_PREVIEW_ROUTE,
  WEB_PREVIEW_EXTRA_ROUTE,
  WEBSITE_HISTORY_ROUTE,
  PRIVACY_POLICY_ROUTE,
  TERMS_OF_SERVICE_ROUTE,
  PORTFOLIO_ROUTE,
  SECURITY_POLICY_ROUTE,
  WEB_IFRAME_PREVIEW_ROUTE,
  AUTH_CALLBACK,
  LOGIN_AS_USER, PREFERENCE_ROUTE_NOID, PREFERENCE_ROUTE_LEGACY, isUserAreaPath
} from "../helper/routes";
import { ProtectedRoute } from '../components';
import PortfolioPage from './pages/Portfolio/Portfolio';
import LoginSuccess from './pages/LoginSuccess/LoginSuccess';
import ImpersonateLogin from './pages/ImpersonateLogin';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const isWebsitePreview = path.startsWith("/webiframepreview");
    const isUserArea = isUserAreaPath(location.pathname);

    document.documentElement.classList.toggle("website-theme", isWebsitePreview);
    document.documentElement.classList.toggle("user-area", isUserArea);

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />
      <Routes>
        {/* Public Routes - No Login Required */}
        <Route path={HOME_ROUTE} element={<LandingPage />} />
        <Route path={BLOG_ROUTE} element={<BlogsPage />} />
        <Route path={BLOG_DETAILS_ROUTE} element={<BlogDetailPage />} />
        <Route path={CONTACT_US_ROUTE} element={<ContactPage />} />
        <Route path={FAQ_ROUTE} element={<FaqPage />} />
        <Route path={HOW_IT_WORK_ROUTE} element={<Howitwork />} />
        <Route path={LOGIN_ROUTE} element={<SignInPage />} />
        <Route path={REGISTER_ROUTE} element={<SignUpPage />} />
        <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPasswordPage />} />
        <Route path={OTP_VERIFICATION_ROUTE} element={<OtpVerificationPage />} />
        <Route path={SET_NEW_PASSWORD_ROUTE} element={<SetNewPasswordPage />} />
        <Route path={PRICING_ROUTE} element={<Pricing />} />
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        <Route path={PRIVACY_POLICY_ROUTE} element={<PrivacyPolicyPage />} />
        <Route path={SECURITY_POLICY_ROUTE} element={<SecurityPolicyPage />} />
        <Route path={TERMS_OF_SERVICE_ROUTE} element={<TermsOfServicePage />} />
        <Route path={PORTFOLIO_ROUTE} element={<PortfolioPage />} />


        {/* Protected Routes - Login Required */}
        <Route path={PAYMENT_SUCCESS_ROUTE} element={<ProtectedRoute element={<PaymentSuccessPage />} />} />
        <Route path={PAYMENT_FAILED_ROUTE} element={<ProtectedRoute element={<PaymentFailedPage />} />} />
        <Route path={ADD_TICKETS_ROUTE} element={<ProtectedRoute element={<AddTicketPage />} />} />
        <Route path={CHECKOUT_ROUTE} element={<ProtectedRoute element={<CheckoutPage />} />} />
        <Route path={PROFILE_SETTING_ROUTE} element={<ProtectedRoute element={<ProfileSettingsPage />} />} />
        <Route path={PREFERENCE_ROUTE} element={<ProtectedRoute element={<Preference />} />} />
        <Route path={PREFERENCE_ROUTE_NOID} element={<ProtectedRoute element={<Preference />} />} />
        <Route path={PREFERENCE_ROUTE_LEGACY} element={<ProtectedRoute element={<Preference />} />} />
        <Route path={PAYMENT_LOG_ROUTE} element={<ProtectedRoute element={<PaymentLogPage />} />} />
        <Route path={USER_DASHBOARD_ROUTE} element={<ProtectedRoute element={<UserDashboard />} />} />
        <Route path={SUPPORT_TICKETS_ROUTE} element={<ProtectedRoute element={<SupportTicketsPage />} />} />
        <Route path={WEBSITE_TYPE_ROUTE} element={<ProtectedRoute element={<WebsiteTypePage />} />} />
        <Route path={WEB_PREVIEW_ROUTE} element={<ProtectedRoute element={<WebPreview />} />} />
        <Route path={WEB_PREVIEW_EXTRA_ROUTE} element={<ProtectedRoute element={<WebPreviewExtra />} />} />
        <Route path={WEB_IFRAME_PREVIEW_ROUTE} element={<ProtectedRoute element={<WebiframePreview />} />} />
        <Route path={WEBSITE_HISTORY_ROUTE} element={<ProtectedRoute element={<WebsiteHistoryPage />} />} />
        <Route path={AUTH_CALLBACK} element={<LoginSuccess />} />
        <Route path={LOGIN_AS_USER} element={<ImpersonateLogin />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AppRoutes />
      </QueryProvider>
    </BrowserRouter>
  );
}