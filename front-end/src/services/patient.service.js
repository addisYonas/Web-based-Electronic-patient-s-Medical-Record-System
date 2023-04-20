import { PatientAPI } from "@/api";

export const GET_INFO_KEY = "patient key";
export const PATIENT_ID = "patient id";
export const PATIENT_PROFILE = "patient profile";

const PatientService = {
    getInfo(key) {
        return PatientAPI.getByKey(key)
            .then(res => {
                if (res) {
                    localStorage.setItem(PATIENT_ID, res.id);
                    localStorage.setItem(GET_INFO_KEY, key);
                    localStorage.setItem(PATIENT_PROFILE, JSON.stringify(res));
                    return Promise.resolve(res);
                }
                return Promise.reject(new Error("Unauthorized"));
            })
            .catch(err => {
                throw err;
            });
    },
    setPatientId(id, info){
        localStorage.setItem(PATIENT_ID, id);
        localStorage.setItem(PATIENT_PROFILE, JSON.stringify(info));
    },
    removePatientInfo(){
        if(localStorage.getItem(GET_INFO_KEY) !== null) {
            localStorage.removeItem(GET_INFO_KEY);
        } if(localStorage.getItem(PATIENT_ID) !== null){
            localStorage.removeItem(PATIENT_ID);
        } if(localStorage.getItem(PATIENT_PROFILE) !== null) {
            localStorage.removeItem(PATIENT_PROFILE);
        }
    },

    getPatientId: () => localStorage.getItem(PATIENT_ID),
    getPatientKey: () => localStorage.getItem(GET_INFO_KEY),
    getPatientProfile: () => JSON.parse(localStorage.getItem(PATIENT_PROFILE)),


    isPatientThere: () => {
        const thePatientId = localStorage.getItem(PATIENT_ID);
        const key = localStorage.getItem(GET_INFO_KEY);
        const patientProfile = localStorage.getItem(PATIENT_PROFILE);
        return thePatientId !== null && key !== null && patientProfile !== null;
    },
    isSelectedPatientThere: () => {
        const thePatientId = localStorage.getItem(PATIENT_ID);
        return thePatientId !== null;
    }
};

export default PatientService;
