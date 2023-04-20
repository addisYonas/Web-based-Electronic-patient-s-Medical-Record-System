import AuthAPI from "./auth.api";
import RoleAPI from "./role.api";
import UserAccountAPI from "./user-account.api";
import PatientAPI from "./patient.api";

import ClinicalNoteAPI from "./medicalAPI/clinical-note.api";
import AllergyAPI from "./medicalAPI/allergy.api";
import FamilyMedicalAPI from "./medicalAPI/family-medical.api";
import OtherHealthAPI from "./medicalAPI/other-health.api";
import PersonalHealthAPI from "./medicalAPI/personal-health.api";
import SocialHistoryAPI from "./medicalAPI/social-history.api";
import SurgeryAPI from "./medicalAPI/surgery.api";
import VaccinationAPI from "./medicalAPI/vaccination.api";
import WomenHealthAPI from "./medicalAPI/women-health.api";

import HaematologyAPI from "./laboratoryAPI/haematology.api";
import ImmunologyAPI from "./laboratoryAPI/immunology.api";
import OtherImmunologyAPI from "./laboratoryAPI/other-immunology.api";
import SerumChemistryAPI from "./laboratoryAPI/serum-chemistry.api";
import UrinalysisAPI from "./laboratoryAPI/urinalysis.api";
import MicroBiologyAPI from "./laboratoryAPI/micro-biology.api";
import ParasitologyAPI from "./laboratoryAPI/parasitology.api";
import RadiologyAPI from "./laboratoryAPI/radiology.api";
import OtherLabAPI from "./laboratoryAPI/other-lab.api";
import LabOrderAPI from "./lab-order.api";

import PrescriptionAPI from "./prescription.api";
import DrugAPI from "./drug.api";
import DrugUtilityAPI from "./drug-utility.api";
import DrugClassAPI from "./drug-class.api";

import DiscussionAPI from "./discussion.api";
import CommentAPI from "./comment.api";

const API_ROOT = 'http://localhost:3000/api/';

export {
    API_ROOT,
    AuthAPI,
    RoleAPI,
    UserAccountAPI,
    PatientAPI,
    ClinicalNoteAPI,
    AllergyAPI,
    FamilyMedicalAPI,
    OtherHealthAPI,
    PersonalHealthAPI,
    SocialHistoryAPI,
    SurgeryAPI,
    VaccinationAPI,
    WomenHealthAPI,
    HaematologyAPI,
    ImmunologyAPI,
    OtherImmunologyAPI,
    SerumChemistryAPI,
    UrinalysisAPI,
    MicroBiologyAPI,
    ParasitologyAPI,
    RadiologyAPI,
    OtherLabAPI,
    DrugAPI,
    DrugUtilityAPI,
    DrugClassAPI,
    LabOrderAPI,
    PrescriptionAPI,
    CommentAPI,
    DiscussionAPI
};
