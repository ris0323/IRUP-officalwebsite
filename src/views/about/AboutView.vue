<template>
<main>
  <div class="about">
    <div class="content">
      <h2 class="title text-uppercase">about us</h2>
      <h6>IRUP is a partnership made up of member organizations dedicated to working together to pursue human society in harmony with nature.</h6>
      <h6>In the emerging global society, people have developed ways to utilize and manage their surrounding environments on purposes to improve and sustain both daily lives and agricultural production.</h6>
      <h6>Based on knowledge and practices locally accumulated in such human-nature interactions over time, rural development and their management mechanisms should have created elaborate systems that can continued to support local communities to sustain not only local economics (e.g., production) but also social (e.g., traditional wisdom) and environmental aspects (e.g., maintaining biodiversity).</h6>
    </div>
    <img src="@/assets/view.jpg" alt="">
  </div>
  <div class="media">
    <img src="@/assets/view.jpg" alt="">
    <div class="content">
      <h2 class="title text-uppercase">about us</h2>
      <h6>IRUP is a partnership made up of member organizations dedicated to working together to pursue human society in harmony with nature.</h6>
      <h6>In the emerging global society, people have developed ways to utilize and manage their surrounding environments on purposes to improve and sustain both daily lives and agricultural production.</h6>
      <h6>Based on knowledge and practices locally accumulated in such human-nature interactions over time, rural development and their management mechanisms should have created elaborate systems that can continued to support local communities to sustain not only local economics (e.g., production) but also social (e.g., traditional wisdom) and environmental aspects (e.g., maintaining biodiversity).</h6>
    </div> 
  </div>
</main>
  
</template>

<style scoped lang="scss">
  main {

    .about {
      display: flex;
      justify-content: center;
      align-items: center;

      .content {
        padding: 5rem;

        h6 {
          text-align: justify;
          margin-top: 1rem;
        }
      }

      img {
        width: 80vh;

        @media (max-width: 1140px) {
          width: 60vh;
        }
      }
    }

    .media {
      display: flex-wrap;
      justify-content: center;
      align-items: center;
      text-align: center;

      .content {
        padding: 5rem;

        h6 {
          text-align: justify;
          margin-top: 1rem;
        }
      }

      img {
        width: 80vh;
      }
    }

    @media (min-width: 960px) {
      .media {
        display: none;
      }
    }

    @media (max-width: 960px) {
      .about {
        display: none;
      }
    }
  }

</style>