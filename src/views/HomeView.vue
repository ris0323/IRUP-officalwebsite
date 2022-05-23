<template>

  <div class="home">
    <div class="background">
      <div class="video-wrapper">
      <video playsinline autoplay muted loop>
        <source src="@/assets/video.mp4" type="video/webm">
      </video>
    </div>
   
    </div>
    
    <div class="container">
      <section class="section1">
        <div class="content">
          <h1 class="title">International Rural-Up Partnership</h1>
          <h6>Members of IRUP are expected to submit at least one case study report in English, on their areas of expertise or activities in relation to rural development, within 6 months of the successful approval of their application for IRUP membership.</h6>
          <!-- <div class="button">
            <a href="">join us</a>
          </div>   -->
        </div>        
      </section>

      <section class="what-is-irup">
        <WhatIsIRUP/>        
      </section>

      <section class="mission-section">
        <MissionComponent/>
      </section>

      <section class="news">
        <NewsComponent/>
      </section>

      <section class="section4">
        <CaseStudiesComponent />
      </section>
      
    </div>

  </div>
  
</template>

<script>
import WhatIsIRUP from '@/components/WhatIsIRUP.vue'
import MissionComponent from '@/components/MissionComponent.vue'
import NewsComponent from '@/components/NewsComponent.vue'
import CaseStudiesComponent from '@/components/CaseStudiesComponent.vue'

export default {
  components: {NewsComponent, CaseStudiesComponent, WhatIsIRUP, MissionComponent },
  name: 'HomeView',

  data() {
    return {
      // addButton: false,
    }
  },
}
</script>

<style scoped lang="scss">

  .home {
    font-family: 'Montserrat', sans-serif;
    color: #333;
    background: #F9F9FA;

    .background {
      position: relative;
      width: 100%;
      height: 100vh;
      background-image: url(../assets/field.jpg);
      background-size: cover;
      opacity: .9;

      video {
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;

        .video-wrapper {
          width: 100vw;
          height: 100vh;
          position: relative;
          overflow: hidden;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .section1 {
      text-align: center;
      color: #fff;
      position: absolute;      
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);

      .content {
        width: 62vw;
      }
      
      // .button {
      //   display: flex;
      //   justify-content: center;
      //   margin-top: 8vh;

      //   a {
      //     width: 150px;
      //     text-transform: uppercase;
      //     font-weight: 500;
      //     padding: .8rem 1rem;
      //     background: #fff;
      //     color: #66bb6a;
      //     text-decoration: none;
      //     border: 1px solid #66bb6a;
      //     border-radius: 5px;
      //     text-align: center;
      //     opacity: .8;
      //     transition: opacity .3s ease-in-out;

      //     &:hover {
      //       opacity: 1;
      //     }
      //   }
      // }

      // @media (max-width: 850px){
        
      //   .button {
      //     margin-top: 5vh;

      //     a {
      //       width: 120px;
      //       padding: .5rem 1rem;
      //     }
      //   }
      // }
    }

    .what-is-irup {
      display: flex;
      justify-content: center;
      margin-top: 20vh;
    }

    .mission-section {
      display: flex;
      justify-content: center;
      margin-top: 45vh;

      @media (max-width: 850px) {
        margin-top: 20vh;
    }
    }

    .news {

      @media (max-width: 850px) {
        margin-top: -20vh;
      }
    }

    .section4 {

      @media (max-width: 850px) {
        margin-top: -20vh;
      }
    }
  }

</style>