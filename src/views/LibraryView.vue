<script setup>
import Play from 'vue-material-design-icons/Play.vue';
import Pause from "vue-material-design-icons/Pause.vue"
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue"
import Heart from 'vue-material-design-icons/Heart.vue'
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue'
import artist from '../artist.json';
import SongRow from "@/components/SongRow.vue";

import {useSongStore} from "@/stores/song.js";
import {storeToRefs} from "pinia";
const useSong = useSongStore();
const {isPlaying, currentTrack, currentArtist} = storeToRefs(useSong);

const playFunc = () => {
  if(currentTrack.value){
   useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
    return
  }
  useSong.playFromFirst()
}
</script>

<template>
  <!-- Search   -->
  <div class="p-8">
    <button
        type="button"
        class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      {{ artist.name }}
    </button>
    <div class="py-1.5"></div>
    <div class="flex items-center w-fit relative h-full">
      <img width="140" :src="artist.albumCover" alt="">
      <div class="w-full ml-5">
        <div
            style="font-size: 33px"
            class="text-white absolute w-full hover:underline cursor-pointer top-0 font-semibold"
        >
          {{artist.name}}
        </div>

        <div class="text-gray-300 text-[13px] flex">
          <div class="flex">Album</div>

          <div class="ml-2 flex">
            <div class="circle mt-2 mr-2"/>
            <span class="-ml-0.5">{{ artist.releaseYear }}</span>
          </div>

          <div class="ml-2 flex">
            <div class="circle mt-2 mr-2"/>
            <span class="-ml-0.5">{{ artist.tracks.length }} songs</span>
          </div>

          <div class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5">
            <button class="p-1 rounded-full bg-white" @click="playFunc()">
              <Play v-if="true" fillColor="#181818" :size="25"/>
              <Play v-else fillColor="#181818" :size="25"/>
            </button>

            <button type="button">
              <Heart fillColor="#1BD760" :size="30"/>
            </button>

            <button type="button">
              <DotsHorizontal fillColor="#FFFFFF" :size="30"/>
            </button>

          </div>
        </div>
      </div>
    </div>

    <div class="mt-6"></div>
    <div class="flex items-center justify-between px-5 pt-2">
      <div class="flex items-center justify-between text-gray-400">
        <div class="mr-7">#</div>
        <div class="text-sm">Title</div>
      </div>
      <div>
        <ClockTimeThreeOutline fillColor="#FFFFFF" :size="18"/> />
      </div>
    </div>
    <div class="border-b border-b-[#2A2A2A] mt-2"></div>
    <div class="mb-4"></div>
    <ul class="w-full" v-for="(track, index) in artist.tracks" :key="track">
      <SongRow :artist="artist" :index="++index" :track="track" />
    </ul>
  </div>
</template>

<style scoped>
  .circle{
    width: 4px;
    height: 4px;
    background-color: rgb(189, 189, 189);
    border-radius: 100%;
  }
</style>