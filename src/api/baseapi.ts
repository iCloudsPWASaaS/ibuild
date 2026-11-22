
import { APIURL } from "./apiurl"
import api from "./axios"

const token = localStorage.getItem('accessToken')

export const getblog = async () => {
    const res = await api.get(APIURL.GET_BLOG)
    return res.data
}

export const getblogdetails = async (id: string) => {
    const res = await api.get(`${APIURL.GET_BLOG_DETAILS}/${id}`);
    return res.data
}

export const getherodata = async () => {
    const res = await api.get(APIURL.GET_HERO)
    return res?.data?.data
}

export const gettaglinedata = async () => {
    const res = await api.get(APIURL.GET_TAGLINE)
    return res?.data?.data
}

export const getportfoliodata = async () => {
    const res = await api.get(APIURL.GET_PORTFOLIO_SECTION)

    return res?.data
}

export const getfeaturesectiondata = async () => {
    const res = await api.get(APIURL.GET_FEATURE_SECTION)
    return res?.data
}

export const gethowitworksectiondata = async () => {
    const res = await api.get(APIURL.GET_HOW_IT_WORK_SECTION)
    return res?.data
}

export const getpricingdata = async (userId?: string) => {
    const res = await api.get(APIURL.GET_PRICING, {
        params: userId ? { userId } : {}
    })
    return res?.data
}

export const getreviewdata = async () => {
    const res = await api.get(APIURL.GET_REVIEWS)
    return res?.data
}

export const getfaqdata = async () => {
    const res = await api.get(APIURL.GET_FAQ)
    return res?.data
}

export const getcategory = async () => {
    const res = await api.get(APIURL.GET_CATEGORY)
    return res?.data
}

export const getctadata = async () => {
    const res = await api.get(APIURL.GET_CTA)
    return res?.data
}

export const getgeneraldata = async () => {
    const res = await api.get(APIURL.GET_GENERAL_DATA)
    return res?.data?.data
}

export const getsignupuidata = async () => {
    const res = await api.get(APIURL.GET_SIGNUP_UI_DATA)
    return res?.data?.data
}

export const getloginuidata = async () => {
    const res = await api.get(APIURL.GET_LOGIN_UI_DATA)
    return res?.data?.data
}

//  after sign in login 

export const getuserdata = async (tokens="") => {
    const tokencheck = tokens != "" ?tokens : token
  if(tokencheck){  
    const res = await api.get(APIURL.GET_USER_DATA);
    return res?.data?.data
}else{
    return null

}
}

export const getsupportticket = async (params: {
    page?: number | string;
    limit?: number | string;
    search?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
}) => {
    const { page, limit, search, sortField, sortOrder, status } = params;

    // Create query string
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (limit) queryParams.append('limit', limit.toString());
    if (search) queryParams.append('search', search);
    if (sortField) queryParams.append('sortField', sortField);
    if (sortOrder) queryParams.append('sortOrder', sortOrder);

    // Only append status if it is not 'all'
    if (status && status !== 'all') queryParams.append('status', status);

    // Make the call with the query string
    const res = await api.get(`${APIURL.GET_SUPPORT_TICKET}?${queryParams.toString()}`);
    return res?.data;
}

export const getticketresponse = async (id: string | number) => {
    const res = await api.get(`${APIURL.GET_TICKET_RESPONSE}/${id}`);
    return res?.data?.data
}

export const getpaymentgateways = async () => {
    const res = await api.get(APIURL.GET_PAYMENT_GATEWAYS)
    return res?.data?.data
}

export const getpaymentlog = async ({ page, limit, status = "" ,search = ""}: { page: number; limit: number,status?: string; search?: string }) => {
     const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(status && { status }),
    ...(search && { search }),
  });

    const res = await api.get(`${APIURL.GET_PAYMENTLOG}?${queryParams.toString()}`);
    return res?.data?.data;
}

export const getuserdashboard = async () => {
    const url = `${APIURL.GET_USERDASHBOARD}`;
    const res = await api.get(url);
    return res?.data?.data;
}

export const getuserwebsiteanalytics = async (filter = "yearly", start?: string, end?: string) => {
    let url = `${APIURL.GET_USER_WEBSITE_ANALYTIC}?filter=${filter}`;
    if (filter === "custom" && start && end) {
        url += `&start=${start}&end=${end}`;
    }

    const res = await api.get(url);
    return res?.data?.data;
}

export const getcountry = async () => {
    const res = await api.get(APIURL.GET_COUNTRY)
    return res?.data
}

export const getstate = async (countryId: string) => {
    const res = await api.get(`${APIURL.GET_STATE}/${countryId}`)
    return res?.data
}
// web process api

export const getwebsitetypes = async () => {
    const res = await api.get(APIURL.GET_WEBSITE_TYPES)
    return res?.data?.data
}

export const getseodata = async () => {
    const res = await api.get(APIURL.GET_SEO)
    return res?.data?.data
}


export const pagedetails = async (params: string | number) => {
    const res = await api.get(`${APIURL.GET_PAGE_DETAILS}/${params}`)
    return res?.data
}

export const getwebhistory = async (limit=0) => {
    let url = `${APIURL.GET_WEB_HISTORY}`;

    if (limit != 0) {
        url += `?limit=${limit}`;
    }
  
    const res = await api.get(url)
    return res?.data
}

export const getwebdetails = async (id="") => {
    const res = await api.get(APIURL.GET_WEB_HISTORY+'/'+id)
    return res?.data
}

export const deletewebhistory = async (preferenceId="") => {
    const res = await api.delete(APIURL.DELETE_WEB_HISTORY+'/'+preferenceId)
    return res?.data
}

export const getpagedata = async (limit=0) => {
    let url = `${APIURL.GET_PAGES}`;

    if (limit != 0) {
        url += `?limit=${limit}`;
    }
  
    const res = await api.get(url)
    return res?.data
}

export const getBraintreeToken = async () => {
    const res = await api.get(APIURL.GET_BRANTREE_TOKEN)
    return res?.data
}

//extra
export const getappstatus = async (preferenceId: string) => {
    const res = await api.get(`${APIURL.APP_STATUS_PATH}/${preferenceId}`)
    return res?.data
}

// The app's effective env (engine defaults + business-type env + the user's
// overrides) plus the overrides on their own.
export const getappenv = async (preferenceId: string) => {
    const res = await api.get(`${APIURL.APP_ENV_PATH}/${preferenceId}`)
    return res?.data
}

// Saves only the user's per-app overrides; they win over the engine defaults.
export const updateappenv = async (preferenceId: string, env: Record<string, string>) => {
    const res = await api.put(`${APIURL.APP_ENV_PATH}/${preferenceId}`, { env })
    return res?.data
}

// The app's saved AGENTS.md / opencode.json / how-to-use content.
export const getappfiles = async (preferenceId: string) => {
    const res = await api.get(`${APIURL.APP_FILES_PATH}/${preferenceId}`)
    return res?.data
}

// Stores the user's AGENTS.md / opencode.json / how-to-use content for the app.
export const updateappfiles = async (
    preferenceId: string,
    payload: {
        agentsMd?: string
        opencodeJson?: string
        instructions?: string
    }
) => {
    const res = await api.put(`${APIURL.APP_FILES_PATH}/${preferenceId}`, payload)
    return res?.data
}
