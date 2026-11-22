import aiApi from "./aiaxios"
import { APIURL } from "./apiurl"
import api from "./axios"

export const postlogin = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_LOGIN, payload)
        return res?.data
    } catch (error: any) {
        console.log(error);
    }
}

export const postsignup = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_SIGNUP, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postotp = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_OTP, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postresentotp = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_RESEND_OTP, payload)
        return res?.data
    }
    catch (error) {
        console.log(error);
    }
}

export const postnewsletter = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_NEWSLETTER, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postcontactus = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_CONTACTUS, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postforgetpassword = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_FORGET_PASSWORD, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postsetnewpassword = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_SET_NEW_PASSWORD, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postprofileinfo = async (payload: any) => {
    try {
        const res = await api.put(APIURL.PUT_PROFILE_INFO, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postchangespassword = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_CHANGE_PASSWORD, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postsupportticket = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_SUPPORT_TICKET, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const postticketreply = async (payload: any) => {
    try {
        const res = await api.post(`${APIURL.POST_TICKET_REPLY}/${payload.ticketId}`, payload.formData)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const poscheckout = async (payload: any) => {
    try {
        const res = await api.post(APIURL.POST_CHECKOUT, payload)
        return res?.data
    } catch (error) {
          return error
    }
}

export const postPreference = async (payload: any) => {
    try {
        const res = await aiApi.post(APIURL.POST_PREFERENCE, payload)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const exportWebsiteApi = async (payload:any) => {
  try {
    const res = await aiApi.post(
      APIURL.POST_PUBLISH,
      payload
    );

    
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};


export const updateNotificationApi = async (payload: any) => {
  try {
    const res = await api.put(
      APIURL.PUT_PROFILE_NOTIFICATION,  
      payload
    );

    return res?.data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePreference = async (payload: any) => {
  try {
    const res = await api.put(
      `${APIURL.PUT_PREFERENCE}/${payload.preferenceId}`,
      payload.data
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePreferencePhoto = async (payload: any) => {
  try {
    
    const body = new FormData();
    if(payload?.type == "favicon"){
body.append("favicon", payload?.favicon);
    }else{
body.append("logo", payload?.logo);
    }
  
    const res = await api.post(
      `${APIURL.POST_PREFERENCE_ATTACH}/${payload.preferenceId}`,
      body
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const regeneratePreference = async (payload: any) => {
  try {
    const res = await aiApi.post(
      `${APIURL.POST_PREFERENCE_REGENERATE}/${payload.preferenceId}`,
      payload.data
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
