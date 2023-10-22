import { createSlice } from "@reduxjs/toolkit";
const emailSlice = createSlice({
  name: "email",
  initialState: {
    emails: [],
  },
  // three reducers functions
  reducers: {
    markAsFavorite: (state, action) => {
      const id = action.payload.id;
      const matchedIndex = state.emails.findIndex((m) => m.id === id);
      let allEmails = [...state.emails];
      let currentEmail = { ...action.payload };
      currentEmail.isFavorite = true;
      console.log("currentEmail mark", currentEmail);
      allEmails.splice(matchedIndex, 1, currentEmail);
    },
    removeAsFavorite: (state, action) => {
      const id = action.payload.id;
      const matchedIndex = state.emails.findIndex((m) => m.id === id);
      let allEmails = [...state.emails];
      let currentEmail = { ...action.payload };
      currentEmail.isFavorite = false;
      console.log("currentEmail  unmark", currentEmail);
      allEmails.splice(matchedIndex, 1, currentEmail);
    },
    markAsRead: (state, action) => {
      const id = action.payload.id;
      const matchedIndex = state.emails.findIndex((m) => m.id === id);
      let allEmails = [...state.emails];
      let currentEmail = { ...action.payload };
      currentEmail.isRead = true;
      console.log("currentEmail Read", currentEmail);
      allEmails.splice(matchedIndex, 1, currentEmail);
    },

    setAllMails: (state, action) => {
        console.log('ALLLM MAILKS')
      state.emails = [...action.payload];
      console.log('setAllMails', state.emails);
    },
  },
});

export const { markAsFavorite, removeAsFavorite, markAsRead,setAllMails } =
  emailSlice.actions;

export default emailSlice.reducer;
