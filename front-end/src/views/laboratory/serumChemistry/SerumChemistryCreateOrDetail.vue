<template>
    <v-card>
        <v-toolbar height="40" flat color="white" dense>
            <span class="subheading" v-if="inputEnabled">Create Serum Chemistry</span>
            <span class="subheading" v-else>Serum Chemistry Results</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs4>
                        <p class="mb-0 font-weight-bold pl-2">LFT - Liver Function</p>

                        <template v-if="scResult.sc1 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span>Albumin</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field
                                            name="oldPassword"
                                            class="font-weight-bold"
                                            autofocus
                                            :disabled="!inputEnabled"
                                            required
                                            v-model="scResult.sc1"
                                            outline
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>g/L</span>
                                </v-flex>
                            </v-layout>
                        </template>


                        <template v-if="scResult.sc2 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span>Total Protein</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc2"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>g/L</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc3 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> ALP (Alkaline Phosphate) </span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field
                                            name="oldPassword"
                                            class="font-weight-bold"
                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc3"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>U/L</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc4 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> ALT (Alanine Transferase)</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc4"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>U/L</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc5 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span>AST (Aspartate Transferase)</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field
                                            name="oldPassword"
                                            class="font-weight-bold"
                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc5"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>U/L</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc6 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> GGT (Gama-Glutamyl Transpeptidase)</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc6"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>U/L</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc7 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> Dir Bili (Direct Bilirubin)</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc7"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>Mg/dL</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc8 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> T Bili (Total - Bilirubin)</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc8"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>Mg/dL</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc9 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> Indir Bili (Indirect Bilirubin) </span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc9"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>Mg/dL</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc10 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> LDH (Lactic Acid Dehydrogenase)</span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc10"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>U/L</span>
                                </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="scResult.sc11 !== undefined">
                            <v-layout row small>
                                <v-flex xs7 class="text-xs-right">
                                    <span> Lactate </span>
                                </v-flex>
                                <v-flex xs3 class="text-xs-right pr-2">
                                    <v-text-field

                                            name="oldPassword"
                                            class="font-weight-bold"

                                            :disabled="!inputEnabled"
                                            required
                                            outline
                                            v-model="scResult.sc11"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <span>mmol/L</span>
                                </v-flex>
                            </v-layout>
                        </template>
                    </v-flex>

                    <v-flex xs8>
                        <v-layout wrap>
                            <v-flex xs6>
                                <p class="mb-0 font-weight-bold pl-2">Lytes - Serum Electrolytes</p>

                                <template v-if="scResult.sc12 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> Na+ (Sodium) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc12"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc13 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> K+ (Potassium) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc13"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc14 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> Cl (Chloride) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc14"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc15 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> CO2 (Bicarbonate) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc15"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc16 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> Ca (Calcium) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc16"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>


                                <v-layout wrap>
                                    <v-flex xs12>
                                        <p class="mb-0 font-weight-bold pl-2">KFT - Kidney Function</p>

                                        <template v-if="scResult.sc17 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> BUN (Blood Urea Nitrogen) </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc17"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>Mg/dL</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>

                                        <template v-if="scResult.sc18 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> Creatinine </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc18"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>Mg/dL</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>


                                        <template v-if="scResult.sc19 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> Creatinine Clearance</span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field
                                                            name="oldPassword"
                                                            class="font-weight-bold"
                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc19"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>ml/min</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>

                                    </v-flex>
                                </v-layout>

                            </v-flex>
                            <v-flex xs6>
                                <p class="mb-0 font-weight-bold pl-2">Cardiac Screen</p>

                                <template v-if="scResult.sc20 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> FBS (Fasting Blood Sugar) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field
                                                    name="oldPassword"
                                                    class="font-weight-bold"
                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc20"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc21 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> RBS (Random Blood Sugar) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc21"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc22 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> Chol (Cholesterol) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc22"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>


                                <template v-if="scResult.sc23 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> HDL (High Density Lipoprotein) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc23"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>


                                <template v-if="scResult.sc24 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> LDL (Low Density Lipoprotein) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc24"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc25 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> Trig (Triglycerides) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc25"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>Mg/dL</span>
                                        </v-flex>
                                    </v-layout>
                                </template>


                                <template v-if="scResult.sc26 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> Insulin </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc26"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>mcU/L</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc27 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> CPK (Creatinie Phosphokinase) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc27"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>U/L</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                                <template v-if="scResult.sc28 !== undefined">
                                    <v-layout row small>
                                        <v-flex xs7 class="text-xs-right">
                                            <span> CPK MB (Myocardial Band) </span>
                                        </v-flex>
                                        <v-flex xs3 class="text-xs-right pr-2">
                                            <v-text-field

                                                    name="oldPassword"
                                                    class="font-weight-bold"

                                                    :disabled="!inputEnabled"
                                                    required
                                                    outline
                                                    v-model="scResult.sc28"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 class="text-xs-left">
                                            <span>U/L</span>
                                        </v-flex>
                                    </v-layout>
                                </template>

                            </v-flex>
                        </v-layout>


                        <v-layout wrap>
                            <p class="mb-0 font-weight-bold pl-2">Pancreatic and Other</p>
                            <v-flex xs12>
                                <v-layout wrap>
                                    <v-flex xs4>
                                        <template v-if="scResult.sc29 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> Lipase </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc29"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>U/L</span>
                                                </v-flex>
                                            </v-layout>

                                        </template>

                                        <template v-if="scResult.sc30 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> Amylase </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc30"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>U/L</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>
                                    </v-flex>


                                    <v-flex xs4>
                                        <template v-if="scResult.sc31 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> Acid Phosphatase </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc31"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>U/L</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>

                                        <template v-if="scResult.sc32 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> TIBC (Total Iron Binding Capacity) </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc32"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>U/L</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>
                                    </v-flex>

                                    <v-flex xs4>
                                        <template v-if="scResult.sc33 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> Uric Acid </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc33"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>Mg/dL</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>

                                        <template v-if="scResult.sc34 !== undefined">
                                            <v-layout row small>
                                                <v-flex xs7 class="text-xs-right">
                                                    <span> Blood Alchohol </span>
                                                </v-flex>
                                                <v-flex xs3 class="text-xs-right pr-2">
                                                    <v-text-field

                                                            name="oldPassword"
                                                            class="font-weight-bold"

                                                            :disabled="!inputEnabled"
                                                            required
                                                            outline
                                                            v-model="scResult.sc34"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2 class="text-xs-left">
                                                    <span>U/L</span>
                                                </v-flex>
                                            </v-layout>
                                        </template>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white" dense>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat v-if="inputEnabled" @click="saveScResult(scResult)">Save</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>

    import {AccountService} from "@/services"
    import {PatientService} from "@/services"
    import { SerumChemistryAPI } from '@/api';
    import {mapGetters, mapMutations} from 'vuex'
    import {eventBus} from "../../../main";

    export default {
        name: "HaematologyResult",
        props: {
            modalName: {
                type: String,
                default: ""
            },
            inputEnabled: {
                type: Boolean,
                default: true
            },
            editCallBack: {
                type: Function
            },
            orderedById: {
                type: String
            },
            scResult: {
                type: Object,
                default: () => {
                    return {
                        sc1: "",
                        sc2: "",
                        sc3: "",
                        sc4: "",
                        sc5: "",
                        sc6: "",
                        sc7: "",
                        sc8: "",
                        sc9: "",
                        sc10: "",
                        sc11: "",
                        sc12: "",
                        sc13: "",
                        sc14: "",
                        sc15: "",
                        sc16: "",
                        sc17: "",
                        sc18: "",
                        sc19: "",
                        sc20: "",
                        sc21: "",
                        sc22: "",
                        sc23: "",
                        sc24: "",
                        sc25: "",
                        sc26: "",
                        sc27: "",
                        sc28: "",
                        sc29: "",
                        sc30: "",
                        sc31: "",
                        sc32: "",
                        sc33: "",
                        sc34: "",
                        status: "active",
                        orderingDate: null,
                        fillingDate: null,
                        patientId: "",
                        filledBy: "",
                        orderedBy: ""
                    }
                }
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName);
            },
            saveScResult(scResult){
                scResult.filledById = AccountService.getProfile().id;
                scResult.orderedById = this.orderedById;
                scResult.status = "Active";
                scResult.patientId = PatientService.getPatientId();

                SerumChemistryAPI.create(scResult).then((res) => {
                    this.addSerumChemistry(res);
                    eventBus.$emit('openSb', { message: 'Serum Chemistry result successfully created!', color: "primary" });
                    if(Object.keys(this.serumChemistryFilter).length !== 0) {
                        this.editCallBack();
                    }
                    this.$modal.hide(this.modalName);
                });
            },
            ...mapMutations(['addSerumChemistry'])
        },
        computed: mapGetters(['serumChemistryFilter']),
        created() {
            if(Object.keys(this.serumChemistryFilter).length !== 0) {
                for(let key in this.scResult) {
                    if(!this.serumChemistryFilter.hasOwnProperty(key)) {
                        delete this.scResult[key];
                    }
                }

            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 0px !important;
    }

    .v-text-field {
        margin: 0px !important;
        padding: 0px !important;
        height: 20px !important;
    }

     .v-text-field--outline input {
        margin: 2px !important;
        font-size: 14px !important;
    }

     .v-input__slot {
        margin: 0px !important;
        padding: 0px !important;
        height: 20px !important;
        min-height: 26px !important;
    }
    .title{
        font-family: "Poppins", sans-serif !important;
    }
</style>
