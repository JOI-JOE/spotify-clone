<script setup>
import {onMounted, ref} from "vue";
  import {RouterView, RouterLink} from "vue-router";

  import MenuItem from './components/MenuItem.vue';

  import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
  import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
  import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
  import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
  import MusicPlayer from "@/components/MusicPlayer.vue";

  import {useSongStore} from "@/stores/song.js";
  import {storeToRefs} from "pinia";
  const useSong = useSongStore();
  const {isPlaying, currentTrack } = storeToRefs(useSong);

  onMounted(() => {
    isPlaying.value = false;
  })

  let openMenu = ref(false);
</script>

<template>
  <div>
    <div class="
      w-[calc(100%-240px)]
      h-[60px]
      fixed
      right-0
      z-20
      bg-[#101010]
      bg-opacity-80
      flex
      items-center
      justify-between
    "
    >
      <div class="flex items-center ml-6">
        <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
          <ChevronLeft  fillColor="#FFFFFF" :size="30"/>
        </button>

        <button type="button" class="rounded-full bg-black p-[1px] ml-4 cursor-pointer">
          <ChevronRight  fillColor="#FFFFFF" :size="30"/>
        </button>
      </div>

        <button
            @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
            class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer">
          <div class="flex items-center">
            <img class="rounded-full" width="27" src="https://th.bing.com/th/id/OIP.zuDgjEWbT1j9jQ0jvoeoBQAAAA?rs=1&pid=ImgDetMain"/>
            <div class="text-white text-[14px] ml-1.5 font-semibold">Gwen</div>
            <ChevronDown v-if="!openMenu" @click="openMenu = true" fillColor="#FFFFFF" :size="25"/>
            <ChevronUp v-else @click="openMenu = false"  fillColor="#FFFFFF" :size="25"/>
          </div>
        </button>
        <span
            v-if="openMenu"
            class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
          <ul class="text-gray-200 font-semibold text-[14px]">
            <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">Profile</li>
            <li class="px-3 py-2.5 hover:bg-[#3E3D3D]">Log out</li>
          </ul>
        </span>
    </div>
    <div
        id="SideNav"
        class="h-[100%] p-6 w-[240px] fixed z-50 bg-black"
    >
      <RouterLink>
        <img src="/icons/spotify-logo.png" width="140" alt="">
      </RouterLink>
      <div class="my-8"></div>
      <ul>
        <RouterLink to="/">
          <MenuItem class="ml-[1px]" :iconSize="23" name="Home" iconString="home" pageUrl="/"/>
        </RouterLink>

        <RouterLink to="/search">
          <MenuItem class="ml-[1px]" :iconSize="23" name="Search" iconString="search" pageUrl="/search" />
        </RouterLink>

        <RouterLink to="/library">
          <MenuItem class="ml-[1px]" :iconSize="23" name="Library" iconString="library" pageUrl="/library" />
        </RouterLink>

        <div class="py-3.5"></div>
        <MenuItem class="ml-[1px]" :iconSize="23" name="Create Playlist" iconString="playlist" pageUrl="/playlist" />
        <MenuItem class="ml-[1px]" :iconSize="23" name="Liked Songs" iconString="liked" pageUrl="/liked" />
      </ul>
    </div>
  </div>

  <div
    class="
     fixed
     right-0
     top-0
     w-[calc(100%-240px)]
     overflow-auto
     h-full
     bg-gradient-to-b
     from-[#1C1C1C]
     to-black
    "
  >
    <div class="mt-[70px]"></div>
      <RouterView />
    <div class="mb-[100px]"></div>
  </div>

  <MusicPlayer v-if="currentTrack" />
</template>

