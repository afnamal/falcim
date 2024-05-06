<template>
  <div>
      <div class="container mt-5 help-page">
        <h1 class="text-center mb-4">{{ $t('help.title') }}</h1>
        <div class="accordion" id="helpAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {{ $t('help.fortuneTypes.title') }}
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#helpAccordion">
              <div class="accordion-body">
                <p>{{ $t('help.fortuneTypes.description') }}</p>
                <ul>
                  <li><strong>{{ $t('help.fortuneTypes.coffee') }}</strong> {{ $t('help.fortuneTypes.coffeeDesc') }}</li>
                  <li><strong>{{ $t('help.fortuneTypes.palm') }}</strong> {{ $t('help.fortuneTypes.palmDesc') }}</li>
                </ul>
              </div>
            </div>
          </div>
    
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                {{ $t('help.membership.title') }}
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#helpAccordion">
              <div class="accordion-body">
                <p>{{ $t('help.membership.description') }}</p>
              </div>
            </div>
          </div>
    
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                {{ $t('help.process.title') }}
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#helpAccordion">
              <div class="accordion-body">
                <p>{{ $t('help.process.description') }}</p>
              </div>
            </div>
          </div>
    
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                {{ $t('help.history.title') }}
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#helpAccordion">
              <div class="accordion-body">
                <p>{{ $t('help.history.description') }}</p>
              </div>
            </div>
          </div>
    
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                {{ $t('help.contact.title') }}
              </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#helpAccordion">
              <div class="accordion-body">
                <p>{{ $t('help.contact.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  </template>
  
  <script>
  
  export default {
    components:{},
    setup() {
        
    },
  }
  </script>
  
  <style scoped>
  .help-page {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .content section {
    margin-bottom: 20px;
  }
  
  h1, h2 {
    color: #333;
  }
  
  p, li {
    color: #666;
    line-height: 1.6;
  }
  
  ul {
    margin-left: 20px;
  }
  
  .text-center {
    text-align: center;
  }
  
  a {
    color: #0056b3;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  