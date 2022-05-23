<template>

<main>
  <div class="summary">
    
    <h1 class="title text-uppercase">IPSI-7 Summary Report and Presentation Abstracts now available</h1>
    <h6 class="comment">Written by admin on December 4, 2019</h6>
    
    <div class="content">   
      <h6>The official report for the Seventh IPSI Global Conference (IPSI-7), including a compilation of presentation abstracts from all speakers, has been completed and is now available for download by clicking the image below.
        <br><br>
      The report contains a great deal of information about IPSI-7, which was held 29 September – 2 October 2018 in Kanazawa, Ishikawa Prefecture, Japan. More information about the event is available on the event announcement page here.
      </h6>

      <img src="@/assets/report.jpg" alt="">
    </div>

  </div>
</main>
  
</template>

<style lang="scss" scoped>

.summary {
  padding: 0 10vw 5vh 10vw;
  text-align: center;

  .comment {
    color: #999;
    margin-bottom: 1rem;
  }

  

  .content {

      margin: 5rem 6rem;
      display: flex;
      align-items: center;
      justify-content: center;

      h6 {        
        text-align: justify;
        margin-right: 3rem;  
      }

      img {
        width: 130%;
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