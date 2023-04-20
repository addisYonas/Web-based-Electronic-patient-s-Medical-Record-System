import Vue from 'vue'
import Router from 'vue-router'
import AccountsView from './views/userAccount/UserAccountList'
import Login from './views/account/Login'
import NotFoundPage from './components/NotFoundPage'
import LaboratoryView from './views/laboratory/ViewLaboratory'
import Haematology from './views/laboratory/haematology/Haematology'
import Immunology from './views/laboratory/immunology/Immunology'
import OtherImmunology from './views/laboratory/otherImmunology/OtherImmunology'
import SerumChemistry from './views/laboratory/serumChemistry/SerumChemistry'
import Urinalysis from './views/laboratory/urinalysis/Urinalysis'
import MicroBiology from './views/laboratory/microBiology/MicroBiology'
import Parasitology from "./views/laboratory/parasitology/Parasitology";
import Radiology from "./views/laboratory/radiology/Radiology";
import OtherLabs from "./views/laboratory/otherLabs/OtherLabs";

import MedicalView from './views/medical/ViewMedical'
import AllergyView from './views/medical/allergy/AllergyList'
import ClinicalNoteView from './views/medical/clinicalNote/ClinicalNoteList'
import FamilyMedicalView from './views/medical/familyMedical/FamilyMedicalList'
import OtherHealthView from './views/medical/otherHealth/OtherHealthList'
import PMHView from './views/medical/PMH/PMHList'
import SocialHistoryView from './views/medical/socialHistory/SocialHistoryList'
import SurgeryView from './views/medical/surgery/SurgeryList'
import VaccinationView from './views/medical/vaccination/VaccinationList'
import WomenHealthView from './views/medical/womenHealth/WomenHealthList'
import LabOrder from "./views/labOrder/LabOrder";

import PrescriptionView from './views/prescription/ViewPrescription'

import ForumView from './views/forum/ViewForum'
import DiscussionView from './views/forum/DiscussionView'
import DoctorView from './views/forum/DoctorView'
import StudentView from './views/forum/StudentView'

import DrugView from './views/drug/ViewDrug'
import DrugList from './views/drug/drugs/DrugList'
import DrugUtility from './views/drug/utility/UtilityList'
import DrugClass from './views/drug/classOfUtility/ClassOfUtilityList'

import ProfileView from './views/account/Profile'

import Home from './views/home/home'
import StartPage from './views/start/StartPage'

import {AccountService} from './services';
import {PatientService} from './services';

import PatientProfile from "./views/patient/PatientProfile";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: '/accounts',
            name: 'accounts',
            component: AccountsView
        },
        {
            path: '/medical',
            name: 'medical',
            component: MedicalView,
            children: [
                {
                    path: 'allergy',
                    component: AllergyView
                },
                {
                    path: 'clinical-note',
                    component: ClinicalNoteView,
                    name: 'medicalClinicalNote'
                },
                {
                    path: 'family-medical',
                    component: FamilyMedicalView
                },
                {
                    path: 'other-health',
                    component: OtherHealthView
                },
                {
                    path: 'pmh',
                    component: PMHView
                },
                {
                    path: 'social-history',
                    component: SocialHistoryView
                },
                {
                    path: 'surgery',
                    component: SurgeryView
                },
                {
                    path: 'vaccination',
                    component: VaccinationView
                },
                {
                    path: 'women-health',
                    component: WomenHealthView
                },
            ]
        },
        {
            path: '/medicine',
            name: 'medicine',
            component: PrescriptionView
        },
        {
            path: '/forum',
            name: 'forum',
            component: ForumView,
            children: [
                {
                    path: `discussion/:discussionId`,
                    component: DiscussionView,
                    children: [
                        {
                            path: `doctor`,
                            component: DoctorView
                        },
                        {
                            path: `student`,
                            component: StudentView
                        }
                    ]
                },
            ]
        },
        {
            path: '/drug',
            name: 'drug',
            component: DrugView,
            children: [
                {
                    path: 'drugs',
                    component: DrugList
                },
                {
                    path: 'utilities',
                    component: DrugUtility
                },
                {
                    path: 'class-of-utility',
                    component: DrugClass
                }
            ]
        },

        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/patient',
            name: 'patient',
            component: PatientProfile
        },
        {
            path: '/login',
            meta: {
                public: true,
            },
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            meta: {
                public: true,
            },
            name: 'home',
            component: Home
        },
        {
            path: '/start',
            name: 'start',
            component: StartPage
        },
        {
            path: "*",
            meta: {
                public: true,
            },
            name: "not-found",
            component: NotFoundPage
        },
        {
            path: "/laboratories",
            name: "laboratories",
            component: LaboratoryView,
            redirect: '/laboratories/lab-orders',
            children: [
                {
                    path: "/laboratories/haematology",
                    name: "haematology",
                    component: Haematology
                },
                {
                    path: "/laboratories/immunology",
                    name: "immunology",
                    component: Immunology
                },
                {
                    path: "/laboratories/serum-chemistry",
                    name: "serum-chemistry",
                    component: SerumChemistry
                },
                {
                    path: "/laboratories/parasitology",
                    name: "parasitology",
                    component: Parasitology
                },
                {
                    path: "/laboratories/other-immunology",
                    name: "other-immunology",
                    component: OtherImmunology
                },
                {
                    path: "/laboratories/urinalysis",
                    name: "urinalysis",
                    component: Urinalysis
                },
                {
                    path: "/laboratories/micro-biology",
                    name: "micro-biology",
                    component: MicroBiology
                },
                {
                    path: "/laboratories/radiology",
                    name: "radiology",
                    component: Radiology
                },
                {
                    path: "/laboratories/other-labs",
                    name: "other-labs",
                    component: OtherLabs
                },
                {
                    path: "/laboratories/lab-orders",
                    name: "lab-orders",
                    component: LabOrder
                },
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const authenticated = AccountService.isAuthenticated();
    const isThereAnyPatient = PatientService.isPatientThere();
    const publicRoutes = ["login", "home"];

    if (!authenticated && !publicRoutes.includes(to.name) && !isThereAnyPatient) {
        next({name: "home"});
    } else if (authenticated && to.name === "login") {
        next({path: "start",});
    } else {
        next();
    }
});

export default router;

