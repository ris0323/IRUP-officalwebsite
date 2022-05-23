<template>

<main>
  <div class="case">
    
    <h1 class="title text-uppercase">Gonglaoping Community, Taichung, Taiwan</h1>
    <h6 class="date">November 2019</h6>
    <img src="@/assets/Case_Studies_3.png" alt="">
    
    <div class="content">   
      <h5 class="mb-4">Gonglaoping Community, Fengyuan Dist., Taichung</h5>   
        <ul>
        <li><h6>Gonglaoping Community is located a flat terrace east to Fengyuan, Taichung, near the Han River’ s source.</h6></li>
        <li><h6>Total channel length of Han river: 9.6 km.</h6></li>
        <li><h6>Total watershed area: 67.8 km2.</h6></li>
        <li><h6>The whole Community is located in Han River’ s watershed. The upstream is in mountainous areas; the midstream flows through Fengyuan Agricultural Plain Area; the downstream goes through Taichung City.</h6></li>
      </ul>   

      <img src="@/assets/news.png" alt="">
      <img src="@/assets/site.png" alt="">

      <h5 class="mb-4">Site Issue Analysis<br><br>(數字對應藍色小圓圈)</h5>
      <h6>
        <ol>
        <li><h6>Insufficient water storage ; Lacking of comprehensive water resources planning.</h6></li>
        <li><h6>Silting-up river channel –Requiring to dredge and re-arrange pipeline.</h6></li>
        <li><h6>In-disrepair infra structure-Reducing the willingness of usage for farmers and its functions.</h6></li>
        <li><h6>Low species abundances and richness caused by human activity disturbances.</h6></li>
      </ol>
      </h6>
      <img src="@/assets/site-issue.png" alt="">

      <h5 class="mb-4">Insufficient water storage ; Lacking of comprehensive water resources planning</h5>
      <h6 class="text-center">Uneven rainfall pattern (rainy season: May to Sept.). Distinct high flow/dry periods.</h6>

      <div class="compare-pic">
        <div>
          <img src="@/assets/dry-period.png" alt="">
          <p>Dry period</p>
        </div>

        <div>
          <img src="@/assets/high-flow-period.png" alt="">
          <p>High flow period</p>
        </div>
      </div>

      <h5 class="mb-4">Water detention pond is silted up, leading to insufficient water storage.</h5>

      <div class="compare-pic">
        <div>
          <img src="@/assets/weed-grows-around-the-pond.png" alt="">
          <p>Weed grows around the pond</p>
        </div>

        <div>
          <img src="@/assets/eutrophication.png" alt="">
          <p>Eutrophication</p>
        </div>
      </div>

      <h5 class="mb-4">Lacking of proper water resources management( e.g., farmers pumping water freely).</h5>

      <div class="compare-pic">
        <div>
          <img src="@/assets/pumping-water-freely.png" alt="">
          <p>Pumping water freely</p>
        </div>

        <div>
          <img src="@/assets/water-pump.png" alt="">
          <p>Water pump</p>
        </div>
      </div>

      <h5 class="mb-4">Actions and Implementation</h5>
      <img src="@/assets/actions-and-implementation.png" alt="">
      <h6>
        <ol>
          <li>Replacing farming with afforestation on purpose of soil and water conservation.</li>
          <li>Application of traditional, dry masonry method for slope management.</li>
          <li>Integration of traditional knowledge and technology-Smart Agricultural Water Management System.</li>
          <li>Practicing eco-friendly farming, maintaining water quality & protecting wildlife habitats.</li>
          <li>Growing organic tea , creating win-win strategy for both economics and ecology.</li>
          <li>Developing agricultural tourism and ecotourism.</li>
          <li>Based on existing ecosystem services, improving residents' life quality & wellbeing.</li>
        </ol>
      </h6>

      <img src="@/assets/application.png" alt="">
      <p>Application of traditional, dry masonry method for slope management.</p>

      <img src="@/assets/Case_Studies_3.png" alt="">
      <p>Integration of traditional knowledge and technology - Smart Agricultural Water Management System.</p>

      <img src="@/assets/organic.png" alt="">
      <p>Growing organic tea , creating win-win strategy for both economics and ecology</p>
      <!-- <h6 class="p-4">
        <li>More fruit by-product developed</li>
        <li>Better and stronger citrus flavor</li>
        <li>Good for health (e.g., containing Vitamin C, Lutein, Folic acid, etc.)</li>
      </h6> -->


      <img src="@/assets/tea.png" alt="">
      <p>Organic persimmon leave tea</p>

      <h5 class="mb-4">Based on existing ecosystem services, improving residents' life quality & wellbeing</h5>
      <h6>
        Gonglaping Community builds a healthy production environment and enhances system services of water resources, ecological habitats, landscape beauty and culture together, leading to a healthy landscape environment where living quality, production and ecology coexist.
      </h6>

    </div>

  </div>
</main>
  
</template>

<style lang="scss" scoped>

.case {
  padding: 0 10vw 5vh 10vw;
  text-align: center;

  .date {
    color: #999;
    margin-bottom: 1rem;
  }

  img {
    width: 70%;
  }

  .content {
    margin: 0 6rem;
    position: relative;
    z-index: 1;

    h5 {
      margin: 5rem;
    }

      h6 {        
        text-align: justify;
        margin-right: 3rem;  
      }

      img {
        width: 70%;
        margin: 2rem 0 1rem 0;
      }

      .compare-pic {
        display: flex;
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
      }

      img {
        margin-top: 2rem;
        width: 60%;
      }
    }
  }

  @media (max-width: 850px) {
    padding: 0 0 1vh 0;

    .content {
      h6 {
        text-align: left;

        li {
          text-align: left;
        }
      }
    }
  }
}

  
</style>