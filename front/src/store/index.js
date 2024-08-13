import { createStore } from 'vuex'

export default createStore({
  state: {
    currentSong: '',
    currentSongLink: '',
    currentPlaylist: [] // Add this line
  },
  getters: {
    getCurrentSong(state) {
      return state.currentSong;
    },
    getCurrentSongLink(state) {
      return state.currentSongLink;
    },
    getCurrentPlaylist(state) { // Add this getter
      return state.currentPlaylist;
    }
  },
  mutations: {
    setCurrentSong(state, song) {
      state.currentSong = song;
    },
    setCurrentSongLink(state, link) {
      state.currentSongLink = link;
    },
    setCurrentPlaylist(state, playlist) { // Add this mutation
      state.currentPlaylist = playlist;
    }
  },
  actions: {
    updateCurrentSong({ commit }, song) {
      commit('setCurrentSong', song);
    },
    updateSongLink({ commit }, link) {
      commit('setCurrentSongLink', link);
    },
    updateCurrentPlaylist({ commit }, playlist) { // Add this action
      commit('setCurrentPlaylist', playlist);
    }
  },
  modules: {
  }
})