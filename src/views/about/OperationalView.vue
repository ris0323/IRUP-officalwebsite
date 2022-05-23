<template>

<main>
  <div class="operation">
    
    <h1 class="title text-uppercase">Operational Structure</h1>
  
    <img src="@/assets/operational.jpg" alt="">
    
    <div class="content">
      <div class="p1">
        <div class="left-p">
          <h3 class="text-uppercase">membership          
        </h3>
        <div class="circle"></div>
        </div>
        
        <h6>As an international platform open to organizations dealing with rural development or community-based development. IRUP has sought to foster synergies in the implementation of their respective activities, as well as other activities planned under proposed vision. Since its inception, an inclusive spirit has been fostered in recognition of the multi-sectoral and international dimensions of sustainable agriculture and rural development.</h6>
      </div>
      <div class="p2">
        <div class="left-p">
          <h3 class="text-uppercase">STEERING COMMITTEE          
        </h3>
        <div class="circle"></div>
        </div>
        
        <h6>The Steering Committee serves as the executive body acting on behalf of IRUP, and is responsible for governance and management functions.
          <br><br>
        The Steering Committee reviews and provides follows: 
        <br><br>
        <ul>
          <li>
            Guidance on the implementation of Rural-up activities, makes decisions on its own initiative and in response to requests from the assembly, reviews and approves membership applications.
          </li>
          <li>
            Recommendations for consideration by the assembly, gives guidance to the IRUP Secretariat.
          </li>
          <li>
            Assistance to catalyze partnership building and resource mobilization.
          </li>
        </ul>
        </h6>
      </div>
      <div class="p3">
        <div class="left-p">
          <h3 class="text-uppercase">Secretariat
        </h3>
        <div class="circle"></div>
        </div>
        
        <h6>The secretariat supports IRUP and its members in achieving its missions and objectives and is responsible for undertaking the preparation of the Rural-up Conference and other related meetings, facilitating communication within Rural-up and with other stakeholders, promoting Collaborative Activities, carrying out awareness-raising and public outreach activities, and assisting in partnership-building.</h6>
      </div>
    </div>
  </div>
</main>
  
</template>

<style lang="scss" scoped>

.operation {
  padding: 0 10vw 5vh 10vw;
  text-align: center;

  img {
    width: 80%;
  }

  .content {
    
    .p1, .p2, .p3 {
      margin: 5rem 6rem;
      display: flex;

      .left-p {
        position: relative;
        margin-right: 2rem;

        h3 {
          width: 180px;
          text-align: left;
          position: relative;
          z-index: 2;        
        }

      .circle {
        background: rgba(102, 187, 106, 0.5);
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        position: absolute;
        top: -10px;
        left: -20px;
        }
      .circle::before {
        content:"";
        position: absolute;
        border: solid 1px rgb(102, 187, 106);
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        top: -5%;
        left: -20%;
        }
      }


      h6 {        
        text-align: justify;
      }
    }
  }

  @media (max-width: 850px) {
    padding: 0 0 1vh 0;

    .content {

      .p1, .p2, .p3 {
        display: block;

        h3 {
          margin-bottom: 1rem;
        }

        h6 {        
          text-align: left;
        }
      }
    }
  }
}

  
</style>