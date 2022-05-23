<template>
  <div class="content">
    <div class="what_is_irup m-4">
      <h1 class="title uppercase">what<br>is<br>irup</h1>
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
      <div class="media-what-is-irup">
        <h1 class="title uppercase">what is irup</h1>
        <div class="dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    

    <div class="about-content">
      <div class="single-content">
        <i class="icon fa-solid fa-earth-americas fa-2x"></i>
        <h6>sustainable</h6>
        <span><p>IRUP is a partnership made up of member organizations dedicated to working together to pursue human society in harmony with nature.</p></span>      
      </div>
      <div class="single-content">
        <i class="icon fa-solid fa-seedling fa-2x"></i>
        <h6>harmonious</h6>
        <span><p>In the emerging global society, people have developed ways to utilize and manage their surrounding environments on purposes to improve and sustain both daily lives and agricultural production.</p></span>
      </div>
      <div class="single-content">
        <i class="icon fa-solid fa-tractor fa-2x"></i>
        <h6>supportive</h6>
        <span><p>Based on knowledge and practices locally accumulated in such human-nature interactions over time, rural development and their management mechanisms should have created elaborate systems that can continued to support local communities to sustain not only local economics but also social and environmental aspects.</p></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  
.content {
  display: flex;
  flex-direction: row;
  align-items: center;

  .what_is_irup {

    .dots {
      display: flex;
      flex-direction: row;

      .dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #66bb6a;
        margin: 6px;
      }
    }
  }

  .media-what-is-irup {
      display: none;

      .dots {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 3rem;

      .dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #66bb6a;
        margin: 6px;
      }
    }
    }

  .about-content {
    height: 200px;
    display: flex;
    border-radius: 30px;
    background: rgba(238, 238, 238, .8);
    padding: 2rem;

    .single-content {
      background: #fff;
      border-radius: 30px;
      width: 250px;
      height: 330px;
      padding: 1rem;
      margin: 1rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);

      .icon {
        color: #66bb6a;
        margin-bottom: .5rem;
      }

      span {
        text-align: justify;
      }
    }
  }
}

@media (max-width: 850px) {

  .content {
    flex-direction: column;

    .what_is_irup {
      display: none;
    }

    .media-what-is-irup {
      display: block;
    }

    .about-content {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;

      .single-content {
        width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: none;
        box-shadow: none;
        
      }
      
      span {
        display: none;
      }
    }
  }   
}

</style>