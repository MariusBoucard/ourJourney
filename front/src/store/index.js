import { createStore } from 'vuex'

export default createStore({
  state: {
    currentSong: '',
    currentSongLink: '',
    currentSearch: '',
    playlist: [] // Add this line
  },
  getters: {
    getCurrentSong(state) {
      return state.currentSong;
    },
    getCurrentSongLink(state) {
      return state.currentSongLink;
    },
    getCurrentPlaylist(state) { // Add this getter
      return state.playlist;
    }
  },
  mutations: {
    setCurrentSong(state, song) {
      state.currentSong = song;
    },
    addSongToPlaylist(state, song) {
      // Create a new array with the new song added
      const newPlaylist = [...state.playlist, song];
      // Replace the old playlist with the new array
      state.playlist = newPlaylist;
    },
    setCurrentSongLink(state, link) {
      state.currentSongLink = link;
    },
    setPlaylist(state, playlist) { // Add this mutation
      state.playlist = playlist;
    },
    setCurrentSearch(state, search) {
      state.currentSearch = search;
    }
  },
  actions: {
    updateCurrentSong({ commit }, song) {
      commit('setCurrentSong', song);
    },
    updateSongLink({ commit }, link) {
      commit('setCurrentSongLink', link);
    },
    updatePlaylist({ commit }, playlist) { // Add this action
      commit('setCurrentPlaylist', playlist);
    },
    updateSearch({ commit }, search) {
      commit('setCurrentSearch', search);
    }
  },
  modules: {
  }
})