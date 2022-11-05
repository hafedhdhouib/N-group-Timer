<template>  
<div class="row">
  <div class="col">
      <h1 class="abyath">{{activite}}</h1>
  </div>
</div>  
<div class=" row">
  <div class="Timerset col-12">
    <div class="base-timer">
      <svg
        class="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="base-timer__circle">
          <circle
            class="base-timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            :stroke-dasharray="circleDasharray"
            class="base-timer__path-remaining"
            :class="remainingPathColor"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span class="base-timer__label">{{ formattedTimeLeft }}</span>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import {database}from '../firebase'
  
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;
  
  const COLOR_CODES = {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  };
  
  const TIME_LIMIT = 200;
  
  export default {
  
    data() {
      return {
        time:0,
        timePassed: 0,
        timerInterval: null,
      };
    },
  
    computed: {
      circleDasharray() {
        return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
      },
  
      formattedTimeLeft() {
        const timeLeft = this.timeLeft;
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
  
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
  
        return `${minutes}:${seconds}`;
      },
  
      timeLeft() {
        return this.time - this.timePassed;
      },
  
      timeFraction() {
        const rawTimeFraction = this.timeLeft / this.time;
        return rawTimeFraction - (1 / this.time) * (1 - rawTimeFraction);
      },
  
      remainingPathColor() {
        const { alert, warning, info } = COLOR_CODES;
  
        if (this.timeLeft <= alert.threshold) {
          return alert.color;
        } else if (this.timeLeft <= warning.threshold) {
          return warning.color;
        } else {
          return info.color;
        }
      },
    },
  
    watch: {
      timeLeft(newValue) {
        if (newValue === 0) {
          this.onTimesUp();
        }
      },
    },
  
    mounted() {
      database.ref('/').on('value',(data)=>{
      console.log(data.val());
      this.onTimesUp()
      this.timePassed=0
      this.time=(data.val().time)*60
      this.activite=(data.val().activite)
      this.startTimer();
  
    })
    },
  
    methods: {
      onTimesUp() {
        clearInterval(this.timerInterval);
      },
  
      startTimer() {
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
      },
    },
  };
  
  </script>
  
  <style scoped>
  .abyath{
    color: white;
    font-size: 120px;

  }
  h1{
    text-align: center;

  }
  .base-timer {
       position: relative;
       width: 400px;
       height: 400px;
  }
   .base-timer__svg {
       transform: scaleX(-1);
  }
   .base-timer__circle {
       fill: none;
       stroke: none;
  }
   .base-timer__path-elapsed {
       stroke-width: 7px;
       stroke: grey;
  }
   .base-timer__path-remaining {
       stroke-width: 7px;
       stroke-linecap: round;
       transform: rotate(90deg);
       transform-origin: center;
       transition: 1s linear all;
       fill-rule: nonzero;
       stroke: currentColor;
  }
   .base-timer__path-remaining.green {
       color: #41b883;
  }
   .base-timer__path-remaining.orange {
       color: orange;
  }
   .base-timer__path-remaining.red {
       color: red;
  }
   .base-timer__label {
       position: absolute;
       width: 400px;
       height: 400px;
       top: 0;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 130px;
       color:white;
  }
   
  </style>