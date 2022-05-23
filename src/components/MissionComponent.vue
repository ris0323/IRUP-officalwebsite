<template>

<div class="content">

  <div class="mission">
    <h1 class="title uppercase text-center">mission & vision</h1>
    <h6>To tackle the critical issue, the National Chung Hsing University and Texas A&M University set up joint centers to promote sustainable agriculture and rural development. Implementation promotes activities consistent with existing fundamental principles and the nation’s policy, such as the Rural Regeneration in Taiwan. Our core vision is to build on positive human-agriculture-nature relationships.</h6>
            
  </div>
</div>


  

</template>

<style lang="scss" scoped>

.content {
  display: flex;
  flex-direction: row;
}
  
  .mission { 
    text-align: justify;
    border-radius: 5px;
    line-height: 2rem;
    width: 100%;
    background: #66bb6a;
    // background-image: url("../assets/bg-wave.svg");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 4rem;
    color: #eee;
    z-index: 2;

    @media (max-width: 850px) {
      width: 50vh;
      padding: 2rem;
      color: #fff;
      background-image: none;
      background: #66bb6a;
    }
  }

</style>