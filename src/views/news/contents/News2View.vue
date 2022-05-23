<template>

<main>
  <div class="satoyama">
    
    <h1 class="title text-uppercase">May 29 2019: Seminar on “Satoyama Landscapes and Seascapes from around the World for Sustainable Development”</h1>
    <h6 class="comment">Written by admin on December 4, 2019</h6>
    
    <div class="content">   
      <h6>A seminar will be held on Wednesday, 29 May in the Global Environment Outreach Centre (GEOC) office in the United Nations University Headquarters building in Tokyo, Japan. This seminar is organized under a IPSI Collaborative Activity, the GEF-Satoyama Project, by Conservation International Japan. Two subgrantees under the GEF-Satoyama Project – The Energy and Resources Institute (TERI) from India, and the Environmental Protection and Conservation Organization (EPCO) from Mauritius – will present their work, followed by discussion of relevant issues. The seminar will be in English and Japanese with interpretation. IPSI members and other readers in the Tokyo area are encouraged to attend and learn about different kinds of SEPLS-related practices around the world, as well as ongoing work related to IPSI. For more information and to register, please see the Conservation International Japan website here (in Japanese only).
      </h6>
    </div>

  </div>
</main>
  
</template>

<style lang="scss" scoped>

.satoyama {
  padding: 0 10vw 5vh 10vw;
  text-align: center;

  .comment {
    color: #999;
    margin-bottom: 1rem;
  }

  .content {

      margin: 5rem 6rem;
      display: flex;

      h6 {        
        text-align: justify;
        
      }

      @media (max-width: 850px) {
        display: block;

        h3 {
          margin-bottom: 1rem;
        }
      }
    }
  
  @media (max-width: 850px) {
    padding: 0 0 1vh 0;

    .content {
      display: block;

      h3 {
        margin-bottom: 1rem;
      }

      h6 {
        margin-right: 0;
        text-align: left;

        li {
          text-align: left;
        }
      }

      img {
        margin-top: 2rem;
        width: 60%;
      }
    }
  }
}

  
</style>