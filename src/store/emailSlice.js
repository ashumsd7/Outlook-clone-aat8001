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

      allEmails.splice(matchedIndex, 1, currentEmail);
    },
    removeAsFavorite: (state, action) => {
      const id = action.payload.id;
      const matchedIndex = state.emails.findIndex((m) => m.id === id);
      let allEmails = [...state.emails];
      let currentEmail = { ...action.payload };
      currentEmail.isFavorite = false;

      allEmails.splice(matchedIndex, 1, currentEmail);
    },
    markAsRead: (state, action) => {
      const id = action.payload.id;
      const matchedIndex = state.emails.findIndex((m) => m.id === id);
      let allEmails = [...state.emails];
      let currentEmail = { ...action.payload };
      currentEmail.isRead = true;

      allEmails.splice(matchedIndex, 1, currentEmail);
    },

    setAllMails: (state, action) => {
      state.emails = [...action.payload];
    },
  },
});

export const { markAsFavorite, removeAsFavorite, markAsRead, setAllMails } =
  emailSlice.actions;

export default emailSlice.reducer;
