<template>
  <v-app id="home">
    <modals-container />
    <template>
      <v-parallax
        :src="require('../../assets/healthcare-data.jpg')"
        max-height="400"
      >
        <v-toolbar class="px-5 navbar">
          <v-toolbar-side-icon class="white--text">
            <span class=" black--text display-1 font-weight-regular">
              <v-img
                :src="require('../../assets/tenaBlue.png')"
                alt="tenamahder"
                width="160"
                height="80"
              />
            </span>
          </v-toolbar-side-icon>

          <v-spacer></v-spacer>

          <v-divider class="mx-3" inset vertical></v-divider>
          <v-btn
            color="#26C6DA"
            round
            depressed
            class="font-weight-black text-capitalize"
            small
            dark
            @click="GetInfo()"
          >
            Get Info
            <v-icon class="mr-1">material-icons-outlined</v-icon>
          </v-btn>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-btn
            round
            depressed
            color="primary"
            class="font-weight-black text-capitalize"
            small
            dark
            router
            :to="'/login'"
          >
            LogIn
          </v-btn>
        </v-toolbar>

        <v-layout column align-start justify-center class="white--text">
          <div class="mx-5 black--text">
            <h1 class="mb-2 font-weight-bold display-1">
              The place where all of your
            </h1>
            <h1 class="mb-2 font-weight-bold display-1">healthcare data is</h1>
            <h1 class="mb-2 font-weight-black display-1">
              <b>S</b>tored. <b>P</b>rotected. <b>S</b>hared.
            </h1>
          </div>
        </v-layout>
      </v-parallax>
    </template>

    <v-content>
      <section class="px-5 pb-3 pt-5" style="background-color: white">
        <v-layout
          row
          wrap
          height="85"
          style="padding-left: 0 !important; background: white"
          flat
        >
          <v-flex class="black&#45;&#45;text">
            <span class="headline font-weight-bold">TenaMahder</span>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex class="footer-social">
            <ul class="social-icons">
              <li>
                <a href="https://www.facebook.com/EthiopiaFMoH/" target="_blank"
                  ><i
                    ><img
                      src="https://img.icons8.com/material-rounded/24/000000/facebook.png"/></i
                ></a>
              </li>
              <li>
                <a href="#"
                  ><i
                    ><img
                      src="https://img.icons8.com/material/24/000000/telegram-app.png"/></i
                ></a>
              </li>
              <li>
                <a href="#"
                  ><i
                    ><img
                      src="https://img.icons8.com/material/24/000000/linkedin.png"/></i
                ></a>
              </li>
              <li>
                <a href="#"
                  ><i
                    ><img
                      src="https://img.icons8.com/material/24/000000/twitter.png"/></i
                ></a>
              </li>
              <li>
                <a href="#"
                  ><i
                    ><img
                      src="https://img.icons8.com/material/24/000000/youtube-play.png"/></i
                ></a>
              </li>
            </ul>
          </v-flex>
        </v-layout>
      </section>

      <section class="px-5 py-4" style="background-color: white">
        <v-layout row wrap> </v-layout>
        <v-divider />
        <v-layout row>
          <span>Copyright TenaMahder 2021, All right reserved</span>
          <v-spacer />
          <!-- <a href="#">Back to top<i class="fas fa-angle-up"></i></a> -->
        </v-layout>
      </section>
    </v-content>
  </v-app>
</template>

<script>
import GetInfo from "../patient/GetInfo";
import { PatientService } from "@/services";

export default {
  name: "home",
  data() {
    return {
      isThereAPatient: PatientService.isPatientThere,
    };
  },
  methods: {
    GetInfo() {
      this.$modal.show(
        GetInfo,
        {
          modalName: "get-info-modal",
          // adjustIsTherePatient: this.adjustIsTherePatient
        },
        {
          name: "get-info-modal",
          height: "auto",
          width: 500,
          scrollable: true,
        }
      );
    },
  },
};
</script>

<style scoped>
#home {
  height: auto;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;

  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.navbar {
  background-color: #fafafa;
  height: 75px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.display-1 {
  font-family: "Lato" !important;
  font-weight: 200 !important;
}

.headline {
  font-family: "Lato" !important;
  font-weight: bolder !important;
}

.title {
  font-family: "Lato" !important;
  font-weight: bold !important;
}

/*-----------------------------------*/

.footer-social {
  text-align: right;
}

.footer-social .social-icons {
  padding: 0;
  margin: 12px 0 0;
  list-style: none;
  display: inline-block;
}

.footer-social .social-icons li {
  display: inline-block;
  padding-left: 25px;
}

.footer-social .social-icons li a {
  color: rgba(111, 116, 132, 0.5);
}

.footer-social .social-icons li a:hover {
  color: #6f7484;
}

.footer-social .social-icons li:first-child {
  padding-left: 0;
}

/*------------------------------------*/

.footer-widget-inner ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer-widget-inner ul li + li {
  margin-top: 10px;
}

.footer-widget-inner ul li a {
  text-decoration: none !important;
}

.footer-widget-inner ul li a {
  color: #6f7484;
}

.footer-widget-inner ul li a:hover {
  color: #38a1f3;
}
</style>
