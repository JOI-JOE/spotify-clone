import {defineStore} from "pinia";
import artist from '../artist.json';

export const useSongStore = defineStore('song', {
    state: () => ({
        isPlaying: false,
        audio: null,
        currentArtist: null,
        currentTrack: null,
    }),
    actions: {
        loadSong(artist, track){
            this.currentArtist = artist;
            this.currentTrack = track;

            if(this.audio && this.audio.src){
                this.audio.pause();
                this.isPlaying = false;
                this.audio.src =  '';
            }

            this.audio = new Audio();
            this.audio.src = track.path;

            setTimeout(() => {
                this.isPlaying = true;
                this.audio.play()
            },200)
        },

        // phát và tạm dừng bài hát tùy theo trạng thái hiện tại
        playOrPauseSong(){
            // kiểm tra bài hát có được phát hay không
            // Có hai trường hợp Phát nhạc và tạm dừng nhạc
            if(this.audio.paused){
                // Nếu nó trả về là truez
                this.isPlaying = true; // được đặt đặt
                this.audio.play(); // được gọi để phát nhạc
            }else{
                this.isPlaying = false; //
                this.audio.pause()
            }
        },

        playOrPauseThisSong(artist, track){
            if(!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)){
                this.loadSong(artist,track)
                return
            }
            this.playOrPauseSong()
        },

        prevSong(currentTrack){
            let track = artist.tracks[currentTrack.id - 2]
            this.loadSong(artist,track)
        },

        nextSong(currentTrack) {
            if (currentTrack.id === artist.tracks.length) {
                let track = artist.tracks[0]
                this.loadSong(artist, track)
            } else {
                let track = artist.tracks[currentTrack.id]
                this.loadSong(artist, track)
            }
        },

        playFromFirst(){
            let track = artist.tracks[0];
            this.loadSong(artist,track)
        },

        resetState(){
          this.isPlaying = false;
          this.audio = null;
          this.currentArtist = null;
          this.currentTrack = null;
        }
    },
    persist:  true
})