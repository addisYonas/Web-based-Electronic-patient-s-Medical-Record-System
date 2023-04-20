import Vue from 'vue'
import Vuex from 'vuex'

import allergies from './views/medical/allergy/AllergyState'
import clinicalNotes from './views/medical/clinicalNote/ClinicalNoteState'
import familyMedicals from './views/medical/familyMedical/FamilyMedicalState'
import otherHealths from './views/medical/otherHealth/OtherHealthState'
import pmhs from './views/medical/PMH/PMHState'
import socialHistories from './views/medical/socialHistory/SocialHistoryState'
import surgeries from './views/medical/surgery/SurgeryState'
import vaccinations from './views/medical/vaccination/VaccinationState'
import womenHealths from './views/medical/womenHealth/WomenHealthState'
import Immunology from './views/laboratory/immunology/ImmunologyState'
import OtherImmunology from './views/laboratory/otherImmunology/OtherImmunologyState'
import Haematology from './views/laboratory/haematology/HaematologyState'
import SerumChemistry from './views/laboratory/serumChemistry/SerumChemistryState'
import Urinalysis from './views/laboratory/urinalysis/UrinalysisState'
import MicroBiology from './views/laboratory/microBiology/MicroBiologyState'
import Parasitology from './views/laboratory/parasitology/ParasitologyState'
import Radiology from './views/laboratory/radiology/RadiologyState'
import OtherLabs from './views/laboratory/otherLabs/OtherLabsState'
import LabOrder from './views/labOrder/LabOrderState'

import drugs from './views/drug/drugs/DrugState'
import drugUtilities from './views/drug/utility/UtilityState'
import drugClassOfUtilities from './views/drug/classOfUtility/ClassOfUtilityState'

import prescriptions from './views/prescription/PrescriptionState'

import discussions from './views/forum/DiscussionState'
import comments from './views/forum/CommentState'

import startPage from './views/start/StartPageState'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        allergies,
        clinicalNotes,
        familyMedicals,
        otherHealths,
        pmhs,
        socialHistories,
        surgeries,
        vaccinations,
        womenHealths,
        Immunology,
        OtherImmunology,
        Haematology,
        SerumChemistry,
        Urinalysis,
        MicroBiology,
        Parasitology,
        Radiology,
        OtherLabs,
        drugs,
        drugUtilities,
        drugClassOfUtilities,
        LabOrder,
        prescriptions,
        discussions,
        comments,
        startPage
    }
})
